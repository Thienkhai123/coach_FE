import React from "react";

interface IInputPhoneProps {
  title: string;
  phoneNumber: string;
  errorPhone: string;
  required?: boolean;
  placeholder?: string;
  handleChangePhone: (arg: any) => void;
}

const InputPhone = (props: IInputPhoneProps) => {
  const {
    title,
    handleChangePhone,
    phoneNumber,
    errorPhone,
    required,
    placeholder = "Nhập số điện thoại",
  } = props;
  return (
    <div className="w-full">
      <p className="text-sm font-medium text-neutral-grey-700 mb-1">
        {title} {required && <span className="text-semantic-red">*</span>}
      </p>
      <input
        className="border border-[#AFB1B6] py-2 px-4 rounded-lg w-full"
        placeholder={placeholder}
        type="tel"
        value={phoneNumber}
        onChange={(e: any) => handleChangePhone(e.target.value)}
      />
      {errorPhone && (
        <p className="text-[14px] leading-5 text-red-500">{errorPhone}</p>
      )}
    </div>
  );
};

export default InputPhone;
