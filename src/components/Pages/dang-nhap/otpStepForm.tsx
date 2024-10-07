import useTrans from "@/hook/useTrans";

import { useState } from "react";
import Button from "@/components/button";
import OTPInput from "react-otp-input";
import ExclamimationCircleIcon from "@/components/icons/exclamimation-circle";
interface IOTPStep {
	handleValidateOtp: Function;
	setErrorOtpCode: Function;
	handleResendCode?: Function;
	errorOtpCode: string;
	phone: string;
}
const OTPStepForm = (props: IOTPStep) => {
	const {
		handleValidateOtp = () => {},
		setErrorOtpCode = () => {},
		handleResendCode = () => {},
		errorOtpCode,
		phone,
	} = props;
	const translate = useTrans();
	const { ERROR, SIGNIN } = translate;
	const [otp, setOtp] = useState("");

	const maskPhoneNumber = (phoneNumber: string) => {
		return `${phoneNumber.slice(0, 3)}******${phoneNumber.slice(-2)}`;
	};

	const handleChangeOtp = (val = "") => {
		setErrorOtpCode("");
		if (val.match(/^\d+$/)) {
			setOtp(val);
			return;
		}
	};

	return (
		<div className='w-[500px]  px-4 py-10 bg-white rounded-2xl shadow-[12px_12px_16px_-4px_rgba(0,0,0,0.08),0px_4px_6px_-2px_rgba(0,0,0,0.03)]'>
			<div className='mt-6 flex flex-col items-center'>
				<p className='text-lg font-semibold leading-[27px] text-neutral-grey-700'>
					{SIGNIN.validateOtp}
				</p>
				<p className='mt-2 text-sm font-medium text-neutral-grey-600'>
					{SIGNIN.pleaseFillOtpFromPhone}{" "}
					<span className='font-bold text-neutral-grey-700'>
						{maskPhoneNumber(phone)}
					</span>
				</p>
				<div className='mt-4 mb-10'>
					<OTPInput
						value={otp}
						onChange={handleChangeOtp}
						numInputs={4}
						renderSeparator={<span className='w-2'></span>}
						containerStyle={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
						inputStyle={{
							width: "52px",
							height: "52px",
							borderBottom: "2px solid #D9D9D9",
							color: errorOtpCode !== "" ? "#E61C1C" : "#101F24",
							fontSize: "28px",
							fontStyle: "normal",
							fontWeight: "600",
							lineHeight: "130%",
						}}
						renderInput={(props) => <input {...props} />}
					/>

					{errorOtpCode && (
						<div className='mt-4 flex items-center justify-center gap-1'>
							<ExclamimationCircleIcon />
							<p className='text-xs leading-[18px] text-semantic-red font-semibold '>
								{errorOtpCode}
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
					disabled={errorOtpCode !== ""}
					// actionType='submit'
					onClick={() => handleValidateOtp(otp)}>
					{SIGNIN.submit}
				</Button>
				<div className='mt-3'>
					<p className='text-sm font-medium text-neutral-grey-600 leading-[21px]'>
						{SIGNIN.notReceivedOtp}{" "}
						<span
							onClick={() => handleResendCode()}
							className='text-secondary-300 font-semibold underline cursor-pointer'>
							{SIGNIN.resendOtp}
						</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default OTPStepForm;
