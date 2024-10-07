import React from "react";

interface IDetailPaymentInformation {
  name: string;
  content: string;
  colorText?: string;
}

const DefaultPaymentInformation = (props: IDetailPaymentInformation) => {
  const { name, content, colorText = "#101F24" } = props;
  return (
    <div className="flex justify-between gap-3 w-full pb-2  border-b border-[#ECECEC]">
      <div className="text-sm min-w-fit font-medium text-neutral-grey-600">
        {name}
      </div>
      <div
        className="text-sm font-semibold text-neutral-grey-700 first-letter:uppercase"
        style={{ color: colorText, wordBreak: "break-word" }}
      >
        {content}
      </div>
    </div>
  );
};

const SecondPaymentInformation = (props: IDetailPaymentInformation) => {
  const { name, content, colorText = "#19191B" } = props;
  return (
    <div className="flex justify-between w-full pb-2 border-b border-[#ECECEC]">
      <div className="text-sm font-bold text-neutral-grey-700">{name}</div>
      <div
        className="text-base font-extrabold first-letter:uppercase"
        style={{ color: colorText, wordBreak: "break-word" }}
      >
        {content}
      </div>
    </div>
  );
};

const PaymentInformation = (props: {
  type?: number;
  name: string;
  content: string;
  colorText?: string;
}) => {
  const { type = 1, name, content, colorText = "#19191B" } = props;
  if (type === 1) {
    return (
      <DefaultPaymentInformation
        name={name}
        content={content}
        colorText={colorText}
      />
    );
  }
  if (type === 2) {
    return (
      <SecondPaymentInformation
        name={name}
        content={content}
        colorText={colorText}
      />
    );
  }
};

export default PaymentInformation;
