import Button from "@/components/button";
import ArrowLeftIcon from "@/components/icons/arrowLeft";
import Modal from "@/components/modal/Modal";
import DetailPayment from "@/components/requestPayment/detailPayment";
import useModal from "@/hook/useModal";
import { ITicketInfoData } from "@/interfaces/httpRequest/ITrip";
import { ITranslation } from "@/interfaces/ITranslation";
import moment from "moment";
import React, { useState } from "react";
import QRCode from "react-qr-code";

interface IHistoryPersonBookingDetail {
	translation: ITranslation;
	handleBack: () => void;
	ticketInfo?: any;
	ticketInfoReturn?: ITicketInfoData;
}

const HistoryPersonBookingDetail = (props: IHistoryPersonBookingDetail) => {
	const { translation, handleBack, ticketInfo, ticketInfoReturn } = props;
	const { REQUESTPAYMENT, BOOKING, ACCOUNT } = translation;

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
	const [qrModal, setQrModal] = useModal();
	const [ticketSelected, setTicketSelected] = useState<any>(null);
	const [codeSelected, setCodeSelected] = useState<any>(null);

	const handleClickTicket = (ticket: any, code: string) => {
		if (ticket.ticketId) {
			setTicketSelected(ticket);
			setCodeSelected(code);
			setQrModal();
		}
	};
	const handleCloseModal = () => {
		if (ticketSelected) {
			setTicketSelected(null);
			setCodeSelected(null);
			setQrModal();
		}
	};

	const convertPriceData = {
		titleContent: REQUESTPAYMENT.detailOrder.tiltePrice,
		paymentInfor: [
			{
				typeComponent: 1,
				name: REQUESTPAYMENT.detailOrder.chairPrice,
				content: totalCostReturn
					? (totalCost + totalCostReturn)?.toLocaleString() + "đ"
					: totalCost?.toLocaleString() + "đ",
				colorText: "#19191B",
			},
			{
				typeComponent: 1,
				name: REQUESTPAYMENT.detailOrder.incentives,
				content: `${(
					(totalVoucherValue || 0) + (totalVoucherValueReturn || 0)
				).toLocaleString()}đ`,
				colorText: "#19191B",
			},
			{
				typeComponent: 2,
				name: REQUESTPAYMENT.detailOrder.totalPrice,
				content: totalCostReturn
					? (
							totalCost -
							totalVoucherValue +
							(totalCostReturn - (totalVoucherValueReturn || 0))
					  )?.toLocaleString() + "đ"
					: (totalCost - totalVoucherValue)?.toLocaleString() + "đ",
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
				content:
					tickets?.map((el: any) => el.seatName)?.toString() || "-",
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
					ticketsReturn?.map((el: any) => el.seatName)?.toString() ||
					"-",
				colorText: "#19191B",
			},
		],
	};

	return (
		<div className=''>
			<div className='flex gap-4 items-center '>
				<div
					onClick={() => handleBack()}
					className='cursor-pointer hover:opacity-80 duration-100 h-[36px] w-fit flex gap-2 justify-center items-center px-3 py-[6px] border border-neutral-400 rounded-full'>
					<ArrowLeftIcon />{" "}
					<div className='text-sm font-semibold'>
						{translation.NEWS.back}{" "}
					</div>
				</div>
				<div className='text-xl font-semibold text-neutral-700 first-letter:capitalize'>
					{translation.HISTORY.detailTitle}
				</div>
			</div>
			<div
				className={`mt-6 py-6 px-6 bg-white rounded-lg gap-4 w-full   ${
					ticketInfoReturn ? "grid grid-cols-2" : ""
				}`}>
				<div>
					<div className='py-1 px-2 bg-[#DEF5E0] text-xs font-extrabold text-neutral-grey-600 rounded-full w-fit uppercase'>
						QR {BOOKING.departure}
					</div>
					<div className='grid grid-cols-6 my-5 gap-2'>
						{tickets?.length > 0 &&
							tickets.map((ticket: any, index: number) => {
								if (ticket.ticketId) {
									return (
										<div
											onClick={() => {
												handleClickTicket(ticket, code);
											}}
											className='group flex flex-col items-center justify-center transition-all gap-1 bg-primary-800 rounded-lg p-2 cursor-pointer hover:bg-primary-600'>
											<p className='text-sm font-bold group-hover:text-white transition-all'>
												{ticket?.seatName || ""}
											</p>
										</div>
									);
								}
							})}
					</div>
				</div>
				{ticketInfoReturn && codeReturn && (
					<div className='border-l pl-3 '>
						<div className='py-1 px-2 bg-[#DEF5E0] text-xs font-extrabold text-neutral-grey-600 rounded-full w-fit uppercase'>
							QR {BOOKING.return}
						</div>
						<div className='grid grid-cols-6 my-5 gap-2'>
							{tickets?.length > 0 &&
								tickets.map((ticket: any, index: number) => {
									if (ticket.ticketId) {
										return (
											<div
												onClick={() => {
													handleClickTicket(
														ticket,
														codeReturn,
													);
												}}
												className='group flex flex-col items-center justify-center transition-all gap-1 bg-primary-800 rounded-lg p-2 cursor-pointer hover:bg-primary-600'>
												<p className='text-sm font-bold group-hover:text-white transition-all'>
													{ticket?.seatName || ""}
												</p>
											</div>
										);
									}
								})}
						</div>
					</div>
				)}
				<p>{REQUESTPAYMENT.detailOrder.seeQR}</p>
			</div>

			<div className='mt-6 py-6 px-6 bg-white rounded-lg flex flex-col gap-4  mx-auto w-full'>
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
			<Modal
				open={qrModal && ticketSelected}
				toggleModal={handleCloseModal}
				wrapChildStyle='p-0'
				modalStyle='w-[100vw] h-[100vh] flex justify-center items-center fixed bg-black/30 z-[100] left-[calc(0%)] top-[calc(0%)]'
				childStyle='w-[400px] bg-white md:rounded-xl md:min-h-fit min-h-full mx-0  overflow-hidden duration-200 animate-fade-in '>
				<div className={``}>
					<div className='flex flex-col items-center justify-center'>
						<p className='text-lg font-semibold pt-6'>
							{ticketSelected?.seatName}
						</p>
						<div
							className='p-10 pt-4'
							style={{
								height: "auto",
								margin: "0 auto",
								maxWidth: 400,
								width: "100%",
							}}>
							<QRCode
								size={256}
								style={{
									height: "auto",
									maxWidth: "100%",
									width: "100%",
								}}
								value={`${code}-${ticketSelected?.ticketId}`}
								viewBox={`0 0 256 256`}
							/>
						</div>
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
							onClick={() => handleCloseModal()}>
							{ACCOUNT.back}
						</Button>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default HistoryPersonBookingDetail;
