import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useTrans from "@/hook/useTrans";

import Button from "@/components/button";

import ExclamimationCircleIcon from "@/components/icons/exclamimation-circle";
import InputTextFloat from "@/components/input/text-float";
interface IOTPStep {
	handleValidate: () => void;
	error?: string;
}
const ForgotPasswordStepOneForm = (props: IOTPStep) => {
	const { handleValidate = () => {}, error = "" } = props;
	const translate = useTrans();
	const { ERROR, SIGNIN } = translate;

	const schema = yup.object().shape({
		phone: yup
			.string()
			.matches(
				/(^^(09|03|07|08|05|02)+([0-9]{8,9})$)|^$/,
				SIGNIN.phoneInvalid,
			)
			.required(SIGNIN.phoneInvalid),
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
		mode: "onSubmit",
		defaultValues: {
			phone: "",
		},
	});

	return (
		<form
			onSubmit={handleSubmit(handleValidate)}
			className='w-[500px]  px-4 py-10 bg-white rounded-2xl shadow-[12px_12px_16px_-4px_rgba(0,0,0,0.08),0px_4px_6px_-2px_rgba(0,0,0,0.03)]'>
			<div className='mt-6 flex flex-col items-center'>
				<p className='text-lg font-semibold leading-[27px] text-neutral-grey-700'>
					{SIGNIN.forgotpassword}
				</p>
				<p className='mt-2 mb-4 text-sm font-medium text-neutral-grey-600 text-center'>
					{SIGNIN.noteForForgotPassword}
				</p>
				<div className='mt-4 mb-9 w-full'>
					<InputTextFloat
						name={"phone"}
						showError={false}
						placeholder={SIGNIN.phoneNumber}
						register={register}
						errors={errors}
						// required={true}
						title={SIGNIN.phoneNumber}
					/>

					{(errors["phone"]?.message || error !== "") && (
						<div className='mt-4 flex items-center justify-center gap-1'>
							<ExclamimationCircleIcon />
							<p className='text-xs leading-[18px] text-semantic-red font-semibold '>
								{`${errors["phone"]?.message || error}`}
							</p>
						</div>
					)}
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

export default ForgotPasswordStepOneForm;
