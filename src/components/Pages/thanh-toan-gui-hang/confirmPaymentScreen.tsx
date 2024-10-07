import Button from "@/components/button";
import CountDown from "@/components/count-down";
import CopyIcon from "@/components/icons/copy";
import DownloadIcon from "@/components/icons/download";
import InfoIcon from "@/components/icons/info";
import NavbarBasic from "@/components/navbar/basic";
import ToastCopy from "@/components/toasts/copy";
import { ITranslation } from "@/interfaces/ITranslation";
import Image from "next/legacy/image";
import { Fragment, useState } from "react";
import { toast } from "react-toastify";

interface IConfirmPaymentScreenProps {
  translation: ITranslation;
  changeNextStep: () => void;
}

const FAKE_DATAS = {
  bank: {
    id: 1,
    value: "Vietcombank",
  },
  bankingNumber: {
    id: 2,
    value: "0400 0000 0000 00",
  },
  ownerAccount: {
    id: 3,
    value: "Công ty TNHH Du Lịch 338",
  },
  tranferContent: {
    id: 4,
    value: "[Số điện thoại người đặt] - [mã số chuyến xe] - [số ghế]",
  },
};

type InfoT = {
  bank: string;
  bankingNumber: string;
  ownerAccount: string;
  tranferContent: string;
};

type ValueT = {
  id: number;
  value: string;
};

type DataT = {
  bank: ValueT;
  bankingNumber: ValueT;
  ownerAccount: ValueT;
  tranferContent: ValueT;
};

const ConfirmPaymentTransportScreen = ({
  translation,
  changeNextStep,
}: IConfirmPaymentScreenProps) => {
  const { PAYMENT } = translation;
  const [expiredDuration, setExpiredDuration] = useState(900);

  const INFORMATION_BANKING = {
    bank: PAYMENT.bank,
    bankingNumber: PAYMENT.bankingNumber,
    ownerAccount: PAYMENT.ownerAccount,
    tranferContent: PAYMENT.tranferContent,
  };

  function copyText(text = "") {
    // Copy the text
    navigator.clipboard.writeText(text);

    // Alert the copied text
    toast(
      ToastCopy({
        message: PAYMENT.copied,
      }),
      {
        toastId: "alert-copy-text",
        className: "bg-toast-custom",
        closeButton: false,
        position: "bottom-center",
        hideProgressBar: true,
        autoClose: 3000,
      }
    );
  }

  return (
    <Fragment>
      <NavbarBasic title={PAYMENT.paymentInformation} />

      <div className="p-4 bg-white">
        <p className="text-center text-black font-medium text-base">
          {PAYMENT.paymentByQRCode}
        </p>

        <div className="flex items-center justify-center gap-7 my-2">
          <Image
            alt="qr-code"
            src="/images/qr-code.png"
            width={121}
            height={121}
          />
          <div className="flex flex-col items-center justify-center gap-1">
            <DownloadIcon />
            <p className="text-black font-medium text-sm">{PAYMENT.download}</p>
          </div>
        </div>

        <div className="flex">
          <div className="mt-1.5">
            <InfoIcon />
          </div>
          <p className="text-black font-normal text-sm">
            {PAYMENT.noteNoSupport}
          </p>
        </div>

        <div className="flex">
          <div className="mt-1.5">
            <InfoIcon />
          </div>
          <p className="text-black font-normal text-sm">
            {PAYMENT.noteCheckBeforePayment}
          </p>
        </div>

        <div className="my-3 flex gap-3 items-center">
          <div className="flex-1 border border-dashed"></div>
          <p className="text-[#61646B] text-sm font-semibold">{PAYMENT.or}</p>
          <div className="flex-1 border border-dashed"></div>
        </div>

        <div className="py-2">
          <div className="flex flex-col gap-4">
            {Object.keys(FAKE_DATAS)?.map((keyData, ind) => {
              const title = INFORMATION_BANKING[keyData as keyof InfoT];
              const { value } = FAKE_DATAS[keyData as keyof DataT];
              return (
                <div
                  key={ind}
                  className="flex gap-4 justify-between items-center"
                >
                  <div>
                    <p className="text-[#61646B] text-xs font-medium">
                      {title}
                    </p>
                    <p className="text-[#19191B] text-sm font-medium">
                      {value}
                    </p>
                  </div>

                  <div>
                    <button
                      className="py-2 px-3 bg-[#EFEFF0] rounded-lg w-[101px]"
                      onClick={() => copyText(value)}
                    >
                      <div className="flex items-center gap-1">
                        <CopyIcon />
                        <p className="text-[#19191B] font-medium text-xs">
                          {PAYMENT.copy}
                        </p>
                      </div>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-4">
          <p className="text-black text-sm font-semibold text-center mb-3">
            {PAYMENT.timeLeft}{" "}
            {expiredDuration && <CountDown inputTimer={expiredDuration} />}
            {!expiredDuration && "--:--"}
          </p>
          <div className="flex gap-1">
            <Button
              width="w-[100px]"
              btnColor="bg-common"
              color="text-black"
              borderType="border-none"
            >
              {PAYMENT.cancel}
            </Button>

            <Button onClick={changeNextStep}>{PAYMENT.confirmPayment}</Button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmPaymentTransportScreen;
