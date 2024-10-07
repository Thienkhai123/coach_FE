import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useTrans from "@/hook/useTrans";
import InputText from "@/components/input/text";
import InputTextFloat from "@/components/input/text-float";
import Button from "@/components/button";
import ExclamimationCircleIcon from "@/components/icons/exclamimation-circle";
import GreenCircleCheckIcon from "@/components/icons/green-circle-check";
interface ISignUpForm {
	handleOnClickSignUp: () => void;
}
interface IFormValues {
	// from?: string;
	// to?: string;
	// ticket?: number;
	phone: string;
	password: string;
	rePassword: string;
}
const SignUpForm = ({ handleOnClickSignUp = () => {} }) => {
	const translate = useTrans();
	const { ERROR, SIGNIN } = translate;
	const schema = yup.object().shape({
		phone: yup
			.string()
			.matches(
				/(^^(09|03|07|08|05|02)+([0-9]{8,9})$)|^$/,
				"Số điện thoại không đúng định dạng",
			)
			.required(SIGNIN.phoneInvalid),
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
			rePassword: "",
		},
	});
	return (
		<form onSubmit={handleSubmit(handleOnClickSignUp)} className='p-6'>
			<div className='flex flex-col gap-4'>
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
					{errors["phone"]?.message && (
						<p className='mt-[6px] text-xs text-semantic-red font-semibold leading-[18px]'>
							{`${errors["phone"]?.message}`}
						</p>
					)}
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
					{watch("password").length === 0 &&
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
					<InputTextFloat
						name={"rePassword"}
						type='password'
						showError={false}
						placeholder={SIGNIN.rePassword}
						register={register}
						errors={errors}
						// required={true}
						title={SIGNIN.rePassword}
					/>
					{watch("rePassword").length === 0 &&
					!errors["rePassword"]?.message ? (
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
			<div className='mt-7'>
				<Button
					btnColor='disabled:bg-primary-600 bg-primary-500 disabled:opacity-100 group'
					height='h-11'
					borderRadius='rounded-full'
					borderColor='border-none'
					color='group-disabled:text-opacity-60 text-white '
					disabled={!isValid}
					// actionType='submit'
					onClick={() => handleOnClickSignUp()}>
					{SIGNIN.signUpNow}
				</Button>
				<p className='mt-3 text-xs font-semibold text-neutral-grey-600 text-center'>
					{SIGNIN.bySelectingAgree}{" "}
					<span className='text-secondary-300 underline cursor-pointer'>
						{SIGNIN.termsOfService}
					</span>{" "}
					{SIGNIN.and}{" "}
					<span className='text-secondary-300 underline cursor-pointer'>
						{SIGNIN.privacyPolicy}
					</span>
					.
				</p>
			</div>
		</form>
	);
};

export default SignUpForm;
