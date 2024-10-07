import React, { useEffect, useState } from "react";
import WaitPayment from "@/components/requestPayment/waitPayment";
import Header from "@/components/header";
import Button from "@/components/button";
import { IUserProfile } from "@/interfaces/httpRequest/IUser";
import useModal from "@/hook/useModal";
import DrawerBottom2 from "@/components/drawer-bottom2";
import { IGetShippingOrderDetail } from "@/interfaces/httpRequest/IShipment";
import { ITranslation } from "@/interfaces/ITranslation";

type SenderT = {
  senderName: string;
  senderPhone: string;
  senderCI: string;
  senderAddress: string;
  email: string;
  location: string;
};

type ReceiverT = {
  receiverName: string;
  receiverPhone: string;
  receiverCI: string;
  receiverAddress: string;
  location: string;
};

type PackageT = {
  shippingOrderCode: string;
  content: string;
  weightDisplay: string;
  dimensionDisplay: string;
};

type PaymentStateT = {
  price: number;
  totalPrice: number;
  sender: SenderT;
  receiver: ReceiverT;
  packages: PackageT[];
  type: number;
  codPaid: number;
  cod: string;
  paymentStatus: string;
};

const RenderRow = ({ title = "", value = "-" }) => {
  return (
    <div className="flex justify-between items-center gap-4 py-2 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-b-neutral-grey-100">
      <p className="text-neutral-grey-600 font-medium text-sm w-[100px]">
        {title}
      </p>
      <p className="text-neutral-grey-700 font-semibold text-sm flex-1 text-end">
        {value}
      </p>
    </div>
  );
};

const ContainerRequestInforPaymentMobile = ({
  paymentInfor,
  userProfile,
  translation,
}: {
  paymentInfor: IGetShippingOrderDetail;
  userProfile?: IUserProfile;
  translation: ITranslation;
}) => {
  const { CREATEORDER, REQUESTPAYMENT, BOOKING, TRANSPORT, SEARCHING, ORDER } =
    translation;
  const [paymentInformation, setPaymentInformation] = useState<PaymentStateT>({
    price: 0,
    totalPrice: 0,
    sender: {
      senderName: "",
      senderPhone: "",
      senderCI: "",
      senderAddress: "",
      email: "",
      location: "",
    },
    receiver: {
      receiverName: "",
      receiverPhone: "",
      receiverCI: "",
      receiverAddress: "",
      location: "",
    },
    packages: [],
    type: 1,
    codPaid: 0,
    cod: "0đ",
    paymentStatus: "",
  });
  const [open, toggle] = useModal();

  const DICTIONARY = {
    sender: {
      senderName: CREATEORDER.informationPersonSend.fullName,
      senderPhone: CREATEORDER.informationPersonSend.phone,
      senderCI: BOOKING.indentify,
      senderAddress: CREATEORDER.informationPersonSend.adress,
      email: CREATEORDER.informationPersonSend.email,
      location: TRANSPORT.locationSend,
    },
    receiver: {
      receiverName: CREATEORDER.informationPersonSend.fullName,
      receiverPhone: CREATEORDER.informationPersonSend.phone,
      receiverCI: BOOKING.indentify,
      receiverAddress: CREATEORDER.informationPersonSend.adress,
      location: TRANSPORT.locationReceive,
    },
    packages: {
      shippingOrderCode: TRANSPORT.productionCode,
      content: CREATEORDER.productDetail.contentProduct,
      weightDisplay: CREATEORDER.productDetail.weightProduct,
      dimensionDisplay: CREATEORDER.productDetail.sizeProduct,
    },
  };

  const handleBackToHome = () => {
    window.location.assign("/");
  };

  useEffect(() => {
    if (paymentInfor?.isSuccess && Object.keys(paymentInfor)?.length > 0) {
      const senderInfo = paymentInfor?.data?.senderInfo;
      const sendLocation =
        paymentInfor?.data?.loadingLocation?.fullAddress || "";
      const receiverInfo = paymentInfor?.data?.receiverInfo;
      const reveiverLocation =
        paymentInfor?.data?.unloadingLocation?.fullAddress || "";
      const tmpPackages: PackageT[] = [];
      paymentInfor?.data?.packages?.forEach((el) => {
        tmpPackages.push({
          content: el?.packageMetadata?.content || "",
          dimensionDisplay: el?.shipmentCostInfo?.dimensionDisplay,
          shippingOrderCode: paymentInfor?.data?.shippingOrderCode,
          weightDisplay: el?.shipmentCostInfo?.weightDisplay,
        });
      });
      setPaymentInformation({
        price: paymentInfor?.data?.shippingFee || 0,
        totalPrice: paymentInfor?.data?.shippingFee || 0,
        receiver: { ...receiverInfo, location: sendLocation },
        sender: { ...senderInfo, location: reveiverLocation },
        packages: tmpPackages,
        type:
          paymentInfor?.data?.shippingFeeStatusDisplay === "Chưa thanh toán"
            ? 4
            : 3,
        codPaid: paymentInfor?.data?.codPaid || 0,
        cod:
          paymentInfor?.data?.codAmount > 0
            ? paymentInfor?.data?.codAmount.toLocaleString() + " " + "đ"
            : SEARCHING.ankNo,
        paymentStatus: paymentInfor?.data?.codFeeStatusDisplay,
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
              type={paymentInformation?.type}
            />
          </div>

          <div className="bg-white p-4">
            <div className="bg-semantic-green-light py-1 px-2 rounded-full w-fit mb-2">
              <p className="text-neutral-grey-600 font-extrabold text-xs">
                {CREATEORDER.informationProductSendReceive.personSend}
              </p>
            </div>
            {Object.keys(paymentInformation?.sender)?.map((data, index) => (
              <RenderRow
                key={`information-${index}`}
                title={DICTIONARY.sender[data as keyof SenderT]}
                value={paymentInformation?.sender[data as keyof SenderT]}
              />
            ))}
          </div>

          <div className="bg-white p-4">
            <div className="bg-semantic-green-light py-1 px-2 rounded-full w-fit mb-2">
              <p className="text-neutral-grey-600 font-extrabold text-xs">
                {CREATEORDER.informationProductSendReceive.personReceive}
              </p>
            </div>
            {Object.keys(paymentInformation?.receiver)?.map((data, index) => (
              <RenderRow
                key={`information-${index}`}
                title={DICTIONARY.receiver[data as keyof ReceiverT]}
                value={paymentInformation?.receiver[data as keyof ReceiverT]}
              />
            ))}
          </div>

          {paymentInformation?.packages?.map((pack, ind) => {
            return (
              <div key={`packages-${ind}`} className="bg-white p-4">
                <div className="bg-semantic-green-light py-1 px-2 rounded-full w-fit mb-2">
                  <p className="text-neutral-grey-600 font-extrabold text-xs">
                    {CREATEORDER.detailProductSendReceive.package} {ind + 1}
                  </p>
                </div>

                {Object.keys(DICTIONARY?.packages)?.map((data, index) => (
                  <RenderRow
                    key={`information-${index}`}
                    title={DICTIONARY.packages[data as keyof PackageT]}
                    value={pack[data as keyof PackageT]}
                  />
                ))}
              </div>
            );
          })}

          <div className="bg-white p-4">
            <div className="bg-semantic-green-light py-1 px-2 rounded-full w-fit mb-2">
              <p className="text-neutral-grey-600 font-extrabold text-xs">
                {CREATEORDER.freightDetail.freightTitle}
              </p>
            </div>

            <div className="flex justify-between items-center gap-4 py-2 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-b-neutral-grey-100">
              <p className="text-neutral-grey-600 font-bold text-sm w-[100px]">
                {CREATEORDER.freightDetail.totalPay}
              </p>
              <p className="text-primary-500 font-bold text-sm flex-1 text-end">
                {paymentInformation?.totalPrice?.toLocaleString() + "đ"}
              </p>
            </div>

            <RenderRow
              title={CREATEORDER.freightDetail.incentivesPay}
              value={"0d"}
            />

            <RenderRow
              title={ORDER.status}
              value={paymentInformation?.paymentStatus}
            />

            <RenderRow
              title={TRANSPORT.collection}
              value={paymentInformation?.cod}
            />

            <RenderRow
              title={ORDER.collected}
              value={paymentInformation?.codPaid?.toLocaleString() + "d"}
            />
          </div>

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

export default ContainerRequestInforPaymentMobile;
