import DrawerBottom from '@/components/drawer-bottom';
import { ITranslation } from '@/interfaces/ITranslation';
import React, { useState } from 'react';
import ModalSelectOptionCar from './modalSelectOptionCar';
import useModal from '@/hook/useModal';

interface ISelectOptionCarProps {
  translation: ITranslation;
  index?: number;
  register?: any;
  errors?: any;
  dataCar?: any;
  carValue?: any;
  setValue?: any;
  name: any;
}

const SelectOptionCar = (props: ISelectOptionCarProps) => {
  const {
    translation,
    index = 0,
    register,
    errors,
    dataCar,
    setValue,
    name,
  } = props;
  const { VEHICLE } = translation;

  const [carSelected, setCarSelected] = useState<any>('');
  const [openModalSelectCar, toggleModalSelectCar] = useModal();
  const handleSetValueCar = (car: string, indexNumber?: number) => {
    setValue(name, car);
    setCarSelected(car);
    toggleModalSelectCar();
  };

  return (
    <div>
      <div className={`mt-3 `} onClick={() => toggleModalSelectCar()}>
        <p className='text-sm font-semibold text-neutral-grey-700'>
          {VEHICLE.form.typeCar} {index + 1}{' '}
          <span className='text-red-600'>*</span>
        </p>
        <div className='mt-1'>
          <div className='mt-1'>
            <div className='mt-1'>
              <input
                {...register(name)}
                value={carSelected || ''}
                className='rounded-lg border border-neutral-grey-300 py-2 px-3 outline-none text-sm font-medium w-full'
              />
            </div>
            {errors?.carList?.[index]?.car && (
              <p className='text-[14px] leading-5 text-red-500'>
                {errors?.carList?.[index]?.car?.message}
              </p>
            )}
          </div>
        </div>
      </div>
      <DrawerBottom
        open={openModalSelectCar}
        toggleDrawer={toggleModalSelectCar}
        wrapChildStyle=''
        childStyle='w-screen bg-white rounded-tl-2xl rounded-tr-xl animation-height'
      >
        <ModalSelectOptionCar
          translation={translation}
          cars={dataCar}
          handleChooseOption={handleSetValueCar}
          index={index}
        />
      </DrawerBottom>
    </div>
  );
};

export default SelectOptionCar;
