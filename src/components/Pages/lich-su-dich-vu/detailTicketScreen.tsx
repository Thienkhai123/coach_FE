import NavbarBasic from "@/components/navbar/basic";
import { ITranslation } from "@/interfaces/ITranslation";
import React from "react";

interface IDetailTicketScreenProps {
  translation: ITranslation;
  prevScreen: () => void;
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

type PriceT = {
  priceTicket: string;
  promotion: string;
  totalPrice: string;
};

type CustomerT = {
  fullName: string;
  phone: string;
  email: string;
};

type DataT = {
  amount: string;
  content: string;
  weightText: string;
  sizeText: string;
  specialProductText: string;
  collection: string;
  freightPayer: string;
  promotion: string;
  totalFees: string;
  totalPrice: string;
  priceTicket: string;
};

const FAKE_DATAS = {
  amount: "1",
  content: "Áo quần",
  weightText: "7.000 g",
  sizeText: "-",
  specialProductText: "Không",
  collection: "Không",
  freightPayer: "Người gửi",
  priceTicket: "300.000đ",
  promotion: "0đ",
  totalPrice: "300.000đ",
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

const DetailTicketScreen = (props: IDetailTicketScreenProps) => {
  const { translation, prevScreen } = props;
  const { HISTORY, BOOKING, TRANSPORT, PAYMENT } = translation;

  const PRICES = {
    priceTicket: BOOKING.priceTicket,
    promotion: BOOKING.promotion,
    totalPrice: BOOKING.totalPrice,
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

  const CUSTOMER = {
    fullName: BOOKING.fullName,
    phone: BOOKING.phone,
    email: BOOKING.email,
  };

  return (
    <div>
      <NavbarBasic title={HISTORY.detailTicket} handleClick={prevScreen} />
      <div className="bg-common flex flex-col gap-2">
        <div className="p-4 bg-white">
          <p className="text-black font-medium text-base">{BOOKING.payment}</p>
          <ul className="flex flex-col group">
            {Object.keys(PRICES)?.map((info, index) => (
              <RenderRow
                key={`information-${index}`}
                title={PRICES[info as keyof PriceT]}
                value={FAKE_DATAS[info as keyof DataT]}
              />
            ))}
          </ul>
        </div>

        <div className="p-4 bg-white">
          <p className="text-black font-medium text-base">
            {PAYMENT.informationCustomer}
          </p>
          <ul className="flex flex-col group">
            {Object.keys(CUSTOMER)?.map((info, index) => (
              <RenderRow
                key={`information-${index}`}
                title={CUSTOMER[info as keyof CustomerT]}
                value={FAKE_DATAS[info as keyof DataT]}
              />
            ))}
          </ul>
        </div>

        <div className="p-4 bg-white">
          <p className="text-black font-medium text-base">
            {PAYMENT.informationTrip}
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
      </div>
    </div>
  );
};

export default DetailTicketScreen;
