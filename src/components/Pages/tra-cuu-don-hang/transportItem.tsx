import CarFlashMiniIcon from '@/components/icons/carFlashMini';
import CheckFlashIcon from '@/components/icons/checkFlash';
import LineFlashIcon from '@/components/icons/lineFlash';
import OrderFlashIcon from '@/components/icons/orderFlash';
import OrderFlashWhiteIcon from '@/components/icons/orderFlashWhite';
import { ITranslation } from '@/interfaces/ITranslation';
import moment from 'moment';
import React from 'react';

interface ITransportItem {
  translation: ITranslation;
  id?: any;
  createAt?: any;
  statusDone?: any;
  statusDisplayOrder?: any;
  statusFirstOrder?: 0;
  hiddenLine: boolean;
}

const defaultData = {
  id: 0,
  createAt: new Date(),
  statusDone: true,
  statusDisplayOrder: 'Đơn hàng đã được đặt',
  statusFirstOrder: 0,
};

const TransportItem = (props: ITransportItem) => {
  const {
    id,
    createAt = defaultData.createAt,
    translation,
    statusDone = defaultData.statusDone,
    statusDisplayOrder = defaultData.statusDisplayOrder,
    statusFirstOrder = defaultData.statusFirstOrder,
    hiddenLine,
  } = props;
  return (
    <div className={`${hiddenLine ? 'h-[40px]' : 'h-[60px]'} flex gap-4`}>
      <div className=' min-[80px] max-w-[80px] w-full'>
        <p
          className={`text-sm font-semibold ${
            statusDone ? 'text-neutral-500' : 'text-black'
          }  text-end`}
        >
          {moment().format('DD/MM/YYYY') ===
          moment(createAt).format('DD/MM/YYYY')
            ? translation.TRANSPORT.today
            : moment(createAt).format('DD/MM/YYYY')}
        </p>
        <p className='text-xs font-medium text-neutral-500 text-end'>
          {moment(createAt).format('hh:mm')}
        </p>
      </div>
      <div className='min-w-[32px] w-full max-w-[32px] relative flex flex-col gap-[2px] items-center'>
        <div
          className={`min-w-[28px] min-h-[28px] rounded-full flex justify-center items-center ${
            statusDone ? 'bg-[#D9D9D9]' : 'bg-[#00993D]'
          }`}
        >
          {statusFirstOrder !== 0 &&
            (statusDone ? <CheckFlashIcon /> : <CarFlashMiniIcon />)}
          {statusFirstOrder === 0 &&
            (statusDone ? <OrderFlashIcon /> : <OrderFlashWhiteIcon />)}
        </div>
        <div className=' flex justify-center '>
          {!hiddenLine && <LineFlashIcon />}
        </div>
      </div>
      <div className=''>
        <p
          className={` text-sm font-medium line-clamp-2 ${
            statusDone ? 'text-[#373738]' : '#00993D'
          }`}
          style={{
            wordBreak: 'break-word',
          }}
        >
          {statusDisplayOrder}
        </p>
      </div>
    </div>
  );
};

export default TransportItem;
