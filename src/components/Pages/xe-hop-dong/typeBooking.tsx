import ArrowLeftIcon from '@/components/icons/arrowLeft';
import { IContractVehicleTranslate } from '@/interfaces/IContractVehicleTranslate';
import React from 'react';

interface ITypeBookingProps {
  translation: IContractVehicleTranslate;
  handleBack: () => void;
  typeBooking: any;
}

const TypeBooking = (props: ITypeBookingProps) => {
  const { translation, handleBack, typeBooking } = props;
  return (
    <div className='flex gap-4'>
      <div
        onClick={() => handleBack()}
        className='cursor-pointer hover:opacity-80 duration-100 h-[36px] w-fit flex gap-2 justify-center items-center px-3 py-[6px] border border-neutral-400 rounded-full'
      >
        <ArrowLeftIcon />{' '}
        <div className='text-sm font-semibold'>{translation.form.button}</div>
      </div>
      <div>
        <p className='text-lg font-bold text-neutral-700'>
          {translation.buttonBooking}
        </p>
        <p className='text-sm font-semibold text-neutral-600 mt-1'>
          {typeBooking === 'hour' && translation.bookingByHours}
          {typeBooking === 'day' && translation.bookingByDays}
          {typeBooking === 'month' && translation.bookingByMonths}
        </p>
      </div>
    </div>
  );
};

export default TypeBooking;
