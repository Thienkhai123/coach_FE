import { fetchShippingOrder } from "@/apis/searchOrder";
import { fetchTicketInfo } from "@/apis/trip";
import { fetchReadNotifications } from "@/apis/user";
import LoadingView from "@/components/LoadingView";
import Modal from "@/components/modal/Modal";
import HistoriesBooking from "@/components/Pages/lich-su-dich-vu/historiesBooking";
import HistoryPackageDetail from "@/components/Pages/lich-su-dich-vu/historyPackageDetail";
import HistoryPersonBookingDetail from "@/components/Pages/lich-su-dich-vu/historyPersonBookingDetail";
import ModalDetailOrder from "@/components/Pages/tra-cuu-don-hang/modalDetailOrder";
import useModal from "@/hook/useModal";
import { useCustomToast } from "@/hook/useToast";
import { IGetShippingOrderDetail } from "@/interfaces/httpRequest/IShipment";
import {
  ITicketInfoData,
  ITicketInfoResponse,
} from "@/interfaces/httpRequest/ITrip";
import { IUserProfile } from "@/interfaces/httpRequest/IUser";
import { ITranslation } from "@/interfaces/ITranslation";
import { usePathname } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";
import "moment/locale/vi";

const defaultData = {
  histories: [
    {
      idNoti: 0,
      isTypeOfNoti: true,
      isTypeOfNotiDisplay: "Gửi hàng",
      isTypeOfProduct: 4,
      notiName: "Bạn đã tạo thành công đơn hàng #MDH1002345 từ... đến...",
      createAt: new Date(),
      bookingType: 1,
    },
    {
      idNoti: 1,
      isTypeOfNoti: true,
      isTypeOfNotiDisplay: "Vé xe",
      isTypeOfProduct: 2,
      notiName: "Bạn đã đặt vé xe Đà Nẵng - Nha Trang chuyến 17:00 21/12/2024",
      createAt: new Date(),
      bookingType: 0,
    },
    {
      idNoti: 2,
      isTypeOfNoti: false,
      isTypeOfNotiDisplay: "Tour du lịch",
      isTypeOfProduct: 1,
      notiName: "Bạn đã huỷ tour du lịch...",
      createAt: new Date(),
      bookingType: 0,
    },
    {
      idNoti: 3,
      isTypeOfNoti: false,
      isTypeOfNotiDisplay: "Xe hợp đồng",
      isTypeOfProduct: 4,
      notiName: "Bạn đã đặt thành công xe hợp đồng",
      createAt: new Date(),
      bookingType: 0,
    },
  ],
};

interface IContainerServiceHistoryDesktopProps {
  userProfile?: IUserProfile;
  translation: ITranslation;
  histories?: IHistory[];
  serviceHistories: any;
  handleGetHistoriesPoints: () => void;
}

interface IHistory {
  idNoti: number;
  isTypeOfNoti: boolean;
  isTypeOfNotiDisplay: string;
  isTypeOfProduct: number;
  notiName: string;
  createAt: any;
  bookingType: number; // {0: trạng thái đặt vé xe, 1: trạng thái ký gửi hàng hóa}
}

const ContainerServiceHistoryDesktop = (
  props: IContainerServiceHistoryDesktopProps
) => {
  const {
    userProfile,
    translation,
    serviceHistories,
    handleGetHistoriesPoints,
  } = props;
  const pathname = usePathname();

  const [step, setStep] = useState(1);
  const [histories, setHistories] = useState<any>(defaultData.histories);
  const [ticketInfo, setTicketInfo] = useState<ITicketInfoData>();
  const [isLoading, setLoading] = useState(false);
  const [paymentInfor, setPaymentInfor] = useState<any>();
  const { toastError } = useCustomToast();
  const [ticketInfoReturn, setTicketInfoReturn] = useState<ITicketInfoData>();

  const [openModalDetail, toggleModalDetail] = useModal();

  const getShippingInfor = async ({
    phone,
    code,
  }: {
    phone: string;
    code: string;
  }) => {
    setLoading(true);
    const params = {
      phoneNumber: phone,
      shippingOrderCode: code,
    };
    const res: IGetShippingOrderDetail = await fetchShippingOrder(params);
    if (res.isSuccess) {
      const dataOld = res?.data;
      const productDetail: any = [];
      dataOld?.packages?.forEach((element: any) => {
        const { content, width, length, height } = element?.packageMetadata;
        const { weightDisplay = "-", dimensionDisplay = "-" } =
          element?.shipmentCostInfo || {};
        const data = {
          productId: element?.shippingOrderId,
          codeProduct: dataOld?.shippingOrderCode
            ? dataOld?.shippingOrderCode.replace("#", "")
            : "-",
          content: content,
          weight: weightDisplay,
          size: dimensionDisplay,
          collector:
            dataOld?.codAmount > 0
              ? dataOld?.codAmount.toLocaleString() + " " + "đ"
              : translation?.SEARCHING.ankNo,
        };
        productDetail?.push(data);
      });
      const constomData: any = {
        codeOrder: dataOld?.shippingOrderCode,
        createAt: dataOld?.createdAt,
        statuFee:
          dataOld?.shippingFeeStatusDisplay === "Chưa thanh toán"
            ? translation.ORDER.statusUnpaid
            : translation.ORDER.statusPaid,
        orderStatusDisplay:
          dataOld?.trackingShippingStatuses[
            dataOld?.trackingShippingStatuses?.length - 1
          ]?.statusDisplay,
        incentivesPay: 0, // ưu đải
        totalFee: dataOld?.shippingFee,
        informationPerson: {
          fullName: dataOld?.senderInfo?.senderName,
          phone: dataOld?.senderInfo?.senderPhone,
          CCCD: dataOld?.senderInfo?.senderCI,
          city: dataOld?.loadingLocation?.cityName,
          address: dataOld?.senderInfo?.senderAddress,
          createAt: dataOld?.createdAt,
          fullNameReceive: dataOld?.receiverInfo?.receiverName,
          phoneReceive: dataOld?.receiverInfo?.receiverPhone,
          CCCDReceive: dataOld?.receiverInfo?.receiverCI,
          cityReceive: dataOld?.unloadingLocation?.cityName,
          addressReceive: dataOld?.receiverInfo?.receiverAddress,
        },
        productList: productDetail,
        codAmount: dataOld?.codAmount,
        codPaid: dataOld?.codPaid,
        paymentStatus: dataOld?.codFeeStatusDisplay,
      };
      setPaymentInfor(constomData);
      setStep(3);
    } else {
      setPaymentInfor([]);
      toastError({
        message: res?.errorMessage,
        toastId: "infoTicket-errors",
      });
    }
    setLoading(false);
  };

  const getTicketInfo = async ({
    phone,
    code,
  }: {
    phone: string;
    code: string;
  }) => {
    setLoading(true);
    if (phone && code) {
      const res: ITicketInfoResponse = await fetchTicketInfo({
        phone: phone,
        code: code,
      });

      if (res?.isSuccess) {
        setTicketInfo(res?.data);
        setStep(2);
      } else {
        toastError({
          message: res?.errorMessage,
          toastId: "infoTicket-errors",
        });
      }
    }
    setLoading(false);
  };

  const getTicketInfoReturn = async ({
    phone,
    code,
  }: {
    phone: string;
    code: string;
  }) => {
    setLoading(true);
    if (phone && code) {
      const res: ITicketInfoResponse = await fetchTicketInfo({
        phone: phone,
        code: code,
      });
      if (res?.isSuccess) {
        setTicketInfoReturn(res?.data);
        setStep(2);
      } else {
        toastError({
          message: res?.errorMessage,
          toastId: "infoTicket-errors",
        });
      }
    }
    setLoading(false);
  };

  const handleRead = async (idNoti: number) => {
    const payload = [idNoti];
    const _ = await fetchReadNotifications(payload);
  };

  const handleLinkHistory = async (idNoti?: any, type?: any) => {
    const notiFind: any = serviceHistories?.find(
      (elm: any) => elm.userNotificationId === idNoti
    );
    if (type === 1 || notiFind.url !== null) {
      handleRead(idNoti);
      window.location.assign(notiFind.url);
    } else if (type === 2) {
      const code = notiFind?.metadata?.code?.replace("#", "");
      const phone = notiFind?.metadata?.phone;
      handleRead(idNoti);
      getShippingInfor({ code: code, phone: phone });
    } else if (type === 3) {
      handleRead(idNoti);
      if (notiFind) {
        const { recordId } = notiFind || {};
        window.location.assign(`/chi-tiet-thue-xe?rent=${recordId}`);
      }
    } else if (type === 4) {
      const code = notiFind?.metadata?.code?.replace("#", "");
      const phone = notiFind?.metadata?.phone;
      handleRead(idNoti);
      if (code && phone) {
        if (notiFind?.codeReturnParam) {
          getTicketInfoReturn({
            code: code,
            phone: phone,
          });
        }
        getTicketInfo({ code: code, phone: phone });
      }
    } else {
      handleRead(idNoti);
      handleGetHistoriesPoints();
    }
  };

  const handleBack = (idNoti?: any, type?: number) => {
    handleGetHistoriesPoints();
    setStep(1);
  };

  const handleMoreDetail = () => {
    toggleModalDetail();
  };

  const handleCloseModal = () => {
    toggleModalDetail();
  };

  useEffect(() => {
    const histories: any = [];
    serviceHistories?.reverse()?.forEach((element: any) => {
      const hisItem = {
        idNoti: element?.userNotificationId,
        isTypeOfNoti: !element?.isRead,
        isTypeOfNotiDisplay: element?.title,
        // isTypeOfProduct: element?.status === 0 ? true : false, // ẩn hiện trạng thái
        isTypeOfProduct: true, // ẩn hiện trạng thái
        colorStatus: element?.statusColor, // Cập nhật mã màu
        notiName: element?.content,
        TypeOfProductDisplay: element?.statusDisplay,
        bookingType: element?.notifyType,
        createdAt: element?.createAt,
        url: element?.url,
      };
      histories?.push(hisItem);
    });
    setHistories(histories);
  }, [serviceHistories]);

  if (isLoading) return <LoadingView />;

  return (
    <div className="flex bg-[#ECECEC] flex-col min-h-[100vh] ">
      <div className="w-[1120px] mx-auto h-full flex-1   mt-10 mb-[60px] ">
        {step === 1 && (
          <HistoriesBooking
            translation={translation}
            histories={histories}
            handleLinkHistory={handleLinkHistory}
            userProfile={userProfile}
          />
        )}
        <div className="xl:w-[640px] mx-auto">
          {step === 2 && (
            <HistoryPersonBookingDetail
              translation={translation}
              handleBack={handleBack}
              ticketInfo={ticketInfo}
              ticketInfoReturn={ticketInfoReturn}
            />
          )}
          {step === 3 && (
            <Fragment>
              <HistoryPackageDetail
                {...paymentInfor}
                translation={translation}
                handleCloseModal={handleCloseModal}
                handleOpenModalMoreDetail={handleMoreDetail}
                handleBack={handleBack}
              />
              <Modal
                toggleModal={handleCloseModal}
                open={openModalDetail}
                wrapChildStyle="p-0"
                modalStyle="w-[100vw] h-[100vh] flex justify-center items-center fixed bg-black/30 z-[60] left-[calc(0%)] top-[calc(0%)]"
                childStyle="w-[600px] bg-white md:rounded-xl md:min-h-fit min-h-full mx-0  overflow-hidden duration-200 animate-fade-in "
              >
                <ModalDetailOrder
                  translation={translation}
                  handleCloseModal={handleCloseModal}
                />
              </Modal>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContainerServiceHistoryDesktop;
