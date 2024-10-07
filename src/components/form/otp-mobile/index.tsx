import Button from "@/components/button";
import ExclamimationCircleIcon from "@/components/icons/exclamimation-circle";
import NavbarBasic from "@/components/navbar/basic";
import { hidePhoneNumber } from "@/helpers/functionHelper";
import { ISignInTranslate } from "@/interfaces/ISignInTranslate";
import React, { useState } from "react";
import OtpInput from "react-otp-input";

interface IFormValues {
  phone?: string;
  password?: string;
  rePassword?: string;
}

type PayloadT = {
  phone?: string;
  password?: string;
  code?: string;
};

interface IFormOtpMobileProps {
  SIGNIN: ISignInTranslate;
  payload: PayloadT;
  title: string;
  errorOtp: string;
  onBack: () => void;
  handleSubmitOtp: (arg: string) => void;
}

const FormOtpMobile = (props: IFormOtpMobileProps) => {
  const { SIGNIN, payload, title, errorOtp, onBack, handleSubmitOtp } = props;
  const { phone } = payload;
  const [otp, setOtp] = useState("");

  const handleChangeOtp = (val = "") => {
    if (val.match(/^\d+$/)) {
      setOtp(val);
      return;
    }
  };

  return (
    <div>
      <NavbarBasic title={title} handleClick={onBack} />
      <div className="py-6 px-4">
        <p className="text-neutral-grey-700 font-semibold text-lg mb-1">
          {SIGNIN.validateOtp}
        </p>
        <p className="text-neutral-grey-600 font-medium text-sm">
          {SIGNIN.pleaseFillOtpFromPhone}{" "}
          <span className="font-bold">{hidePhoneNumber(phone)}</span>
        </p>

        <div className="flex flex-col items-center justify-center mt-8">
          <OtpInput
            value={otp}
            onChange={handleChangeOtp}
            numInputs={4}
            renderSeparator={<span className="w-2"></span>}
            containerStyle="mx-auto"
            inputStyle={{
              width: "56px",
              height: "40px",
              borderBottom: "2px solid #D9D9D9",
              color: "black",
              outline: "none",
            }}
            renderInput={(props) => <input {...props} />}
          />
          {errorOtp && (
            <div className="mt-4 flex items-center justify-center gap-1">
              <ExclamimationCircleIcon />
              <p className="text-xs leading-[18px] text-semantic-red font-semibold ">
                {errorOtp}
              </p>
            </div>
          )}
        </div>

        <div className="mt-7">
          <Button onClick={() => handleSubmitOtp(otp)}>{SIGNIN.submit}</Button>
        </div>

        <div className="mt-3">
          <p className="text-neutral-grey-600 font-medium text-sm text-center">
            {SIGNIN.notReceivedOtp}
            {"  "}
            <span className="text-secondary-300 font-semibold underline">
              {SIGNIN.resendOtp}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FormOtpMobile;
