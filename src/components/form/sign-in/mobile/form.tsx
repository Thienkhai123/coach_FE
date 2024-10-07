import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ACCESS_TOKEN, REGEX_PHONE } from "@/constant/app";
import { ISignInTranslate } from "@/interfaces/ISignInTranslate";
import Button from "@/components/button";
import { IErrorTranslate } from "@/interfaces/IErrorTranslate";
import { IPlaceholderTranslate } from "@/interfaces/IPlaceholderTranslate";
import InputTextFloat from "@/components/input/text-float";
import { requestLogin } from "@/apis/authentication";
import { useCustomToast } from "@/hook/useToast";
import { useState } from "react";

interface IFormValues {
  phone: string;
  password: string;
}

const SignInForm = ({
  SIGNIN,
  ERROR,
  PLACEHOLDER,
}: {
  defaultValues?: IFormValues;
  SIGNIN: ISignInTranslate;
  ERROR: IErrorTranslate;
  PLACEHOLDER: IPlaceholderTranslate;
}) => {
  const { toastError } = useCustomToast();
  const [isLoading, setLoading] = useState(false);
  const schema = yup.object().shape({
    phone: yup
      .string()
      .matches(REGEX_PHONE, ERROR.phoneInvalid)
      .required(SIGNIN.phoneInvalid),
    password: yup
      .string()
      .trim()
      .required(ERROR.errorRequired)
      .min(8, ERROR.min8Character),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormValues>({
    resolver: yupResolver<IFormValues>(schema),
    mode: "onChange",
  });

  const onSubmit = async (data: IFormValues) => {
    setLoading(true);
    const {
      errorMessage,
      isSuccess,
      data: dataResponse,
    } = await requestLogin(data);
    if (isSuccess) {
      localStorage.setItem(ACCESS_TOKEN, dataResponse?.renewToken);
      window.location.replace("/");
    } else {
      toastError({ message: errorMessage, toastId: "login-failed" });
    }
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
            title={SIGNIN.phoneNumber}
            type="number"
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
          {errors?.password?.message && (
            <p className="text-xs text-semantic-red">
              {errors?.password?.message}
            </p>
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
            {SIGNIN.signIn}
          </Button>
          <a href="/quen-mat-khau">
            <p className="text-secondary-300 font-semibold text-sm mt-3 text-center">
              {SIGNIN.forgotpassword2}
            </p>
          </a>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
