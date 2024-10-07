import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ACCESS_TOKEN, REGEX_PASSWORD, REGEX_PHONE } from "@/constant/app";
import { ISignInTranslate } from "@/interfaces/ISignInTranslate";
import Button from "@/components/button";
import { IErrorTranslate } from "@/interfaces/IErrorTranslate";
import InputTextFloat from "@/components/input/text-float";
import ExclamimationCircleIcon from "@/components/icons/exclamimation-circle";
import GreenCircleCheckIcon from "@/components/icons/green-circle-check";
import useModal from "@/hook/useModal";
import FullScreenModal from "@/components/modal/FullScreenModal";
import FormOtpMobile from "../../otp-mobile";
import { useState } from "react";
import Modal from "@/components/modal/Modal";
import RegisterSuccessIcon from "@/components/icons/registerSuccess";
import {
  requestLogin,
  requestRegister,
  requestRegisterVerify,
} from "@/apis/authentication";
import { useCustomToast } from "@/hook/useToast";

interface IFormValues {
  phone: string;
  password: string;
  rePassword: string;
}

const SignUpForm = ({
  SIGNIN,
  ERROR,
  setTab,
}: {
  defaultValues?: IFormValues;
  SIGNIN: ISignInTranslate;
  ERROR: IErrorTranslate;
  setTab: (arg: number) => void;
}) => {
  const { toastError } = useCustomToast();
  const [isLoading, setLoading] = useState(false);
  const [openModalOtp, toggleModalOtp] = useModal();
  const [openModalSuccess, toggleModalSuccess] = useModal();
  const [payload, setPayload] = useState<IFormValues>({
    phone: "",
    password: "",
    rePassword: "",
  });
  const [errorOtp, setErrorOtp] = useState("");

  const schema = yup.object().shape({
    phone: yup
      .string()
      .matches(REGEX_PHONE, ERROR.phoneInvalid)
      .required(SIGNIN.phoneInvalid),
    password: yup
      .string()
      .trim()
      .required(ERROR.errorRequired)
      .min(8, ERROR.min8Character)
      .test("passwordRequirements", ERROR.passwordInvalid, (value) =>
        REGEX_PASSWORD.every((pattern) => pattern.test(value))
      ),
    rePassword: yup
      .string()
      .trim()
      .required(ERROR.errorRequired)
      .oneOf([yup.ref("password")], ERROR.passwordNotMatch),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<IFormValues>({
    resolver: yupResolver<IFormValues>(schema),
    mode: "onChange",
  });

  const watchPassWord = watch("password") || "";
  const watchRePassWord = watch("rePassword") || "";

  const handleSubmitOtp = async (otp = "") => {
    setLoading(true);
    // call API register here
    const { errorMessage, isSuccess } = await requestRegister({
      phone: payload.phone,
      password: payload.password,
      verifyCode: otp,
    });
    if (isSuccess) {
      toggleModalOtp();
      toggleModalSuccess();
    } else {
      // toastError({ message: errorMessage, toastId: "register-failed" });
      setErrorOtp(errorMessage);
    }
    setLoading(false);
  };

  const handleCloseModalSuccess = async () => {
    setLoading(true);
    toggleModalSuccess();
    // Call api login
    const { isSuccess, data, errorMessage } = await requestLogin({
      phone: payload.phone,
      password: payload.password,
    });
    if (isSuccess) {
      localStorage.setItem(ACCESS_TOKEN, data?.renewToken);
      window.location.replace("/");
    } else {
      toastError({ message: errorMessage, toastId: "login-new-failed" });
    }
    setLoading(false);
  };

  const onSubmit = async (data: IFormValues) => {
    setLoading(true);
    // call API verify register here to check exist phone number and receive OTP
    const { errorMessage, isSuccess } = await requestRegisterVerify({
      phone: data.phone,
    });
    if (isSuccess) {
      setPayload(data);
      toggleModalOtp();
    } else {
      toastError({ message: errorMessage, toastId: "verify-register-failed" });
    }
    setErrorOtp("");
    setLoading(false);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 bg-white py-6 px-4"
      >
        <div className="w-full">
          <InputTextFloat
            name={"phone"}
            showError={false}
            placeholder={SIGNIN.phoneNumber}
            register={register}
            errors={errors}
            type="number"
            title={SIGNIN.phoneNumber}
          />
          {errors["phone"]?.message && (
            <p className="text-xs text-semantic-red font-semibold">
              {`${errors["phone"]?.message}`}
            </p>
          )}
        </div>

        <div className="w-full">
          <InputTextFloat
            name={"password"}
            type="password"
            showError={false}
            placeholder={SIGNIN.password}
            register={register}
            errors={errors}
            title={SIGNIN.password}
          />
          {watchPassWord?.length === 0 && !errors["password"]?.message ? (
            <p className="mt-[6px] text-xs text-neutral-grey-700 font-semibold leading-[18px]">
              {SIGNIN.rulePassword}
            </p>
          ) : errors["password"]?.message ? (
            <div className="flex items-center mt-[6px] gap-1">
              <ExclamimationCircleIcon />
              <p className=" text-xs text-semantic-red font-semibold leading-[18px]">
                {SIGNIN.rulePassword}
              </p>
            </div>
          ) : (
            <div className="flex items-center mt-[6px] gap-1">
              <GreenCircleCheckIcon />
              <p className=" text-xs text-semantic-green font-semibold leading-[18px]">
                {SIGNIN.rulePassword}
              </p>
            </div>
          )}
        </div>

        <div className="w-full">
          <InputTextFloat
            name={"rePassword"}
            type="password"
            showError={false}
            placeholder={SIGNIN.rePassword}
            register={register}
            errors={errors}
            title={SIGNIN.rePassword}
          />
          {watchRePassWord?.length === 0 ? (
            <p className=" text-xs text-neutral-grey-700 font-semibold leading-[18px]"></p>
          ) : watchPassWord !== watchRePassWord ? (
            <div className="flex items-center mt-[6px] gap-1">
              <ExclamimationCircleIcon />
              <p className=" text-xs text-semantic-red font-semibold leading-[18px]">
                {SIGNIN.passwordNotMatch}
              </p>
            </div>
          ) : (
            <div className="flex items-center mt-[6px] gap-1">
              <GreenCircleCheckIcon />
              <p className=" text-xs text-semantic-green font-semibold leading-[18px]">
                {SIGNIN.passwordMatch}
              </p>
            </div>
          )}
        </div>

        <div className="mt-3">
          <Button
            actionType="submit"
            disabled={!isValid || isLoading}
            borderRadius="rounded-full"
            btnColor={
              isValid || isLoading ? "bg-primary-500" : "bg-primary-600"
            }
            fontSize={
              isValid || isLoading ? "text-base" : "text-base opacity-50"
            }
          >
            {SIGNIN.signUp}
          </Button>
          <p className="mt-3 text-xs font-semibold text-neutral-grey-600 text-center">
            {SIGNIN.bySelectingAgree}{" "}
            <span className="text-secondary-300 underline cursor-pointer">
              {SIGNIN.termsOfService}
            </span>{" "}
            {SIGNIN.and}{" "}
            <span className="text-secondary-300 underline cursor-pointer">
              {SIGNIN.privacyPolicy}
            </span>
            .
          </p>
        </div>
      </form>
      <FullScreenModal open={openModalOtp}>
        <FormOtpMobile
          SIGNIN={SIGNIN}
          payload={payload}
          title={SIGNIN.validatePhone}
          onBack={toggleModalOtp}
          handleSubmitOtp={handleSubmitOtp}
          errorOtp={errorOtp}
        />
      </FullScreenModal>
      <Modal
        open={openModalSuccess}
        toggleModal={handleCloseModalSuccess}
        childStyle="animate-fade-in w-screen sm:w-[800px] xl:mx-0 mx-3 bg-white rounded-lg overflow-y-auto xl:h-fit max-h-[80vh]"
      >
        <div>
          <div className="flex justify-center">
            <RegisterSuccessIcon />
          </div>
          <p className="text-semantic-green font-bold text-base mt-4 mb-2 text-center">
            {SIGNIN.registerSuccess}
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default SignUpForm;
