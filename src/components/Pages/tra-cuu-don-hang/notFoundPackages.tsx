import { ITranslation } from '@/interfaces/ITranslation';
import Image from 'next/legacy/image';
import React from 'react';

interface INotFoundPackages {
  translation: ITranslation;
  handleGoHome: () => void;
}

const NotFoundPackages = (props: INotFoundPackages) => {
  const { translation, handleGoHome } = props;
  return (
    <div className='lg:bg-[#ECECEC] lg:pb-10 lg:pt-[60px] lg:px-0 pb-10 pt-2 px-3'>
      <div className='bg-white rounded-xl lg:pb-10 lg:pt-[60px] pb-5 pt-5 lg:w-[800px] mx-auto '>
        <div className='w-fit mx-auto hidden lg:block'>
          <Image src='images/empty-trip-desktop.png' width={250} height={250} />
        </div>
        <div className='w-fit mx-auto block lg:hidden'>
          <Image src='images/empty-trip-desktop.png' width={200} height={200} />
        </div>
        <div className='mt-4 px-4 lg:px-0'>
          <p className='text-base font-semibold text-center'>
            {translation.BOOKING.resultNotFound}
          </p>
          <p className='text-sm font-medium text-center mt-[2px]'>
            {translation.BOOKING.pleaseNotFound}
          </p>
        </div>
      </div>
      <div className='mt-5'>
        <button
          onClick={() => handleGoHome()}
          type='button'
          className='mx-auto lg:w-[320px] w-full flex justify-center   gap-3 py-[10px]   hover:opacity-90 duration-100 disabled:opacity-60 text-white text-base font-semibold text-center my-auto bg-primary-500 rounded-full h-[44px]'
        >
          {translation.VEHICLE.backButton}
        </button>
      </div>
    </div>
  );
};

export default NotFoundPackages;
