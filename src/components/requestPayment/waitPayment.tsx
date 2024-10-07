import React, { FC } from "react";
import ClockWait from "../icons/clockWait";
import { IRequestPaymentTranslate } from "@/interfaces/IRequestPaymentTranslate";
import ClockWaitSuccess from "../icons/clockWaitSuccess";
import BoxWarningIcon from "../icons/boxWarning";

interface IWaitPayment {
  REQUESTPAYMENT: IRequestPaymentTranslate;
  type?: number;
}

const WaitPaymentFaild = (props: IWaitPayment) => {
  const { REQUESTPAYMENT } = props;
  return (
    <div className="lg:py-6 py-3 lg:px-[60px] px-2 bg-white rounded-lg flex flex-col gap-2 xl:w-[640px] w-full">
      <div className="w-fit mx-auto lg:block hidden">
        <ClockWait />
      </div>
      <div className="w-fit mx-auto lg:hidden block">
        <ClockWait width="48" height="48" />
      </div>
      <div>
        <p className="text-lg font-semibold text-primary-400 text-center">
          {REQUESTPAYMENT.waitPayment}
        </p>
        <div className="mt-1 ">
          <p className="text-neutral-grey-600 text-sm font-medium text-center">
            {REQUESTPAYMENT.contentWaitPayment}
          </p>
          <p className="text-neutral-grey-600 text-sm font-medium text-center">
            {REQUESTPAYMENT.contentLoginPyament}
          </p>
        </div>
      </div>
    </div>
  );
};

const WaitPaymentSuccess = (props: IWaitPayment) => {
  const { REQUESTPAYMENT } = props;
  return (
    <div className="py-6 px-[60px] bg-white rounded-lg flex flex-col gap-2 xl:w-[640px] w-full">
      <div className="w-fit mx-auto">
        <ClockWaitSuccess />
      </div>
      <div>
        <p className="text-lg font-semibold text-[#101F24] text-center">
          {REQUESTPAYMENT.waitPaymentSuccess}
        </p>
      </div>
    </div>
  );
};

const WaitPaymentPackageFaild = (props: IWaitPayment) => {
  const { REQUESTPAYMENT } = props;
  return (
    <div className="lg:py-6 py-3 lg:px-[60px] px-2 bg-white rounded-lg flex flex-col gap-2 xl:w-[640px] w-full">
      <div className="w-fit mx-auto lg:block hidden">
        <ClockWait />
      </div>
      <div className="w-fit mx-auto lg:hidden block">
        <ClockWait width="48" height="48" />
      </div>
      <div>
        <p className="text-lg font-semibold text-primary-400 text-center">
          {REQUESTPAYMENT.waitPayment}
        </p>
        <div className="mt-1 ">
          <p className="text-neutral-grey-600 text-sm font-medium text-center">
            {REQUESTPAYMENT.contentWaitPayment}!
          </p>
          <p className="text-neutral-grey-600 text-sm font-medium text-center">
            {REQUESTPAYMENT.contenPyamentFaild}{" "}
            <span
              className="font-semibold underline-offset-1 underline cursor-pointer"
              onClick={() => {
                window.location.assign("/tra-cuu-don-hang");
              }}
            >
              {REQUESTPAYMENT.contenPyamentLinkFaild}
            </span>{" "}
            {REQUESTPAYMENT.contenPyamentToCheck}!
          </p>
        </div>
      </div>
    </div>
  );
};

const WaitPaymentPackageSuccess = (props: IWaitPayment) => {
  const { REQUESTPAYMENT } = props;
  return (
    <div className="md:py-6 py-4 md:px-[40px] px-4 bg-white rounded-lg flex flex-col gap-2 xl:w-[640px] w-full">
      <div className="w-fit mx-auto">
        <ClockWaitSuccess />
      </div>
      <div>
        <p className="text-lg font-semibold text-[#101F24] text-center">
          {REQUESTPAYMENT.waitPaymentSuccess}
        </p>
      </div>
      <div className="bg-[#EDF8FF] rounded-lg py-3 px-4 mt-2">
        <div className="flex items-center gap-1">
          <BoxWarningIcon />
          <div className="text-sm font-bold text-[#0273BC]">
            {REQUESTPAYMENT.warningTitle}:
          </div>
        </div>
        <p className="text-sm font-semibold text-[#373738] mt-2">
          {" "}
          {REQUESTPAYMENT.warningDes}
        </p>
      </div>
    </div>
  );
};

const WaitPayment: FC<IWaitPayment> = (props) => {
  const { REQUESTPAYMENT, type = 1 } = props;
  if (type === 1) {
    return <WaitPaymentFaild REQUESTPAYMENT={REQUESTPAYMENT} />;
  } else if (type === 2) {
    return <WaitPaymentSuccess REQUESTPAYMENT={REQUESTPAYMENT} />;
  } else if (type === 3) {
    return <WaitPaymentPackageSuccess REQUESTPAYMENT={REQUESTPAYMENT} />;
  } else if (type === 4) {
    return <WaitPaymentPackageFaild REQUESTPAYMENT={REQUESTPAYMENT} />;
  }
};

export default WaitPayment;
