import React, { useEffect, useState } from "react";

import { IBookingTranslate } from "@/interfaces/IBookingTranslate";
import { IRequestPaymentTranslate } from "@/interfaces/IRequestPaymentTranslate";
import Button from "@/components/button";
import InputText from "@/components/input/text";
import ArrowBackIcon from "@/components/icons/arrowBack";
import ArrowRightIcon from "@/components/icons/arrowRight";
import UserGroupIcon from "@/components/icons/user-group";
import UserIcon from "@/components/icons/user";
import UsersIcon from "@/components/icons/users";
import InputCheckboxDesktop from "@/components/input/checkbox-desktop";
import StrollerIcon from "@/components/icons/stroller";
import SelectOptionBooking, { optionType } from "./select-option-booking";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { string, object, array } from "yup";
import { IErrorTranslate } from "@/interfaces/IErrorTranslate";

import BookingPersonInforFormModal from "./bookingChildModal";
import { cloneDeep, get } from "lodash";
import BookingChildrenSeatInforFormModal from "./bookingChildrenSeatModal";
import Modal from "@/components/modal/Modal";
import useModal from "@/hook/useModal";
import {
	IReservationValidateSeatsData,
	ITripPlacesResponse,
} from "@/interfaces/httpRequest/ITrip";
import moment from "moment";
import DatePickerSelectOption from "@/components/date-picker-select-option";
import DatePickerCustom from "@/components/date-picker-custom";

export interface ISeat {
	chairID: number;
	chairNumber: number;
	chairStatus: number;
	price: number;
	name?: string;
	phone?: string;
	birthday?: string;
	email?: string;
	childrenSeat?: IChildrenSeat;
}
interface IChildrenSeat {
	status?: boolean;
	name?: string;
	birthday?: string;
	childType?: number;
}
interface ITripInformationFormProps {
	BOOKING: IBookingTranslate;
	REQUESTPAYMENT: IRequestPaymentTranslate;
	seatSelected: any;
	ERROR: IErrorTranslate;
	setFormIsValid?: Function;
	setFormData?: Function;
	handleSubmitSeatForm: () => void;
	listStartPlaces: ITripPlacesResponse[];
	listEndPlaces: ITripPlacesResponse[];
	setChildAdditionalCharge: Function;
	setPlaceInfomation: Function;
}

interface IFormValues {
	// from?: string;
	// to?: string;
	// ticket?: number;
	bookingPhone: string;
	bookingName: string;
	bookingBirthday: string;
	bookingBirthday_datetime: string;
	bookingEmail: string;
	copyPerson?: string[];
	informationSeats?: ISeat[];
}
const FAKE_OPTION = [
	{
		id: 1,
		value: "13:00 - Đà Nẵng",
		description: "Lorem ipsum dolor sit amet consectetur.",
		location: "0392890234809234.2304923049320",
	},
	{
		id: 2,
		value: "13:00 - Đà Nẵng",
		description: "Lorem ipsum dolor sit amet consectetur.",
		location: "0392890234809234.2304923049320",
	},
	{
		id: 3,
		value: "13:00 - Đà Nẵng",
		description: "Lorem ipsum dolor sit amet consectetur.",
		location: "0392890234809234.2304923049320",
	},
	{
		id: 4,
		value: "13:00 - Đà Nẵng",
		description: "Lorem ipsum dolor sit amet consectetur.",
		location: "0392890234809234.2304923049320",
	},
	{
		id: 5,
		value: "13:00 - Đà Nẵng",
		description: "Lorem ipsum dolor sit amet consectetur.",
		location: "0392890234809234.2304923049320",
	},
	{
		id: 6,
		value: "13:00 - Đà Nẵng",
		description: "Lorem ipsum dolor sit amet consectetur.",
		location: "0392890234809234.2304923049320",
	},
	{
		id: 7,
		value: "13:00 - Đà Nẵng",
		description: "Lorem ipsum dolor sit amet consectetur.",
		location: "0392890234809234.2304923049320",
	},
];

const TripInformationForm = (props: ITripInformationFormProps) => {
	const {
		BOOKING,
		REQUESTPAYMENT,
		seatSelected = [],
		ERROR,
		setFormIsValid = () => {},
		setFormData = () => {},
		listStartPlaces,
		listEndPlaces,
		handleSubmitSeatForm = () => {},
		setChildAdditionalCharge = () => {},
		setPlaceInfomation = () => {},
	} = props;

	const CHILDTYPE = [
		{
			id: 0,
			value: BOOKING.childrenBelowWeightAndHeight,
			description: BOOKING.free,
		},
		{
			id: 1,
			value: BOOKING.childrenBelowWeightAndHeight2,
			description: `${BOOKING.extraFee} 50%`,
		},
	];

	const [showPersonInformationModal, setShowPersonInformationModal] =
		useModal();
	const [showChildrenInformationModal, setShowChildrenInformationModal] =
		useModal();

	const [isFieldArrayValid, setIsFieldArrayValid] = useState(true);

	const [personList, setPersonList] = useState<ISeat[]>([]);

	const currentYear = new Date().getFullYear();

	const emailRegex =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	const handleClosePersonInformationModal = () => {
		// document.body.style.overflow = "auto";
		setShowPersonInformationModal();
	};

	const handleClickPersonInformation = () => {
		if (fields?.length > 0) {
			// document.body.style.overflow = "hidden";
			setShowPersonInformationModal();
		}
	};
	const handleCloseChildrenInformationModal = () => {
		// document.body.style.overflow = "auto";

		const childList = getValues("informationSeats")?.filter(
			(el: any) =>
				el.childrenSeat.status === true &&
				el.childrenSeat.childType === 1,
		);
		setChildAdditionalCharge(childList);
		setShowChildrenInformationModal();
	};

	const handleClickChildrenInformation = () => {
		if (fields?.length > 0) {
			// document.body.style.overflow = "hidden";
			setShowChildrenInformationModal();
		}
	};

	const seatFormSchema = {
		name: yup.string().optional(),
		// .required(ERROR.errorRequired),
		phone: yup
			.string()
			.matches(
				/(^^(09|03|07|08|05|02)+([0-9]{8,9})$)|^$/,
				"Số điện thoại không đúng định dạng",
			)
			.optional(),
		// .required(ERROR.errorRequired),
		birthday_datetime: yup.string().optional().nullable(),
		// .required(ERROR.errorRequired)
		// .matches(/^\d{4}$/, "Năm sinh phải có 4 chữ số")
		// .test("is-valid-year", "Năm sinh không hợp lệ", (value) => {
		// 	if (!value) return true;
		// 	return (
		// 		/^\d{4}$/.test(value) &&
		// 		parseInt(value, 10) < currentYear &&
		// 		parseInt(value, 10) >= currentYear - 120
		// 	);
		// }),
		email: yup
			.string()
			.optional()
			.nullable()
			.trim()
			.test("valid-email", ERROR.errorEmail, function (value) {
				if (!value) return true; // Bỏ qua nếu không có giá trị
				return emailRegex.test(value);
			}),

		childrenSeat: yup
			.object()
			.shape({
				name: yup.string().optional(),
				// .required(ERROR.errorRequired),

				birthday_datetime: yup.string().optional().nullable(),
				// .required(ERROR.errorRequired)
				// .matches(/^\d{4}$/, "Năm sinh phải có 4 chữ số")
				// .test("is-valid-year", "Năm sinh không hợp lệ", (value) => {
				// 	if (!value) return true;
				// 	return (
				// 		/^\d{4}$/.test(value) &&
				// 		parseInt(value, 10) < currentYear &&
				// 		parseInt(value, 10) >= currentYear - 120
				// 	);
				// }),
			})
			.optional(),
	};

	const schema = yup.object().shape({
		bookingPhone: yup
			.string()
			.matches(
				/(^^(09|03|07|08|05|02)+([0-9]{8,9})$)|^$/,
				"Số điện thoại không đúng định dạng",
			)
			.required(ERROR.errorRequired),
		pickUpPoint_id: yup.number().required(),
		paypoints_id: yup.number().required(),
		bookingName: yup.string().required(ERROR.errorRequired),
		bookingBirthday_datetime: yup
			.string()
			.required("Ngày sinh là bắt buộc")
			.test("is-valid-date", "Ngày sinh không hợp lệ", (value) => {
				if (!value) return false;

				const selectedDate = moment(value);
				const today = moment();
				const selectedYear = selectedDate.year();
				const currentYear = today.year();

				return (
					selectedDate.isBefore(today, "year") &&
					selectedYear >= currentYear - 120
				);
			}),
		bookingEmail: yup
			.string()
			.optional()
			.nullable()
			.trim()
			.test("valid-email", ERROR.errorEmail, function (value) {
				if (!value) return true; // Bỏ qua nếu không có giá trị
				return emailRegex.test(value);
			}),

		informationSeats: array()
			.of(yup.object().shape(seatFormSchema).optional())
			.optional(),
	});

	const {
		register,
		control,
		handleSubmit,
		reset,
		watch,
		setValue,
		setError,
		getValues,
		formState: { errors, isValid, isDirty },
	} = useForm<IFormValues | any>({
		resolver: yupResolver(schema),
		mode: "onChange",
		defaultValues: {
			copyPerson: [],
			bookingPhone: "",
			bookingName: "",
			bookingBirthday: "",
			bookingBirthday_datetime: "",
			paypoints_id: "",
			pickUpPoint_id: "",
			informationSeats: seatSelected,
		},
	});

	const { fields, append, prepend, remove, swap, move, insert, replace } =
		useFieldArray({
			control,
			// rules: { required: false },
			name: "informationSeats",
		});

	const handleClickSaveInformation = () => {
		const list = cloneDeep(getValues("informationSeats"));
		setPersonList(list);
		handleClosePersonInformationModal();
	};

	const handleClickSaveChildrenInformation = () => {
		const list = cloneDeep(getValues("informationSeats"));
		setPersonList(list);
		handleCloseChildrenInformationModal();
	};
	const convertPlacesOptionType = (data?: ITripPlacesResponse[]) => {
		const tmpPlaces: optionType[] = [];
		data?.forEach((el) => {
			tmpPlaces.push({
				value: el.place.name,
				id: el.place.placeId,
				description: el.place.address,
				location: "",
				startAt: el.startAt,
			});
		});
		return tmpPlaces;
	};

	useEffect(() => {
		setPlaceInfomation({
			startPlace: watch("pickUpPoint"),
			endPlace: watch("paypoints"),
		});
	}, [watch("pickUpPoint_id"), watch("paypoints_id")]);
	// useEffect(() => {
	// 	const {bookingBirthday,bookingEmail,bookingNamebookingPhone,informationSeats} =watch()
	// 	const tmpTicket =[]
	// 	informationSeats?.forEach((el:any)=>{
	// 		tmpTicket.push({
	// 			...el,
	// 		})

	// 	})

	// 	const payload ={

	// 	}
	// 	console.log(watch());
	// }, [watch()]);

	// useEffect(() => {
	// 	const isFieldArrayValid = fields.every((field, index) => {
	// 		const fieldErrors = (errors.informationSeats as any)?.[index];

	// 		const name = getValues(`informationSeats.${index}.name`);
	// 		const phone = getValues(`informationSeats.${index}.phone`);
	// 		const email = getValues(`informationSeats.${index}.email`);
	// 		const birthday = getValues(`informationSeats.${index}.birthday`);

	// 		const isEmailValid = email
	// 			? emailRegex.test(email) && !fieldErrors?.email
	// 			: true;

	// 		return (
	// 			name &&
	// 			phone &&
	// 			birthday &&
	// 			!fieldErrors?.name &&
	// 			!fieldErrors?.phone &&
	// 			!fieldErrors?.birthday &&
	// 			isEmailValid
	// 		);
	// 	});
	// 	setIsFieldArrayValid(isFieldArrayValid);
	// }, [watch()]);

	useEffect(() => {
		const name = getValues(`bookingName`);
		const phone = getValues(`bookingPhone`);
		const paypoints = getValues(`paypoints_id`);
		const pickUpPoint = getValues(`pickUpPoint_id`);
		const birthday = getValues(`bookingBirthday_datetime`);

		const agree = getValues(`agree`);

		const isFieldArrayValid =
			name !== "" &&
			phone !== "" &&
			birthday !== "" &&
			paypoints !== "" &&
			pickUpPoint !== "" &&
			agree !== false;

		setFormIsValid(isFieldArrayValid);
	}, [watch()]);

	return (
		<div>
			<form
				id='reservation-form'
				onSubmit={handleSubmit(handleSubmitSeatForm)}
				className='flex flex-col gap-2'>
				<div className='bg-white rounded-xl p-6'>
					<p className='text-base font-bold text-black'>
						{REQUESTPAYMENT.detailOrder.titlePerson}
					</p>
					<div className='mt-4 '>
						<InputText
							name={"bookingName"}
							placeholder={REQUESTPAYMENT.detailOrder.fullName}
							register={register}
							errors={errors}
							required={true}
							title={BOOKING.fullNameBookingPerson}
						/>
						<div className='mt-3 flex items-start gap-3'>
							<InputText
								name={"bookingPhone"}
								placeholder={
									REQUESTPAYMENT.detailOrder.numberPhone
								}
								register={register}
								errors={errors}
								required={true}
								title={REQUESTPAYMENT.detailOrder.numberPhone}
							/>
							<DatePickerCustom
								register={register}
								name={"bookingBirthday"}
								showIcon={false}
								title={REQUESTPAYMENT.detailOrder.birthday}
								required={true}
								// Icon={CalendarDaysIcon}
								errors={errors}
								getValues={getValues}
								placeholder={
									REQUESTPAYMENT.detailOrder.birthday
								}
								setValue={setValue}
							/>
							{/* <InputText
								name={"bookingBirthday"}
								placeholder={
									REQUESTPAYMENT.detailOrder.birthday
								}
								register={register}
								errors={errors}
								required={true}
								title={REQUESTPAYMENT.detailOrder.birthday}
							/> */}
						</div>
						<div className='mt-3 '>
							<InputText
								name={"bookingEmail"}
								placeholder={REQUESTPAYMENT.detailOrder.email}
								register={register}
								errors={errors}
								title={REQUESTPAYMENT.detailOrder.email}
							/>
						</div>

						<div className='mt-2'>
							<InputCheckboxDesktop
								register={register}
								errors={errors}
								wrapperStyle='w-fit'
								name='agree'
								placeholder={BOOKING.privacyContent}
								watch={watch}
								value='agree'
							/>
						</div>
						<div
							className={`mt-2  border  rounded-lg border-secondary-500`}>
							{/* ${
								personList?.length > 0 ? "border" : ""
							} */}
							<div
								onClick={() => handleClickPersonInformation()}
								className='flex items-center justify-between h-10 bg-secondary-600 cursor-pointer p-2 rounded-lg'>
								<div className='flex items-center gap-2 '>
									<UsersIcon />
									<p className='text-sm text-neutral-grey-600 font-bold leading-[21px]'>
										{REQUESTPAYMENT.detailOrder.titlePerson}{" "}
										<span className='text-xs font-semibold text-neutral-grey-500 '>
											(
											{
												REQUESTPAYMENT.detailOrder
													.optional
											}
											)
										</span>
									</p>
								</div>
								<div>
									<ArrowRightIcon />
								</div>
							</div>
							<div className='flex flex-col px-2'>
								{personList?.length > 0 &&
									personList.map((person, idx) => {
										const { name, phone, birthday } =
											person || {};
										if (name || phone || birthday) {
											return (
												<div
													key={idx}
													className='py-2 border-b border-neutral-grey-100'>
													{name !== "" && (
														<p className='text-sm font-semibold text-neutral-grey-600'>
															{name}
														</p>
													)}
													{(phone || birthday) && (
														<div className='mt-1 flex items-center gap-[60px]'>
															{phone && (
																<p className='text-xs font-medium text-neutral-grey-600'>
																	SDT: {phone}
																</p>
															)}
															{birthday && (
																<p className='text-xs font-medium text-neutral-grey-600'>
																	{
																		BOOKING.bornYear
																	}
																	: {birthday}
																</p>
															)}
														</div>
													)}
												</div>
											);
										}
									})}
							</div>
						</div>
					</div>
				</div>
				<div className='bg-white rounded-xl p-6'>
					<p className='text-base font-bold text-black'>
						{REQUESTPAYMENT.detailOrder.childrenSeat}
					</p>
					<p className='mt-0.5 text-sm font-semibold text-neutral-grey-500 leading-[21px]'>
						{REQUESTPAYMENT.detailOrder.forChildrenUnder25kg}
					</p>
					<div className='mt-4 '>
						<div
							className={`mt-2  border rounded-lg border-secondary-500`}>
							<div
								onClick={() => {
									handleClickChildrenInformation();
								}}
								className='flex items-center justify-between h-10 bg-secondary-600 cursor-pointer p-2 rounded-lg'>
								<div className='flex items-center gap-2 '>
									<StrollerIcon />
									<p className='text-sm text-neutral-grey-600 font-bold leading-[21px]'>
										{
											REQUESTPAYMENT.detailOrder
												.titleInformationChildren
										}{" "}
										<span className='text-xs font-semibold text-neutral-grey-500 '>
											(
											{
												REQUESTPAYMENT.detailOrder
													.optional
											}
											)
										</span>
									</p>
								</div>
								<div>
									<ArrowRightIcon />
								</div>
							</div>
							<div className='flex flex-col px-2'>
								{personList?.map((person, idn) => {
									const { childrenSeat } = person || {};
									const {
										name,
										birthday,
										childType,
										status,
									} = childrenSeat || {};
									if (
										status &&
										(name || birthday || childType)
									) {
										return (
											<div
												key={idn}
												className='py-2 border-b border-neutral-grey-100'>
												<div className=' max-w-[323px] flex items-start justify-between  '>
													<div className='flex flex-col gap-0.5'>
														{name && (
															<p className='text-sm font-semibold text-neutral-grey-600'>
																{name}
															</p>
														)}

														<p className='text-xs font-medium text-neutral-grey-600'>
															{
																CHILDTYPE[
																	childType
																		? parseInt(
																				childType?.toString(),
																		  )
																		: 0
																].value
															}
														</p>
														{birthday && (
															<p className='text-xs font-medium text-neutral-grey-600'>
																{
																	BOOKING.bornYear
																}
																: {birthday}
															</p>
														)}
													</div>
													<div className='px-2 py-1 rounded-full bg-secondary-300'>
														<p className='text-xs font-bold text-white'>
															{
																CHILDTYPE[
																	childType
																		? parseInt(
																				childType?.toString(),
																		  )
																		: 0
																].description
															}
														</p>
													</div>
												</div>
											</div>
										);
									}
								})}
							</div>
						</div>
					</div>
				</div>
				<div className='bg-white rounded-xl p-6'>
					<p className='text-base font-bold text-black'>
						{REQUESTPAYMENT.detailOrder.titlePickDrop}
					</p>
					<div className='mt-4 '>
						<div className={``}>
							<div className='flex items-start gap-4'>
								<div className='w-full flex flex-col gap-2'>
									<SelectOptionBooking
										register={register}
										title={
											REQUESTPAYMENT.detailOrder
												.pickupPoint
										}
										name={"pickUpPoint"}
										placeholder={
											REQUESTPAYMENT.detailOrder
												.pickupPoint
										}
										errors={errors}
										setValue={setValue}
										listOpt={convertPlacesOptionType(
											listStartPlaces,
										)}
										getValues={getValues}
										BOOKING={BOOKING}
										required={true}
									/>
									{watch("pickUpPoint_id") && (
										<p className='text-xs font-medium text-neutral-grey-500'>
											{BOOKING.pickingDecription1}{" "}
											<span className='font-semibold text-neutral-grey-700'>
												{watch("pickUpPoint")}
											</span>{" "}
											<span className='text-primary-400 font-bold'>
												{BOOKING.pickingDecription2}{" "}
												{`${moment(
													listStartPlaces?.find(
														(el) =>
															el.placeId ===
															watch(
																"pickUpPoint_id",
															),
													)?.startAt,
												).format(
													"HH:mm DD/MM/YYYY",
												)}`}{" "}
											</span>
											{BOOKING.pickingDecription3}
										</p>
									)}
								</div>
								<SelectOptionBooking
									register={register}
									title={REQUESTPAYMENT.detailOrder.paypoints}
									name={"paypoints"}
									placeholder={
										REQUESTPAYMENT.detailOrder.paypoints
									}
									errors={errors}
									setValue={setValue}
									listOpt={convertPlacesOptionType(
										listEndPlaces,
									)}
									getValues={getValues}
									required={true}
									BOOKING={BOOKING}
								/>
							</div>
						</div>
					</div>
				</div>
			</form>

			<Modal
				toggleModal={handleClosePersonInformationModal}
				open={showPersonInformationModal}
				wrapChildStyle='p-0'
				modalStyle='w-[100vw] h-[100vh] flex justify-center items-center fixed bg-black/30 z-[60] left-[calc(0%)] top-[calc(0%)]'
				childStyle='w-[600px] bg-white md:rounded-xl md:min-h-fit min-h-full mx-0  overflow-hidden duration-200 animate-fade-in '>
				<BookingPersonInforFormModal
					BOOKING={BOOKING}
					ERROR={ERROR}
					REQUESTPAYMENT={REQUESTPAYMENT}
					listFields={fields}
					handleCloseModal={handleClosePersonInformationModal}
					register={register}
					errors={errors}
					isValid={isFieldArrayValid}
					watch={watch}
					setValue={setValue}
					getValues={getValues}
					handleSubmit={() => {
						handleClickSaveInformation();
					}}
				/>
			</Modal>
			<Modal
				toggleModal={handleCloseChildrenInformationModal}
				open={showChildrenInformationModal}
				wrapChildStyle='p-0'
				modalStyle='w-[100vw] h-[100vh] flex justify-center items-center fixed bg-black/30 z-[60] left-[calc(0%)] top-[calc(0%)]'
				childStyle='w-[600px] bg-white md:rounded-xl md:min-h-fit min-h-full mx-0  overflow-hidden duration-200 animate-fade-in '>
				<BookingChildrenSeatInforFormModal
					BOOKING={BOOKING}
					ERROR={ERROR}
					REQUESTPAYMENT={REQUESTPAYMENT}
					listFields={fields}
					handleCloseModal={handleCloseChildrenInformationModal}
					showModal={showChildrenInformationModal}
					register={register}
					errors={errors}
					isValid={isFieldArrayValid}
					watch={watch}
					setValue={setValue}
					getValues={getValues}
					handleSubmit={() => {
						handleClickSaveChildrenInformation();
					}}
				/>
			</Modal>
		</div>
	);
};

export default TripInformationForm;
