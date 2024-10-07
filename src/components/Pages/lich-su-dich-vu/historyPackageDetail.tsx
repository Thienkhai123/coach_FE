import ArrowLeftIcon from "@/components/icons/arrowLeft";
import { ITranslation } from "@/interfaces/ITranslation";
import React, { Fragment, useEffect, useState } from "react";
import TransportIcon from "@/components/icons/transport";
import moment from "moment";
import DetailPayment from "@/components/requestPayment/detailPayment";
import { convertKilogram } from "@/helpers/functionHelper";
import AddressSendReceiveOrder from "../tra-cuu-don-hang/addressSendReceiveOrder";

interface IHistoryPackageDetail {
  translation: ITranslation;
  codeOrder?: any;
  createAt?: any;
  orderStatusDisplay?: any;
  productList?: IProduct[];
  handleCloseModal: () => void;
  handleOpenModalMoreDetail: () => void;
  handleBack: () => void;
  statuFee?: any;
  incentivesPay?: any;
  totalFee?: any;
  informationPerson?: any;
  codAmount?: any;
  codPaid?: any;
  paymentStatus?: string;
}

interface IProduct {
  productId?: number;
  codeProduct?: string;
  content?: string;
  weight?: any;
  size?: any;
  collector?: any;
}

const defaultData = {
  codeOrder: " #MDH1002345",
  createAt: new Date(),
  orderStatusDisplay: "Đơn hàng đã được chuyển đến kho XT1",
  statuFee: "Đã thanh toán",
  incentivesPay: "0",
  totalFee: "80000",
  informationPerson: {
    fullName: "Nguyễn Thanh Hải",
    phone: "0333336060",
    CCCD: "123456789",
    city: "Nha Trang",
    address: "văn phòng 41 Nguyễn Trãi",
    createAt: new Date(),
    fullNameReceive: "Nguyễn Văn Bình",
    phoneReceive: "0333336060",
    CCCDReceive: "123456789",
    cityReceive: "Nha Trang",
    addressReceive: "văn phòng 41 Nguyễn Trãi",
  },
  productList: [
    {
      productId: 0,
      codeProduct: "MDH1002345",
      content: "Áo quần",
      weight: "7.000",
      size: "-",
      collector: "Không",
    },
  ],
};

const HistoryPackageDetail = (props: IHistoryPackageDetail) => {
  const {
    translation,
    codeOrder = defaultData.codeOrder,
    createAt = defaultData.createAt,
    orderStatusDisplay = defaultData.orderStatusDisplay,
    productList = defaultData.productList,
    handleCloseModal,
    handleBack,
    handleOpenModalMoreDetail,
    statuFee = defaultData.statuFee,
    incentivesPay = defaultData.incentivesPay,
    totalFee = defaultData.totalFee,
    informationPerson = defaultData.informationPerson,
    codAmount = 0,
    codPaid = 0,
    paymentStatus = "",
  } = props;

  const [producs, setProducts] = useState([]);

  const feeDetail = {
    titleContent: translation.TRANSPORT.feeDetails,
    paymentInfor: [
      {
        name: translation.CREATEORDER.freightDetail.totalPay,
        content: parseInt(totalFee || "0").toLocaleString() + "đ",
        type: 2,
        colorText: "#DF5030",
      },
      {
        name: translation.CREATEORDER.freightDetail.incentivesPay,
        content: parseInt(incentivesPay || "0").toLocaleString() + "đ",
      },
      {
        name: translation.ORDER.status,
        content: paymentStatus,
      },
      {
        name: translation.TRANSPORT.collection,
        content:
          codAmount > 0
            ? codAmount.toLocaleString() + " " + "đ"
            : translation.SEARCHING.ankNo,
      },
      {
        typeComponent: 1,
        name: translation.ORDER.collected,
        content: codPaid?.toLocaleString() + "đ",
        colorText: "#101F24",
      },
    ],
  };

  useEffect(() => {
    const productArray: any = [];
    productList?.forEach((element: any) => {
      const product = {
        titleContent: translation.CREATEORDER.detailProductSendReceive.package,
        paymentInfor: [
          {
            name: translation.TRANSPORT.productionCode,
            content: element.codeProduct ? element.codeProduct : "-",
          },
          {
            name: translation.TRANSPORT.content,
            content: element.content ? element.content : "-",
          },
          {
            name: translation.TRANSPORT.weightText,
            content: element.weight ? element.weight : "0",
          },
          {
            name: translation.TRANSPORT.sizeText,
            content: element.size ? element.size : "-",
          },
        ],
      };
      productArray.push(product);
    });
    setProducts(productArray);
  }, [productList]);

  return (
    <Fragment>
      <div className="flex gap-4 n items-center">
        <div
          onClick={() => handleBack()}
          className="cursor-pointer hover:opacity-80 duration-100 h-[36px] w-fit flex gap-2 justify-center items-center px-3 py-[6px] border border-neutral-400 rounded-full"
        >
          <ArrowLeftIcon />{" "}
          <div className="text-sm font-semibold">{translation.NEWS.back} </div>
        </div>
        <div className="text-xl font-semibold text-neutral-700 first-letter:capitalize">
          {translation.HISTORY.detailTitle}
        </div>
      </div>
      <div className="mt-6 bg-white rounded-xl p-4">
        <AddressSendReceiveOrder
          informationPerson={informationPerson}
          translation={translation}
        />
      </div>
      <div className="bg-white rounded-xl px-4 py-6 mt-2">
        <div className="flex justify-between items-center">
          <div className="py-1 px-2 bg-[#DEF5E0] text-xs font-extrabold text-neutral-grey-600 rounded-full w-fit uppercase">
            {translation.ORDER.informationShipping}
          </div>
          {/* <div
            onClick={() => {
              handleOpenModalMoreDetail();
            }}
            className='text-[#0273BC] cursor-pointer text-sm font-semibold underline underline-offset-1'
          >
            {translation.ORDER.seeDetail}
          </div> */}
        </div>
        <div className="mt-2">
          <div className="flex gap-4 items-center">
            <div>
              <TransportIcon />
            </div>
            <div>
              <div className="text-sm font-semibold text-[#373738]">
                {orderStatusDisplay}
              </div>
              <div className="mt-[2px] text-xs font-normal text-neutral-500">
                {moment(createAt).format("hh:mm,DD/MM/YYYY")}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6">
          {producs?.map((elm: any, ind: number) => {
            return (
              <div key={ind} className="flex flex-col gap-4">
                <DetailPayment convertPriceData={elm} />
              </div>
            );
          })}
        </div>
        <div className="mt-6">
          <DetailPayment convertPriceData={feeDetail} />
        </div>
      </div>
      {/* <div className='mt-5'>
          <button
            onClick={() => handleGoHome()}
            type='button'
            className='mx-auto w-[320px] flex justify-center mt-6  gap-3 py-[10px]   hover:opacity-90 duration-100 disabled:opacity-60 text-white text-base font-semibold text-center my-auto bg-primary-500 rounded-full h-[44px]'
          >
            {translation.VEHICLE.backButton}
          </button>
        </div> */}
    </Fragment>
  );
};

export default HistoryPackageDetail;
