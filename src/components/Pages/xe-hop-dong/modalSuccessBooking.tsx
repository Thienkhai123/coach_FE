import SuccessBooking from '@/components/icons/successBooking';
import { IContractVehicleTranslate } from '@/interfaces/IContractVehicleTranslate';
import React from 'react';

interface IModalSuccessBooking {
  translation: IContractVehicleTranslate;
  handleBackHome: () => void;
}

const ModalSuccessBooking = (props: IModalSuccessBooking) => {
  const { translation, handleBackHome } = props;
  return (
    <div className='py-6'>
      <div className='w-fit mx-auto'>
        <div className='w-fit mx-auto'>
          <SuccessBooking />
        </div>
        <div className='mt-4 w-[520px] '>
          <div className='text-[#00993D] text-base font-bold text-center'>
            {translation.successTitle}
          </div>
          <div className='mt-2 text-center text-neutral-700 font-medium text-base'>
            {translation.successContent}
          </div>
        </div>
        <div className='mt-6 w-fit mx-auto'>
          <button
            onClick={() => handleBackHome()}
            className='text-sm font-semibold hover:shadow-md duration-100 text-[#59180F] w-[200px] py-2 px-3 text-center rounded-full bg-[#FCE6D5]'
          >
            {translation.backButton}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalSuccessBooking;
