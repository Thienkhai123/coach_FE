import { ITranslation } from '@/interfaces/ITranslation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputText from '@/components/input/text';
import Button from '@/components/button';
import { REGEX_PHONE } from '@/constant/app';
import ArrowRightWhite from '@/components/icons/arrowRightWhite';

interface IFormValues {
  phone: string;
  code: string;
}

interface ICheckOrderFormMobile {
  translation: ITranslation;
  onSubmit: (data: IFormValues) => void;
}

const CheckOrderFormMobile = (props: ICheckOrderFormMobile) => {
  const { translation, onSubmit } = props;
  const { SEARCHING, BOOKING, TRANSPORT, CREATEORDER } = translation;

  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorPhone, setErrorPhone] = useState('');

  const schema = yup.object().shape({
    phone: yup
      .string()
      .nullable()
      .required(CREATEORDER.errors.warningContent)
      .matches(REGEX_PHONE, CREATEORDER.errors.warningType),
    code: yup.string().required(CREATEORDER.errors.warningContent),
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<IFormValues>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {},
  });

  const handleChangePhone = (val = '') => {
    if (val === '') {
      setPhoneNumber(val);
      return;
    }
    if (val.match(/^\d+$/)) {
      setPhoneNumber(val);
      setErrorPhone('');
      return;
    }
  };

  return (
    <div className='p-[12px_12px_72px_12px] bg-[#ECECEC]'>
      <div className='bg-white p-4 rounded-xl'>
        <p className='text-[#373738] font-extrabold text-xs bg-[#DEF5E0] py-[3.5px] px-2 rounded-full uppercase w-fit'>
          {SEARCHING.searchingOrder}
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col gap-4 mt-4 '
        >
          <div className='w-full'>
            <p className=' text-sm font-semibold text-neutral-grey-700'>
              {BOOKING.phone} <span className='text-red-600'>*</span>
            </p>
            <input
              {...register('phone')}
              className='rounded-lg border border-neutral-grey-300 py-2 px-3 outline-none text-sm font-medium w-full'
              placeholder={CREATEORDER.informationPersonSend.phone}
              type='number'
              // value={phoneNumber}
              // onChange={(e: any) => handleChangePhone(e.target.value)}
            />
            {errors?.phone && (
              <p className='text-[14px] leading-5 text-red-500'>
                {errors.phone.message}
              </p>
            )}
          </div>

          <div className='w-full '>
            <p className=' text-sm font-semibold text-neutral-grey-700'>
              {TRANSPORT.productionCode} <span className='text-red-600'>*</span>
            </p>
            <input
              {...register('code')}
              autoFocus
              className='rounded-lg border border-neutral-grey-300 py-2 px-3 outline-none text-sm font-medium w-full'
              placeholder={TRANSPORT.productionCode}
            />
            {errors?.code && (
              <p className='text-[14px] leading-5 text-red-500'>
                {errors.code.message}
              </p>
            )}
          </div>

          <div className='mt-2'>
            <button
              disabled={!isValid}
              type='submit'
              className='mx-auto w-full flex justify-center  gap-3 py-[10px]   hover:opacity-90 duration-100 disabled:opacity-60 text-white text-base font-semibold text-center my-auto bg-primary-500 rounded-full h-[44px]'
            >
              {SEARCHING.searching}
              <ArrowRightWhite />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckOrderFormMobile;
