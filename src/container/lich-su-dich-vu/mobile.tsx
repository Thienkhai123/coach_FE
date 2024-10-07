import React, { useEffect, useState } from "react";
import { ITranslation } from "@/interfaces/ITranslation";
import HistoryItem from "@/components/Pages/lich-su-dich-vu/historyItem";
import { IServiceHistory } from "@/interfaces/httpRequest/IPoints";
import { fetchReadNotifications } from "@/apis/user";
import { useCustomToast } from "@/hook/useToast";
import {
  ITicketInfoData,
  ITicketInfoResponse,
} from "@/interfaces/httpRequest/ITrip";
import { fetchShippingOrder } from "@/apis/searchOrder";
import { IGetShippingOrderDetail } from "@/interfaces/httpRequest/IShipment";
import { fetchTicketInfo } from "@/apis/trip";
import FullScreenModal from "@/components/modal/FullScreenModal";
import useModal from "@/hook/useModal";
import LoadingView from "@/components/LoadingView";
import NavbarBasic from "@/components/navbar/basic";
import HistoryPersonBookingDetailMobile from "@/components/Pages/lich-su-dich-vu/historyPersonBookingDetailMobile";
import HistoryPackageDetailMobile from "@/components/Pages/lich-su-dich-vu/historyPackageDetailMobile";
import ModalDetailOrderMobile from "@/components/Pages/tra-cuu-don-hang/modalDetailOrderMobile";
interface IContainerServiceHistoryMobileProps {
  translation: ITranslation;
  serviceHistories: IServiceHistory[];
  handleGetHistoriesPoints: () => void;
}

const FAKE_DATAS = [
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
];

const ContainerServiceHistoryMobile = (
  props: IContainerServiceHistoryMobileProps
) => {
  const { translation, serviceHistories, handleGetHistoriesPoints } = props;
  const [openModalTickets, toggleModalTickets] = useModal();
  const [openModalPackages, toggleModalPackages] = useModal();

  const [histories, setHistories] = useState<any>([]);
  const [ticketInfo, setTicketInfo] = useState<ITicketInfoData>();
  const [isLoading, setLoading] = useState(false);
  const [paymentInfor, setPaymentInfor] = useState<any>();
  const { toastError } = useCustomToast();
  const [ticketInfoReturn, setTicketInfoReturn] = useState<ITicketInfoData>();

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
      };
      setPaymentInfor(constomData);
      toggleModalPackages();
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
        toggleModalTickets();
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
        toggleModalTickets();
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

  const handleChangePrevTab = () => {
    toggleModalTickets();
    handleGetHistoriesPoints();
  };

  const handleChangePrevTabPackages = () => {
    toggleModalPackages();
    handleGetHistoriesPoints();
  };

  const handleGoHome = () => {
    window.location.assign("/");
  };

  useEffect(() => {
    const histories: any = [];
    serviceHistories?.forEach((element: any) => {
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
    <div>
      <div className="w-full h-full bg-neutral-grey-100 pb-10">
        <div className="bg-white p-4">
          <div className="py-1 px-2 bg-[#DEF5E0] text-xs font-extrabold text-neutral-grey-600 rounded-full w-fit">
            {translation.HISTORY.serviceHistory}
          </div>
          <div className="mt-4">
            {histories?.length > 0 ? (
              histories?.map((elm: any, ind: number) => {
                return (
                  <div key={ind}>
                    <HistoryItem
                      {...elm}
                      trans={translation}
                      handleLinkHistory={handleLinkHistory}
                    />
                  </div>
                );
              })
            ) : (
              <div className="px-4">
                <p className="text-p14">Chưa có dữ liệu</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <FullScreenModal open={openModalTickets}>
        <NavbarBasic
          title={translation.HISTORY.detailTitle}
          handleClick={handleChangePrevTab}
        />
        <HistoryPersonBookingDetailMobile
          translation={translation}
          ticketInfo={ticketInfo}
          ticketInfoReturn={ticketInfoReturn}
        />
      </FullScreenModal>
      <FullScreenModal open={openModalPackages}>
        <NavbarBasic
          title={translation.HISTORY.detailTitle}
          handleClick={handleChangePrevTabPackages}
        />
        <ModalDetailOrderMobile
          {...paymentInfor}
          translation={translation}
          handleGoHome={handleGoHome}
        />
      </FullScreenModal>
    </div>
  );
};

export default ContainerServiceHistoryMobile;
