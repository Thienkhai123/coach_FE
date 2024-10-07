import Image from "next/image";
import React, { Fragment, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { IBookingTranslate } from "@/interfaces/IBookingTranslate";
import { IErrorTranslate } from "@/interfaces/IErrorTranslate";
import { IPlaceholderTranslate } from "@/interfaces/IPlaceholderTranslate";
import { ISignInTranslate } from "@/interfaces/ISignInTranslate";
import { IRequestPaymentTranslate } from "@/interfaces/IRequestPaymentTranslate";
import useOnClickOutside from "@/hook/useClickOutside";
import InputText from "@/components/input/text";
import Button from "@/components/button";
import InputCheckboxDesktop from "@/components/input/checkbox-desktop";
import CheckIcon from "@/components/icons/check";
import DatePickerCustom from "@/components/date-picker-custom";

interface IBookingPersonInforFormProps {
	BOOKING: IBookingTranslate;
	ERROR: IErrorTranslate;
	PLACEHOLDER?: IPlaceholderTranslate;
	SIGNIN?: ISignInTranslate;
	REQUESTPAYMENT: IRequestPaymentTranslate;
	listFields: any[];
	handleCloseModal: Function;
	register: any;
	errors: any;
	handleSubmit: Function;
	isValid: boolean;
	watch: any;
	setValue: any;
	getValues: any;
	name?: string;
}

const BookingPersonInforFormModal = (props: IBookingPersonInforFormProps) => {
	const {
		BOOKING,
		ERROR,
		PLACEHOLDER,
		SIGNIN,
		REQUESTPAYMENT,
		listFields,
		handleCloseModal = () => {},
		register,
		errors,
		isValid,
		watch,
		setValue,
		getValues,
		handleSubmit = () => {},
		name = "informationSeats",
	} = props;

	const [isChecked, setChecked] = useState(false);

	const handleClickCopy = (e: any) => {
		if (!e.target.checked) {
			setChecked(false);
			setValue(`${name}.${0}.name`, "");
			setValue(`${name}.${0}.phone`, "");
			setValue(`${name}.${0}.birthday`, "");
			setValue(`${name}.${0}.email`, "");
		} else {
			setChecked(true);
			setValue(`${name}.${0}.name`, getValues("bookingName"));
			setValue(`${name}.${0}.phone`, getValues("bookingPhone"));
			setValue(`${name}.${0}.birthday`, getValues("bookingBirthday"));
			setValue(`${name}.${0}.email`, getValues("bookingEmail"));
		}
	};

	return (
		<div className={``}>
			{/* md:min-h-fit min-h-full */}
			<div className='p-4 flex items-center justify-center border-b border-neutral-grey-200'>
				<p className='text-base font-semibold'>
					{REQUESTPAYMENT.detailOrder.titlePerson}
				</p>
			</div>
			<div className='max-h-[600px] overflow-auto p-4 flex flex-col gap-10'>
				{listFields?.map((field, index) => {
					return (
						<div key={index} className='flex flex-col gap-3'>
							<div className='rounded-full  py-1 px-2 bg-semantic-green-light w-fit'>
								<p className='uppercase font-extrabold text-xs text-neutral-grey-600'>
									{BOOKING.customerSitOn} {field.seatName}
								</p>
							</div>
							{index === 0 && (
								<div className='pb-2 border-b border-common'>
									<label>
										<div className='flex gap-4'>
											<label className='group flex items-center gap-3 py-2'>
												<div className=' relative w-fit h-fit'>
													<input
														type='checkbox'
														checked={isChecked}
														onChange={() => {}}
														value={"copy"}
														onClick={(e: any) => {
															handleClickCopy(e);
														}}
														className='appearance-none block w-5 h-5 accent-button bg-white border peer checked:bg-secondary-300 border-neutral-500 checked:border-none rounded'
													/>
													<div className='absolute top-0 w-full h-full flex items-center justify-center  opacity-0 peer-checked:opacity-100'>
														<CheckIcon
														// width='12'
														// height='12'
														// viewBox='0 0 12 12'
														/>
													</div>
												</div>
												<p className='text-sm font-normal  text-neutral-grey-700'>
													{`${BOOKING.useBookingInfoForPassenger} ${field.seatName}.`}
												</p>
											</label>
										</div>
									</label>
								</div>
							)}
							<div>
								<InputText
									name={`${name}.${index}.name`}
									// required={true}
									placeholder={
										REQUESTPAYMENT.detailOrder.fullName
									}
									register={register}
									errors={errors}
									title={REQUESTPAYMENT.detailOrder.fullName}
								/>
								{errors?.name?.[index]?.name?.message && (
									<p className='text-[14px] leading-5 text-red-500'>
										{errors?.name?.[index]?.name?.message}
									</p>
								)}
							</div>
							<div className='flex items-start gap-3'>
								<div className='w-full'>
									<InputText
										// required={true}
										name={`${name}.${index}.phone`}
										placeholder={
											REQUESTPAYMENT.detailOrder
												.numberPhone
										}
										register={register}
										errors={errors}
										title={
											REQUESTPAYMENT.detailOrder
												.numberPhone
										}
									/>
									{errors?.name?.[index]?.phone?.message && (
										<p className='text-[14px] leading-5 text-red-500'>
											{
												errors?.name?.[index]?.phone
													?.message
											}
										</p>
									)}
								</div>
								<div className='w-full'>
									{/* <InputText
										// required={true}
										name={`${name}.${index}.birthday`}
										placeholder={
											REQUESTPAYMENT.detailOrder.birthday
										}
										register={register}
										errors={errors}
										title={
											REQUESTPAYMENT.detailOrder.birthday
										}
									/> */}
									<DatePickerCustom
										register={register}
										name={`${name}.${index}.birthday`}
										showIcon={false}
										title={
											REQUESTPAYMENT.detailOrder.birthday
										}
										required={false}
										// Icon={CalendarDaysIcon}
										errors={errors}
										getValues={getValues}
										placeholder={
											REQUESTPAYMENT.detailOrder.birthday
										}
										setValue={setValue}
									/>
									{errors?.name?.[index]?.birthday_datetime
										?.message && (
										<p className='text-[14px] leading-5 text-red-500'>
											{
												errors?.name?.[index]?.birthday
													?.message
											}
										</p>
									)}
								</div>
							</div>
							<div>
								<InputText
									name={`${name}.${index}.email`}
									placeholder={
										REQUESTPAYMENT.detailOrder.email
									}
									register={register}
									errors={errors}
									title={REQUESTPAYMENT.detailOrder.email}
								/>
								{errors?.name?.[index]?.email?.message &&
									getValues(`${name}.${index}.email`) !==
										"" && (
										<p className='text-[14px] leading-5 text-red-500'>
											{
												errors?.name?.[index]?.email
													?.message
											}
										</p>
									)}
							</div>
						</div>
					);
				})}
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
					{BOOKING.back}
				</Button>
				<Button
					btnColor='disabled:bg-primary-600 bg-primary-500 disabled:opacity-100 group'
					height='h-11'
					borderRadius='rounded-full'
					borderColor='border-none'
					color='group-disabled:text-opacity-60 text-white '
					disabled={!isValid}
					// actionType='submit'
					onClick={() => handleSubmit()}>
					{BOOKING.saveInformation}
				</Button>
			</div>
		</div>
	);
};

export default BookingPersonInforFormModal;
