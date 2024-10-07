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
import ExclamimationCircleIcon from "@/components/icons/exclamimation-circle";
import GreenCircleCheckIcon from "@/components/icons/green-circle-check";

interface IChangePasswordModalProps {
	ACCOUNT: IAccountTranslate;
	SIGNIN: ISignInTranslate;
	ERROR: IErrorTranslate;
	userProfile: IUserProfile;
	handleCloseModal?: () => void;
	handleSubmitModal?: () => void;
}
interface IFormValues {
	oldPassword_desktop: string;
	password_desktop: string;
	rePassword_desktop: string;
}

const ChangePasswordModal = (props: IChangePasswordModalProps) => {
	const {
		ACCOUNT,
		SIGNIN,
		ERROR,
		userProfile,
		handleCloseModal = () => {},
		handleSubmitModal = () => {},
	} = props;

	const schema = yup.object().shape({
		oldPassword_desktop: yup
			.string()
			.trim()
			.required("Mật khẩu không được để trống")
			.min(8, "Mật khẩu tối thiểu 8 ký tự.")
			.test(
				"passwordRequirements",
				"Mật khẩu gồm 8 ký tự có chữ cái, số và kí tự đặc biệt.",
				(value) =>
					[/[a-z]/, /[0-9]/, /[^a-zA-Z0-9]/].every((pattern) =>
						pattern.test(value),
					),
			),
		password_desktop: yup
			.string()
			.trim()
			.required("Mật khẩu không được để trống")
			.min(8, "Mật khẩu tối thiểu 8 ký tự.")
			.test(
				"passwordRequirements",
				"Mật khẩu gồm 8 ký tự có chữ cái, số và kí tự đặc biệt.",
				(value) =>
					[/[a-z]/, /[0-9]/, /[^a-zA-Z0-9]/].every((pattern) =>
						pattern.test(value),
					),
			),
		rePassword_desktop: yup
			.string()
			.trim()
			.required("Mật khẩu không được để trống")
			.oneOf([yup.ref("password_desktop")], "Mật khẩu không trùng khớp"),
	});

	const {
		register,
		control,
		handleSubmit,
		reset,
		watch,
		setValue,
		setError,
		clearErrors,
		getValues,
		formState: { errors, isValid, isDirty },
	} = useForm<IFormValues | any>({
		resolver: yupResolver(schema),
		mode: "onChange",
		defaultValues: {
			oldPassword_desktop: "",
			password_desktop: "",
			rePassword_desktop: "",
		},
	});

	return (
		<form className={``} onSubmit={handleSubmit(handleSubmitModal)}>
			<div className='p-4 flex items-center justify-center border-b border-neutral-grey-100 bg-neutral-grey-000 relative'>
				<p className='text-base font-semibold'>
					{ACCOUNT.changePassword}
				</p>
			</div>
			<div className='max-h-[640px] overflow-auto  flex flex-col p-4 gap-2 bg-white'>
				<div className='flex flex-col gap-3  '>
					<InputText
						showError={false}
						name={"oldPassword_desktop"}
						register={register}
						title={ACCOUNT.oldPassword}
						required={true}
						placeholder={ACCOUNT.oldPassword}
						errors={errors}
						maxLength={100}
						type='password'
					/>
					<div>
						<InputText
							showError={false}
							name={"password_desktop"}
							register={register}
							title={ACCOUNT.newPassword}
							placeholder={ACCOUNT.newPassword}
							errors={errors}
							type='password'
						/>
						{watch("password_desktop").length === 0 &&
						!errors["password_desktop"]?.message ? (
							<p className='mt-[6px] text-xs text-neutral-grey-700 font-semibold leading-[18px]'>
								{SIGNIN.rulePassword}
							</p>
						) : errors["password_desktop"]?.message ? (
							<div className='flex items-center mt-[6px] gap-1'>
								<ExclamimationCircleIcon />
								<p className=' text-xs text-semantic-red font-semibold leading-[18px]'>
									{SIGNIN.rulePassword}
								</p>
							</div>
						) : (
							<div className='flex items-center mt-[6px] gap-1'>
								<GreenCircleCheckIcon />
								<p className=' text-xs text-semantic-green font-semibold leading-[18px]'>
									{SIGNIN.rulePassword}
								</p>
							</div>
						)}
					</div>
					<div>
						<InputText
							showError={false}
							name={"rePassword_desktop"}
							register={register}
							title={ACCOUNT.rePassword}
							placeholder={ACCOUNT.rePassword}
							errors={errors}
							type='password'
						/>
						{watch("rePassword_desktop").length === 0 &&
						errors["rePassword_desktop"]?.message !== "" ? (
							<p className=' text-xs text-neutral-grey-700 font-semibold leading-[18px]'></p>
						) : watch("rePassword_desktop") !==
						  watch("password_desktop") ? (
							<div className='flex items-center mt-[6px] gap-1'>
								<ExclamimationCircleIcon />
								<p className=' text-xs text-semantic-red font-semibold leading-[18px]'>
									{SIGNIN.passwordNotMatch}
								</p>
							</div>
						) : (
							<div className='flex items-center mt-[6px] gap-1'>
								<GreenCircleCheckIcon />
								<p className=' text-xs text-semantic-green font-semibold leading-[18px]'>
									{SIGNIN.passwordMatch}
								</p>
							</div>
						)}
					</div>
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

export default ChangePasswordModal;
