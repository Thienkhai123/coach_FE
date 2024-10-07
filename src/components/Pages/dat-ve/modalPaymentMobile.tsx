import { fetchBankInfo } from '@/apis/trip';
import Button from '@/components/button';
import CountDown from '@/components/count-down';
import CopyIcon from '@/components/icons/copy';
import DownloadIcon from '@/components/icons/download';
import InformationIcon from '@/components/icons/infomation';
import NavbarBasic from '@/components/navbar/basic';
import ToastCopy from '@/components/toasts/copy';
import { IInfoBank } from '@/interfaces/httpRequest/ITrip';
import { IBankData } from '@/interfaces/httpRequest/IVietQr';
import { IBookingTranslate } from '@/interfaces/IBookingTranslate';
import { IPaymentTranslate } from '@/interfaces/IPaymentTranslate';
import Image from 'next/legacy/image';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface IModalPaymentMobileProps {
  BOOKING: IBookingTranslate;
  PAYMENT: IPaymentTranslate;
  payloadTicket: any;
  countdownTime: number;
  informationPrice: any;
  totalCost: number;
  toggleModalPayment: () => void;
  handleSubmit: () => void;
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
  copyText: (arg: any) => void;
};

const RenderItem = ({ title, value, textCopy, copyText }: ItemComponent) => {
  return (
    <div className='flex gap-4 justify-between items-center'>
      <div>
        <p className='text-neutral-grey-500 text-xs font-medium'>{title}</p>
        <p className='text-neutral-grey-700 text-sm font-semibold'>{value}</p>
      </div>

      <div>
        <button
          className='py-2 px-3 bg-[#EFEFF0] rounded-full w-[101px]'
          onClick={() => copyText(value)}
        >
          <div className='flex items-center gap-1'>
            <CopyIcon />
            <p className='text-black font-semibold text-xs'>{textCopy}</p>
          </div>
        </button>
      </div>
    </div>
  );
};

const ModalPaymentMobile = (props: IModalPaymentMobileProps) => {
  const {
    BOOKING,
    PAYMENT,
    toggleModalPayment,
    handleSubmit,
    payloadTicket,
    countdownTime,
    informationPrice,
    totalCost,
  } = props;
  const [fetching, setFetching] = useState(false);

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
    tranferContent: {
      id: 4,
      value: `QBCODE ${payloadTicket?.code}`,
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

  const INFORMATION_BANKING = {
    bank: PAYMENT.bank,
    bankingNumber: PAYMENT.bankingNumber,
    ownerAccount: PAYMENT.ownerAccount,
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
      .catch((err) => console.log(err));
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
        tranferContent: {
          id: 4,
          value: `QBCODE ${payloadTicket?.code}`,
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
    <div className='relative pb-40'>
      <NavbarBasic
        title={BOOKING.paymentInformation}
        handleClick={toggleModalPayment}
      />

      <div className='flex flex-col gap-2 pt-3 px-4'>
        <div className='bg-white p-4 rounded-xl'>
          <div className='bg-semantic-green-light py-1 px-2 rounded-full w-fit mb-2 mx-auto'>
            <p className='text-neutral-grey-600 font-extrabold text-xs'>
              {BOOKING.quickPaymentByQRCode}
            </p>
          </div>

          <div className='flex items-center justify-center gap-3 mt-5'>
            <Image
              alt='qr-code'
              src={
                `https://img.vietqr.io/image/${selectedBank?.shortName}-${
                  selectedBank?.Infor?.bankingNumber?.value
                }-qr_only.png?amount=${totalCost || 0}&addInfo=${
                  'QBCODE ' + payloadTicket?.code
                }&accountName=${`NGUYEN THI NGOC`}` ||
                '/images/empty-trip-mobile.png'
              }
              width={120}
              height={120}
            />
            <div
              className='flex flex-col items-center justify-center gap-1'
              onClick={() => {
                if (!fetching) {
                  download(
                    `https://img.vietqr.io/image/${selectedBank?.shortName}-${
                      selectedBank?.Infor?.bankingNumber?.value
                    }-qr_only.png?amount=${totalCost || 0}&addInfo=${
                      'QBCODE ' + payloadTicket?.code
                    }&accountName=${`NGUYEN THI NGOC`}`,
                    `${payloadTicket?.code}qr_code`,
                  );
                }
              }}
            >
              <DownloadIcon />
              <p className='text-black font-medium text-sm'>
                {PAYMENT.download}
              </p>
            </div>
          </div>

          <div className='flex gap-2 mb-1 mt-3'>
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
            <p className='text-neutral-grey-600 font-medium text-sm'>
              {PAYMENT.or}
            </p>
            <div className='flex-1 border border-dashed border-neutral-grey-300' />
          </div>

          <div className='flex flex-col gap-4 mt-4'>
            {Object.keys(selectedBank?.Infor)?.map((keyData, ind) => {
              const title = INFORMATION_BANKING[keyData as keyof InfoT];
              const { value } = selectedBank?.Infor[keyData as keyof DataT];
              return (
                <RenderItem
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

      <div className='p-4 fixed bottom-0 z-10 bg-white w-full border border-neutral-grey-100 shadow-[gba(0,0,0,0.06),rgba(0,0,0,0.03)]'>
        <p className='text-black text-sm font-semibold text-center mb-3'>
          {BOOKING.expiredBookingDuration}{' '}
          {countdownTime && <CountDown inputTimer={countdownTime} />}
          {!countdownTime && '--:--'}
        </p>
        <div className='flex gap-1'>
          <Button
            onClick={toggleModalPayment}
            btnColor='bg-common'
            color='text-black'
            borderType='border-none'
            width='w-[100px]'
          >
            {BOOKING.cancel}
          </Button>

          <Button onClick={handleSubmit} btnColor='bg-primary-500'>
            {BOOKING.confirmPayment}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModalPaymentMobile;
