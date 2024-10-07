import ArrowRightWhite from '@/components/icons/arrowRightWhite';
import { IContractVehicleTranslate } from '@/interfaces/IContractVehicleTranslate';
import { isEmpty } from 'lodash';
import React from 'react';

interface ICarsRental {
  translation: IContractVehicleTranslate;
  handleChooseBooking: (value: any) => void;
  handleBooking: () => void;
  bookingType: any;
}

const CarsRental = (props: ICarsRental) => {
  const { translation, handleChooseBooking, bookingType, handleBooking } =
    props;

  return (
    <div className='w-[640px] mx-auto mt-4'>
      {/* <div className='mt-4 text-base text-neutral-700 font-bold'>
        {translation.chooseCar}
      </div>
      <div className='mt-4'>
        <div className='rounded-lg flex flex-col gap-3 px-3 py-2 bg-[#DFF0FB]'>
          <div className='flex gap-3'>
            <input
              id='hour'
              onChange={(e) => handleChooseBooking(e.target.value)}
              type='radio'
              name='booking'
              value='hour'
              className="relative text-xl h-5 w-5 flex justify-center items-center  cursor-pointer rounded-full appearance-none bg-inherit focus:outline-none border border-neutral-500 checked:border-[#228AD1] checked:after:bg-[#228AD1] checked:after:content-[''] checked:after:w-[12px] checked:after:h-[12px] checked:after:absolute checked:after:rounded-full"
            />
            <label
              htmlFor='hour'
              className='text-sm font-medium cursor-pointer'
            >
              {translation.bookingByHours}
            </label>
          </div>
          <div className='flex gap-3'>
            <input
              id='day'
              onChange={(e) => handleChooseBooking(e.target.value)}
              type='radio'
              name='booking'
              value='day'
              className="relative text-xl h-5 w-5 flex justify-center items-center  cursor-pointer rounded-full appearance-none bg-inherit focus:outline-none border border-neutral-500 checked:border-[#228AD1] checked:after:bg-[#228AD1] checked:after:content-[''] checked:after:w-[12px] checked:after:h-[12px] checked:after:absolute checked:after:rounded-full"
            />
            <label htmlFor='day' className='text-sm font-medium cursor-pointer'>
              {translation.bookingByDays}
            </label>
          </div>
          <div className='flex gap-3'>
            <input
              id='month'
              onChange={(e) => handleChooseBooking(e.target.value)}
              type='radio'
              name='booking'
              value='month'
              className="relative text-xl h-5 w-5 flex justify-center items-center  cursor-pointer rounded-full appearance-none bg-inherit focus:outline-none border border-neutral-500 checked:border-[#228AD1] checked:after:bg-[#228AD1] checked:after:content-[''] checked:after:w-[12px] checked:after:h-[12px] checked:after:absolute checked:after:rounded-full"
            />
            <label
              htmlFor='month'
              className='text-sm font-medium cursor-pointer'
            >
              {translation.bookingByMonths}
            </label>
          </div>
        </div>
      </div> */}
      <div className='mt-6'>
        <div>
          <button
            // disabled={isEmpty(bookingType)}
            onClick={() => {
              handleBooking();
            }}
            type='submit'
            className=' px-5 mx-auto flex gap-3 py-[10px] w-fit hover:opacity-90 duration-100 disabled:opacity-60 text-white text-base font-semibold text-center my-auto bg-primary-500 rounded-full h-[44px]'
          >
            {translation.buttonBooking}
            <ArrowRightWhite />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarsRental;
