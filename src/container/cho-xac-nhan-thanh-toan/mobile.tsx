import React, { useEffect, useState } from "react";
import { IRequestPaymentTranslate } from "@/interfaces/IRequestPaymentTranslate";
import WaitPayment from "@/components/requestPayment/waitPayment";
import Header from "@/components/header";
import Button from "@/components/button";
import { ITicketInfoData } from "@/interfaces/httpRequest/ITrip";
import { IUserProfile } from "@/interfaces/httpRequest/IUser";
import moment from "moment";
import useModal from "@/hook/useModal";
import DrawerBottom2 from "@/components/drawer-bottom2";

type InfomationT = {
  fullName: string;
  phone: string;
  email: string;
};

type TripT = {
  code: string;
  trip: string;
  timeLeave: string;
  type: string;
  pick: string;
  drop: string;
  amounts: string;
  location: string;
};

const RenderRow = ({ title = "", value = "-" }) => {
  return (
    <div className="flex justify-between items-center gap-4 py-2 border-b border-b-neutral-grey-100">
      <p className="text-neutral-grey-600 font-medium text-sm">{title}</p>
      <p className="text-neutral-grey-700 font-semibold text-sm">{value}</p>
    </div>
  );
};

const ContainerRequestPaymentMobile = ({
  REQUESTPAYMENT,
  ticketInfo,
  userProfile,
  ticketInfoReturn,
}: {
  REQUESTPAYMENT: IRequestPaymentTranslate;
  ticketInfo: ITicketInfoData;
  ticketInfoReturn?: ITicketInfoData;
  userProfile?: IUserProfile;
}) => {
  const [paymentInformation, setPaymentInformation] = useState({
    price: {
      titlePrice: 0,
      incentives: 0,
    },
    totalPrice: 0,
    info: {
      fullName: "",
      phone: "",
      email: "",
    },
    trip: {
      code: "",
      trip: "",
      timeLeave: "",
      type: "",
      pick: "",
      drop: "",
      amounts: "",
      location: "",
    },
  });

  const [paymentInformationReverse, setPaymentInformationReverse] = useState({
    price: {
      titlePrice: 0,
      incentives: 0,
    },
    totalPrice: 0,
    info: {
      fullName: "",
      phone: "",
      email: "",
    },
    trip: {
      code: "",
      trip: "",
      timeLeave: "",
      type: "",
      pick: "",
      drop: "",
      amounts: "",
      location: "",
    },
  });
  const [open, toggle] = useModal();

  const DICTIONARY = {
    info: {
      fullName: REQUESTPAYMENT.detailOrder.fullName,
      phone: REQUESTPAYMENT.detailOrder.numberPhone,
      email: REQUESTPAYMENT.detailOrder.email,
    },
    trip: {
      code: REQUESTPAYMENT.detailOrder.ticket,
      trip: REQUESTPAYMENT.detailOrder.routes,
      timeLeave: REQUESTPAYMENT.detailOrder.timeStart,
      type: REQUESTPAYMENT.detailOrder.type,
      pick: REQUESTPAYMENT.detailOrder.pickupPoint,
      drop: REQUESTPAYMENT.detailOrder.paypoints,
      amounts: REQUESTPAYMENT.detailOrder.numberChair,
      location: REQUESTPAYMENT.detailOrder.locationChair,
    },
  };

  const handleBackToHome = () => {
    window.location.assign("/");
  };

  useEffect(() => {
    if (Object.keys(ticketInfo)?.length > 0) {
      let tmpLocationSeats: string[] = [];

      ticketInfo?.tickets?.forEach((el) => {
        if (el?.seatName) {
          tmpLocationSeats?.push(el?.seatName);
        }
      });

      let tmpTotalPrice = ticketInfo?.totalCost;
      let tmpPrice = {
        titlePrice: ticketInfo?.totalCost,
        incentives: Math.round(ticketInfo?.totalVoucherValue),
      };
      let tmpInfo = {
        fullName: ticketInfo?.userName || "",
        phone: ticketInfo?.userPhone || "",
        email: ticketInfo?.userEmail || "",
      };

      let tmpTrip = {
        code: ticketInfo?.code || "",
        trip: ticketInfo?.route?.name || "",
        timeLeave:
          moment(ticketInfo?.trip?.startAt).format("HH:mm, DD/MM/YYYY") || "",
        type: ticketInfo?.trip?.vehicle?.name || "",
        pick: ticketInfo?.startPlace?.name || "",
        drop: ticketInfo?.endPlace?.name || "",
        amounts: ticketInfo?.tickets?.length?.toString() || "",
        location: tmpLocationSeats?.toString() || "",
      };

      setPaymentInformation({
        info: tmpInfo,
        price: tmpPrice,
        totalPrice: tmpTotalPrice,
        trip: tmpTrip,
      });
    }

    if (ticketInfoReturn && Object.keys(ticketInfoReturn)?.length > 0) {
      let tmpLocationSeats: string[] = [];
      ticketInfoReturn?.tickets?.forEach((el) => {
        if (el?.seatName) {
          tmpLocationSeats?.push(el?.seatName);
        }
      });

      let tmpTotalPrice = ticketInfoReturn?.totalCost;
      let tmpPrice = {
        titlePrice: ticketInfoReturn?.totalCost,
        incentives: Math.round(ticketInfoReturn?.totalVoucherValue),
      };
      let tmpInfo = {
        fullName: ticketInfoReturn?.userName || "",
        phone: ticketInfoReturn?.userPhone || "",
        email: ticketInfoReturn?.userEmail || "",
      };

      let tmpTrip = {
        code: ticketInfoReturn?.code || "",
        trip: ticketInfoReturn?.route?.name || "",
        timeLeave:
          moment(ticketInfoReturn?.trip?.startAt).format("HH:mm, DD/MM/YYYY") ||
          "",
        type: ticketInfoReturn?.trip?.vehicle?.name || "",
        pick: ticketInfoReturn?.startPlace?.name || "",
        drop: ticketInfoReturn?.endPlace?.name || "",
        amounts: ticketInfoReturn?.tickets?.length?.toString() || "",
        location: tmpLocationSeats?.toString() || "",
      };

      setPaymentInformationReverse({
        info: tmpInfo,
        price: tmpPrice,
        totalPrice: tmpTotalPrice,
        trip: tmpTrip,
      });
    }
  }, []);

  return (
    <>
      <div className="relative pb-32">
        <Header
          backgroundColorMobile="linear-gradient(90.4deg, #DF5030 -0.55%, #BE3C2A 72.71%)"
          userProfile={userProfile}
        />
        <div className="flex flex-col gap-2">
          <div className="p-3">
            <WaitPayment
              REQUESTPAYMENT={REQUESTPAYMENT}
              type={ticketInfo?.totalCost === ticketInfo?.totalPaid ? 2 : 1}
            />
          </div>

          <div className="bg-white p-4">
            <div className="bg-semantic-green-light py-1 px-2 rounded-full w-fit mb-2">
              <p className="text-neutral-grey-600 font-extrabold text-xs">
                {REQUESTPAYMENT.detailOrder.tiltePrice}
              </p>
            </div>

            <RenderRow
              title={REQUESTPAYMENT.detailOrder.tiltePrice}
              value={
                (
                  paymentInformation?.price?.titlePrice +
                  paymentInformationReverse?.price?.titlePrice
                )?.toLocaleString() + "đ"
              }
            />
            <RenderRow
              title={REQUESTPAYMENT.detailOrder.incentives}
              value={
                (
                  paymentInformation?.price?.incentives +
                  paymentInformationReverse?.price?.incentives
                )?.toLocaleString() + "đ"
              }
            />

            <div className="flex justify-between items-center gap-4 pt-2">
              <p className="text-neutral-grey-700 font-bold text-sm">
                {REQUESTPAYMENT.detailOrder.totalPrice}
              </p>
              <p className="text-primary-500 font-extrabold text-base">
                {(
                  paymentInformation?.totalPrice +
                  paymentInformationReverse?.totalPrice -
                  paymentInformation?.price?.incentives -
                  paymentInformationReverse?.price?.incentives
                )?.toLocaleString()}
                đ
              </p>
            </div>
          </div>

          <div className="bg-white p-4">
            <div className="bg-semantic-green-light py-1 px-2 rounded-full w-fit mb-2">
              <p className="text-neutral-grey-600 font-extrabold text-xs">
                {REQUESTPAYMENT.detailOrder.titlePerson}
              </p>
            </div>
            {Object.keys(paymentInformation?.info)?.map((data, index) => (
              <RenderRow
                key={`information-${index}`}
                title={DICTIONARY.info[data as keyof InfomationT]}
                value={paymentInformation?.info[data as keyof InfomationT]}
              />
            ))}
          </div>

          <div className="bg-white p-4">
            <div className="bg-semantic-green-light py-1 px-2 rounded-full w-fit mb-2">
              <p className="text-neutral-grey-600 font-extrabold text-xs">
                {REQUESTPAYMENT.detailOrder.titleTrip}
              </p>
            </div>

            {Object.keys(paymentInformation?.trip)?.map((data, index) => (
              <RenderRow
                key={`information-${index}`}
                title={DICTIONARY.trip[data as keyof TripT]}
                value={paymentInformation?.trip[data as keyof TripT]}
              />
            ))}
          </div>

          {paymentInformationReverse?.trip?.code && (
            <div className="bg-white p-4">
              <div className="bg-semantic-green-light py-1 px-2 rounded-full w-fit mb-2">
                <p className="text-neutral-grey-600 font-extrabold text-xs">
                  {REQUESTPAYMENT.detailOrder.titleTripReturn}
                </p>
              </div>

              {Object.keys(paymentInformationReverse?.trip)?.map(
                (data, index) => (
                  <RenderRow
                    key={`information-${index}`}
                    title={DICTIONARY.trip[data as keyof TripT]}
                    value={paymentInformationReverse?.trip[data as keyof TripT]}
                  />
                )
              )}
            </div>
          )}

          <div className="mx-auto my-3">
            <Button
              width="w-fit"
              btnColor="bg-transparent"
              color="text-black"
              borderColor="border-black"
              onClick={toggle}
            >
              {REQUESTPAYMENT.cancelChangeTickets}
            </Button>
          </div>
        </div>

        <div className="p-4 fixed bottom-0 z-10 bg-white w-full border border-neutral-grey-100 shadow-[gba(0,0,0,0.06),rgba(0,0,0,0.03)]">
          <Button onClick={handleBackToHome}>
            {REQUESTPAYMENT.button.homeButton}
          </Button>
        </div>
      </div>

      <DrawerBottom2
        open={open}
        toggleDrawer={toggle}
        childStyle="w-screen bg-transparent rounded-tl-lg rounded-tr-lg"
        wrapChildStyle=""
        animationName="animation-open-drawer-bottom"
        closeStyle="animation-off-drawer-bottom"
      >
        <div className="px-3 flex flex-col gap-2">
          <div className="bg-white rounded-xl p-4 animate-fadeIn1">
            <a href="tel:0914077779">
              <p className="text-[#237EE9] text-xl font-medium text-center">
                0914.077.779
              </p>
            </a>
          </div>
          <div className="bg-white rounded-xl p-4 animate-fadeIn15">
            <a href="tel:0963388388">
              <p className="text-[#237EE9] text-xl font-medium text-center">
                0963.388.388
              </p>
            </a>
          </div>
          <div
            className="bg-white rounded-xl p-4 animate-fadeIn2"
            onClick={toggle}
          >
            <p className="text-[#237EE9] text-xl font-medium text-center">
              {REQUESTPAYMENT?.detailOrder?.cancel}
            </p>
          </div>
        </div>
      </DrawerBottom2>
    </>
  );
};

export default ContainerRequestPaymentMobile;
