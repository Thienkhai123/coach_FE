import { ITranslation } from '@/interfaces/ITranslation';
import React from 'react';

interface IModalSelectOptionCarProps {
  translation: ITranslation;
  indexOf?: any;
  cars?: any[];
  index?: number;
  handleChooseOption: (car: any, ind: number) => void;
}

const ModalSelectOptionCar = (props: IModalSelectOptionCarProps) => {
  const {
    translation,
    indexOf = 1,
    cars,
    handleChooseOption,
    index = 0,
  } = props;
  const { VEHICLE } = translation;
  return (
    <div className='rounded-tl-2xl rounded-tr-2xl'>
      <div className='px-4 py-3 bg-neutral-grey-100 rounded-tl-2xl rounded-tr-2xl'>
        <p className='text-center font-semibold text-neutral-grey-700 text-base'>
          {VEHICLE.chooseCarTitle} {indexOf}
        </p>
      </div>
      <div className='pt-4 pb-6 bg-white w-full'>
        <div className='px-4'>
          {cars?.map((elm: any, ind: number) => {
            return (
              <div
                key={`option-${ind}`}
                className='py-2 px-3 gap-3 items-center flex'
                onClick={() => {
                  handleChooseOption(elm?.value, index);
                }}
              >
                <input
                  id={`radio_car_${ind}`}
                  type='radio'
                  name={elm?.value}
                  value={elm?.value}
                  className="relative text-xl h-5 w-5 flex justify-center items-center  cursor-pointer rounded-full appearance-none bg-inherit focus:outline-none border border-neutral-500 checked:border-[#228AD1] checked:after:bg-[#228AD1] checked:after:content-[''] checked:after:w-[12px] checked:after:h-[12px] checked:after:absolute checked:after:rounded-full"
                />
                <label
                  htmlFor={`radio_car_${ind}`}
                  className='flex-1 text-sm text-center font-medium cursor-pointer'
                >
                  {elm?.value}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ModalSelectOptionCar;
