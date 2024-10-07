import Button from "@/components/button";
import ArrowLeftIcon from "@/components/icons/arrowLeft";
import { ITranslation } from "@/interfaces/ITranslation";
import { Fragment } from "react";

interface IWaitingForConfirmScreenProps {
  translation: ITranslation;
}

type InfomationT = {
  ticketCode: string;
  routes: string;
  timeLeave: string;
  carType: string;
  amountSeats: string;
  seats: string;
};

type InformationP = {
  fullname: string;
  phone: string;
  email: string;
};

type PriceT = {
  priceTicket: string;
  promotion: string;
  totalPrice: string;
};

const FAKE_DATAS = {
  routes: "Đà Nẵng - Nha Trang",
  timeLeave: "19:00 06/01/2024",
  carType: "Giường nằm 40",
  pickLocation: "Ngã ba Huế",
  dropLocation: "Văn phòng trung tâm",
  amountSeats: "1 Ghế",
  seats: "D1",
  totalPriceGo: "300.000đ",
  priceTicket: "300.000đ",
  promotion: "0đ",
  totalPrice: "300.000đ",
  ticketCode: "83EL7E",
  fullname: "Nguyễn Văn An",
  phone: "090567891",
  email: "nguyenvana@gmail.com",
};

const RenderRow = ({ title = "", value = "-" }) => {
  return (
    <li className="flex justify-between items-center gap-4 py-2 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-b-[#AFB1B6]">
      <p className="text-[#61646B] font-medium text-sm">{title}</p>
      <p className="text-[#19191B] font-medium text-sm">{value}</p>
    </li>
  );
};

const WaitingForConfirmScreen = (props: IWaitingForConfirmScreenProps) => {
  const { translation } = props;
  const { PAYMENT, BOOKING } = translation;

  const PRICES = {
    priceTicket: BOOKING.priceTicket,
    promotion: BOOKING.promotion,
    totalPrice: BOOKING.totalPrice,
  };

  const INFORMATION_PERSONS = {
    fullname: BOOKING.fullName,
    phone: BOOKING.phone,
    email: BOOKING.email,
  };

  const INFORMATION_TRIP = {
    ticketCode: PAYMENT.ticketCode,
    routes: BOOKING.routes,
    timeLeave: BOOKING.timeLeave,
    carType: BOOKING.carType,
    amountSeats: BOOKING.amountSeats,
    seats: BOOKING.seats,
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
          {PAYMENT.cancelOrChangeTicket}
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
          <p className="text-black font-medium text-base ">{BOOKING.payment}</p>
          <ul className="flex flex-col group">
            {Object.keys(PRICES)?.map((info, index) => (
              <RenderRow
                key={`information-${index}`}
                title={PRICES[info as keyof PriceT]}
                value={FAKE_DATAS[info as keyof InfomationT]}
              />
            ))}
          </ul>
        </div>

        <div className="bg-white p-4">
          <p className="text-black font-medium text-base ">
            {PAYMENT.informationCustomer}
          </p>
          <ul className="flex flex-col group">
            {Object.keys(INFORMATION_PERSONS)?.map((info, index) => (
              <RenderRow
                key={`information-${index}`}
                title={INFORMATION_PERSONS[info as keyof InformationP]}
                value={FAKE_DATAS[info as keyof InfomationT]}
              />
            ))}
          </ul>
        </div>

        <div className="bg-white p-4">
          <p className="text-black font-medium text-base ">
            {PAYMENT.informationTrip}
          </p>
          <ul className="flex flex-col group">
            {Object.keys(INFORMATION_TRIP)?.map((info, index) => (
              <RenderRow
                key={`information-${index}`}
                title={INFORMATION_TRIP[info as keyof InfomationT]}
                value={FAKE_DATAS[info as keyof InfomationT]}
              />
            ))}
          </ul>
        </div>

        <div className="bg-white p-4">
          <div className="flex gap-1">
            <Button type="default">{PAYMENT.backtoHome}</Button>
            <Button>{PAYMENT.saveTicket}</Button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default WaitingForConfirmScreen;
