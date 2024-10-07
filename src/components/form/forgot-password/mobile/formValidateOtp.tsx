import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { ISignInTranslate } from "@/interfaces/ISignInTranslate";
import OtpInput from "react-otp-input";
import Button from "@/components/button";

const ForgotPasswordFormValidateOtpMobile = ({
  SIGNIN,
  handleValidateOtp,
}: {
  SIGNIN: ISignInTranslate;
  handleValidateOtp: (arg: string) => void;
}) => {
  const [otp, setOtp] = useState("");
  const [errorOtpCode, setErrorOtpCode] = useState("");

  const schema = yup.object().shape({});

  const { handleSubmit } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const handleChangeOtp = (val = "") => {
    if (val.match(/^\d+$/)) {
      setOtp(val);
      return;
    }
  };

  const onSubmit = async () => {
    if (otp?.length < 4) {
      setErrorOtpCode(SIGNIN.otpInvalid);
      return;
    }
    handleValidateOtp(otp);
  };

  return (
    <div>
      <p className="text-center text-black font-semibold text-xl mb-5">
        {SIGNIN.pleaseFillOtp}
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <OtpInput
          value={otp}
          onChange={handleChangeOtp}
          numInputs={4}
          renderSeparator={<span className="w-5"></span>}
          containerStyle="mx-auto"
          inputStyle={{
            width: "52px",
            height: "52px",
            border: "1px solid #AFB1B6",
            color: "black",
          }}
          renderInput={(props) => <input {...props} />}
        />

        {errorOtpCode && (
          <p className="text-[14px] leading-5 text-red-500 text-center mt-1">
            {errorOtpCode}
          </p>
        )}
        <div className="mt-4">
          <Button actionType="submit">{SIGNIN.submit}</Button>
        </div>
      </form>

      <p className="mt-5 text-center leading-5 font-medium text-[14px] text-[#313131]">
        {SIGNIN.notReceivedOtp}
      </p>
    </div>
  );
};

export default ForgotPasswordFormValidateOtpMobile;
