import Button from "@/components/button";
import ChairList from "@/components/chairList";
import ArrowBackIcon from "@/components/icons/arrowBack";
import ArrowLeftIcon from "@/components/icons/arrowLeft";
import WarningChildren from "@/components/warningChildren";
import ContainerChooseChairDesktop from "@/container/chon-ghe/desktop";
import { IBookingTranslate } from "@/interfaces/IBookingTranslate";
import { IErrorTranslate } from "@/interfaces/IErrorTranslate";
import { IPlaceholderTranslate } from "@/interfaces/IPlaceholderTranslate";
import { ISignInTranslate } from "@/interfaces/ISignInTranslate";
import Image from "next/legacy/image";
import React, { Fragment, useEffect, useState } from "react";
import TripInformation from "./tripInformation";
import { IRequestPaymentTranslate } from "@/interfaces/IRequestPaymentTranslate";
import TripInformationForm from "./tripInformationForm";
import { IPaymentTranslate } from "@/interfaces/IPaymentTranslate";
import {
	IReservationStartData,
	IReservationStartResponse,
	IReservationUpdateInfoResponse,
	IReservationValidateSeatsData,
	ISeat,
	ITripData,
	ITripPlacesResponse,
	ITripReservedSeatResponse,
	ReservationValidateSeatsResponse,
} from "@/interfaces/httpRequest/ITrip";
import {
	cancelBatch,
	fetchTripEndPlaces,
	fetchTripReservedSeats,
	fetchTripStartPlaces,
	reservationConfirmPayment,
	reservationStart,
	reservationUpdateInfo,
	reservationValidateSeats,
} from "@/apis/trip";
import { useCustomToast } from "@/hook/useToast";
import LoadingView from "@/components/LoadingView";
import moment from "moment";
import Modal from "@/components/modal/Modal";
import useModal from "@/hook/useModal";
import PaymentModal from "./paymentModal";
import { IUserProfile } from "@/interfaces/httpRequest/IUser";
import { delay, getTimeCountDown } from "@/helpers/functionHelper";
import ContainerChooseChairReturnDesktop from "@/container/chon-ghe-khu-hoi/desktop";
import ChairListReturn from "@/components/chairListReturn";

import TripInformationReturn from "./tripInformationReturn";
import TripInformationFormReturn from "./tripInformationFormReturn";
import useVoucher from "@/hook/account/useVoucher";
import useTrans from "@/hook/useTrans";
import { IMyPointTranslate } from "@/interfaces/IMyPointTranslate";
import LoadingChildComponent from "@/components/LoadingChildComponent";
import { VoucherData } from "@/interfaces/httpRequest/IVoucher";

interface IPickSeatReturnDesktopProps {
	BOOKING: IBookingTranslate;
	ERROR: IErrorTranslate;
	PLACEHOLDER: IPlaceholderTranslate;
	SIGNIN: ISignInTranslate;
	REQUESTPAYMENT: IRequestPaymentTranslate;
	handleChangePrevStep: Function;
	selectedTripDeparture: ITripData;
	selectedTripReturn: ITripData;
	PAYMENT: IPaymentTranslate;
	userProfile?: IUserProfile;
}

const PickSeatReturnDesktop = (props: IPickSeatReturnDesktopProps) => {
	const {
		BOOKING,
		ERROR,
		PLACEHOLDER,
		SIGNIN,
		REQUESTPAYMENT,
		selectedTripDeparture,
		selectedTripReturn,
		PAYMENT,
		handleChangePrevStep = () => {},
		userProfile,
	} = props;
	const {
		POINT,
	}: {
		POINT: IMyPointTranslate;
	} = useTrans();
	const LIST_STEP = [
		{
			id: 1,
			value: `1. ${BOOKING.chooseSeat}`,
		},
		{
			id: 2,
			value: `2. ${BOOKING.tripInfo}`,
		},
	];
	const [step, setStep] = useState(1);
	const [selectedSeat, setSelectedSeat] = useState<ISeat[]>([]);
	const [selectedSeatReturn, setSelectedSeatReturn] = useState<ISeat[]>([]);
	const [formIsValid, setFormIsValid] = useState(false);
	const { toastError } = useCustomToast();
	const [isLoading, setLoading] = useState(false);
	const [formData, setFormData] = useState<any>();
	const [formDataReturn, setFormDataReturn] = useState<any>();

	const [paymentModal, togglePaymentModal] = useModal();
	const [listSeatNotAvailable, setListSeatNotAvailable] = useState<string[]>(
		[],
	);
	const [listSeatNotAvailableReturn, setListSeatNotAvailableReturn] =
		useState<string[]>([]);
	const [childAdditionalCharge, setChildAdditionalCharge] = useState<any[]>(
		[],
	);
	const [childAdditionalChargeReturn, setChildAdditionalChargeReturn] =
		useState<any[]>([]);
	const [listStartPlaces, setListStartPlaces] = useState<
		ITripPlacesResponse[]
	>([]);
	const [listStartPlacesReturn, setListStartPlacesReturn] = useState<
		ITripPlacesResponse[]
	>([]);
	const [listEndPlaces, setListEndPlaces] = useState<ITripPlacesResponse[]>(
		[],
	);
	const [listEndPlacesReturn, setListEndPlacesReturn] = useState<
		ITripPlacesResponse[]
	>([]);
	const [placeInfomation, setPlaceInfomation] = useState({
		startPlace: "",
		endPlace: "",
	});
	const [placeInfomationReturn, setPlaceInfomationReturn] = useState({
		startPlace: "",
		endPlace: "",
	});
	const [countdownTime, setCountDownTime] = useState<number>(-1);

	const [ticketData, setTicketData] =
		useState<IReservationValidateSeatsData>();
	const [ticketDataReturn, setTicketDataReturn] =
		useState<IReservationValidateSeatsData>();
	const [reservationDetail, setReservationDetail] =
		useState<IReservationStartData>();
	const [reservationDetailReturn, setReservationDetailReturn] =
		useState<IReservationStartData>();
	const [isAcceptPayment, setIsAcceptPayment] = useState(false);

	const { trips, tripRoutes, routeId } = selectedTripDeparture || {};
	const {
		trips: tripsReturn,
		tripRoutes: tripRoutesReturn,
		routeId: routeIdReturn,
	} = selectedTripReturn || {};
	const { tripId } =
		(trips ? trips[0] : tripRoutes && tripRoutes[0].trip) || {};
	const { tripId: tripIdReturn } =
		(tripsReturn
			? tripsReturn[0]
			: tripRoutesReturn && tripRoutesReturn[0].trip) || {};
	const { ticketBatchId, route, trip } = reservationDetail || {};
	const {
		ticketBatchId: ticketBatchIdReturn,
		route: routeReturn,
		trip: tripReturn,
	} = reservationDetailReturn || {};

	const { seatSetup } =
		reservationDetail?.trip?.vehicle?.vehicleType ||
		reservationDetail?.trip?.vehicleType ||
		{};
	const { seatSetup: seatSetupReturn } =
		reservationDetailReturn?.trip?.vehicle?.vehicleType ||
		reservationDetailReturn?.trip?.vehicleType ||
		{};
	const { vouchers, handleGetAllVouchers, loading } = useVoucher();
	const {
		vouchers: vouchersReturn,
		handleGetAllVouchers: handleGetAllVouchersReturn,
	} = useVoucher();

	const [voucherSelected, setVoucherSelected] = useState<VoucherData | null>(
		null,
	);
	const [voucherSelectedReturn, setVoucherSelectedReturn] =
		useState<VoucherData | null>(null);

	const handleRemovePickedSeat = async (reload = false) => {
		const { ticketBatchId } = reservationDetail || {};
		const { ticketBatchId: ticketBatchIdReverse } =
			reservationDetailReturn || {};

		if (ticketBatchId) {
			await cancelBatch({
				ticketBatchId: ticketBatchId,
			}).then(async () => {
				if (ticketBatchIdReverse) {
					await cancelBatch({
						ticketBatchId: ticketBatchIdReverse,
					}).then(() => {
						if (!reload) {
							setSelectedSeat([]);
							setSelectedSeatReturn([]);
							setVoucherSelected(null);
							setVoucherSelectedReturn(null);
							setChildAdditionalCharge([]);
							setChildAdditionalChargeReturn([]);
							setPlaceInfomationReturn({
								startPlace: "",
								endPlace: "",
							});
							setStep(step - 1);
						}
					});
				}
			});
		}
	};

	const addFieldsToSeat = (seats: ISeat[]): ISeat[] => {
		return seats.map((seat) => ({
			...seat,
			name: "",
			phone: "",
			birthday: "",
			email: "",
			childrenSeat: {
				status: false,
				name: "",
				birthday: "",
				childType: 0,
			},
		}));
	};

	const handleUpdateTimeCd = () => {
		const timeCd = getTimeCountDown();
		if (timeCd) {
			setCountDownTime(timeCd);
		}
	};

	const handleChangeNextChildStep = async () => {
		if (
			ticketBatchId &&
			ticketBatchIdReturn &&
			selectedSeat?.length > 0 &&
			selectedSeatReturn?.length > 0
		) {
			setLoading(true);
			const res: ReservationValidateSeatsResponse =
				await reservationValidateSeats({
					seats: selectedSeat.map((el) => el.seatName).toString(),
					ticketBatchId: ticketBatchId,
				});
			const resReturn: ReservationValidateSeatsResponse =
				await reservationValidateSeats({
					seats: selectedSeatReturn
						.map((el) => el.seatName)
						.toString(),
					ticketBatchId: ticketBatchIdReturn,
				});
			if (res?.isSuccess && resReturn?.isSuccess) {
				const seatListToForm = addFieldsToSeat(selectedSeat);
				const seatListToFormReturn =
					addFieldsToSeat(selectedSeatReturn);
				setSelectedSeat(seatListToForm);
				setSelectedSeatReturn(seatListToFormReturn);
				setTicketData(res?.data);
				setTicketDataReturn(resReturn?.data);
				setStep(step + 1);
				setCountDownTime(600);
				setLoading(false);
			} else {
				setLoading(false);
				toastError({
					message: res?.errorMessage,
					toastId: "validate-seats-failed",
				});
			}
		}
	};

	const handleChangePrevChildStep = () => {
		setStep(step - 1);
	};

	const handleSelectSeat = (seat: ISeat) => {
		const { seatNumber }: ISeat = seat || {};
		if (selectedSeat.includes(seat)) {
			const cloneSeat = [...selectedSeat];
			const indexSeat = cloneSeat?.findIndex(
				(el) => el.seatNumber === seatNumber,
			);
			cloneSeat.splice(indexSeat, 1);
			setSelectedSeat(cloneSeat);
		} else {
			// if (selectedSeat?.length === 7) {
			// 	alert("quá số lượng cho phép");
			// 	return;
			// }
			setSelectedSeat([...selectedSeat, seat]);
		}
	};
	const handleSelectSeatReturn = (seat: ISeat) => {
		const { seatNumber }: ISeat = seat || {};
		if (selectedSeatReturn.includes(seat)) {
			const cloneSeat = [...selectedSeatReturn];
			const indexSeat = cloneSeat?.findIndex(
				(el) => el.seatNumber === seatNumber,
			);
			cloneSeat.splice(indexSeat, 1);
			setSelectedSeatReturn(cloneSeat);
		} else {
			// if (selectedSeat?.length === 7) {
			// 	alert("quá số lượng cho phép");
			// 	return;
			// }
			setSelectedSeatReturn([...selectedSeatReturn, seat]);
		}
	};
	const fetchReservationStart = async () => {
		if (tripId && routeId) {
			setLoading(true);
			const res: IReservationStartResponse = await reservationStart({
				tripId: tripId,
				routeId: routeId,
			});
			if (res?.isSuccess) {
				setReservationDetail(res.data);
				setLoading(false);
			} else {
				setLoading(false);

				toastError({
					message: res?.errorMessage,
					toastId: "start-failed",
				});
			}
		}
	};
	const fetchReservationStartReturn = async () => {
		if (tripIdReturn && routeIdReturn) {
			setLoading(true);
			const res: IReservationStartResponse = await reservationStart({
				tripId: tripIdReturn,
				routeId: routeIdReturn,
			});
			if (res?.isSuccess) {
				setReservationDetailReturn(res.data);
				setLoading(false);
			} else {
				setLoading(false);

				toastError({
					message: res?.errorMessage,
					toastId: "start-failed",
				});
			}
		}
	};
	const getTripReservedSeats = async () => {
		if (tripId && routeId) {
			setLoading(true);
			const res: ITripReservedSeatResponse = await fetchTripReservedSeats(
				{
					tripId: tripId,
					routeId: routeId,
				},
			);
			if (res?.isSuccess) {
				setListSeatNotAvailable(res.data);
				setLoading(false);
			} else {
				setListSeatNotAvailable([]);
				setLoading(false);
			}
		}
	};
	const getTripReservedSeatsReturn = async () => {
		if (tripIdReturn && routeIdReturn) {
			setLoading(true);
			const res: ITripReservedSeatResponse = await fetchTripReservedSeats(
				{
					tripId: tripIdReturn,
					routeId: routeIdReturn,
				},
			);
			if (res?.isSuccess) {
				setListSeatNotAvailableReturn(res.data);
				setLoading(false);
			} else {
				setListSeatNotAvailableReturn([]);
				setLoading(false);
			}
		}
	};
	const getTripStartPlaces = async () => {
		if (tripId && routeId) {
			setLoading(true);
			const res: ITripPlacesResponse[] = await fetchTripStartPlaces({
				tripId: tripId,
				routeId: routeId,
			});
			if (res?.length > 0) {
				const sortList = res?.sort(
					(a, b) =>
						new Date(a?.startAt)?.getTime() -
						new Date(b?.startAt)?.getTime(),
				);
				setListStartPlaces(sortList);
				setLoading(false);
			} else {
				setListStartPlaces([]);
				setLoading(false);
			}
		}
	};
	const getTripStartPlacesReturn = async () => {
		if (tripIdReturn && routeIdReturn) {
			setLoading(true);
			const res: ITripPlacesResponse[] = await fetchTripStartPlaces({
				tripId: tripIdReturn,
				routeId: routeIdReturn,
			});
			if (res?.length > 0) {
				const sortList = res?.sort(
					(a, b) =>
						new Date(a?.startAt)?.getTime() -
						new Date(b?.startAt)?.getTime(),
				);
				setListStartPlacesReturn(sortList);
				setLoading(false);
			} else {
				setListStartPlacesReturn([]);
				setLoading(false);
			}
		}
	};
	const getTripEndPlaces = async () => {
		if (tripId && routeId) {
			setLoading(true);
			const res: ITripPlacesResponse[] = await fetchTripEndPlaces({
				tripId: tripId,
				routeId: routeId,
			});
			if (res?.length > 0) {
				setListEndPlaces(res);
				setLoading(false);
			} else {
				setListEndPlaces([]);
				setLoading(false);
			}
		}
	};
	const getTripEndPlacesReturn = async () => {
		if (tripIdReturn && routeIdReturn) {
			setLoading(true);
			const res: ITripPlacesResponse[] = await fetchTripEndPlaces({
				tripId: tripIdReturn,
				routeId: routeIdReturn,
			});
			if (res?.length > 0) {
				setListEndPlacesReturn(res);
				setLoading(false);
			} else {
				setListEndPlacesReturn([]);
				setLoading(false);
			}
		}
	};
	const mergeData = (formData: any[], payload: any[]): any[] => {
		return payload.map((ticket) => {
			const matchingForm = formData.find(
				(form) => form.seatNumber === ticket.seatNumber,
			);
			if (matchingForm) {
				return {
					...ticket,
					name: matchingForm.name,
					birthday: moment(matchingForm.birthday_datetime).format(
						"DD/MM/YYYY",
					),
					phone: matchingForm.phone,
					email: matchingForm.email,
					childName: matchingForm.childrenSeat.status
						? matchingForm.childrenSeat.name
						: "",
					childBirthday: matchingForm.childrenSeat.status
						? moment(
								matchingForm.childrenSeat.birthday_datetime,
						  ).format("DD/MM/YYYY")
						: "",
					hasChild: matchingForm.childrenSeat.status || false,
					type: matchingForm.childrenSeat.status
						? matchingForm.childrenSeat.childType === 0
							? 1
							: 2
						: 0,
				};
			}
			return ticket;
		});
	};

	const handleSubmitSeatForm = async (data?: any) => {
		setLoading(true);
		const {
			bookingPhone,
			bookingName,
			bookingEmail,
			bookingBirthday_datetime,
			paypoints_id,
			pickUpPoint_id,
			paypointsReturn_id,
			pickUpPointReturn_id,
		} = data || {};
		setFormData(data);
		if (ticketData && ticketDataReturn) {
			const mergeForm = mergeData(
				data.informationSeats,
				ticketData?.tickets,
			);
			const mergeFormReturn = mergeData(
				data.informationSeatsReturn,
				ticketDataReturn?.tickets,
			);
			const payload = {
				...ticketData,
				tickets: mergeForm,
				userName: bookingName,
				userEmail: bookingEmail,
				userPhone: bookingPhone,
				userBirthday: moment(bookingBirthday_datetime).format(
					"DD/MM/YYYY",
				),
				endPlaceId: paypoints_id,
				startPlaceId: pickUpPoint_id,
				voucherId: voucherSelected ? voucherSelected?.voucherId : null,
			};
			const payloadReturn = {
				...ticketDataReturn,
				tickets: mergeFormReturn,
				userName: bookingName,
				userEmail: bookingEmail,
				userPhone: bookingPhone,
				userBirthday: moment(bookingBirthday_datetime).format(
					"DD/MM/YYYY",
				),
				endPlaceId: paypointsReturn_id,
				startPlaceId: pickUpPointReturn_id,
				voucherId: voucherSelectedReturn
					? voucherSelectedReturn?.voucherId
					: null,
			};
			const res: IReservationUpdateInfoResponse =
				await reservationUpdateInfo(payload);

			const resReturn: IReservationUpdateInfoResponse =
				await reservationUpdateInfo(payloadReturn);

			if (res?.isSuccess && resReturn?.isSuccess) {
				setLoading(false);
				togglePaymentModal();
				handleUpdateTimeCd();
			} else {
				toastError({
					message: res?.errorMessage,
					toastId: "pick-seat-errors",
				});
				setLoading(false);
			}
		}
	};

	const handleConfirmPayment = async () => {
		setIsAcceptPayment(true);
		await delay(500);
		if (formData) {
			setLoading(true);
			const {
				bookingPhone,
				bookingName,
				bookingEmail,
				bookingBirthday,
				bookingBirthday_datetime,
				paypoints_id,
				pickUpPoint_id,
				paypointsReturn_id,
				pickUpPointReturn_id,
			} = formData || {};
			if (ticketData && ticketDataReturn) {
				const mergeForm = mergeData(
					formData.informationSeats,
					ticketData?.tickets,
				);
				const mergeFormReturn = mergeData(
					formData.informationSeatsReturn,
					ticketDataReturn?.tickets,
				);
				const { code } = ticketData || {};
				const { code: codeReturn } = ticketDataReturn || {};
				const payload = {
					...ticketData,
					tickets: mergeForm,
					userName: bookingName,
					userEmail: bookingEmail,
					userPhone: bookingPhone,
					userBirthday: moment(bookingBirthday_datetime).format(
						"DD/MM/YYYY",
					),
					endPlaceId: paypoints_id,
					startPlaceId: pickUpPoint_id,
					voucherId: voucherSelected
						? voucherSelected?.voucherId
						: null,
				};
				const payloadReturn = {
					...ticketDataReturn,
					tickets: mergeFormReturn,
					userName: bookingName,
					userEmail: bookingEmail,
					userPhone: bookingPhone,
					userBirthday: moment(bookingBirthday_datetime).format(
						"DD/MM/YYYY",
					),
					endPlaceId: paypointsReturn_id,
					startPlaceId: pickUpPointReturn_id,
					voucherId: voucherSelectedReturn
						? voucherSelectedReturn?.voucherId
						: null,
				};
				const res = await reservationConfirmPayment(payload);
				const resReturn = await reservationConfirmPayment(
					payloadReturn,
				);

				if (res?.isSuccess && resReturn?.isSuccess) {
					window.location.assign(
						`/cho-xac-nhan-thanh-toan?phone=${bookingPhone}&code=${code}&codeReturn=${codeReturn}`,
					);
					// setLoading(false);
				} else {
					toastError({
						message: res?.errorMessage,
						toastId: "confirm-payment-errors",
					});
					setLoading(false);
				}
			}
		}
	};
	// const calculateTotalPrice = (
	// 	seatSelected: any[],
	// 	seatSelectedReturn: any[],
	// ): number => {
	// 	if (reservationDetail && reservationDetailReturn) {
	// 		const price =
	// 			seatSelected?.length * reservationDetail.price +
	// 			(childAdditionalCharge.length || 0) *
	// 				((reservationDetail.price * 1) / 2) +
	// 			(seatSelectedReturn.length * reservationDetailReturn.price +
	// 				(childAdditionalChargeReturn.length || 0) *
	// 					((reservationDetailReturn.price * 1) / 2));
	// 		if (voucherSelected || voucherSelectedReturn) {
	// 			return (
	// 				price -
	// 				((voucherSelected?.value || 0) +
	// 					(voucherSelectedReturn?.value || 0))
	// 			);
	// 		} else {
	// 			return price;
	// 		}
	// 	} else {
	// 		return 0;
	// 	}
	// };

	const calculateTotalPrice = (
		seatSelected: any[],
		childCount: number,
		reservationDetail: IReservationStartData,
		voucherSelected: VoucherData | null,
	): number => {
		if (reservationDetail) {
			const price =
				seatSelected?.length * reservationDetail.price +
				(childCount || 0) * ((reservationDetail.price * 1) / 2);
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

	useEffect(() => {
		const executeSteps = async () => {
			if (step === 1) {
				await fetchReservationStart();
				await getTripReservedSeats();
				await getTripStartPlaces();
				await getTripEndPlaces();

				await fetchReservationStartReturn();
				await getTripReservedSeatsReturn();
				await getTripStartPlacesReturn();
				await getTripEndPlacesReturn();
			}
		};

		executeSteps();
	}, [tripId, routeId, tripIdReturn, routeIdReturn, step]);
	useEffect(() => {
		handleGetAllVouchers({
			tripId: tripId,
			validateUserPoint: userProfile ? true : false,
		});
		handleGetAllVouchersReturn({
			tripId: tripIdReturn,
			validateUserPoint: userProfile ? true : false,
		});
	}, []);
	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	}, [step]);

	window.onbeforeunload = function () {
		if (!isAcceptPayment) {
			handleRemovePickedSeat(true);
		}
	};

	// if (!reservationDetail || !reservationDetailReturn) {
	// 	return <div></div>;
	// }
	return (
		<div className='flex-1'>
			{/* {isLoading && <LoadingView />} */}
			<div className=''>
				<div className='flex items-center gap-4'>
					<div
						onClick={() => {
							if (step === 1) {
								handleChangePrevStep();
							} else {
								// setSelectedSeat([]);
								// setSelectedSeatReturn([]);
								// setVoucherSelected(null);
								// setVoucherSelectedReturn(null);
								// setChildAdditionalCharge([]);
								// setChildAdditionalChargeReturn([]);
								// setPlaceInfomationReturn({
								//   startPlace: "",
								//   endPlace: "",
								// });
								// handleChangePrevChildStep();
								handleRemovePickedSeat();
							}
						}}
						className='flex items-center gap-2 py-2 px-3 hover:bg-neutral-grey-200 rounded-full border border-neutral-grey-400 cursor-pointer transition-all'>
						<div className='w-6 h-6 flex items-center justify-center'>
							<ArrowLeftIcon />
						</div>
						<p className='text-sm font-semibold text-black'>
							{BOOKING.back}
						</p>
					</div>
					<div className='flex flex-col'>
						<p className='font-bold text-lg text-neutral-grey-700'>
							{BOOKING.scheduleReturn}: {route?.name}
						</p>
						<div className='flex items-center gap-2'>
							<p className='text-sm font-semibold text-neutral-grey-600 first-letter:uppercase'>
								{moment(trip?.startAt)
									.locale("vi")
									.format("dddd, DD/MM/YYYY")}
							</p>
							<div className='rotate-180 w-fit'>
								<ArrowLeftIcon
									width='12'
									height='12'
									stroke='#373738'
								/>
							</div>
							<p className='text-sm font-semibold text-neutral-grey-600 first-letter:uppercase'>
								{moment(tripReturn?.endAt)
									.locale("vi")
									.format("dddd, DD/MM/YYYY")}
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Tab */}
			<div className='mt-4 w-full bg-white  relative rounded-lg'>
				<div className='border-b-[1.5px] border-neutral-grey-200 w-full absolute bottom-0 z-0'></div>
				<div className='flex w-fit items-center '>
					{LIST_STEP.map((item, index) => {
						const isActive = step === item.id;
						return (
							<div
								key={index}
								className={`p-3 border-b-[1.5px] relative z-10 cursor-default  transition-all ${
									item.id === 1 && "rounded-l-lg"
								} ${
									isActive
										? "bg-secondary-600 border-secondary-300 "
										: "bg-transparent border-transparent"
								}`}>
								<p
									className={`text-sm  ${
										isActive
											? "text-secondary-300 font-semibold"
											: "text-black font-normal"
									}`}>
									{item.value}
								</p>
							</div>
						);
					})}
				</div>
			</div>

			<div className='mt-4 pb-[60px] flex gap-4'>
				{step === 1 && (
					<div className='flex-grow bg-white p-6 px-4 rounded-xl h-fit sticky top-4'>
						<div>
							{!isLoading &&
							reservationDetail &&
							reservationDetailReturn ? (
								<Fragment>
									<div className=' flex gap-4'>
										{seatSetup && seatSetupReturn && (
											<Fragment>
												<div className='flex-grow flex-col flex'>
													<div className='mb-2 flex items-center justify-center'>
														<p className='text-neutral-grey-600 font-extrabold text-xs uppercase'>
															{BOOKING.departure}
														</p>
													</div>
													<ContainerChooseChairReturnDesktop
														seatData={seatSetup}
														listSeatNotAvailable={
															listSeatNotAvailable
														}
														seatSelected={
															selectedSeat
														}
														handleSelectSeat={
															handleSelectSeat
														}
														BOOKING={BOOKING}
													/>
												</div>
												<div className='flex-grow flex-col flex'>
													<div className='mb-2 flex items-center justify-center'>
														<p className='text-neutral-grey-600 font-extrabold text-xs uppercase'>
															{BOOKING.return}
														</p>
													</div>
													<ContainerChooseChairReturnDesktop
														seatData={
															seatSetupReturn
														}
														listSeatNotAvailable={
															listSeatNotAvailableReturn
														}
														seatSelected={
															selectedSeatReturn
														}
														handleSelectSeat={
															handleSelectSeatReturn
														}
														BOOKING={BOOKING}
													/>
												</div>
											</Fragment>
										)}
									</div>
								</Fragment>
							) : (
								<LoadingChildComponent />
							)}

							<div className='mt-5 w-full flex items-center justify-center'>
								<ChairListReturn />
							</div>
							<div className='mt-9'>
								<WarningChildren BOOKING={BOOKING} />
							</div>
						</div>
					</div>
				)}
				{step === 2 && (
					<div className='flex-grow '>
						<TripInformationFormReturn
							seatSelected={selectedSeat}
							listStartPlaces={listStartPlaces}
							listEndPlaces={listEndPlaces}
							setFormIsValid={setFormIsValid}
							setFormData={setFormData}
							BOOKING={BOOKING}
							REQUESTPAYMENT={REQUESTPAYMENT}
							ERROR={ERROR}
							handleSubmitSeatForm={handleSubmitSeatForm}
							setChildAdditionalCharge={setChildAdditionalCharge}
							setPlaceInfomation={setPlaceInfomation}
							seatSelectedReturn={selectedSeatReturn}
							listStartPlacesReturn={listStartPlacesReturn}
							listEndPlacesReturn={listEndPlacesReturn}
							setChildAdditionalChargeReturn={
								setChildAdditionalChargeReturn
							}
							setPlaceInfomationReturn={setPlaceInfomationReturn}
						/>
					</div>
				)}
				<div
					className={`flex-grow flex flex-col gap-2 transition-all max-w-[400px] ${
						step === 1 ? "min-w-[340px]" : "min-w-[400px] "
					}`}>
					<div className='bg-white rounded-xl h-fit '>
						{reservationDetail && reservationDetailReturn && (
							<TripInformationReturn
								vouchers={vouchers}
								POINT={POINT}
								userProfile={userProfile}
								placeInfomation={placeInfomation}
								reservationDetail={reservationDetail}
								childCount={childAdditionalCharge.length}
								childAdditionalCharge={childAdditionalCharge}
								childAdditionalChargeReturn={
									childAdditionalChargeReturn
								}
								childCountReturn={
									childAdditionalChargeReturn.length
								}
								seatSelected={selectedSeat}
								BOOKING={BOOKING}
								REQUESTPAYMENT={REQUESTPAYMENT}
								handleChangeNextChildStep={
									handleChangeNextChildStep
								}
								step={step}
								formIsValid={formIsValid}
								PAYMENT={PAYMENT}
								expiredDuration={countdownTime}
								reservationDetailReturn={
									reservationDetailReturn
								}
								seatSelectedReturn={selectedSeatReturn}
								placeInfomationReturn={placeInfomationReturn}
								voucherSelected={voucherSelected}
								setVoucherSelected={setVoucherSelected}
								vouchersReturn={vouchersReturn}
								voucherSelectedReturn={voucherSelectedReturn}
								setVoucherSelectedReturn={
									setVoucherSelectedReturn
								}
							/>
						)}
					</div>
					{!userProfile && (
						<div className='bg-white rounded-xl h-fit py-3 px-4'>
							<div className='bg-primary-900 rounded-lg p-4 flex   items-center gap-6'>
								<p className='text-sm font-normal block w-[200px] shrink-0'>
									{BOOKING.suggestLogin}
								</p>
								<Button
									onClick={() => {
										window.location.assign("/dang-nhap");
									}}
									padding='px-3 py-2'
									btnColor='bg-primary-500'
									fontSize='text-sm leading-[21px]'>
									{SIGNIN.signIn}
								</Button>
							</div>
						</div>
					)}
				</div>
			</div>
			<Modal
				toggleModal={() => {}}
				open={paymentModal}
				wrapChildStyle='p-0'
				modalStyle='w-[100vw] h-[100vh] flex justify-center items-center fixed bg-black/30 z-[60] left-[calc(0%)] top-[calc(0%)]'
				childStyle='w-[600px] bg-white md:rounded-xl md:min-h-fit min-h-full mx-0  overflow-hidden duration-200 animate-fade-in '>
				{reservationDetail && reservationDetailReturn && (
					<PaymentModal
						BOOKING={BOOKING}
						reservationDetail={reservationDetail}
						reservationDetailReturn={reservationDetailReturn}
						formData={formData}
						REQUESTPAYMENT={REQUESTPAYMENT}
						selectedSeat={selectedSeat}
						selectedSeatReturn={selectedSeatReturn}
						price={
							calculateTotalPrice(
								selectedSeat,
								childAdditionalCharge.length,
								reservationDetail,
								voucherSelected,
							) +
							calculateTotalPrice(
								selectedSeatReturn,
								childAdditionalChargeReturn.length,
								reservationDetailReturn,
								voucherSelectedReturn,
							)
						}
						// handleCloseModal={togglePaymentModal}
						// handleConfirmPayment={handleConfirmPayment}
						handleConfirmPayment={handleConfirmPayment}
						PAYMENT={PAYMENT}
						expiredDuration={countdownTime}
					/>
				)}
			</Modal>
		</div>
	);
};

export default PickSeatReturnDesktop;
