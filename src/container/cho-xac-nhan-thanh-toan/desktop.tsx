import Button from "@/components/button";
import Footer from "@/components/footer";
import Header from "@/components/header";
import DetailPayment from "@/components/requestPayment/detailPayment";
import WaitPayment from "@/components/requestPayment/waitPayment";
import { IRequestPaymentTranslate } from "@/interfaces/IRequestPaymentTranslate";
import { ITicketInfoData } from "@/interfaces/httpRequest/ITrip";
import moment from "moment";
import React, { FC, Fragment, useState } from "react";
import "moment/locale/vi";
import Modal from "@/components/modal/Modal";
import useModal from "@/hook/useModal";
import CancelTicketModal from "@/components/Pages/dat-ve/cancelTicketModal";
import { IUserProfile } from "@/interfaces/httpRequest/IUser";

interface IRequestPaymentDesktop {
	REQUESTPAYMENT: IRequestPaymentTranslate;
	ticketInfo: ITicketInfoData;
	ticketInfoReturn?: ITicketInfoData;
	userProfile?: IUserProfile;
}

const ContainerRequestPaymentDesktop: FC<IRequestPaymentDesktop> = (props) => {
	const { REQUESTPAYMENT, ticketInfo, userProfile, ticketInfoReturn } = props;
	const {
		totalCost,
		totalPaid,
		totalVoucherValue,
		code,
		trip,
		userEmail,
		userName,
		userPhone,
		route,
		startPlace,
		endPlace,
		tickets,
	} = ticketInfo || {};
	const {
		totalCost: totalCostReturn,
		totalPaid: totalPaidReturn,
		totalVoucherValue: totalVoucherValueReturn,
		code: codeReturn,
		trip: tripReturn,
		userEmail: userEmailReturn,
		userName: userNameReturn,
		userPhone: userPhoneReturn,
		route: routeReturn,
		startPlace: startPlaceReturn,
		endPlace: endPlaceReturn,
		tickets: ticketsReturn,
	} = ticketInfoReturn || {};
	const { startAt, vehicle } = trip || {};
	const { startAt: startAtReturn, vehicle: vehicleReturn } = tripReturn || {};
	const { vehicleType } = vehicle || {};
	const { vehicleType: vehicleTypeReturn } = vehicleReturn || {};

	const [cancelModal, toggleCancelModal] = useModal();

	const convertPriceData = {
		titleContent: REQUESTPAYMENT.detailOrder.tiltePrice,
		paymentInfor: [
			{
				typeComponent: 1,
				name: REQUESTPAYMENT.detailOrder.chairPrice,
				content: totalCostReturn
					? Math.round(
							totalCost + totalCostReturn,
					  )?.toLocaleString() + "đ"
					: Math.round(totalCost)?.toLocaleString() + "đ",
				colorText: "#19191B",
			},
			{
				typeComponent: 1,
				name: REQUESTPAYMENT.detailOrder.incentives,
				content: `${Math.round(
					(totalVoucherValue || 0) + (totalVoucherValueReturn || 0),
				).toLocaleString()}đ`,
				colorText: "#19191B",
			},
			{
				typeComponent: 2,
				name: REQUESTPAYMENT.detailOrder.totalPrice,
				content: totalCostReturn
					? Math.round(
							totalCost -
								totalVoucherValue +
								(totalCostReturn -
									(totalVoucherValueReturn || 0)),
					  )?.toLocaleString() + "đ"
					: Math.round(
							totalCost - totalVoucherValue,
					  )?.toLocaleString() + "đ",
				colorText: "#DF5030",
			},
		],
	};

	const convertPersonData = {
		titleContent: REQUESTPAYMENT.detailOrder.titlePerson,
		paymentInfor: [
			{
				typeComponent: 1,
				name: REQUESTPAYMENT.detailOrder.fullName,
				content: userName || "-",
				colorText: "#19191B",
			},
			{
				typeComponent: 1,
				name: REQUESTPAYMENT.detailOrder.numberPhone,
				content: userPhone || "-",
				colorText: "#19191B",
			},
			{
				typeComponent: 1,
				name: REQUESTPAYMENT.detailOrder.email,
				content: userEmail || "-",
				colorText: "#19191B",
			},
		],
	};
	const convertTripData = {
		titleContent: REQUESTPAYMENT.detailOrder.titleTrip,
		paymentInfor: [
			{
				typeComponent: 1,
				name: REQUESTPAYMENT.detailOrder.ticket,
				content: code || "-",
				colorText: "#19191B",
			},
			{
				typeComponent: 1,
				name: REQUESTPAYMENT.detailOrder.routes,
				content: route?.name || "-",
				colorText: "#19191B",
			},
			{
				typeComponent: 1,
				name: REQUESTPAYMENT.detailOrder.timeStart,
				content:
					moment(startAt).locale("vi").format("dddd, DD/MM/YYYY") ||
					"-",
				colorText: "#19191B",
			},
			{
				typeComponent: 1,
				name: REQUESTPAYMENT.detailOrder.type,
				content: vehicleType?.name || "-",
				colorText: "#19191B",
			},
			{
				typeComponent: 1,
				name: REQUESTPAYMENT.detailOrder.pickupPoint,
				content: startPlace?.name || "-",
				colorText: "#19191B",
			},
			{
				typeComponent: 1,
				name: REQUESTPAYMENT.detailOrder.paypoints,
				content: endPlace?.name || "-",
				colorText: "#19191B",
			},
			{
				typeComponent: 1,
				name: REQUESTPAYMENT.detailOrder.numberChair,
				content:
					(tickets?.length || 0) +
						` ${REQUESTPAYMENT.detailOrder.seat}` || "-",
				colorText: "#19191B",
			},
			{
				typeComponent: 1,
				name: REQUESTPAYMENT.detailOrder.locationChair,
				content: tickets?.map((el) => el.seatName)?.toString() || "-",
				colorText: "#19191B",
			},
		],
	};

	const convertTripDataReturn = {
		titleContent: REQUESTPAYMENT.detailOrder.titleTripReturn,
		paymentInfor: [
			{
				typeComponent: 1,
				name: REQUESTPAYMENT.detailOrder.ticket,
				content: codeReturn || "-",
				colorText: "#19191B",
			},
			{
				typeComponent: 1,
				name: REQUESTPAYMENT.detailOrder.routes,
				content: routeReturn?.name || "-",
				colorText: "#19191B",
			},
			{
				typeComponent: 1,
				name: REQUESTPAYMENT.detailOrder.timeStart,
				content:
					moment(startAtReturn)
						.locale("vi")
						.format("dddd, DD/MM/YYYY") || "-",
				colorText: "#19191B",
			},
			{
				typeComponent: 1,
				name: REQUESTPAYMENT.detailOrder.type,
				content: vehicleTypeReturn?.name || "-",
				colorText: "#19191B",
			},
			{
				typeComponent: 1,
				name: REQUESTPAYMENT.detailOrder.pickupPoint,
				content: startPlaceReturn?.name || "-",
				colorText: "#19191B",
			},
			{
				typeComponent: 1,
				name: REQUESTPAYMENT.detailOrder.paypoints,
				content: endPlaceReturn?.name || "-",
				colorText: "#19191B",
			},
			{
				typeComponent: 1,
				name: REQUESTPAYMENT.detailOrder.numberChair,
				content:
					(ticketsReturn?.length || 0) +
						` ${REQUESTPAYMENT.detailOrder.seat}` || "-",
				colorText: "#19191B",
			},
			{
				typeComponent: 1,
				name: REQUESTPAYMENT.detailOrder.locationChair,
				content:
					ticketsReturn?.map((el) => el.seatName)?.toString() || "-",
				colorText: "#19191B",
			},
		],
	};

	return (
		<Fragment>
			<div>
				<Header userProfile={userProfile} />
			</div>
			<div className='pt-10 pb-[60px] bg-[#ECECEC]'>
				<div className='mx-auto w-fit'>
					<div>
						<WaitPayment
							REQUESTPAYMENT={REQUESTPAYMENT}
							type={totalCost === totalPaid ? 2 : 1}
						/>
					</div>
					<div className='py-6 px-6 bg-white rounded-lg flex flex-col gap-4 xl:w-[640px] w-full mt-2'>
						<DetailPayment
							convertPriceData={convertPriceData}
							REQUESTPAYMENT={REQUESTPAYMENT}
						/>
						<DetailPayment
							convertPriceData={convertPersonData}
							REQUESTPAYMENT={REQUESTPAYMENT}
						/>
						<DetailPayment
							convertPriceData={convertTripData}
							REQUESTPAYMENT={REQUESTPAYMENT}
						/>
						{ticketInfoReturn && (
							<DetailPayment
								convertPriceData={convertTripDataReturn}
								REQUESTPAYMENT={REQUESTPAYMENT}
							/>
						)}
					</div>
					<div className={`mt-5 flex gap-2  items-center `}>
						{totalCost !== totalPaid && (
							<div className=''>
								<button
									onClick={() => toggleCancelModal()}
									className='w-full px-14 font-semibold text-center my-auto bg-inherit rounded-full h-10 border border-black'>
									{REQUESTPAYMENT.button.cancelButton}
								</button>
							</div>
						)}
						<div className='flex-grow justify-center flex'>
							<button
								onClick={() => {
									window.location.assign("/");
								}}
								className='w-full max-w-[432px] text-white font-semibold text-center my-auto bg-primary-500 rounded-full h-10'>
								{REQUESTPAYMENT.button.homeButton}
							</button>
						</div>
					</div>
					{/* <div className='mt-5 grid grid-cols-4  gap-2'>
						<div className='col-span-2 col-start-2'>
							<button className='w-full text-white font-semibold text-center my-auto bg-primary-500 rounded-full h-10'>
								{REQUESTPAYMENT.button.homeButton}
							</button>
						</div>
					</div> */}
				</div>
			</div>
			<div>
				<Footer />
			</div>

			<Modal
				toggleModal={toggleCancelModal}
				open={cancelModal}
				wrapChildStyle='p-0'
				modalStyle='w-[100vw] h-[100vh] flex justify-center items-center fixed bg-black/30 z-[60] left-[calc(0%)] top-[calc(0%)]'
				childStyle='w-[600px] bg-white md:rounded-xl md:min-h-fit min-h-full mx-0  overflow-hidden duration-200 animate-fade-in '>
				<CancelTicketModal
					REQUESTPAYMENT={REQUESTPAYMENT}
					handleCloseModal={toggleCancelModal}
				/>
			</Modal>
		</Fragment>
	);
};

export default ContainerRequestPaymentDesktop;
