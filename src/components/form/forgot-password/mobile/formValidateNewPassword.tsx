import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Fragment } from "react";
import { ISignInTranslate } from "@/interfaces/ISignInTranslate";
import Button from "@/components/button";
import NavbarBasic from "@/components/navbar/basic";
import { REGEX_PASSWORD } from "@/constant/app";
import { IErrorTranslate } from "@/interfaces/IErrorTranslate";
import InputTextFloat from "@/components/input/text-float";
import ExclamimationCircleIcon from "@/components/icons/exclamimation-circle";
import GreenCircleCheckIcon from "@/components/icons/green-circle-check";
import Modal from "@/components/modal/Modal";
import RegisterSuccessIcon from "@/components/icons/registerSuccess";
import useModal from "@/hook/useModal";
import { requestForgetPassword } from "@/apis/authentication";
import { useCustomToast } from "@/hook/useToast";

interface IFormValues {
  password: string;
  rePassword: string;
}

type PayloadT = {
  phone: string;
  password: string;
  code: string;
};

const ForgotPasswordFormValidateNewPasswordMobile = ({
  SIGNIN,
  ERROR,
  payload,
  handleChangePrevTab,
}: {
  defaultValues?: IFormValues;
  SIGNIN: ISignInTranslate;
  ERROR: IErrorTranslate;
  payload: PayloadT;
  handleChangePrevTab: () => void;
}) => {
  const { toastError } = useCustomToast();
  const [openModalSuccess, toggleModalSuccess] = useModal();

  const schema = yup.object().shape({
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

  const handleCloseModalSuccess = () => {
    toggleModalSuccess();
    window.location.assign("/dang-nhap");
  };

  const onSubmit = async (data: IFormValues) => {
    // Call API forgot password
    const { isSuccess, errorMessage } = await requestForgetPassword({
      code: payload.code,
      phone: payload.phone,
      newPassword: data.password,
      reEnterPassword: data.rePassword,
    });
    if (isSuccess) {
      toggleModalSuccess();
    } else {
      toastError({
        message: errorMessage,
        toastId: "forgot-password-failed",
      });
    }
  };

  return (
    <Fragment>
      <NavbarBasic
        title={SIGNIN.forgotpassword}
        handleClick={handleChangePrevTab}
      />
      <div className="py-6 px-4">
        <p className="text-neutral-grey-700 font-semibold text-lg mb-5">
          {SIGNIN.resetPassword}
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
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
          <div className="mt-7">
            <Button
              actionType="submit"
              disabled={!isValid}
              borderRadius="rounded-full"
              btnColor={isValid ? "bg-primary-500" : "bg-primary-600"}
              fontSize={isValid ? "text-base" : "text-base opacity-50"}
            >
              {SIGNIN.submit}
            </Button>
          </div>
        </form>
      </div>
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
            {SIGNIN.registerNewPasswordSuccess}
          </p>
        </div>
      </Modal>
    </Fragment>
  );
};

export default ForgotPasswordFormValidateNewPasswordMobile;
