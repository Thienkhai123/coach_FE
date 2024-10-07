import Image from "next/image";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "@/components/button";

import { IAccountTranslate } from "@/interfaces/IAccountTranslate";
import { ISignInTranslate } from "@/interfaces/ISignInTranslate";
import { IErrorTranslate } from "@/interfaces/IErrorTranslate";
import { IUserProfile } from "@/interfaces/httpRequest/IUser";
import InputText from "@/components/input/text";
import InputCheckboxDesktop from "@/components/input/checkbox-desktop";

interface IEditProfileModalProps {
	ACCOUNT: IAccountTranslate;
	SIGNIN: ISignInTranslate;
	ERROR: IErrorTranslate;
	userProfile: IUserProfile;
	handleCloseModal?: () => void;
	handleSubmitModal?: () => void;
}
interface IFormValues {
	name_desktop: string;
	gender_desktop: string;
	phone_desktop: string;
	birthday_desktop: string;
	email_desktop: string;
	address_desktop: string;
}

const GENDER_LIST = [
	{
		id: "1",
		value: "Nam",
	},
	{
		id: "2",
		value: "Nữ",
	},
	{
		id: "3",
		value: "Khác",
	},
];

const EditProfileModal = (props: IEditProfileModalProps) => {
	const {
		ACCOUNT,
		SIGNIN,
		ERROR,
		userProfile,
		handleCloseModal = () => {},
		handleSubmitModal = () => {},
	} = props;
	const currentYear = new Date().getFullYear();
	const emailRegex =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const schema = yup.object().shape({
		phone_desktop: yup
			.string()
			.matches(
				/(^^(09|03|07|08|05|02)+([0-9]{8,9})$)|^$/,
				"Số điện thoại không đúng định dạng",
			)
			.required(SIGNIN.phoneInvalid),

		name_desktop: yup.string().required(ERROR.errorRequired),
		birthday_desktop: yup
			.string()
			.required(ERROR.errorRequired)
			.matches(/^\d{4}$/, "Năm sinh phải có 4 chữ số")
			.test("is-valid-year", "Năm sinh không hợp lệ", (value) => {
				const year = parseInt(value || "", 10);
				return year < currentYear && year >= currentYear - 120;
			}),
		email_desktop: yup
			.string()
			.optional()
			.nullable()
			.trim()
			.test("valid-email", ERROR.errorEmail, function (value) {
				if (!value) return true; // Bỏ qua nếu không có giá trị
				return emailRegex.test(value);
			}),
		address_desktop: yup.string().optional().nullable(),
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
			phone_desktop: userProfile.phone || "",
			name_desktop: userProfile.name || "",
			birthday_desktop: userProfile.birthday || "",
			address_desktop: userProfile.address || "",
			email_desktop: userProfile.email || "",
			gender_desktop: userProfile.gender.toString() || "",
		},
	});

	return (
		<form className={``} onSubmit={handleSubmit(handleSubmitModal)}>
			<div className='p-4 flex items-center justify-center border-b border-neutral-grey-100 bg-neutral-grey-000 relative'>
				<p className='text-base font-semibold'>
					{ACCOUNT.editInformation}
				</p>
				{/* <div
					onClick={() => {
						handleCloseModal();
					}}
					className='absolute right-5 cursor-pointer'>
					<CancelIcon width='14' height='14' fill='#6A6F70' />
				</div> */}
			</div>
			<div className='max-h-[640px] overflow-auto  flex flex-col p-4 gap-2 bg-white'>
				<div className='flex flex-col gap-3  '>
					<InputText
						name={"name_desktop"}
						register={register}
						title={ACCOUNT.fullname}
						required={true}
						placeholder={ACCOUNT.fullname}
						errors={errors}
						maxLength={100}
					/>
					<div className='flex items-center gap-6'>
						{GENDER_LIST?.map((gender, index) => {
							return (
								<label
									key={index}
									className='flex items-center gap-3'>
									<input
										type='radio'
										className='accent-[#228AD1] w-5 h-5 peer'
										value={gender.id}
										{...register("gender_desktop")}
									/>
									<p className=' peer-checked:font-bold font-medium text-neutral-grey-700 text-sm'>
										{gender.value}
									</p>
								</label>
							);
						})}
					</div>
					<div className='flex items-start gap-3'>
						<InputText
							name={"phone_desktop"}
							register={register}
							title={ACCOUNT.phone}
							required={true}
							placeholder={ACCOUNT.phone}
							errors={errors}
						/>
						<InputText
							name={"birthday_desktop"}
							register={register}
							title={ACCOUNT.yearOfBirth}
							required={true}
							placeholder={ACCOUNT.yearOfBirth}
							errors={errors}
						/>
					</div>
					<InputText
						name={"email_desktop"}
						register={register}
						title={"Email"}
						placeholder={"Email"}
						errors={errors}
					/>
					<InputText
						name={"address_desktop"}
						register={register}
						title={ACCOUNT.address}
						placeholder={ACCOUNT.address}
						errors={errors}
					/>
				</div>
			</div>
			<div className='flex items-center gap-3 p-4 pb-6'>
				<Button
					btnColor='disabled:bg-primary-600 bg-neutral-grey-100 disabled:opacity-100 group'
					height='h-11'
					borderRadius='rounded-full'
					borderColor='border-none'
					color='group-disabled:text-opacity-60 text-black '
					// disabled={!isValid}
					// actionType='submit'
					onClick={() => handleCloseModal()}>
					{ACCOUNT.back}
				</Button>
				<Button
					btnColor='disabled:bg-primary-600 bg-primary-500 disabled:opacity-100 group'
					height='h-11'
					borderRadius='rounded-full'
					borderColor='border-none'
					color='group-disabled:text-opacity-60 text-white '
					disabled={!isValid}
					actionType='submit'
					// onClick={() => handleCloseModal()}
				>
					{ACCOUNT.saveInfomation}
				</Button>
			</div>
		</form>
	);
};

export default EditProfileModal;
