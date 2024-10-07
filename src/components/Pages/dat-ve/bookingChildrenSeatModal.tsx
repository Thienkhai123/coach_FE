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

interface IBookingChildrenSeatInforFormProps {
	BOOKING: IBookingTranslate;
	ERROR: IErrorTranslate;
	PLACEHOLDER?: IPlaceholderTranslate;
	SIGNIN?: ISignInTranslate;
	REQUESTPAYMENT: IRequestPaymentTranslate;
	listFields: any[];
	handleCloseModal: () => void;
	showModal: boolean;
	register: any;
	errors: any;
	handleSubmit: Function;
	isValid: boolean;
	watch: any;
	setValue: any;
	getValues: any;
	name?: string;
}

const BookingChildrenSeatInforFormModal = (
	props: IBookingChildrenSeatInforFormProps,
) => {
	const {
		BOOKING,
		ERROR,
		PLACEHOLDER,
		SIGNIN,
		REQUESTPAYMENT,
		listFields,
		handleCloseModal = () => {},
		showModal = false,
		register,
		errors,
		isValid,
		watch,
		setValue,
		getValues,
		handleSubmit = () => {},
		name = "informationSeats",
	} = props;

	const CHILDTYPE = [
		{
			id: 0,
			value: BOOKING.childrenBelowWeightAndHeight,
			description: BOOKING.freeForChildrenWithAdult,
		},
		{
			id: 1,
			value: BOOKING.childrenBelowWeightAndHeight2,
			description: BOOKING.extraFeesChildrenSitWithAdult,
		},
	];

	const modalRef = useRef(null);

	return (
		<div className={``}>
			{/* md:min-h-fit min-h-full */}
			<div className='p-4 flex items-center justify-center border-b border-neutral-grey-200'>
				<p className='text-base font-semibold'>
					{BOOKING.informationCustomerChildren}
				</p>
			</div>
			<div className='max-h-[600px] overflow-auto p-4 flex flex-col gap-10'>
				{listFields?.map((field, index) => {
					const isEnable = watch(
						`${name}.${index}.childrenSeat.status`,
					);
					return (
						<div key={index} className='flex flex-col gap-3'>
							<div className='flex items-center justify-between'>
								<div className='rounded-full  py-1 px-2 bg-semantic-green-light w-fit'>
									<p className='uppercase font-extrabold text-xs text-neutral-grey-600'>
										{BOOKING.childrenSitSameChair2}{" "}
										{field.seatName}
									</p>
								</div>
								<div>
									<label className='relative  items-center cursor-pointer'>
										<input
											type='checkbox'
											checked={watch(
												`${name}.${index}.childrenSeat.status`,
											)}
											className='sr-only peer'
											onChange={(e) => {
												setValue(
													`${name}.${index}.childrenSeat.status`,
													!getValues(
														`${name}.${index}.childrenSeat.status`,
													),
												);
											}}
										/>
										<div className="w-14 h-7 bg-gray-200 peer-focus:outline-none  peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] peer-checked:after:left-[5px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-[#1890FF]"></div>
									</label>
								</div>
							</div>

							<div>
								{CHILDTYPE?.map((opt, ind) => {
									const { id, value, description } = opt;
									const isChecked =
										watch(
											`${name}.${index}.childrenSeat.childType`,
										) === id;
									return (
										<div
											key={ind}
											onClick={() => {
												if (isEnable) {
													setValue(
														`${name}.${index}.childrenSeat.childType`,
														id,
													);
												}
											}}
											className='py-[6px] flex items-start transition-all gap-3 cursor-pointer'>
											<input
												type='radio'
												disabled={!isEnable}
												className='accent-[#228AD1] w-5 h-5 mt-0.5'
												readOnly
												checked={isChecked}
											/>
											<div className='w-full flex flex-col items-start '>
												<p
													className={` text-sm ${
														isChecked
															? "font-bold text-neutral-grey-700"
															: "font-normal text-neutral-grey-600"
													}`}>
													{value}
												</p>
												{isChecked && (
													<p
														className={`text-xs font-semibold ${
															id === 0
																? "text-semantic-green"
																: "text-primary-400"
														}`}>
														{description}
													</p>
												)}
											</div>
										</div>
									);
								})}
							</div>

							<div>
								<InputText
									name={`${name}.${index}.childrenSeat.name`}
									disabled={!isEnable}
									// required={true}
									placeholder={
										REQUESTPAYMENT.detailOrder.fullName
									}
									register={register}
									errors={errors}
									title={REQUESTPAYMENT.detailOrder.fullName}
								/>
								{errors?.name?.[index]?.childrenSeat?.name
									?.message && (
									<p className='text-[14px] leading-5 text-red-500'>
										{
											errors?.name?.[index]?.childrenSeat
												?.name?.message
										}
									</p>
								)}
							</div>
							<div className='flex items-start gap-3'>
								<div className='w-full'>
									{/* <InputText
										disabled={!isEnable}
										// required={true}
										name={`${name}.${index}.childrenSeat.birthday`}
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
										name={`${name}.${index}.childrenSeat.birthday`}
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
									{errors?.name?.[index]?.childrenSeat
										?.birthday_datetime?.message && (
										<p className='text-[14px] leading-5 text-red-500'>
											{
												errors?.name?.[index]
													?.childrenSeat
													?.birthday_datetime?.message
											}
										</p>
									)}
								</div>
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

export default BookingChildrenSeatInforFormModal;
