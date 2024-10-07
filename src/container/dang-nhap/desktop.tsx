import useTrans from "@/hook/useTrans";
import Footer from "@/components/footer";
import { useState } from "react";
import SignUpForm from "@/components/Pages/dang-nhap/signUp";
import SignInForm from "@/components/Pages/dang-nhap/signIn";

import OTPStepForm from "@/components/Pages/dang-nhap/otpStepForm";
import Modal from "@/components/modal/Modal";
import useModal from "@/hook/useModal";

import Header from "@/components/header";
import SignUpSuccessIcon from "@/components/icons/signUpSuccess";
import {
	requestLogin,
	requestRegister,
	requestRegisterVerify,
} from "@/apis/authentication";
import { ACCESS_TOKEN } from "@/constant/app";
import { useCustomToast } from "@/hook/useToast";
import { delay } from "lodash";
import LoadingView from "@/components/LoadingView";

const ContainerSignInDesktop = ({ defaultTab = 0 }) => {
	const translate = useTrans();
	const { ERROR, SIGNIN } = translate;
	const [tab, setTab] = useState(defaultTab);
	const [step, setStep] = useState(1);
	const [signUpSucessModal, toggleSignUpSucessModal] = useModal();
	const { toastError, toastSuccess } = useCustomToast();
	const [phone, setPhone] = useState("");
	const [password, setPassword] = useState("");
	const [rePassword, setRePassword] = useState("");
	const [errorOtpCode, setErrorOtpCode] = useState("");
	const [isLoading, setLoading] = useState(false);

	const handleNextStep = () => {
		setStep(step + 1);
	};

	const handleOnCloseModal = async () => {
		setLoading(true);
		const payload = {
			phone: phone,
			password: password,
		};
		const res = await requestLogin(payload);
		if (res?.statusCode === 200) {
			localStorage.setItem(ACCESS_TOKEN, res?.data?.renewToken);
			toggleSignUpSucessModal();
			window.location.assign(`/`);
		} else {
			setLoading(false);
			toastError({ message: res?.errorMessage, toastId: "login-failed" });
		}
		setLoading(false);
	};
	const handleSubmitSignUp = async (data?: any) => {
		setLoading(true);
		const { phone, password, rePassword } = data || {};
		if (phone && password && rePassword) {
			setPhone(phone);
			setPassword(password);
			setRePassword(rePassword);
			const payload = {
				phone: phone,
				// password: password,
				// rePassword: password,
			};
			const res = await requestRegisterVerify(payload);
			if (res?.isSuccess) {
				setLoading(false);
				handleNextStep();
			} else {
				setLoading(false);
				toastError({
					message: res?.errorMessage,
					toastId: "register-failed",
				});
			}
		}
	};
	const resendOtp = async () => {
		setLoading(true);

		if (phone && password && rePassword) {
			const payload = {
				phone: phone,
			};
			const res = await requestRegisterVerify(payload);
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
					toastId: "register-failed",
				});
			}
		}
	};
	function delay(ms: number) {
		return new Promise((resolve) => {
			setTimeout(resolve, ms);
		});
	}
	const handleValidateOtp = async (otpCode: string) => {
		setLoading(true);
		if (otpCode?.length < 4) {
			setErrorOtpCode(SIGNIN.otpInvalid);
			return;
		}

		const payload = {
			phone: phone,
			password: password,
			verifyCode: otpCode,
		};
		const res = await requestRegister(payload);
		if (res?.isSuccess) {
			setLoading(false);
			toggleSignUpSucessModal();
			await delay(3000);
			handleOnCloseModal();
		} else {
			setLoading(false);
			setErrorOtpCode(res?.errorMessage);
		}
	};

	return (
		<div className='flex flex-col h-full'>
			{isLoading && <LoadingView />}
			<Header />
			<div className='bg-[#ececec] flex-1'>
				{step === 1 && (
					<div className='pb-[60px]'>
						<div className='max-w-[500px] flex flex-col  mx-auto   pt-10 '>
							<div className='bg-white w-full max-h-[668px] min-h-[574px] rounded-2xl shadow-[12px_12px_16px_-4px_rgba(0,0,0,0.08),0px_4px_6px_-2px_rgba(0,0,0,0.03)]'>
								<div className='py-6 bg-primary-900 rounded-t-2xl'>
									<div className="w-full h-[240px] bg-[url('/images/signInBackground.png')] bg-contain"></div>
								</div>
								<div className=' bg-white h-fit  transition-all pb-4 w-full -mt-6 rounded-3xl shadow-[0px_-2px_8px_-2px_rgba(0,0,0,0.03),0px_2px_4px_-2px_rgba(0,0,0,0.06)]'>
									{/* ---------------Tab----------------- */}
									<div className='grid grid-cols-2'>
										<div
											onClick={() => {
												// setTab(0);
												window.location.assign(
													"/dang-ky",
												);
											}}
											className={`p-3 rounded-tl-3xl flex items-center justify-center relative cursor-pointer border-b-[1.5px] transition-all ${
												tab === 0
													? "bg-secondary-600 border-secondary-300"
													: "border-l-neutral-grey-200"
											}`}>
											<p
												className={`text-sm leading-[21px] ${
													tab === 0
														? "font-bold text-secondary-300"
														: "font-semibold text-neutral-grey-600"
												}`}>
												{SIGNIN.signUp}
											</p>
										</div>
										<div
											onClick={() => {
												// setTab(1);
												window.location.assign(
													"/dang-nhap",
												);
											}}
											className={`p-3 rounded-tr-3xl flex items-center justify-center cursor-pointer relative  border-b-[1.5px] transition-all ${
												tab === 1
													? "bg-secondary-600 border-secondary-300"
													: "border-l-neutral-grey-200"
											}`}>
											<p
												className={`text-sm leading-[21px] ${
													tab === 1
														? "font-bold text-secondary-300"
														: "font-semibold text-neutral-grey-600"
												}`}>
												{SIGNIN.signIn}
											</p>
										</div>
									</div>
									{/* ---------------Tab----------------- */}
									{tab === 0 && (
										<div>
											<SignUpForm
												handleOnClickSignUp={
													handleSubmitSignUp
												}
											/>
										</div>
									)}
									{tab === 1 && (
										<div>
											<SignInForm />
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				)}
				{step === 2 && (
					<div className='min-h-[608px] flex flex-col items-center justify-center'>
						<OTPStepForm
							phone={phone}
							handleValidateOtp={handleValidateOtp}
							setErrorOtpCode={setErrorOtpCode}
							errorOtpCode={errorOtpCode}
							handleResendCode={resendOtp}
						/>
					</div>
				)}
			</div>
			<Footer />
			<Modal
				open={signUpSucessModal}
				toggleModal={handleOnCloseModal}
				modalStyle='w-[100vw] h-[100vh] flex justify-center items-center fixed bg-black/30 z-[100] left-[calc(0%)] top-[calc(0%)]'
				childStyle='w-[500px] bg-white md:rounded-xl md:min-h-fit min-h-full mx-0  overflow-hidden duration-200 animate-fade-in '>
				<div>
					<div className='mx-auto flex justify-center mb-4'>
						<SignUpSuccessIcon />
					</div>
					<p className='mb-2 text-semantic-green text-base font-bold text-center'>
						{`Đăng ký tài khoản thành công`}
					</p>
					<p className='text-neutral-grey-700 font-medium text-sm text-center'>
						{`Lorem ipsum dolor sit amet consectetur. Varius enim dolor nec duis ac sapien eros dui aliquet.`}
					</p>
				</div>
			</Modal>
		</div>
	);
};

export default ContainerSignInDesktop;
