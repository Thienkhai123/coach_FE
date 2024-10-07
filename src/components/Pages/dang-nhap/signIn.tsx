import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useTrans from "@/hook/useTrans";
import InputText from "@/components/input/text";
import InputTextFloat from "@/components/input/text-float";
import ExclamimationCircleIcon from "@/components/icons/exclamimation-circle";
import { useEffect, useState } from "react";
import Button from "@/components/button";
import { ILoginPayload } from "@/interfaces/httpRequest/IAuthentication";
import { requestLogin } from "@/apis/authentication";
import { ACCESS_TOKEN } from "@/constant/app";
interface IFormValues {
	// from?: string;
	// to?: string;
	// ticket?: number;
	phone: string;
	password: string;
	rePassword: string;
}
const SignInForm = () => {
	const translate = useTrans();
	const { ERROR, SIGNIN } = translate;
	const [loginError, setLoginError] = useState("");
	const schema = yup.object().shape({
		// phone: yup
		// 	.string()
		// 	.matches(
		// 		/(^^(09|03|07|08|05|02)+([0-9]{8,9})$)|^$/,
		// 		"Số điện thoại không đúng định dạng",
		// 	)
		// 	.required(ERROR.errorRequired),
		// password: yup
		// 	.string()
		// 	.trim()
		// 	.required("Mật khẩu không được để trống")
		// 	.min(8, "Mật khẩu tối thiểu 8 ký tự.")
		// 	.test(
		// 		"passwordRequirements",
		// 		"Mật khẩu phải có chữ thường, chữ hoa ,số và ký tự đặc biệt",
		// 		(value) =>
		// 			[/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/].every(
		// 				(pattern) => pattern.test(value),
		// 			),
		// 	),

		phone: yup
			.string()

			.required(ERROR.errorRequired),
		password: yup.string().trim().required("Mật khẩu không được để trống"),
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
			phone: "",
			password: "",
		},
	});

	const onSubmit = async (data: ILoginPayload) => {
		const res = await requestLogin(data);
		if (res?.statusCode === 200) {
			localStorage.setItem(ACCESS_TOKEN, res?.data?.renewToken);
			window.location.assign("/");
		} else {
			setLoginError(
				res?.errorMessage
					? res?.errorMessage
					: SIGNIN.phoneAndPassWrong,
			);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='p-6 '>
			<div className='flex flex-col gap-5'>
				<div>
					<InputTextFloat
						name={"phone"}
						showError={false}
						placeholder={SIGNIN.phoneNumber}
						register={register}
						errors={errors}
						// required={true}
						title={SIGNIN.phoneNumber}
					/>
					{/* {errors["phone"]?.message && (
						<p className='mt-[6px] text-xs text-semantic-red font-semibold leading-[18px]'>
							{`${errors["phone"]?.message}`}
						</p>
					)} */}
				</div>
				<div>
					<InputTextFloat
						name={"password"}
						type='password'
						showError={false}
						placeholder={SIGNIN.placeholderPassword}
						register={register}
						errors={errors}
						// required={true}
						title={SIGNIN.password}
					/>
				</div>
			</div>
			<div className='mt-7 flex flex-col items-center justify-center gap-3'>
				{loginError !== "" && (
					<div className='flex items-center mt-[6px] gap-1'>
						<ExclamimationCircleIcon />
						<p className=' text-sm text-semantic-red font-medium leading-[21px]'>
							{loginError}
						</p>
					</div>
				)}
				<Button
					btnColor='disabled:bg-primary-600 bg-primary-500 disabled:opacity-100 group'
					height='h-11'
					borderRadius='rounded-full'
					borderColor='border-none'
					color='group-disabled:text-opacity-60 text-white '
					disabled={!isValid && loginError !== ""}
					actionType='submit'
					// onClick={() => handleClickSignIn()}
				>
					{SIGNIN.signIn}
				</Button>

				<p
					onClick={() => {
						window.location.assign(`/quen-mat-khau`);
					}}
					className='text-sm font-semibold leading-[21px] text-secondary-300 underline cursor-pointer'>
					{SIGNIN.forgotpassword2}
				</p>
			</div>
		</form>
	);
};

export default SignInForm;
