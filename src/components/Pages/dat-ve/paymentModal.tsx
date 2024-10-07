import Image from 'next/image';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { IBookingTranslate } from '@/interfaces/IBookingTranslate';
import { IErrorTranslate } from '@/interfaces/IErrorTranslate';
import { IPlaceholderTranslate } from '@/interfaces/IPlaceholderTranslate';
import { ISignInTranslate } from '@/interfaces/ISignInTranslate';
import { IRequestPaymentTranslate } from '@/interfaces/IRequestPaymentTranslate';
import Button from '@/components/button';
import { toast } from 'react-toastify';
import ToastCopy from '@/components/toasts/copy';
import { IPaymentTranslate } from '@/interfaces/IPaymentTranslate';
import DownloadIcon from '@/components/icons/download';
import InformationIcon from '@/components/icons/infomation';
import CopyIcon from '@/components/icons/copy';
import CountDown from '@/components/count-down';
import { IBankData, IBankResponse } from '@/interfaces/httpRequest/IVietQr';
import {
  IInfoBank,
  IReservationStartData,
  ISeat,
} from '@/interfaces/httpRequest/ITrip';
import { fetchBankInfo } from '@/apis/trip';

interface IPaymentModalProps {
  BOOKING: IBookingTranslate;
  PLACEHOLDER?: IPlaceholderTranslate;
  SIGNIN?: ISignInTranslate;
  REQUESTPAYMENT: IRequestPaymentTranslate;
  // handleSubmit:Function;
  handleCloseModal?: () => void;
  handleConfirmPayment: () => void;
  PAYMENT: IPaymentTranslate;
  expiredDuration: number;
  price: number;
  reservationDetail: IReservationStartData;
  reservationDetailReturn?: IReservationStartData;
  selectedSeat?: ISeat[];
  selectedSeatReturn?: ISeat[];
  formData?: any;
}
type InfoT = {
  bank: string;
  bankingNumber: string;
  ownerAccount: string;
  tranferContent: string;
};

type ValueT = {
  id: number;
  value: string;
};

type DataT = {
  bank: ValueT;
  bankingNumber: ValueT;
  ownerAccount: ValueT;
  tranferContent: ValueT;
};

type ItemComponent = {
  title: string;
  value: string;
  textCopy: string;
  showCopyButton?: boolean;
  color?: string;
  copyText: (arg: any) => void;
};

const RenderItem = ({
  title,
  value,
  textCopy,
  copyText,
  showCopyButton = true,
  color = 'text-neutral-grey-700',
}: ItemComponent) => {
  return (
    <div className='flex gap-4 justify-between items-start'>
      <div className='flex flex-col gap-0.5'>
        <p className='text-neutral-grey-500 text-xs font-medium leading-[18px]'>
          {title}
        </p>
        <p className={`${color} text-sm font-semibold leading-[21px]`}>
          {value}
        </p>
      </div>

      <div>
        {showCopyButton && (
          <button
            className='py-2 px-3 bg-neutral-grey-100 hover:bg-primary-900 rounded-full '
            onClick={() => copyText(value)}
          >
            <div className='flex items-center gap-1'>
              <CopyIcon />
              <p className='text-black font-semibold text-xs leading-[18px]'>
                {textCopy}
              </p>
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

const PaymentModal = (props: IPaymentModalProps) => {
  const {
    BOOKING,
    PAYMENT,
    PLACEHOLDER,
    SIGNIN,
    REQUESTPAYMENT,
    expiredDuration,
    handleCloseModal = () => {},
    handleConfirmPayment = () => {},
    price,
    reservationDetail,
    reservationDetailReturn,
    selectedSeat,
    selectedSeatReturn,
    formData,
  } = props;
  const FAKE_DATAS = {
    bank: {
      id: 1,
      value: 'MBBank',
    },
    bankingNumber: {
      id: 2,
      value: '00025263688',
    },
    ownerAccount: {
      id: 3,
      value: 'NGUYEN THI NGOC',
    },
    total: {
      id: 4,
      value: `${price.toLocaleString()}đ`,
    },
    tranferContent: {
      id: 5,
      value: reservationDetailReturn
        ? `QBCODE ${reservationDetail?.code}-${reservationDetailReturn?.code}`
        : `QBCODE ${reservationDetail?.code}`,
    },
  };

  const [selectedBank, setSelectedbank] = useState<IBankData | null>({
    id: 21,
    name: 'Ngân hàng TMCP Quân đội',
    code: 'MB',
    bin: '970422',
    shortName: 'MBBank',
    logo: 'https://api.vietqr.io/img/MB.png',
    transferSupported: 1,
    lookupSupported: 1,
    short_name: 'MBBank',
    support: 3,
    isTransfer: 1,
    swift_code: 'MSCBVNVX',
    Infor: FAKE_DATAS,
  });
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(false);

  const INFORMATION_BANKING = {
    bank: PAYMENT.bank,
    bankingNumber: PAYMENT.bankingNumber,
    ownerAccount: PAYMENT.ownerAccount,
    total: PAYMENT.totalPrice,
    tranferContent: PAYMENT.tranferContent,
  };

  function copyText(text = '') {
    // Copy the text
    navigator.clipboard.writeText(text);

    // Alert the copied text
    toast(
      ToastCopy({
        message: PAYMENT.copied,
      }),
      {
        toastId: 'alert-copy-text',
        className: 'bg-toast-custom',
        closeButton: false,
        position: 'top-center',
        hideProgressBar: true,
        autoClose: 3000,
      },
    );
  }
  const download = (url: string, name: string) => {
    if (!url) {
      throw new Error('Có lỗi xảy ra!');
    }
    setFetching(true);
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        setFetching(false);
        const blobURL = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobURL;
        // a.style = "display: none";

        if (name && name.length) a.download = name;
        document.body.appendChild(a);
        a.click();
      })
      .catch(() => setError(true));
  };

  const handleSubmit = () => {
    window.location.assign('/cho-xac-nhan-thanh-toan');
  };

  useEffect(() => {
    const fetchBank = async () => {
      const res: IInfoBank = await fetchBankInfo();
      const data = {
        bank: {
          id: 1,
          value: res.data.shortName,
        },
        bankingNumber: {
          id: 2,
          value: res.data.accountNumber,
        },
        ownerAccount: {
          id: 3,
          value: res.data.accountName,
        },
        total: {
          id: 4,
          value: `${price.toLocaleString()}đ`,
        },
        tranferContent: {
          id: 5,
          value: reservationDetailReturn
            ? `QBCODE ${reservationDetail?.code}-${reservationDetailReturn?.code}`
            : `QBCODE ${reservationDetail?.code}`,
        },
      };
      const infoObj = {
        id: res.data.bankId,
        name: res?.data?.name,
        code: 'MB',
        bin: res.data.bin,
        shortName: res.data.shortName,
        logo: 'https://api.vietqr.io/img/MB.png',
        transferSupported: 1,
        lookupSupported: 1,
        short_name: res.data.shortName,
        support: 3,
        isTransfer: 1,
        swift_code: 'MSCBVNVX',
        Infor: data,
      };
      setSelectedbank(infoObj);
    };
    fetchBank();
  }, []);

  return (
    <div className={``}>
      <div className='p-4 flex items-center justify-center border-b border-neutral-grey-200 relative'>
        <div className='flex flex-col items-center justify-center'>
          <p className='text-base font-semibold'>
            {BOOKING.paymentInformation}
          </p>
          {selectedSeat && !selectedSeatReturn && (
            <p className='text-neutral-grey-500 font-semibold leading-[21px] text-sm'>{`MS Chuyến xe: ${
              reservationDetail.code
            } - Ghế ${selectedSeat?.map(
              (el: ISeat, idx: number) => el?.seatName,
            )} `}</p>
          )}
          {selectedSeatReturn && selectedSeatReturn?.length > 0 && (
            <p className='text-neutral-grey-500 font-semibold leading-[21px] text-sm'>{`MS Chuyến xe: ${
              reservationDetail.code
            } - ${
              reservationDetailReturn && reservationDetailReturn.code
            } - Ghế ${
              selectedSeat &&
              selectedSeatReturn &&
              [...selectedSeat, ...selectedSeatReturn]?.map(
                (el: ISeat, idx: number) => el?.seatName,
              )
            } `}</p>
          )}
        </div>
        {/* <div
					onClick={() => {
						handleCloseModal();
					}}
					className='absolute right-5 cursor-pointer'>
					<CancelIcon width='14' height='14' fill='#6A6F70' />
				</div> */}
      </div>
      <div className='max-h-[68vh] overflow-auto  flex flex-col p-4 gap-2 bg-neutral-grey-100'>
        <div className='flex flex-col gap-2  '>
          <div className='bg-white p-4 rounded-xl'>
            <div className='bg-semantic-green-light py-1 px-2 rounded-full w-fit  mx-auto'>
              <p className='text-neutral-grey-600 font-extrabold text-xs uppercase'>
                {BOOKING.quickPaymentByQRCode}
              </p>
            </div>

            <div className='flex items-center justify-center gap-3 mt-5'>
              {reservationDetailReturn ? (
                <Image
                  alt='qr-code'
                  src={
                    `https://img.vietqr.io/image/${selectedBank?.shortName}-${
                      selectedBank?.Infor?.bankingNumber?.value
                    }-qr_only.png?amount=${price}&addInfo=${`QBCODE ${reservationDetail.code} ${reservationDetailReturn.code}`}&accountName=${`NGUYEN THI NGOC`}` ||
                    '/images/empty-trip-mobile.png'
                  }
                  width={120}
                  height={120}
                />
              ) : (
                <Image
                  alt='qr-code'
                  src={
                    `https://img.vietqr.io/image/${selectedBank?.shortName}-${
                      selectedBank?.Infor?.bankingNumber?.value
                    }-qr_only.png?amount=${price}&addInfo=${`QBCODE ${reservationDetail.code}`}&accountName=${`NGUYEN THI NGOC`}` ||
                    '/images/empty-trip-mobile.png'
                  }
                  width={120}
                  height={120}
                />
              )}

              <div
                onClick={() => {
                  if (!fetching) {
                    if (reservationDetailReturn) {
                      download(
                        `https://img.vietqr.io/image/${
                          selectedBank?.shortName
                        }-${
                          selectedBank?.Infor?.bankingNumber?.value
                        }-qr_only.png?amount=${price}&addInfo=${`QBCODE ${reservationDetail.code} ${reservationDetailReturn.code}`}&accountName=${`NGUYEN THI NGOC`}`,
                        `${reservationDetail.code}qr_code`,
                      );
                    } else {
                      download(
                        `https://img.vietqr.io/image/${
                          selectedBank?.shortName
                        }-${
                          selectedBank?.Infor?.bankingNumber?.value
                        }-qr_only.png?amount=${price}&addInfo=${`QBCODE ${reservationDetail.code}`}&accountName=${`NGUYEN THI NGOC`}`,
                        `${reservationDetail.code}qr_code`,
                      );
                    }
                  }
                }}
                className='flex flex-col items-center justify-center gap-1 cursor-pointer'
              >
                <DownloadIcon />
                <p className='text-black font-medium text-sm'>
                  {PAYMENT.download}
                </p>
              </div>
            </div>

            <div className='flex gap-2 mb-1 mt-5'>
              <div>
                <InformationIcon />
              </div>
              <p className='text-secondary-100 font-semibold text-sm'>
                {BOOKING.noteBanksNotSupportQR}
              </p>
            </div>
            <div className='flex gap-2 '>
              <div>
                <InformationIcon />
              </div>
              <p className='text-secondary-100 font-semibold text-sm'>
                {BOOKING.pleaseCheckInformationBeforeTransfer}
              </p>
            </div>
          </div>

          <div className='bg-white p-4 rounded-xl'>
            <div className='flex items-center gap-3'>
              <div className='flex-1 border border-dashed border-neutral-grey-300' />
              <p className='text-neutral-grey-600 font-medium text-sm lowercase'>
                {PAYMENT.or}
              </p>
              <div className='flex-1 border border-dashed border-neutral-grey-300' />
            </div>

            <div className='flex flex-col gap-4 mt-4'>
              {Object.keys(selectedBank?.Infor)?.map((keyData, ind) => {
                const title = INFORMATION_BANKING[keyData as keyof InfoT];
                const { value, id } =
                  selectedBank?.Infor[keyData as keyof DataT];
                return (
                  <RenderItem
                    showCopyButton={id !== 4}
                    color={
                      id === 4 ? 'text-primary-500' : 'text-neutral-grey-700'
                    }
                    key={`bank-info-${ind}`}
                    title={title}
                    value={value}
                    copyText={copyText}
                    textCopy={PAYMENT.copy}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col items-center gap-3 p-4 pb-6'>
        <p className='text-black text-sm font-semibold text-center '>
          {BOOKING.expiredBookingDuration}{' '}
          {expiredDuration && <CountDown inputTimer={expiredDuration} />}
          {!expiredDuration && '--:--'}
        </p>
        <Button
          btnColor='disabled:bg-primary-600 bg-primary-500 disabled:opacity-100 group'
          height='h-11'
          borderRadius='rounded-full'
          borderColor='border-none'
          color='group-disabled:text-opacity-60 text-white '
          // disabled={!isValid}
          // actionType='submit'
          onClick={() => handleConfirmPayment()}
        >
          {BOOKING.confirmPayment}
        </Button>
      </div>
    </div>
  );
};

export default PaymentModal;
