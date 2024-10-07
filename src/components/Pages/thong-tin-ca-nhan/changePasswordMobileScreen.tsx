import NavbarBasic from "@/components/navbar/basic";
import { ITranslation } from "@/interfaces/ITranslation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputText from "@/components/input/text";
import useInputPhone from "@/hook/helper/useInputPhone";
import InputPhone from "@/components/input/phone";
import { useEffect, useState } from "react";
import InputDate from "@/components/input/date";
import Button from "@/components/button";
import {
	IUpdateProfileResponse,
	IUserProfile,
} from "@/interfaces/httpRequest/IUser";
import { fetchUserProfile, updateProfile } from "@/apis/user";
import { useCustomToast } from "@/hook/useToast";
import { changePassword } from "@/apis/authentication";
import ExclamimationCircleIcon from "@/components/icons/exclamimation-circle";
import GreenCircleCheckIcon from "@/components/icons/green-circle-check";
import LoadingView from "@/components/LoadingView";

interface IChangePasswordMobileScreenProps {
	translation: ITranslation;
	defaultValues: IUserProfile;
	handlePrevScreen: () => void;
	setProfile: (arg: any) => void;
}

interface IFormValues {
	oldPassword: string;
	password: string;
	rePassword: string;
}

const ChangePasswordMobileScreen = (
	props: IChangePasswordMobileScreenProps,
) => {
	const { translation, handlePrevScreen, defaultValues, setProfile } = props;
	const { ACCOUNT, BOOKING, ERROR, SIGNIN } = translation;

	const [isLoading, setLoading] = useState(false);
	const { toastSuccess, toastError } = useCustomToast();

	const schema = yup.object().shape({
		oldPassword: yup
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
		password: yup
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
		rePassword: yup
			.string()
			.trim()
			.required("Mật khẩu không được để trống")
			.oneOf([yup.ref("password")], "Mật khẩu không trùng khớp"),
	});

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors, isValid },
	} = useForm<IFormValues>({
		resolver: yupResolver<IFormValues>(schema),
		mode: "onChange",
		defaultValues: {
			oldPassword: "",
			password: "",
			rePassword: "",
		},
	});

	const onSubmit = async (data: IFormValues) => {
		setLoading(true);
		const { oldPassword, password, rePassword } = data;
		if (data && defaultValues?.userId) {
			const res = await changePassword({
				userId: defaultValues.userId,
				oldPassword: oldPassword,
				password: password,
				rePassword: rePassword,
			});
			if (res?.isSuccess) {
				const resProfile = await fetchUserProfile();
				if (resProfile?.isSuccess) {
					setProfile(resProfile.data);
					handlePrevScreen();
					setLoading(false);
					toastSuccess({
						message: res?.successMessage,
						toastId: "change-password-success",
					});
				}
			} else {
				setLoading(false);
				toastError({
					message: res?.errorMessage,
					toastId: "change-password-error",
				});
			}
		} else {
			setLoading(false);
			toastError({
				message: "Có lỗi xảy ra",
				toastId: "change-password-error",
			});
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='bg-white'>
			{isLoading && <LoadingView />}
			<div className='border-b border-b-[#EBEBEB]'>
				<NavbarBasic
					title={ACCOUNT.changePassword}
					handleClick={handlePrevScreen}
				/>
			</div>
			<div className='p-4'>
				<div className='flex flex-col gap-3  '>
					<InputText
						showError={false}
						name={"oldPassword"}
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
							name={"password"}
							required={true}
							register={register}
							title={ACCOUNT.newPassword}
							placeholder={ACCOUNT.newPassword}
							errors={errors}
							type='password'
						/>
						{watch("password")?.length === 0 &&
						!errors["password"]?.message ? (
							<p className='mt-[6px] text-xs text-neutral-grey-700 font-semibold leading-[18px]'>
								{SIGNIN.rulePassword}
							</p>
						) : errors["password"]?.message ? (
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
							required={true}
							showError={false}
							name={"rePassword"}
							register={register}
							title={ACCOUNT.rePassword}
							placeholder={ACCOUNT.rePassword}
							errors={errors}
							type='password'
						/>
						{watch("rePassword")?.length === 0 &&
						errors["rePassword"]?.message !== "" ? (
							<p className=' text-xs text-neutral-grey-700 font-semibold leading-[18px]'></p>
						) : watch("rePassword") !== watch("password") ? (
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
			<div className='p-4 fixed bottom-0 z-10 bg-white w-full border border-neutral-grey-100 shadow-[gba(0,0,0,0.06),rgba(0,0,0,0.03)]'>
				<Button actionType='submit' disabled={!isValid}>
					{ACCOUNT.save}
				</Button>
			</div>
		</form>
	);
};

export default ChangePasswordMobileScreen;
