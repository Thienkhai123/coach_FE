import Button from "@/components/button";
import CheckPointIcon from "@/components/icons/check-point";
import ClockIcon from "@/components/icons/clock";
import EclipseIcon from "@/components/icons/eclipse";
import SquareIcon from "@/components/icons/square";
import NavbarBasic from "@/components/navbar/basic";
import { ITranslation } from "@/interfaces/ITranslation";
import React, { Fragment } from "react";

interface IOrderInformationScreenProps {
  translation: ITranslation;
  orderId: string;
  nextScreen: () => void;
}

type InformationProductionT = {
  productionCode: string;
  amount: string;
  content: string;
  weightText: string;
  sizeText: string;
  specialProductText: string;
  collection: string;
};

type FeeT = {
  status: string;
  promotion: string;
  totalFees: string;
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
  shippingStatus: "Đơn hàng đã được chuyển đến kho XT1",
  updateAt: "12:03 21/02/2024",
  createAt: "01/03/2024 - 13:00",
  status: "Đã thanh toán",
};

const RenderRow = ({ title = "", value = "-" }) => {
  return (
    <li className="flex justify-between items-center gap-8 py-2 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-b-[#AFB1B6]">
      <p className="text-[#61646B] font-medium text-sm">{title}</p>
      <p className="text-[#19191B] font-medium text-sm">{value}</p>
    </li>
  );
};

const OrderInformationScreen = (props: IOrderInformationScreenProps) => {
  const { translation, nextScreen, orderId } = props;
  const { ORDER, TRANSPORT, BOOKING, PAYMENT } = translation;

  const INFORMATION_PRODUCTION = {
    productionCode: TRANSPORT.productionCode,
    amount: TRANSPORT.amount,
    content: TRANSPORT.content,
    weightText: TRANSPORT.weightText,
    sizeText: TRANSPORT.sizeText,
    specialProductText: TRANSPORT.specialProductText,
    collection: TRANSPORT.collection,
  };

  const FEES = {
    status: ORDER.status,
    promotion: BOOKING.promotion,
    totalFees: TRANSPORT.totalFees,
  };

  return (
    <Fragment>
      <NavbarBasic title={ORDER.order + ` #${orderId}`} />

      <div className="flex flex-col gap-2 bg-common relative pb-[88px]">
        <div className="bg-white p-4">
          <div className="flex gap-4 items-center justify-between">
            <p className="text-black font-medium text-base">
              {ORDER.informationShipping}
            </p>
            <button onClick={nextScreen}>
              <p className="text-black font-medium text-sm underline">
                {ORDER.seeDetail}
              </p>
            </button>
          </div>

          <div className="flex items-center gap-4 mt-4">
            <CheckPointIcon />
            <div>
              <p className="text-black font-medium  text-xs">
                {FAKE_DATAS.shippingStatus}
              </p>
              <p className="text-black font-normal  text-xs">
                {FAKE_DATAS.updateAt}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4">
          <p className="text-black font-medium text-base">
            {ORDER.informationSendReceive}
          </p>
          <div className="flex gap-2">
            <div className="flex flex-col items-center pt-1">
              <EclipseIcon width="18" height="18" />
              <div className="border border-black border-dashed flex-1" />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-[#19191B] font-semibold text-sm">
                {FAKE_DATAS.fullName}
              </p>
              <p className="text-[#19191B] font-normal text-sm">
                {FAKE_DATAS.phone}
              </p>
              <p className="text-[#19191B] font-normal text-sm">
                {FAKE_DATAS.locationSend}
              </p>
              <div className="flex items-center gap-1">
                <ClockIcon />
                <p className="text-[#474C4D] font-normal text-sm">
                  {ORDER.createOrder}{" "}
                  <span className="text-[#19191B]">{FAKE_DATAS.createAt}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="pt-1">
              <SquareIcon />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-[#19191B] font-semibold text-sm">
                {FAKE_DATAS.fullNameReceiver}
              </p>
              <p className="text-[#19191B] font-normal text-sm">
                {FAKE_DATAS.phone}
              </p>
              <p className="text-[#19191B] font-normal text-sm">
                {FAKE_DATAS.locationReceive}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4">
          <p className="text-black font-medium text-base ">
            {ORDER.informationProduct}
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
          <p className="text-black font-medium text-base ">
            {ORDER.shippingFees}
          </p>
          <ul className="flex flex-col group">
            {Object.keys(FEES)?.map((info, index) => (
              <RenderRow
                key={`information-${index}`}
                title={FEES[info as keyof FeeT]}
                value={FAKE_DATAS[info as keyof DataT]}
              />
            ))}
          </ul>
        </div>

        <div className="p-4 bg-white fixed z-0 bottom-0 w-full drop-shadow-xl border">
          <Button actionType="submit">{PAYMENT.backtoHome}</Button>
        </div>
      </div>
    </Fragment>
  );
};

export default OrderInformationScreen;
