import { TransportIcon } from '@/components/icons';
import { ITranslation } from '@/interfaces/ITranslation';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import AddressSendReceiveOrder from './addressSendReceiveOrder';
import { convertKilogram } from '@/helpers/functionHelper';
import DetailPayment from '@/components/requestPayment/detailPayment';

interface IModalDetailOrderMobile {
  translation: ITranslation;
  codeOrder?: any;
  createAt?: any;
  orderStatusDisplay?: any;
  productList?: IProduct[];
  handleGoHome: () => void;
  statuFee?: any;
  incentivesPay?: any;
  totalFee?: any;
  informationPerson?: any;
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
  codeOrder: ' #MDH1002345',
  createAt: new Date(),
  orderStatusDisplay: 'Đơn hàng đã được chuyển đến kho XT1',
  statuFee: 'Đã thanh toán',
  incentivesPay: '0',
  totalFee: '80000',
  informationPerson: {
    fullName: 'Nguyễn Thanh Hải',
    phone: '0333336060',
    CCCD: '123456789',
    city: 'Nha Trang',
    address: 'văn phòng 41 Nguyễn Trãi',
    createAt: new Date(),
    fullNameReceive: 'Nguyễn Văn Bình',
    phoneReceive: '0333336060',
    CCCDReceive: '123456789',
    cityReceive: 'Nha Trang',
    addressReceive: 'văn phòng 41 Nguyễn Trãi',
  },
  productList: [
    {
      productId: 0,
      codeProduct: 'MDH1002345',
      content: 'Áo quần',
      weight: '7.000',
      size: '-',
      collector: 'Không',
    },
  ],
};

const ModalDetailOrderMobile = (props: IModalDetailOrderMobile) => {
  const {
    translation,
    codeOrder = defaultData.codeOrder,
    handleGoHome,
    createAt = defaultData.createAt,
    orderStatusDisplay = defaultData.orderStatusDisplay,
    productList = defaultData.productList,
    statuFee = defaultData.statuFee,
    incentivesPay = defaultData.incentivesPay,
    totalFee = defaultData.totalFee,
    informationPerson = defaultData.informationPerson,
  } = props;

  const [producs, setProducts] = useState([]);

  const feeDetail = {
    titleContent: translation.TRANSPORT.feeDetails,
    paymentInfor: [
      {
        name: translation.ORDER.status,
        content: statuFee,
      },
      {
        name: translation.CREATEORDER.freightDetail.incentivesPay,
        content: incentivesPay.toLocaleString() + 'đ',
      },
      {
        name: translation.CREATEORDER.freightDetail.totalPay,
        content: totalFee.toLocaleString() + 'đ',
        type: 2,
        colorText: '#DF5030',
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
            content: element.codeProduct ? element.codeProduct : '-',
          },
          {
            name: translation.TRANSPORT.content,
            content: element.content ? element.content : '-',
          },
          {
            name: translation.TRANSPORT.weightText,
            content: element.weight ? element.weight : '0',
          },
          {
            name: translation.TRANSPORT.sizeText,
            content: element.size ? element.size : '-',
          },
          {
            name: translation.TRANSPORT.collection,
            content: element.collector ? element.collector : '-',
          },
        ],
      };
      productArray.push(product);
    });
    setProducts(productArray);
  }, [productList]);

  return (
    <div className='bg-[#ECECEC] flex flex-col gap-2'>
      <div className='bg-white p-4 h-fit'>
        <div className='flex justify-between items-center'>
          <div className='py-1 px-2 bg-[#DEF5E0] text-xs font-extrabold text-neutral-grey-600 rounded-full w-fit uppercase'>
            {translation.ORDER.informationShipping}
          </div>
          {/* <div
            //   onClick={() => {
            //     handleOpenModalMoreDetail();
            //   }}
            className='text-[#0273BC] cursor-pointer text-sm font-semibold underline underline-offset-1'
          >
            {translation.ORDER.seeDetail}
          </div> */}
        </div>
        <div className='mt-2'>
          <div className='flex gap-4 items-center'>
            <div>
              <TransportIcon />
            </div>
            <div>
              <div className='text-sm font-semibold text-[#373738] line-clamp-1'>
                {orderStatusDisplay}
              </div>
              <div className='mt-[2px] text-xs font-normal text-neutral-500'>
                {moment(createAt).format('hh:mm,DD/MM/YYYY')}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-white px-4 py-3'>
        <AddressSendReceiveOrder
          informationPerson={informationPerson}
          translation={translation}
        />
      </div>
      {producs?.length > 0 && (
        <div className='bg-white px-4 py-3 flex flex-col gap-4'>
          {producs?.map((elm: any, ind: number) => {
            return (
              <div key={ind} className='flex flex-col gap-4'>
                <DetailPayment convertPriceData={elm} />
              </div>
            );
          })}
        </div>
      )}
      <div className='bg-white px-4 py-3'>
        <DetailPayment convertPriceData={feeDetail} />
      </div>
      <div className='bg-white px-4 py-2'>
        <button
          onClick={() => handleGoHome()}
          type='button'
          className='mx-auto w-full flex justify-center  gap-3 py-[10px] hover:opacity-90 duration-100 disabled:opacity-60 text-white text-base font-semibold text-center my-auto bg-primary-500 rounded-full h-[44px]'
        >
          {translation.VEHICLE.backButton}
        </button>
      </div>
    </div>
  );
};

export default ModalDetailOrderMobile;
