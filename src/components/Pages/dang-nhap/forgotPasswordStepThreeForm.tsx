import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useTrans from "@/hook/useTrans";

import Button from "@/components/button";

import ExclamimationCircleIcon from "@/components/icons/exclamimation-circle";
import InputTextFloat from "@/components/input/text-float";
import GreenCircleCheckIcon from "@/components/icons/green-circle-check";
interface IForgotStepThree {
	handleValidate: () => void;
}
const ForgotPasswordStepThreeForm = (props: IForgotStepThree) => {
	const { handleValidate = () => {} } = props;
	const translate = useTrans();
	const { ERROR, SIGNIN } = translate;

	const schema = yup.object().shape({
		password: yup
			.string()
			.trim()
			.required("Mật khẩu không được để trống")
			.min(8, "Mật khẩu tối thiểu 8 ký tự.")
			.test("passwordRequirements", SIGNIN.rulePassword, (value) =>
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
	} = useForm<any>({
		resolver: yupResolver(schema),
		mode: "onChange",
		defaultValues: {
			password: "",
			rePassword: "",
		},
	});

	return (
		<form
			onSubmit={handleSubmit(handleValidate)}
			className='w-[500px]  px-4 py-10 bg-white rounded-2xl shadow-[12px_12px_16px_-4px_rgba(0,0,0,0.08),0px_4px_6px_-2px_rgba(0,0,0,0.03)]'>
			<div className='mt-6 flex flex-col items-center'>
				<p className='text-lg font-semibold leading-[27px] text-neutral-grey-700'>
					{SIGNIN.resetPassword}
				</p>

				<div className='mt-4 mb-7 w-full flex flex-col gap-4'>
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
				<Button
					btnColor='disabled:bg-primary-600 bg-primary-500 disabled:opacity-100 group'
					height='h-11'
					borderRadius='rounded-full'
					borderColor='border-none'
					color='group-disabled:text-opacity-60 text-white '
					disabled={!isValid}
					actionType='submit'
					// onClick={() => onSubmit()}
				>
					{SIGNIN.submit}
				</Button>
			</div>
		</form>
	);
};

export default ForgotPasswordStepThreeForm;
