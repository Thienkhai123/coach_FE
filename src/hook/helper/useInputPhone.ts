import { REGEX_PHONE } from "@/constant/app";
import { IErrorTranslate } from "@/interfaces/IErrorTranslate";
import { useState } from "react";

const useInputPhone = ({
  phone,
  ERROR,
}: {
  phone: string;
  ERROR: IErrorTranslate;
}) => {
  const [phoneNumber, setPhoneNumber] = useState(phone);
  const [errorPhone, setErrorPhone] = useState("");

  const handleChangePhone = (val = "") => {
    if (val === "") {
      setPhoneNumber(val);
      return;
    }
    if (val.match(/^\d+$/)) {
      if (!val.match(REGEX_PHONE)) {
        setErrorPhone(ERROR.phoneInvalid);
      } else {
        setErrorPhone("");
      }
      setPhoneNumber(val);
      return;
    }
  };
  return {
    phoneNumber,
    errorPhone,
    handleChangePhone,
  };
};

export default useInputPhone;
