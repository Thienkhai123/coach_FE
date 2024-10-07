import { ITranslation } from "@/interfaces/ITranslation";
import moment from "moment";
import React from "react";

interface IHistoryItem {
  trans: ITranslation;
  idNoti: any;
  isTypeOfNoti?: any;
  isTypeOfNotiDisplay?: any;
  isTypeOfProduct?: any; //  {0: không có trạng thái, 1: đã hủy, 2: Chờ xác nhận, 3 Đang vận chuyển, 4: thành công}
  isTypeOfProductDisplay?: any;
  notiName?: any;
  colorStatus?: any;
  TypeOfProductDisplay?: any;
  createdAt?: any;
  bookingType?: number; // {0: trạng thái đặt vé xe, 1: trạng thái ký gửi hàng hóa}
  handleLinkHistory: (idNo?: any, type?: any) => void;
  spacingX?: string;
}

const defaultData = {
  idNoti: 0,
  isTypeOfNoti: true,
  isTypeOfNotiDisplay: "Voucher",
  isTypeOfProduct: true, //  {0: không có trạng thái, 1: đã hủy, 2: Chờ xác nhận, 3 Đang vận chuyển, 4: thành công}
  colorStatus: "#00993D", //  {0: không có trạng thái, 1: đã hủy, 2: Chờ xác nhận, 3 Đang vận chuyển, 4: thành công}
  TypeOfProductDisplay: "Đang vận chuyển",
  notiName:
    "Đã nhận 20 điểm từ giao dịch đặt vé xe Đà Nẵng - Nha Trang chuyến 17:00 21/12/2024",
  bookingType: 0, // {0: trạng thái đặt vé xe, 1: trạng thái ký gửi hàng hóa}
  createdAt: new Date(),
};

const HistoryItem = (props: IHistoryItem) => {
  const {
    idNoti = defaultData.idNoti,
    isTypeOfNoti = defaultData.isTypeOfNoti,
    isTypeOfNotiDisplay = defaultData.isTypeOfNotiDisplay,
    isTypeOfProduct = defaultData.colorStatus, //  {0: không có trạng thái, 1: đã hủy, 2: Chờ xác nhận, 3 Đang vận chuyển, 4: thành công}
    colorStatus = defaultData.colorStatus,
    notiName = defaultData.notiName,
    createdAt = defaultData.createdAt,
    bookingType,
    TypeOfProductDisplay = defaultData.TypeOfProductDisplay,
    trans,
    handleLinkHistory,
    spacingX = "",
  } = props;

  return (
    <div
      onClick={() => handleLinkHistory(idNoti, bookingType)}
      className={`py-[10px] border-b border-neutral-100 cursor-pointer ${spacingX}`}
    >
      <div className="flex justify-between">
        <div className="text-sm text-[#063F65] font-semibold px-[6px] rounded-full bg-[#DFF0FB] relative leading-[21px]">
          {isTypeOfNotiDisplay}
          {isTypeOfNoti && (
            <div className="w-[6px] h-[6px] rounded-full bg-[#DF5030] absolute top-0 left-0" />
          )}
        </div>
        <div>
          {isTypeOfProduct && (
            <div
              className={`text-[13px] font-bold px-2 rounded-full border`}
              style={{
                color: colorStatus,
                borderColor: colorStatus,
              }}
            >
              {TypeOfProductDisplay}
            </div>
          )}
        </div>
      </div>
      <div className="mt-2">
        <p className="text-sm font-bold text-neutral-700 max-h-fit line-clamp-3">
          {notiName}
        </p>
        <div className="flex gap-1 items-center mt-1">
          <div className=" text-sm font-normal text-neutral-500">
            {moment(createdAt).format("hh:mm")}
          </div>
          <div className="rounded-full h-1 w-1 bg-neutral-500" />
          <div className=" text-sm font-normal text-neutral-500">
            {moment(createdAt).format("DD/MM/YYYY")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryItem;
