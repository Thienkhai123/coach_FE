import Footer from "@/components/footer";
import Header from "@/components/header";
import DetailPayment from "@/components/requestPayment/detailPayment";
import WaitPayment from "@/components/requestPayment/waitPayment";
import { ITicketInfoData } from "@/interfaces/httpRequest/ITrip";
import React, { FC, Fragment, useEffect, useState } from "react";
import "moment/locale/vi";
import Modal from "@/components/modal/Modal";
import useModal from "@/hook/useModal";
import CancelTicketModal from "@/components/Pages/dat-ve/cancelTicketModal";
import { IUserProfile } from "@/interfaces/httpRequest/IUser";
import { IGetShippingOrderDetail } from "@/interfaces/httpRequest/IShipment";
import { ITranslation } from "@/interfaces/ITranslation";
import PaymentInformation from "@/components/payment-Information";

interface IRequestPaymentDesktop {
  ticketInfo?: ITicketInfoData;
  paymentInfor: IGetShippingOrderDetail;
  userProfile?: IUserProfile;
  translation: ITranslation;
}

const ContainerRequestInforPaymentDesktop: FC<IRequestPaymentDesktop> = (
  props
) => {
  const { paymentInfor, userProfile, translation } = props;
  const {
    shippingFeeStatus,
    totalPackages,
    senderInfo,
    loadingLocation,
    receiverInfo,
    unloadingLocation,
    packages,
    shippingOrderCode,
    isCod,
    codAmount,
    shippingFee,
    codStatusDisplay,
    codPaid,
    codFeeStatusDisplay,
  } = paymentInfor.data;

  const { REQUESTPAYMENT, CREATEORDER, TRANSPORT, SEARCHING, ORDER } =
    translation;

  const [cancelModal, toggleCancelModal] = useModal();
  const [producs, setProducts] = useState([]);

  const convertPriceData = {
    titleContent: CREATEORDER.freightDetail.freightTitle,

    paymentInfor: [
      {
        typeComponent: 2,
        name: CREATEORDER.freightDetail.totalPay,
        content: shippingFee?.toLocaleString() + "đ",
        colorText: "#DF5030",
      },
      {
        typeComponent: 1,
        name: CREATEORDER.freightDetail.incentivesPay,
        content: 0 + "đ",
        colorText: "#101F24",
      },
      {
        typeComponent: 1,
        name: ORDER.status,
        content: codFeeStatusDisplay,
        colorText: "#101F24",
      },

      {
        name: translation.TRANSPORT.collection,
        content:
          codAmount > 0
            ? codAmount.toLocaleString() + " " + "đ"
            : SEARCHING.ankNo,
      },
      {
        typeComponent: 1,
        name: ORDER.collected,
        content: codPaid?.toLocaleString() + "đ",
        colorText: "#101F24",
      },
    ],
  };

  const convertPersonSendData = {
    titleContent: TRANSPORT.sender,
    paymentInfor: [
      {
        typeComponent: 1,
        name: REQUESTPAYMENT.detailOrder.fullName,
        content: senderInfo.senderName || "-",
        colorText: "#101F24",
      },
      {
        typeComponent: 1,
        name: REQUESTPAYMENT.detailOrder.numberPhone,
        content: senderInfo.senderPhone || "-",
        colorText: "#101F24",
      },
      {
        typeComponent: 1,
        name: "CCCD",
        content: senderInfo.senderCI || "-",
        colorText: "#101F24",
      },
      {
        typeComponent: 1,
        name: CREATEORDER.informationPersonSend.adress,
        content: senderInfo.senderAddress || "-",
        colorText: "#101F24",
      },
      {
        typeComponent: 1,
        name: REQUESTPAYMENT.detailOrder.email,
        content: senderInfo.email || "-",
        colorText: "#101F24",
      },
      {
        typeComponent: 1,
        name: TRANSPORT.locationSend,
        content:
          loadingLocation.address.trim() +
            ", " +
            loadingLocation.districtName.trim() +
            ", " +
            loadingLocation.cityName.trim() || "-",
        colorText: "#101F24",
      },
    ],
  };

  const convertPersonReceiveData = {
    titleContent: TRANSPORT.receiver,
    paymentInfor: [
      {
        typeComponent: 1,
        name: REQUESTPAYMENT.detailOrder.fullName,
        content: receiverInfo.receiverName || "-",
        colorText: "#101F24",
      },
      {
        typeComponent: 1,
        name: REQUESTPAYMENT.detailOrder.numberPhone,
        content: receiverInfo.receiverPhone || "-",
        colorText: "#101F24",
      },
      {
        typeComponent: 1,
        name: "CCCD",
        content: receiverInfo.receiverCI || "-",
        colorText: "#101F24",
      },
      {
        typeComponent: 1,
        name: CREATEORDER.informationPersonSend.adress,
        content: receiverInfo.receiverAddress || "-",
        colorText: "#101F24",
      },
      {
        typeComponent: 1,
        name: TRANSPORT.locationReceive,
        content:
          unloadingLocation.address.trim() +
            ", " +
            unloadingLocation.districtName.trim() +
            ", " +
            unloadingLocation.cityName.trim() || "-",
        colorText: "#101F24",
      },
    ],
  };

  useEffect(() => {
    const productArray: any = [];
    packages?.forEach((element: any) => {
      const { content, width, length, height } = element?.packageMetadata;
      const { weightDisplay, dimensionDisplay } = element?.shipmentCostInfo;
      const product = {
        titleContent: translation.CREATEORDER.detailProductSendReceive.package,
        paymentInfor: [
          {
            name: translation.TRANSPORT.productionCode,
            content: shippingOrderCode
              ? shippingOrderCode.replace("#", "")
              : "-",
          },
          {
            name: translation.TRANSPORT.content,
            content: content.length > 0 ? content : "-",
          },
          {
            name: translation.TRANSPORT.weightText,
            content: weightDisplay,
          },
          {
            name: translation.TRANSPORT.sizeText,
            content: dimensionDisplay,
          },
        ],
      };
      productArray.push(product);
    });
    setProducts(productArray);
  }, []);

  return (
    <Fragment>
      <div>
        <Header userProfile={userProfile} />
      </div>
      <div className="pt-10 pb-[60px] bg-[#ECECEC]">
        <div className="mx-auto w-fit">
          <div>
            <WaitPayment
              REQUESTPAYMENT={REQUESTPAYMENT}
              type={shippingFeeStatus === 1 ? 3 : 4}
            />
          </div>
          <div className="py-6 px-6 bg-white rounded-lg flex flex-col gap-4 xl:w-[640px] w-full mt-2">
            <DetailPayment
              convertPriceData={convertPersonSendData}
              REQUESTPAYMENT={REQUESTPAYMENT}
            />
            <DetailPayment
              convertPriceData={convertPersonReceiveData}
              REQUESTPAYMENT={REQUESTPAYMENT}
            />

            {producs?.map((elm: any, ind: number) => {
              return (
                <div key={ind} className="flex flex-col gap-4">
                  <DetailPayment convertPriceData={elm} />
                </div>
              );
            })}
            <DetailPayment
              convertPriceData={convertPriceData}
              REQUESTPAYMENT={REQUESTPAYMENT}
            />
          </div>
          {shippingFeeStatus === 1 && (
            <div className="mt-5 grid grid-cols-4  gap-2">
              <div className="col-span-2 col-start-2">
                <button className="w-full text-white font-semibold text-center my-auto bg-primary-500 rounded-full h-10">
                  {REQUESTPAYMENT.button.homeButton}
                </button>
              </div>
            </div>
          )}
          {shippingFeeStatus === 0 && (
            <div className="mt-5 grid grid-cols-3  gap-2">
              <div className="col-span-1">
                <button
                  onClick={() => toggleCancelModal()}
                  className="w-full  font-semibold text-center my-auto bg-inherit rounded-full h-10 border border-black"
                >
                  {REQUESTPAYMENT.button.cancelButton}
                </button>
              </div>
              <div className="col-span-2">
                <button
                  onClick={() => {
                    window.location.assign("/");
                  }}
                  className="w-full text-white font-semibold text-center my-auto bg-primary-500 rounded-full h-10"
                >
                  {REQUESTPAYMENT.button.homeButton}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div>
        <Footer />
      </div>

      <Modal
        toggleModal={toggleCancelModal}
        open={cancelModal}
        wrapChildStyle="p-0"
        modalStyle="w-[100vw] h-[100vh] flex justify-center items-center fixed bg-black/30 z-[60] left-[calc(0%)] top-[calc(0%)]"
        childStyle="w-[600px] bg-white md:rounded-xl md:min-h-fit min-h-full mx-0  overflow-hidden duration-200 animate-fade-in "
      >
        <CancelTicketModal
          REQUESTPAYMENT={REQUESTPAYMENT}
          handleCloseModal={toggleCancelModal}
        />
      </Modal>
    </Fragment>
  );
};

export default ContainerRequestInforPaymentDesktop;
