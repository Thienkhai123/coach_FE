import React, { Fragment, useEffect, useState } from "react";

import { IBookingTranslate } from "@/interfaces/IBookingTranslate";
import { IRequestPaymentTranslate } from "@/interfaces/IRequestPaymentTranslate";
import Button from "@/components/button";
import CountDown from "@/components/count-down";
import CheckIcon from "@/components/icons/check";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import Voucher from "./voucher";
import Modal from "@/components/modal/Modal";
import VoucherDetailModal from "./voucherDetailModal";
import useModal from "@/hook/useModal";
import ExchangeSuccessIcon from "@/components/icons/exchangeSuccess";
import AllVoucherModal from "./allVoucherModal";
import PaymentModal from "./paymentModal";
import { IPaymentTranslate } from "@/interfaces/IPaymentTranslate";
import {
	IReservationStartData,
	ISeat,
	ITripData,
} from "@/interfaces/httpRequest/ITrip";
import moment from "moment";
import { IUserProfile } from "@/interfaces/httpRequest/IUser";
import { VoucherData } from "@/interfaces/httpRequest/IVoucher";
import { IMyPointTranslate } from "@/interfaces/IMyPointTranslate";

interface ITripInformationReturnProps {
	BOOKING: IBookingTranslate;
	POINT: IMyPointTranslate;
	REQUESTPAYMENT: IRequestPaymentTranslate;
	reservationDetail: IReservationStartData;
	reservationDetailReturn: IReservationStartData;
	seatSelected: ISeat[];
	seatSelectedReturn: ISeat[];
	handleChangeNextChildStep: Function;
	step: number;
	formIsValid: boolean;
	PAYMENT: IPaymentTranslate;
	childCount: number;
	childCountReturn: number;
	placeInfomation: any;
	placeInfomationReturn: any;
	userProfile?: IUserProfile;
	expiredDuration?: number;
	vouchers: VoucherData[];
	vouchersReturn: VoucherData[];
	voucherSelected: VoucherData | null;
	voucherSelectedReturn: VoucherData | null;
	setVoucherSelected: Function;
	setVoucherSelectedReturn: Function;
	childAdditionalCharge?: any[];
	childAdditionalChargeReturn?: any[];
}

const TripInformationReturn = (props: ITripInformationReturnProps) => {
	const {
		BOOKING,
		POINT,
		REQUESTPAYMENT,
		reservationDetail,
		reservationDetailReturn,
		seatSelected = [],
		seatSelectedReturn = [],
		step,
		formIsValid,
		PAYMENT,
		childCount = 0,
		childCountReturn = 0,
		placeInfomation,
		placeInfomationReturn,
		handleChangeNextChildStep = () => {},
		userProfile,
		expiredDuration,
		vouchers,
		vouchersReturn,
		voucherSelected,
		voucherSelectedReturn,
		setVoucherSelected = () => {},
		setVoucherSelectedReturn = () => {},
		childAdditionalCharge = [],
		childAdditionalChargeReturn = [],
	} = props;
	const calculateTotalTripPrice = (
		seatSelected: any[],
		childCount: number,
		reservationDetail: IReservationStartData,
		voucherSelected: VoucherData | null,
	): number => {
		if (reservationDetail) {
			const price =
				seatSelected?.length * reservationDetail.price +
				childCount * ((reservationDetail.price * 1) / 2);
			if (voucherSelected) {
				if (voucherSelected.enumDiscountType === 1) {
					return Math.round(
						price - price * (voucherSelected.value / 100),
					);
				} else {
					return Math.round(price - voucherSelected.value);
				}
			} else {
				return Math.round(price);
			}
		} else {
			return 0;
		}
	};
	const calculateDiscountPrice = (
		seatSelected: any[],
		childCount: number,
		reservationDetail: IReservationStartData,
		voucherSelected: VoucherData | null,
	): number => {
		if (reservationDetail) {
			const price =
				seatSelected?.length * reservationDetail.price +
				childCount * ((reservationDetail.price * 1) / 2);
			if (voucherSelected) {
				if (voucherSelected.enumDiscountType === 1) {
					return Math.round(price * (voucherSelected.value / 100));
				} else {
					return Math.round(voucherSelected.value);
				}
			} else {
				return 0;
			}
		} else {
			return 0;
		}
	};
	// const [expiredDuration, setExpiredDuration] = useState(0);

	const [showVoucherDetailModal, toggleShowVoucherDetailModal] = useModal();
	const [showVoucherDetailModalReturn, toggleShowVoucherDetailModalReturn] =
		useModal();

	const [exchangeSuccessModal, toggleExchangeSuccessModal] = useModal();
	const [exchangeSuccessModalReturn, toggleExchangeSuccessModalReturn] =
		useModal();

	const [seeAllVoucherModal, toggleSeeAllVoucherModal] = useModal();
	const [seeAllVoucherModalReturn, toggleSeeAllVoucherModalReturn] =
		useModal();
	const [cancelVoucherModal, toggleCancelVoucherModal] = useModal();
	const [cancelVoucherModalReturn, toggleCancelVoucherModalReturn] =
		useModal();

	const [voucherDetail, setVoucherDetail] = useState(null);
	const [voucherDetailReturn, setVoucherDetailReturn] = useState(null);
	const [currentPoint, setCurrentPoint] = useState(userProfile?.point || 0);

	const handleSelectVoucher = (voucher: VoucherData) => {
		const { voucherId } = voucher || {};
		if (voucherSelected?.voucherId !== voucherId || !voucherSelected) {
			if (currentPoint >= voucher.pointExchange) {
				setVoucherSelected(voucher);
			}
			if (showVoucherDetailModal) {
				toggleShowVoucherDetailModal();
			}
			toggleExchangeSuccessModal();
		} else {
			toggleCancelVoucherModal();
		}
	};
	const handleSelectVoucherReturn = (voucher: VoucherData) => {
		const { voucherId } = voucher || {};

		if (
			voucherSelectedReturn?.voucherId !== voucherId ||
			!voucherSelectedReturn
		) {
			if (currentPoint >= voucher.pointExchange) {
				setVoucherSelectedReturn(voucher);
			}
			if (showVoucherDetailModalReturn) {
				toggleShowVoucherDetailModalReturn();
			}
			toggleExchangeSuccessModalReturn();
		} else {
			toggleCancelVoucherModalReturn();
		}
	};
	const handleCloseApplyVoucher = () => {
		toggleShowVoucherDetailModal();
		setVoucherDetail(null);
	};

	const handleCloseApplyVoucherReturn = () => {
		toggleShowVoucherDetailModalReturn();
		setVoucherDetailReturn(null);
	};
	// const handleClickApplyVoucher = () => {
	// 	toggleShowVoucherDetailModal();
	// 	setVoucherDetail(null);
	// 	toggleExchangeSuccessModal();
	// };
	const handleClickVoucher = (voucher: any) => {
		setVoucherDetail(voucher);

		toggleShowVoucherDetailModal();
	};
	const handleClickVoucherReturn = (voucher: any) => {
		setVoucherDetailReturn(voucher);
		toggleShowVoucherDetailModalReturn();
	};
	const handleClickCancel = () => {
		if (voucherSelected) {
			setVoucherSelected(null);
			toggleCancelVoucherModal();
		}
	};
	const handleClickCancelReturn = () => {
		if (voucherSelectedReturn) {
			setVoucherSelectedReturn(null);
			toggleCancelVoucherModalReturn();
		}
	};

	useEffect(() => {
		const pointExchange = voucherSelected?.pointExchange || 0;
		const pointExchangeReturn = voucherSelectedReturn?.pointExchange || 0;

		const total = pointExchange + pointExchangeReturn;
		if (userProfile) {
			setCurrentPoint(userProfile?.point - total);
		}
	}, [voucherSelected, voucherSelectedReturn]);

	// useEffect(() => {
	// 	if (step === 2) {
	// 		setExpiredDuration(600);
	// 	}
	// }, [step]);
	return (
		<div>
			<div className='flex flex-col '>
				<div className='p-6 pb-4 border-b border-neutral-grey-100 '>
					<div>
						<div className='rounded-full py-1 px-2 bg-semantic-green-light w-fit'>
							<p className='text-xs font-extrabold text-neutral-grey-600'>
								{REQUESTPAYMENT.detailOrder.titleTrip}
							</p>
						</div>
						<div className='flex items-center justify-between py-2 border-b border-neutral-grey-100'>
							<p className='text-sm font-normal text-neutral-grey-600'>
								{REQUESTPAYMENT.detailOrder.routes}
							</p>
							<div className='max-w-[205px]'>
								<p className='truncate text-sm font-semibold text-neutral-grey-700'>
									{reservationDetail?.route?.name}
								</p>
							</div>
						</div>
						<div className='flex items-center justify-between py-2 border-b border-neutral-grey-100'>
							<p className='text-sm font-normal text-neutral-grey-600'>
								{REQUESTPAYMENT.detailOrder.timeStart}
							</p>
							<div className='max-w-[205px]'>
								<p className='truncate text-sm font-semibold text-neutral-grey-700'>
									{moment(
										reservationDetail?.trip.startAt,
									).format("HH:mm, DD/MM/YYYY")}
								</p>
							</div>
						</div>
						<div className='flex items-center justify-between py-2 border-b border-neutral-grey-100'>
							<p className='text-sm font-normal text-neutral-grey-600'>
								{REQUESTPAYMENT.detailOrder.type}
							</p>
							<div className='max-w-[205px]'>
								<p className='truncate text-sm font-semibold text-neutral-grey-700'>
									{
										reservationDetail?.trip?.vehicle
											?.vehicleType?.name
									}
								</p>
							</div>
						</div>
						<div className='flex items-center justify-between py-2 border-b border-neutral-grey-100'>
							<p className='text-sm font-normal text-neutral-grey-600'>
								{REQUESTPAYMENT.detailOrder.pickupPoint}
							</p>
							<div className='max-w-[205px]'>
								<p className='truncate text-sm font-semibold text-neutral-grey-700'>
									{placeInfomation?.startPlace}
								</p>
							</div>
						</div>
						<div className='flex items-center justify-between py-2 border-b border-neutral-grey-100'>
							<p className='text-sm font-normal text-neutral-grey-600'>
								{REQUESTPAYMENT.detailOrder.paypoints}
							</p>
							<div className='max-w-[205px]'>
								<p className='truncate text-sm font-semibold text-neutral-grey-700'>
									{placeInfomation?.endPlace}
								</p>
							</div>
						</div>
						<div className='flex items-center justify-between py-2 border-b border-neutral-grey-100'>
							<p className='text-sm font-normal text-neutral-grey-600'>
								{REQUESTPAYMENT.detailOrder.numberChair}
							</p>
							<div className='max-w-[205px]'>
								{seatSelected?.length === 0 ? (
									<p className='truncate text-sm font-semibold text-neutral-grey-700'>
										-
									</p>
								) : (
									<p className='truncate text-sm font-semibold text-neutral-grey-700'>
										{seatSelected?.length}{" "}
										{REQUESTPAYMENT.detailOrder.seat}
									</p>
								)}
							</div>
						</div>
						<div className='flex items-center justify-between py-2 border-b border-neutral-grey-100'>
							<p className='text-sm font-normal text-neutral-grey-600'>
								{REQUESTPAYMENT.detailOrder.locationChair}
							</p>
							<div className='max-w-[205px]'>
								{seatSelected?.length === 0 ? (
									<p className='truncate text-sm font-semibold text-neutral-grey-700'>
										-
									</p>
								) : (
									<div className='flex flex-wrap justify-end'>
										{seatSelected?.map(
											(el: ISeat, idx: number) => {
												return (
													<p
														key={idx}
														className='text-sm font-semibold text-neutral-grey-700'>
														{el?.seatName}
														{idx !==
														seatSelected?.length - 1
															? ","
															: ""}
													</p>
												);
											},
										)}
									</div>
								)}
							</div>
						</div>
					</div>
					<div className='mt-6'>
						<div className='rounded-full py-1 px-2 bg-semantic-green-light w-fit'>
							<p className='text-xs font-extrabold text-neutral-grey-600'>
								{REQUESTPAYMENT.detailOrder.titleTripReturn}
							</p>
						</div>
						<div className='flex items-center justify-between py-2 border-b border-neutral-grey-100'>
							<p className='text-sm font-normal text-neutral-grey-600'>
								{REQUESTPAYMENT.detailOrder.routes}
							</p>
							<div className='max-w-[205px]'>
								<p className='truncate text-sm font-semibold text-neutral-grey-700'>
									{reservationDetailReturn?.route?.name}
								</p>
							</div>
						</div>
						<div className='flex items-center justify-between py-2 border-b border-neutral-grey-100'>
							<p className='text-sm font-normal text-neutral-grey-600'>
								{REQUESTPAYMENT.detailOrder.timeStart}
							</p>
							<div className='max-w-[205px]'>
								<p className='truncate text-sm font-semibold text-neutral-grey-700'>
									{moment(
										reservationDetailReturn?.trip.startAt,
									).format("HH:mm, DD/MM/YYYY")}
								</p>
							</div>
						</div>
						<div className='flex items-center justify-between py-2 border-b border-neutral-grey-100'>
							<p className='text-sm font-normal text-neutral-grey-600'>
								{REQUESTPAYMENT.detailOrder.type}
							</p>
							<div className='max-w-[205px]'>
								<p className='truncate text-sm font-semibold text-neutral-grey-700'>
									{
										reservationDetailReturn?.trip?.vehicle
											?.vehicleType?.name
									}
								</p>
							</div>
						</div>
						<div className='flex items-center justify-between py-2 border-b border-neutral-grey-100'>
							<p className='text-sm font-normal text-neutral-grey-600'>
								{REQUESTPAYMENT.detailOrder.pickupPoint}
							</p>
							<div className='max-w-[205px]'>
								<p className='truncate text-sm font-semibold text-neutral-grey-700'>
									{placeInfomationReturn?.startPlace}
								</p>
							</div>
						</div>
						<div className='flex items-center justify-between py-2 border-b border-neutral-grey-100'>
							<p className='text-sm font-normal text-neutral-grey-600'>
								{REQUESTPAYMENT.detailOrder.paypoints}
							</p>
							<div className='max-w-[205px]'>
								<p className='truncate text-sm font-semibold text-neutral-grey-700'>
									{placeInfomationReturn?.endPlace}
								</p>
							</div>
						</div>
						<div className='flex items-center justify-between py-2 border-b border-neutral-grey-100'>
							<p className='text-sm font-normal text-neutral-grey-600'>
								{REQUESTPAYMENT.detailOrder.numberChair}
							</p>
							<div className='max-w-[205px]'>
								{seatSelected?.length === 0 ? (
									<p className='truncate text-sm font-semibold text-neutral-grey-700'>
										-
									</p>
								) : (
									<p className='truncate text-sm font-semibold text-neutral-grey-700'>
										{seatSelectedReturn?.length}{" "}
										{REQUESTPAYMENT.detailOrder.seat}
									</p>
								)}
							</div>
						</div>
						<div className='flex items-center justify-between py-2 border-b border-neutral-grey-100'>
							<p className='text-sm font-normal text-neutral-grey-600'>
								{REQUESTPAYMENT.detailOrder.locationChair}
							</p>
							<div className='max-w-[205px]'>
								{seatSelectedReturn?.length === 0 ? (
									<p className='truncate text-sm font-semibold text-neutral-grey-700'>
										-
									</p>
								) : (
									<div className='flex flex-wrap justify-end'>
										{seatSelectedReturn?.map(
											(el: ISeat, idx: number) => {
												return (
													<p
														key={idx}
														className='text-sm font-semibold text-neutral-grey-700'>
														{el?.seatName}
														{idx !==
														seatSelectedReturn?.length -
															1
															? ","
															: ""}
													</p>
												);
											},
										)}
									</div>
								)}
							</div>
						</div>
					</div>
					{userProfile && step === 2 && (
						<div>
							{vouchers?.length > 0 && (
								<div className='mt-8'>
									<div className='flex items-center justify-between'>
										<div className='rounded-full  py-1 px-2 bg-semantic-green-light w-fit'>
											<p className='text-xs font-extrabold text-neutral-grey-600'>
												{BOOKING.exchangePoints} -{" "}
												{BOOKING.departure}
											</p>
										</div>
										<p
											onClick={() => {
												toggleSeeAllVoucherModal();
											}}
											className='text-sm font-semibold text-neutral-grey-700 underline cursor-pointer'>
											{BOOKING.seeAll}
										</p>
									</div>
									<div className='flex items-center justify-between pt-2 pb-3'>
										<p className='text-sm font-medium text-neutral-grey-600'>
											{BOOKING.yourPoints}:{" "}
											<span className='text-sm font-bold text-primary-500'>
												{currentPoint > 0
													? currentPoint
													: 0}{" "}
												{BOOKING.score}
											</span>
										</p>
									</div>
									<div>
										<Swiper
											// speed={1500}
											slidesPerView={1.3}
											// slidesPerGroup={1.3}
											spaceBetween={8}
											className='mySwiper '
											modules={[Navigation]}
											navigation={{
												nextEl: ".next",
												prevEl: ".prev",
											}}
											// breakpoints={{
											// 	320: {
											// 		slidesPerView: 1.7,
											// 		slidesPerGroup: 1,
											// 		spaceBetween: 8,
											// 		speed: 1500,
											// 	},

											// 	1100: {
											// 		slidesPerView: 3.9,
											// 		slidesPerGroup: 3.9,
											// 		spaceBetween: 8,
											// 		speed: 600,
											// 	},
											// }}
										>
											{vouchers.map((voucher, ind) => {
												const { voucherId } =
													voucher || {};
												return (
													<SwiperSlide key={ind}>
														<div
															onClick={() => {
																handleClickVoucher(
																	voucher,
																);
															}}>
															<Voucher
																disabled={
																	voucherSelected?.voucherId !==
																		voucherId &&
																	currentPoint <
																		voucher?.pointExchange
																}
																BOOKING={
																	BOOKING
																}
																voucher={
																	voucher
																}
																isExchange={
																	voucherSelected?.voucherId ===
																	voucherId
																}
																handleSelectVoucher={() => {
																	handleSelectVoucher(
																		voucher,
																	);
																}}
															/>
														</div>
													</SwiperSlide>
												);
											})}
										</Swiper>
									</div>
								</div>
							)}
							{vouchersReturn?.length > 0 && (
								<div className='mt-8'>
									<div className='flex items-center justify-between'>
										<div className='rounded-full  py-1 px-2 bg-semantic-green-light w-fit'>
											<p className='text-xs font-extrabold text-neutral-grey-600'>
												{BOOKING.exchangePoints} -{" "}
												{BOOKING.return}
											</p>
										</div>
										<p
											onClick={() => {
												toggleSeeAllVoucherModalReturn();
											}}
											className='text-sm font-semibold text-neutral-grey-700 underline cursor-pointer'>
											{BOOKING.seeAll}
										</p>
									</div>

									<div className='pt-2'>
										<Swiper
											// speed={1500}
											slidesPerView={1.3}
											// slidesPerGroup={1.3}
											spaceBetween={8}
											className='mySwiper '
											modules={[Navigation]}
											navigation={{
												nextEl: ".next",
												prevEl: ".prev",
											}}
											// breakpoints={{
											// 	320: {
											// 		slidesPerView: 1.7,
											// 		slidesPerGroup: 1,
											// 		spaceBetween: 8,
											// 		speed: 1500,
											// 	},

											// 	1100: {
											// 		slidesPerView: 3.9,
											// 		slidesPerGroup: 3.9,
											// 		spaceBetween: 8,
											// 		speed: 600,
											// 	},
											// }}
										>
											{vouchersReturn.map(
												(voucher, ind) => {
													const { voucherId } =
														voucher || {};
													return (
														<SwiperSlide key={ind}>
															<div
																onClick={() => {
																	handleClickVoucherReturn(
																		voucher,
																	);
																}}>
																<Voucher
																	disabled={
																		voucherSelectedReturn?.voucherId !==
																			voucherId &&
																		currentPoint <
																			voucher?.pointExchange
																	}
																	BOOKING={
																		BOOKING
																	}
																	voucher={
																		voucher
																	}
																	isExchange={
																		voucherSelectedReturn?.voucherId ===
																		voucherId
																	}
																	handleSelectVoucher={() => {
																		handleSelectVoucherReturn(
																			voucher,
																		);
																	}}
																/>
															</div>
														</SwiperSlide>
													);
												},
											)}
										</Swiper>
									</div>
								</div>
							)}
						</div>
					)}

					<div className='mt-8'>
						<div className='rounded-full  py-1 px-2 bg-semantic-green-light w-fit'>
							<p className='text-xs font-extrabold text-neutral-grey-600'>
								{REQUESTPAYMENT.detailOrder.tiltePrice}
							</p>
						</div>
						<div className='flex items-center justify-between py-2 border-b border-neutral-grey-100'>
							<p className='text-sm font-medium text-neutral-grey-600'>
								{`${REQUESTPAYMENT.detailOrder.chairPrice} - ${BOOKING.departure}`}
							</p>
							<div className='max-w-[205px]'>
								{seatSelected?.length === 0 ? (
									<p className='truncate text-sm font-semibold text-neutral-grey-700'>
										-
									</p>
								) : (
									<p className='truncate text-sm font-semibold text-neutral-grey-700'>
										{reservationDetail?.price?.toLocaleString() +
											"đ"}{" "}
										<span className='font-normal'>{`x${seatSelected.length}`}</span>
									</p>
								)}
							</div>
						</div>
						{childAdditionalCharge.length > 0 &&
							childAdditionalCharge?.map((child, idx) => {
								return (
									<div
										key={idx}
										className='flex items-center justify-between py-2 border-b border-neutral-grey-100'>
										<p className='text-sm font-medium text-neutral-grey-600'>
											{BOOKING.extraFeeChildren}{" "}
											{child.seatName}
										</p>
										<div className='max-w-[205px]'>
											{seatSelected?.length === 0 ? (
												<p className='truncate text-sm font-semibold text-neutral-grey-700'>
													-
												</p>
											) : (
												<p className='truncate text-sm font-semibold text-neutral-grey-700'>
													{(
														reservationDetail?.price /
														2
													)?.toLocaleString() +
														"đ"}{" "}
												</p>
											)}
										</div>
									</div>
								);
							})}
						<div className='flex items-center justify-between py-2 border-b border-neutral-grey-100'>
							<p className='text-sm font-medium text-neutral-grey-600'>
								{`${REQUESTPAYMENT.detailOrder.chairPrice} - ${BOOKING.return}`}
							</p>
							<div className='max-w-[205px]'>
								{seatSelectedReturn?.length === 0 ? (
									<p className='truncate text-sm font-semibold text-neutral-grey-700'>
										-
									</p>
								) : (
									<p className='truncate text-sm font-semibold text-neutral-grey-700'>
										{reservationDetailReturn?.price?.toLocaleString() +
											"đ"}{" "}
										<span className='font-normal'>{`x${seatSelectedReturn.length}`}</span>
									</p>
								)}
							</div>
						</div>
						{childAdditionalChargeReturn.length > 0 &&
							childAdditionalChargeReturn?.map((child, idn) => {
								return (
									<div
										key={idn}
										className='flex items-center justify-between py-2 border-b border-neutral-grey-100'>
										<p className='text-sm font-medium text-neutral-grey-600'>
											{BOOKING.extraFeeChildren}{" "}
											{child.seatName}
										</p>
										<div className='max-w-[205px]'>
											{seatSelectedReturn?.length ===
											0 ? (
												<p className='truncate text-sm font-semibold text-neutral-grey-700'>
													-
												</p>
											) : (
												<p className='truncate text-sm font-semibold text-neutral-grey-700'>
													{(
														reservationDetailReturn?.price /
														2
													)?.toLocaleString() +
														"đ"}{" "}
												</p>
											)}
										</div>
									</div>
								);
							})}
						<div className='flex items-center justify-between py-2 border-b border-neutral-grey-100'>
							<p className='text-sm font-medium text-neutral-grey-600'>
								{REQUESTPAYMENT.detailOrder.incentives}
								{"  "}- {BOOKING.departure}
							</p>
							<div className='max-w-[205px]'>
								<p className='truncate text-sm font-semibold text-neutral-grey-700'>
									{voucherSelected
										? `${
												voucherSelected.enumDiscountType ===
												1
													? `${calculateDiscountPrice(
															seatSelected,
															childCount,
															reservationDetail,
															voucherSelected,
													  ).toLocaleString(
															"vi-VN",
													  )}đ (${voucherSelected.value.toFixed(
															0,
													  )}%)`
													: `${voucherSelected.value.toLocaleString()}đ`
										  }`
										: `0đ`}
								</p>
							</div>
						</div>
						<div className='flex items-center justify-between py-2 border-b border-neutral-grey-100'>
							<p className='text-sm font-medium text-neutral-grey-600'>
								{REQUESTPAYMENT.detailOrder.incentives}
								{"  "}- {BOOKING.return}
							</p>
							<div className='max-w-[205px]'>
								<p className='truncate text-sm font-semibold text-neutral-grey-700'>
									{voucherSelectedReturn
										? `${
												voucherSelectedReturn.enumDiscountType ===
												1
													? `${calculateDiscountPrice(
															seatSelectedReturn,
															childCountReturn,
															reservationDetailReturn,
															voucherSelectedReturn,
													  ).toLocaleString(
															"vi-VN",
													  )}đ (${voucherSelectedReturn.value.toFixed(
															0,
													  )}%)`
													: `${voucherSelectedReturn.value.toLocaleString()}đ`
										  }`
										: `0đ`}
								</p>
							</div>
						</div>
						<div className='flex items-center justify-between py-2 '>
							<p className='text-sm font-bold text-neutral-grey-600'>
								{REQUESTPAYMENT.detailOrder.totalPrice}
							</p>
							<div className='max-w-[205px]'>
								{seatSelected?.length === 0 ? (
									<p className='truncate text-sm font-semibold text-neutral-grey-700'>
										-
									</p>
								) : (
									<p className='truncate text-sm font-semibold text-neutral-grey-700'>
										{(
											calculateTotalTripPrice(
												seatSelected,
												childCount,
												reservationDetail,
												voucherSelected,
											) +
											calculateTotalTripPrice(
												seatSelectedReturn,
												childCountReturn,
												reservationDetailReturn,
												voucherSelectedReturn,
											)
										)?.toLocaleString() + "đ"}
									</p>
								)}
							</div>
						</div>
					</div>
				</div>

				<div className='pt-2 px-6 pb-6 flex flex-col items-center gap-2'>
					{step === 2 && (
						<p className='text-black text-sm font-semibold text-center '>
							{BOOKING.expiredBookingDuration}{" "}
							{expiredDuration && (
								<CountDown inputTimer={expiredDuration} />
							)}
							{!expiredDuration && "--:--"}
						</p>
					)}
					<Button
						btnColor='disabled:bg-primary-600 bg-primary-500 disabled:opacity-100 group'
						height='h-11'
						borderRadius='rounded-full'
						borderColor='border-none'
						color='group-disabled:text-opacity-60 text-white '
						disabled={
							step === 1
								? seatSelected.length === 0 ||
								  seatSelectedReturn.length === 0
								: !formIsValid
						}
						form='reservationReturn-form'
						actionType={step === 2 ? "submit" : "button"}
						onClick={() => {
							if (step === 1) {
								handleChangeNextChildStep();
							}
							// else {

							// 	togglePaymentModal();
							// }
						}}>
						{BOOKING.continue}
					</Button>
				</div>
			</div>
			<Modal
				toggleModal={handleCloseApplyVoucher}
				open={showVoucherDetailModal}
				wrapChildStyle='p-0'
				modalStyle='w-[100vw] h-[100vh] flex justify-center items-center fixed bg-black/30 z-[60] left-[calc(0%)] top-[calc(0%)]'
				childStyle='w-[600px] bg-white md:rounded-xl md:min-h-fit min-h-full mx-0  overflow-hidden duration-200 animate-fade-in '>
				{userProfile && (
					<VoucherDetailModal
						voucher={voucherDetail}
						BOOKING={BOOKING}
						REQUESTPAYMENT={REQUESTPAYMENT}
						handleCloseModal={handleCloseApplyVoucher}
						handleSubmit={handleSelectVoucher}
						POINT={POINT}
						userProfile={userProfile}
						voucherSelected={voucherSelected}
						currentPoint={currentPoint}
					/>
				)}
			</Modal>
			<Modal
				toggleModal={handleCloseApplyVoucherReturn}
				open={showVoucherDetailModalReturn}
				wrapChildStyle='p-0'
				modalStyle='w-[100vw] h-[100vh] flex justify-center items-center fixed bg-black/30 z-[60] left-[calc(0%)] top-[calc(0%)]'
				childStyle='w-[600px] bg-white md:rounded-xl md:min-h-fit min-h-full mx-0  overflow-hidden duration-200 animate-fade-in '>
				{userProfile && (
					<VoucherDetailModal
						voucher={voucherDetailReturn}
						BOOKING={BOOKING}
						REQUESTPAYMENT={REQUESTPAYMENT}
						handleCloseModal={handleCloseApplyVoucherReturn}
						handleSubmit={handleSelectVoucherReturn}
						POINT={POINT}
						userProfile={userProfile}
						voucherSelected={voucherSelectedReturn}
						currentPoint={currentPoint}
					/>
				)}
			</Modal>
			<Modal
				open={cancelVoucherModal}
				toggleModal={toggleCancelVoucherModal}
				wrapChildStyle='p-0'
				modalStyle='w-[100vw] h-[100vh] flex justify-center items-center fixed bg-black/30 z-[100] left-[calc(0%)] top-[calc(0%)]'
				childStyle='w-[600px] bg-white md:rounded-xl md:min-h-fit min-h-full mx-0  overflow-hidden duration-200 animate-fade-in '>
				<div className={``}>
					<div className='p-4 flex items-center justify-center border-b border-neutral-grey-200'>
						<p className='text-base font-semibold'>
							{BOOKING.confirmCancel}
						</p>
					</div>
					<div className='max-h-[600px] my-4 overflow-auto  flex flex-col items-center justify-center'>
						<p className='text-base text-neutral-grey-700 leading-[24px] font-medium'>
							{BOOKING.contentCancel}
						</p>
					</div>

					<div className='flex items-center gap-3 p-4 pb-6'>
						<Button
							btnColor='bg-neutral-grey-100 group'
							height='h-11'
							borderRadius='rounded-full'
							borderColor='border-none'
							color='text-black '
							// disabled={seatSelected.length === 0}
							// actionType='submit'
							onClick={() => toggleCancelVoucherModal()}>
							{BOOKING.cancelApply}
						</Button>
						<Button
							btnColor='disabled:bg-primary-600 bg-primary-500 disabled:opacity-100 group'
							height='h-11'
							borderRadius='rounded-full'
							borderColor='border-none'
							color='group-disabled:text-opacity-60 text-white '
							// actionType='submit'
							onClick={() => handleClickCancel()}>
							{BOOKING.confirm}
						</Button>
					</div>
				</div>
			</Modal>
			<Modal
				open={cancelVoucherModalReturn}
				toggleModal={toggleCancelVoucherModalReturn}
				wrapChildStyle='p-0'
				modalStyle='w-[100vw] h-[100vh] flex justify-center items-center fixed bg-black/30 z-[100] left-[calc(0%)] top-[calc(0%)]'
				childStyle='w-[600px] bg-white md:rounded-xl md:min-h-fit min-h-full mx-0  overflow-hidden duration-200 animate-fade-in '>
				<div className={``}>
					<div className='p-4 flex items-center justify-center border-b border-neutral-grey-200'>
						<p className='text-base font-semibold'>
							{BOOKING.confirmCancel}
						</p>
					</div>
					<div className='max-h-[600px] my-4 overflow-auto  flex flex-col items-center justify-center'>
						<p className='text-base text-neutral-grey-700 leading-[24px] font-medium'>
							{BOOKING.contentCancel}
						</p>
					</div>

					<div className='flex items-center gap-3 p-4 pb-6'>
						<Button
							btnColor='bg-neutral-grey-100 group'
							height='h-11'
							borderRadius='rounded-full'
							borderColor='border-none'
							color='text-black '
							// disabled={seatSelected.length === 0}
							// actionType='submit'
							onClick={() => toggleCancelVoucherModalReturn()}>
							{BOOKING.cancelApply}
						</Button>
						<Button
							btnColor='disabled:bg-primary-600 bg-primary-500 disabled:opacity-100 group'
							height='h-11'
							borderRadius='rounded-full'
							borderColor='border-none'
							color='group-disabled:text-opacity-60 text-white '
							// actionType='submit'
							onClick={() => handleClickCancelReturn()}>
							{BOOKING.confirm}
						</Button>
					</div>
				</div>
			</Modal>
			<Modal
				open={exchangeSuccessModal}
				toggleModal={toggleExchangeSuccessModal}
				modalStyle='w-[100vw] h-[100vh] flex justify-center items-center fixed bg-black/30 z-[100] left-[calc(0%)] top-[calc(0%)]'
				childStyle='w-[600px] bg-white md:rounded-xl md:min-h-fit min-h-full mx-0  overflow-hidden duration-200 animate-fade-in '>
				<div>
					<div className='mx-auto flex justify-center mb-4'>
						<ExchangeSuccessIcon />
					</div>
					<p className='mb-2 text-semantic-green text-base font-bold text-center'>
						{BOOKING.exchangeSucess}
					</p>
					<p className='text-neutral-grey-700 font-medium text-sm text-center'>
						{BOOKING.youExchangeSuccess}{" "}
						<span className='font-bold'>
							{voucherSelected?.pointExchange} {BOOKING.score}
						</span>{" "}
						{BOOKING.get}{" "}
						<span className='text-semantic-red text-base font-bold mt-0.5'>
							{BOOKING.voucher}{" "}
							{voucherSelected?.enumDiscountType === 1
								? `${voucherSelected.value.toFixed(0)}%`
								: `${voucherSelected?.value.toLocaleString()}đ`}
						</span>
					</p>
				</div>
			</Modal>
			<Modal
				open={exchangeSuccessModalReturn}
				toggleModal={toggleExchangeSuccessModalReturn}
				modalStyle='w-[100vw] h-[100vh] flex justify-center items-center fixed bg-black/30 z-[100] left-[calc(0%)] top-[calc(0%)]'
				childStyle='w-[600px] bg-white md:rounded-xl md:min-h-fit min-h-full mx-0  overflow-hidden duration-200 animate-fade-in '>
				<div>
					<div className='mx-auto flex justify-center mb-4'>
						<ExchangeSuccessIcon />
					</div>
					<p className='mb-2 text-semantic-green text-base font-bold text-center'>
						{BOOKING.exchangeSucess}
					</p>
					<p className='text-neutral-grey-700 font-medium text-sm text-center'>
						{BOOKING.youExchangeSuccess}{" "}
						<span className='font-bold'>
							{voucherSelectedReturn?.pointExchange}{" "}
							{BOOKING.score}
						</span>{" "}
						{BOOKING.get}{" "}
						<span className='text-semantic-red text-base font-bold mt-0.5'>
							{BOOKING.voucher}{" "}
							{voucherSelectedReturn?.enumDiscountType === 1
								? `${voucherSelectedReturn.value.toFixed(0)}%`
								: `${voucherSelectedReturn?.value.toLocaleString()}đ`}
						</span>
					</p>
				</div>
			</Modal>

			<Modal
				toggleModal={toggleSeeAllVoucherModal}
				open={seeAllVoucherModal}
				wrapChildStyle='p-0'
				modalStyle='w-[100vw] h-[100vh] flex justify-center items-center fixed bg-black/30 z-[60] left-[calc(0%)] top-[calc(0%)]'
				childStyle='w-[600px] bg-white md:rounded-xl md:min-h-fit min-h-full mx-0  overflow-hidden duration-200 animate-fade-in '>
				{userProfile && (
					<AllVoucherModal
						userProfile={userProfile}
						listVoucher={vouchers}
						BOOKING={BOOKING}
						REQUESTPAYMENT={REQUESTPAYMENT}
						handleCloseModal={toggleSeeAllVoucherModal}
						voucherSelected={voucherSelected}
						handleSelectVoucher={handleSelectVoucher}
						currentPoint={currentPoint}
					/>
				)}
			</Modal>
			<Modal
				toggleModal={toggleSeeAllVoucherModalReturn}
				open={seeAllVoucherModalReturn}
				wrapChildStyle='p-0'
				modalStyle='w-[100vw] h-[100vh] flex justify-center items-center fixed bg-black/30 z-[60] left-[calc(0%)] top-[calc(0%)]'
				childStyle='w-[600px] bg-white md:rounded-xl md:min-h-fit min-h-full mx-0  overflow-hidden duration-200 animate-fade-in '>
				{userProfile && (
					<AllVoucherModal
						userProfile={userProfile}
						listVoucher={vouchersReturn}
						BOOKING={BOOKING}
						REQUESTPAYMENT={REQUESTPAYMENT}
						handleCloseModal={toggleSeeAllVoucherModalReturn}
						voucherSelected={voucherSelectedReturn}
						handleSelectVoucher={handleSelectVoucherReturn}
						currentPoint={currentPoint}
					/>
				)}
			</Modal>
		</div>
	);
};

export default TripInformationReturn;
