import { CheckIcon } from '@/components/icons';
import EclipseIcon from '@/components/icons/eclipse';
import { IBookingTranslate } from '@/interfaces/IBookingTranslate';
import Image from 'next/legacy/image';
import React from 'react';

interface ITripItemDesktopProps {
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
  isSelected?: boolean;
  handleClickButton?: Function;
}

const TripItemDesktop = ({
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
  isSelected = false,
  handleClickButton = () => {},
}: ITripItemDesktopProps) => {
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
      <div className='flex items-center justify-between'>
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
        <p className='text-primary-500 font-bold text-lg lg:text-xl'>
          {price?.toLocaleString()} đ
        </p>
      </div>

      <div className='flex items-center justify-between gap-4 mt-2'>
        <p className='text-semantic-green font-semibold text-sm lg:text-sm'>
          {BOOKING.still} {available} {BOOKING.empty}
        </p>
        <div
          onClick={(e) => {
            if (e && e.stopPropagation) {
              e.stopPropagation();
            }
            handleClickButton();
          }}
          className={`rounded-full py-[6px] px-3 flex items-center gap-1 group ${
            isSelected
              ? 'bg-primary-500'
              : 'bg-primary-900 hover:bg-primary-500 transition-all'
          }`}
        >
          {isSelected && (
            <CheckIcon
            // width='12'
            // height='12'
            // viewBox='0 0 12 12'
            />
          )}
          <p
            className={`${
              isSelected
                ? 'text-white'
                : 'text-primary-200 group-hover:text-white transition-all'
            } font-semibold text-sm `}
          >
            {BOOKING.selectRoute}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TripItemDesktop;
