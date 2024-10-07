import EclipseIcon from '@/components/icons/eclipse';
import { IBookingTranslate } from '@/interfaces/IBookingTranslate';
import Image from 'next/legacy/image';
import React from 'react';

interface ITripItemProps {
  startTime: string;
  endTime: string;
  startPlace: string;
  endPlace: string;
  type: number;
  seats: number;
  available: number;
  price: number;
  duration: number;
  model: string;
  imageUrl: string;
  vehicleType: string;
  BOOKING: IBookingTranslate;
}

const TripItem = ({
  startTime,
  endTime,
  startPlace,
  endPlace,
  type,
  seats,
  available,
  price,
  duration,
  BOOKING,
  model,
  imageUrl,
  vehicleType,
}: ITripItemProps) => {
  return (
    <div className='px-4 py-3 bg-white lg:hover:bg-primary-1000 transition-all lg:rounded-lg cursor-pointer lg:shadow-[0px_2px_2px_0px_rgba(0,0,0,0.03)]'>
      <div className='flex gap-2 items-center'>
        <p className='text-neutral-grey-700 text-xl lg:text-2xl font-bold'>
          {startTime}
        </p>
        <div className='flex-1 flex items-center'>
          <EclipseIcon stroke='#0273BC' />
          <div className='flex-1 border border-dashed' />
          <p className='text-neutral-grey-600 text-xs lg:text-sm font-medium'>
            {duration} {BOOKING.hours}
          </p>
          <div className='flex-1 border border-dashed' />
          <EclipseIcon stroke='#0273BC' />
        </div>
        <p className='text-neutral-grey-700 text-xl lg:text-2xl font-bold'>
          {endTime}
        </p>
      </div>

      <div className='flex items-center justify-between gap-7 mb-5'>
        <p className='text-neutral-grey-600 text-xs lg:text-sm font-semibold'>
          {startPlace}
        </p>
        <p className='text-neutral-grey-600 text-xs lg:text-sm font-semibold text-end'>
          {endPlace}
        </p>
      </div>

      <div className='flex items-center gap-2 lg:gap-4 pb-2 border-b border-b-Subtle-2 lg:border-b-neutral-grey-100'>
        <div className='w-[60px] h-[50px] lg:w-[100px] lg:h-[72px] relative'>
          <Image
            alt=''
            src={imageUrl}
            layout='fill'
            className='rounded-lg lg:rounded'
            quality={100}
          />
        </div>
        <div>
          <p className='text-neutral-grey-700 text-sm lg:text-base font-semibold'>
            {model}
          </p>
          <p className='text-neutral-grey-600 font-medium text-xs lg:text-sm'>
            {vehicleType}
            {/* {seats} */}
          </p>
        </div>
      </div>

      <div className='flex items-center justify-between gap-4 mt-2'>
        <p className='text-semantic-green font-semibold text-sm lg:text-sm'>
          {BOOKING.still} {available} {BOOKING.empty}
        </p>

        <p className='text-primary-500 font-bold text-lg lg:text-xl'>
          {price?.toLocaleString()} đ
        </p>
      </div>
    </div>
  );
};

export default TripItem;
