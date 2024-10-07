import CarFlash from '@/components/icons/carFlash';
import { ITranslation } from '@/interfaces/ITranslation';
import moment from 'moment';
import React from 'react';
import TransportItem from './transportItem';

interface IModalDetailOrder {
  translation: ITranslation;
  handleCloseModal: () => void;
  statusDisplay?: any;
  createAt?: any;
  code?: any;
  shippingProcess?: any;
}

const defaultData = {
  statusDisplay: 'Đang vận chuyển',
  createAt: new Date(),
  code: 'MDH1002345',
  shippingProcess: [
    {
      id: 6,
      createAt: new Date(),
      statusDone: false,
      statusDisplayOrder: 'Đơn hàng đang đến kho...Nội Bài, Sóc Sơn, Hà Nội',
      statusFirstOrder: 1,
    },
    {
      id: 5,
      createAt: new Date(),
      statusDone: true,
      statusDisplayOrder: 'Đã được chuyển đến kho XT1',
      statusFirstOrder: 1,
    },

    {
      id: 4,
      createAt: 'Thu May 27 2024 15:35:07 GMT+0000',
      statusDone: true,
      statusDisplayOrder: 'Đã được chuyển đến kho XT1 ',
      statusFirstOrder: 1,
    },
    {
      id: 3,
      createAt: 'Thu May 27 2024 15:35:07 GMT+0000',
      statusDone: true,
      statusDisplayOrder: 'Đơn hàng được phân loại',
      statusFirstOrder: 1,
    },
    {
      id: 1,
      createAt: 'Thu May 27 2024 15:35:07 GMT+0000',
      statusDone: true,
      statusDisplayOrder: 'Đơn hàng được phân loại',
      statusFirstOrder: 1,
    },
    {
      id: 0,
      createAt: 'Thu May 27 2024 15:35:07 GMT+0000',
      statusDone: true,
      statusDisplayOrder: 'Đơn hàng đã được đặt',
      statusFirstOrder: 0,
    },
  ],
};

const ModalDetailOrder = (props: IModalDetailOrder) => {
  const {
    translation,
    handleCloseModal,
    statusDisplay = defaultData.statusDisplay,
    createAt = defaultData.createAt,
    code = defaultData.code,
    shippingProcess = defaultData.shippingProcess,
  } = props;
  return (
    <div>
      <div className='p-4 text-base font-semibold text-center text-black'>
        {translation.ORDER.detailTitle}
      </div>
      <div className='px-6 py-4 bg-[#F9F9F9] flex gap-3'>
        <div>
          <CarFlash />
        </div>
        <div>
          <p className='text-base font-semibold text-neutral-700'>
            {statusDisplay}
          </p>
          <p className='text-sm font-semibold text-neutral-500 mt-[2px]'>
            {translation.ORDER.expected}{' '}
            {moment(createAt).format('hh:mm, DD/MM/YYYYY')}
          </p>
        </div>
      </div>
      <div className='px-6 py-4 bg-white'>
        <div className='py-1 px-2 bg-[#DEF5E0] text-xs font-extrabold text-neutral-grey-600 rounded-full w-fit'>
          {translation.TRANSPORT.codeProduct}: # {code}
        </div>
        <div className='mt-4'>
          {shippingProcess?.map((elm: any, ind: number) => {
            return (
              <div key={ind}>
                <TransportItem
                  {...elm}
                  translation={translation}
                  hiddenLine={shippingProcess.length - 1 === ind}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className='px-4 pt-4 pb-6 bg-white'>
        <button
          onClick={handleCloseModal}
          type='button'
          className='mx-auto w-full flex justify-center  gap-3 py-[10px]   hover:opacity-90 duration-100 disabled:opacity-60  text-sm font-semibold text-center my-auto bg-[#ECECEC] rounded-full h-[40px]'
        >
          {translation.NEWS.back}
        </button>
      </div>
    </div>
  );
};

export default ModalDetailOrder;
