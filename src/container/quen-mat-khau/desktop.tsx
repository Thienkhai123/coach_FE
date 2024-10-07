import {
	forgetPasswordVerifyCode,
	requestForgetPassword,
	requestForgetPasswordVerify,
} from "@/apis/authentication";
import LoadingView from "@/components/LoadingView";
import ForgotPasswordStepOneForm from "@/components/Pages/dang-nhap/forgotPasswordStepOneForm";
import ForgotPasswordStepThreeForm from "@/components/Pages/dang-nhap/forgotPasswordStepThreeForm";
import OTPStepForm from "@/components/Pages/dang-nhap/otpStepForm";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { useCustomToast } from "@/hook/useToast";
import useTrans from "@/hook/useTrans";
import { useState } from "react";

const ContainerForgotPasswordDesktop = () => {
	const translate = useTrans();
	const { ERROR, SIGNIN } = translate;
	const [step, setStep] = useState(1);
	const [phone, setPhone] = useState("");
	const { toastError, toastSuccess } = useCustomToast();
	const [errorOtpCode, setErrorOtpCode] = useState("");
	const [errorPhone, setErrorPhone] = useState("");
	const [otpCode, setOtpCode] = useState("");
	const [isLoading, setLoading] = useState(false);

	const handleOnClickNextStep = () => {
		setStep(step + 1);
	};

	const handleValidateOtp = async (otpCode: string) => {
		setLoading(true);
		if (otpCode?.length < 4) {
			setErrorOtpCode(SIGNIN.otpInvalid);
			return;
		}
		const payload = {
			phone: phone,
			code: otpCode,
		};
		const res = await forgetPasswordVerifyCode(payload);
		if (res?.isSuccess) {
			setOtpCode(otpCode);
			setLoading(false);
			handleOnClickNextStep();
		} else {
			setLoading(false);
			setErrorOtpCode(res?.errorMessage);
		}
	};
	const handleValidateNewPassword = async (data?: any) => {
		setLoading(true);
		const { password, rePassword } = data || {};

		const payload = {
			phone: phone,
			code: otpCode,
			newPassword: password,
			reEnterPassword: rePassword,
		};
		const res = await requestForgetPassword(payload);
		if (res?.isSuccess) {
			window.location.assign(`/dang-nhap`);
		} else {
			setLoading(false);
			toastError({ message: res?.errorMessage, toastId: "login-failed" });
		}
	};

	const handleSubmitPhone = async (data?: any) => {
		setLoading(true);
		const { phone } = data || {};
		if (phone) {
			setPhone(phone);
			const payload = {
				phone: phone,
			};
			const res = await requestForgetPasswordVerify(payload);
			if (res?.isSuccess) {
				setLoading(false);
				handleOnClickNextStep();
			} else {
				setLoading(false);
				setErrorPhone(res?.errorMessage);
			}
		}
	};

	const handleResendCode = async () => {
		setLoading(true);
		if (phone) {
			setPhone(phone);
			const payload = {
				phone: phone,
			};
			const res = await requestForgetPasswordVerify(payload);
			if (res?.isSuccess) {
				setLoading(false);
				toastSuccess({
					message: "Đã gửi lại OTP",
					toastId: "resend-success",
				});
			} else {
				setLoading(false);
				toastError({
					message: res?.errorMessage,
					toastId: "resend-failed",
				});
			}
		}
	};

	return (
		<div>
			{isLoading && <LoadingView />}
			<Header />
			<div className='bg-[#ececec] min-h-[608px] flex flex-col items-center justify-center'>
				{step === 1 && (
					<div className=''>
						<ForgotPasswordStepOneForm
							error={errorPhone}
							handleValidate={handleSubmitPhone}
						/>
					</div>
				)}
				{step === 2 && (
					<div className=''>
						<OTPStepForm
							handleValidateOtp={handleValidateOtp}
							setErrorOtpCode={setErrorOtpCode}
							errorOtpCode={errorOtpCode}
							phone={phone}
							handleResendCode={handleResendCode}
						/>
					</div>
				)}
				{step === 3 && (
					<ForgotPasswordStepThreeForm
						handleValidate={handleValidateNewPassword}
					/>
				)}
			</div>
			<Footer />
		</div>
	);
};

export default ContainerForgotPasswordDesktop;
