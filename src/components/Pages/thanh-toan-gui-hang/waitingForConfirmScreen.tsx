import Button from "@/components/button";
import ArrowLeftIcon from "@/components/icons/arrowLeft";
import { ITranslation } from "@/interfaces/ITranslation";
import { Fragment } from "react";

interface IWaitingForConfirmScreenProps {
  translation: ITranslation;
}

type InformationSendT = {
  fullName: string;
  phone: string;
  email: string;
  locationSend: string;
};

type InformationReceiveT = {
  fullNameReceiver: string;
  phone: string;
  locationReceive: string;
};

type FeeT = {
  fees: string;
  promotiom: string;
  totalFees: string;
};

type InformationProductionT = {
  productionCode: string;
  amount: string;
  content: string;
  weightText: string;
  sizeText: string;
  specialProductText: string;
  collection: string;
};

type DataT = {
  amount: string;
  content: string;
  weightText: string;
  sizeText: string;
  specialProductText: string;
  collection: string;
  freightPayer: string;
  fees: string;
  promotion: string;
  totalFees: string;
};

const FAKE_DATAS = {
  amount: "1",
  content: "Áo quần",
  weightText: "7.000 g",
  sizeText: "-",
  specialProductText: "Không",
  collection: "Không",
  freightPayer: "Người gửi",
  fees: "80.000đ",
  promotion: "0đ",
  totalFees: "80.000đ",
  fullName: "Nguyễn Văn An",
  fullNameReceiver: "Nguyễn Văn Bình",
  phone: "090567899",
  email: "nva@gmail.com",
  locationSend: "Nha Trang - văn phòng 41 Nguyễn Trãi",
  locationReceive: "Đà Nẵng - văn phòng Q.Hải Châu",
  productionCode: "1002345",
};

const RenderRow = ({ title = "", value = "-" }) => {
  return (
    <li className="flex justify-between items-center gap-8 py-2 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-b-[#AFB1B6]">
      <p className="text-[#61646B] font-medium text-sm">{title}</p>
      <p className="text-[#19191B] font-medium text-sm">{value}</p>
    </li>
  );
};

const WaitingForConfirmTransportScreen = (
  props: IWaitingForConfirmScreenProps
) => {
  const { translation } = props;
  const { PAYMENT, BOOKING, TRANSPORT } = translation;

  const DETAILS_FEES = {
    fees: TRANSPORT.fees,
    promotiom: BOOKING.promotion,
    totalFees: TRANSPORT.totalFees,
  };

  const INFORMATION_PERSON_SEND = {
    fullName: BOOKING.fullName,
    phone: BOOKING.phone,
    email: BOOKING.email,
    locationSend: TRANSPORT.locationSend,
  };

  const INFORMATION_PERSON_RECEIVE = {
    fullNameReceiver: BOOKING.fullName,
    phone: BOOKING.phone,
    locationReceive: TRANSPORT.locationReceive,
  };

  const INFORMATION_PRODUCTION = {
    productionCode: TRANSPORT.productionCode,
    amount: TRANSPORT.amount,
    content: TRANSPORT.content,
    weightText: TRANSPORT.weightText,
    sizeText: TRANSPORT.sizeText,
    specialProductText: TRANSPORT.specialProductText,
    collection: TRANSPORT.collection,
  };

  return (
    <Fragment>
      <div className="flex items-center p-4 gap-4 justify-between">
        <div className="flex gap-2 items-center">
          <div>
            <ArrowLeftIcon />
          </div>
          <p className="text-black font-medium text-base">{PAYMENT.pay}</p>
        </div>
        <p className="text-black font-medium text-base underline">
          {TRANSPORT.cancelOrder}
        </p>
      </div>

      <div className="pt-3 pb-5 px-5 bg-common">
        <div className="flex flex-col gap-2 justify-center items-center">
          <div className="rounded-full w-[52px] h-[52px] bg-[#D9D9D9]" />
          <p className="text-center text-black text-lg font-semibold">
            {PAYMENT.waitingForConfirm}
          </p>
          <p className="text-center text-black text-sm font-normal">
            {PAYMENT.waitingDescription}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2 bg-common">
        <div className="bg-white p-4">
          <p className="text-black font-medium text-base ">
            {TRANSPORT.feeDetails}
          </p>
          <ul className="flex flex-col group">
            {Object.keys(DETAILS_FEES)?.map((info, index) => (
              <RenderRow
                key={`information-${index}`}
                title={DETAILS_FEES[info as keyof FeeT]}
                value={FAKE_DATAS[info as keyof DataT]}
              />
            ))}
          </ul>
        </div>

        <div className="bg-white p-4">
          <p className="text-black font-medium text-base ">
            {TRANSPORT.sender}
          </p>
          <ul className="flex flex-col group">
            {Object.keys(INFORMATION_PERSON_SEND)?.map((info, index) => (
              <RenderRow
                key={`information-${index}`}
                title={INFORMATION_PERSON_SEND[info as keyof InformationSendT]}
                value={FAKE_DATAS[info as keyof DataT]}
              />
            ))}
          </ul>
        </div>

        <div className="bg-white p-4">
          <p className="text-black font-medium text-base ">
            {TRANSPORT.receiver}
          </p>
          <ul className="flex flex-col group">
            {Object.keys(INFORMATION_PERSON_RECEIVE)?.map((info, index) => (
              <RenderRow
                key={`information-${index}`}
                title={
                  INFORMATION_PERSON_RECEIVE[info as keyof InformationReceiveT]
                }
                value={FAKE_DATAS[info as keyof DataT]}
              />
            ))}
          </ul>
        </div>

        <div className="bg-white p-4">
          <p className="text-black font-medium text-base ">
            {TRANSPORT.sender}
          </p>
          <ul className="flex flex-col group">
            {Object.keys(INFORMATION_PRODUCTION)?.map((info, index) => (
              <RenderRow
                key={`information-${index}`}
                title={
                  INFORMATION_PRODUCTION[info as keyof InformationProductionT]
                }
                value={FAKE_DATAS[info as keyof DataT]}
              />
            ))}
          </ul>
        </div>

        <div className="bg-white p-4">
          <Button>{PAYMENT.backtoHome}</Button>
        </div>
      </div>
    </Fragment>
  );
};

export default WaitingForConfirmTransportScreen;
