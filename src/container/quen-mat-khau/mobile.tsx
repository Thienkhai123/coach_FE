import { forgetPasswordVerifyCode } from "@/apis/authentication";
import ForgotPasswordFormValidateNewPasswordMobile from "@/components/form/forgot-password/mobile/formValidateNewPassword";
import ForgotPasswordFormValidatePhoneMobile from "@/components/form/forgot-password/mobile/formValidatePhone";
import FormOtpMobile from "@/components/form/otp-mobile";
import { useCustomToast } from "@/hook/useToast";
import useTrans from "@/hook/useTrans";
import { IErrorTranslate } from "@/interfaces/IErrorTranslate";
import { IPlaceholderTranslate } from "@/interfaces/IPlaceholderTranslate";
import { ISignInTranslate } from "@/interfaces/ISignInTranslate";
import { useState } from "react";

const ContainerForgotPasswordMobile = () => {
  const {
    SIGNIN,
    PLACEHOLDER,
    ERROR,
  }: {
    SIGNIN: ISignInTranslate;
    PLACEHOLDER: IPlaceholderTranslate;
    ERROR: IErrorTranslate;
  } = useTrans();
  const [tab, setTab] = useState(1);
  const [payloadFP, setPayloadFP] = useState({
    phone: "",
    password: "",
    code: "",
  });
  const [errorOtp, setErrorOtp] = useState("");

  const handleChangeNextTab = () => {
    setTab(tab + 1);
  };

  const handleChangePrevTab = () => {
    if (tab > 1) {
      setTab(tab - 1);
    } else {
      window.location.assign("/");
    }
  };

  const handleSavePhoneToPayload = (phone: string) => {
    setPayloadFP({
      ...payloadFP,
      phone: phone,
    });
    handleChangeNextTab();
  };

  const handleValidateOtp = async (code: string) => {
    const res = await forgetPasswordVerifyCode({
      code: code,
      phone: payloadFP?.phone,
    });
    if (res?.isSuccess) {
      setPayloadFP({
        ...payloadFP,
        code: code,
      });
      handleChangeNextTab();
    } else {
      setErrorOtp(res?.errorMessage);
    }
  };

  return (
    <div>
      {tab === 1 && (
        <ForgotPasswordFormValidatePhoneMobile
          SIGNIN={SIGNIN}
          PLACEHOLDER={PLACEHOLDER}
          ERROR={ERROR}
          handleSavePhoneToPayload={handleSavePhoneToPayload}
          handleChangePrevTab={handleChangePrevTab}
        />
      )}

      {tab === 2 && (
        <FormOtpMobile
          SIGNIN={SIGNIN}
          payload={payloadFP}
          title={SIGNIN.forgotpassword}
          onBack={handleChangePrevTab}
          handleSubmitOtp={handleValidateOtp}
          errorOtp={errorOtp}
        />
      )}

      {tab === 3 && (
        <ForgotPasswordFormValidateNewPasswordMobile
          SIGNIN={SIGNIN}
          ERROR={ERROR}
          payload={payloadFP}
          handleChangePrevTab={handleChangePrevTab}
        />
      )}
    </div>
  );
};

export default ContainerForgotPasswordMobile;
