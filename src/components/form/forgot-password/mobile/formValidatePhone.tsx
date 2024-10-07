import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { REGEX_PHONE } from "@/constant/app";
import { ISignInTranslate } from "@/interfaces/ISignInTranslate";
import Button from "@/components/button";
import { IPlaceholderTranslate } from "@/interfaces/IPlaceholderTranslate";
import InputTextFloat from "@/components/input/text-float";
import { IErrorTranslate } from "@/interfaces/IErrorTranslate";
import { Fragment, useState } from "react";
import NavbarBasic from "@/components/navbar/basic";
import { requestForgetPasswordVerify } from "@/apis/authentication";
import { useCustomToast } from "@/hook/useToast";

interface IFormValues {
  phone: string;
}

const ForgotPasswordFormValidatePhoneMobile = ({
  SIGNIN,
  PLACEHOLDER,
  ERROR,
  handleSavePhoneToPayload,
  handleChangePrevTab,
}: {
  SIGNIN: ISignInTranslate;
  PLACEHOLDER: IPlaceholderTranslate;
  ERROR: IErrorTranslate;
  handleSavePhoneToPayload: (arg: string) => void;
  handleChangePrevTab: () => void;
}) => {
  const [isLoading, setLoading] = useState(false);
  const { toastError } = useCustomToast();

  const schema = yup.object().shape({
    phone: yup
      .string()
      .matches(REGEX_PHONE, ERROR.phoneInvalid)
      .required(SIGNIN.phoneInvalid),
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<IFormValues>({
    resolver: yupResolver<IFormValues>(schema),
    mode: "onChange",
  });

  const onSubmit = async (data: IFormValues) => {
    setLoading(true);
    // Call API validate phone here...
    const { isSuccess, errorMessage } = await requestForgetPasswordVerify({
      phone: data.phone,
    });
    if (isSuccess) {
      handleSavePhoneToPayload(data?.phone || "");
    } else {
      toastError({
        message: errorMessage,
        toastId: "verify-forgot-password-failed",
      });
    }
    setLoading(false);
  };

  return (
    <Fragment>
      <NavbarBasic
        title={SIGNIN.forgotpassword}
        handleClick={handleChangePrevTab}
      />
      <div className="py-6 px-4">
        <p className="text-neutral-grey-700 font-semibold text-lg">
          {PLACEHOLDER.placeholderPhone}
        </p>
        <p className="mt-1 text-neutral-grey-600 font-medium text-sm">
          {SIGNIN.noteForForgotPassword}
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 mt-10"
        >
          <div className="w-full">
            <InputTextFloat
              name={"phone"}
              showError={false}
              placeholder={SIGNIN.phoneNumber}
              register={register}
              errors={errors}
              title={SIGNIN.phoneNumber}
              type="number"
            />
            {errors["phone"]?.message && (
              <p className="text-xs text-semantic-red font-semibold">
                {`${errors["phone"]?.message}`}
              </p>
            )}
          </div>

          <div className="mt-9">
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
              {SIGNIN.receiveOtp}
            </Button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default ForgotPasswordFormValidatePhoneMobile;
