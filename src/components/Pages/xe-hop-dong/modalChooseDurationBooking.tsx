import Button from '@/components/button';
import CancelIcon from '@/components/icons/cancel';
import React from 'react';

interface IModalChooseDurationBookingProps {
  title: string;
  description: string;
  btnTitle: string;
  btnBackTitle: string;
  selectedId: number;
  options: { id: number; value: string }[];
  handleChooseOption: ({ id, value }: { id: number; value: string }) => void;
  handleSubmit: () => void;
  handleClose: () => void;
}

const ModalChooseDurationBooking = (
  props: IModalChooseDurationBookingProps,
) => {
  const {
    btnTitle,
    description,
    options,
    title,
    btnBackTitle,
    selectedId,
    handleChooseOption,
    handleSubmit,
    handleClose,
  } = props;
  return (
    <div>
      <div className=''>
        <p className='text-black font-semibold text-base mb-2'>{title}</p>
        <p className='text-black font-medium text-sm'>{description}</p>
        <div className=' rounded-lg  mt-4 bg-[#DFF0FB]'>
          {options?.map((option, ind) => (
            <div
              key={`option-${ind}`}
              className='py-2 px-3 gap-3 items-center flex'
            >
              <input
                id={`radio_car_${ind}`}
                onChange={() =>
                  handleChooseOption({ id: option?.id, value: option?.value })
                }
                type='radio'
                checked={selectedId === option?.id}
                name='booking'
                value='hour'
                className="relative text-xl h-5 w-5 flex justify-center items-center  cursor-pointer rounded-full appearance-none bg-inherit focus:outline-none border border-neutral-500 checked:border-[#228AD1] checked:after:bg-[#228AD1] checked:after:content-[''] checked:after:w-[12px] checked:after:h-[12px] checked:after:absolute checked:after:rounded-full"
              />
              <label
                htmlFor={`radio_car_${ind}`}
                className='flex-1 text-sm  font-medium cursor-pointer'
              >
                {option?.value}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className='mt-6 flex gap-3'>
        <button
          onClick={() => handleClose()}
          className='text-sm font-semibold text-black h-[40px] w-full flex justify-center items-center rounded-full bg-[#ECECEC]'
        >
          {btnBackTitle}
        </button>
        <Button onClick={handleSubmit}>{btnTitle}</Button>
      </div>
    </div>
  );
};

export default ModalChooseDurationBooking;
