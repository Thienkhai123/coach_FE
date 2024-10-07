import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { REGEX_PHONE } from '@/constant/app';
import ArrowRightWhite from '@/components/icons/arrowRightWhite';
import { ITranslation } from '@/interfaces/ITranslation';

interface ICheckOrderForm {
  translation: ITranslation;
  handleOnSubmit: (data: any) => void;
}

interface IFormValues {
  phone: string;
  code: string;
}

const CheckOrderForm = (props: ICheckOrderForm) => {
  const { translation, handleOnSubmit } = props;
  const { SEARCHING, BOOKING, CREATEORDER, TRANSPORT } = translation;
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
  return (
    <div>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <div className='bg-checkOrder-desktop bg-no-repeat bg-cover bg-center h-[622px] w-full flex flex-col gap-6 justify-center items-center '>
          <div>
            <p className='text-center text-white font-bold text-2xl'>
              {SEARCHING.searchingOrder}
            </p>
            <p className='text-center text-neutral-200 font-medium text-base mt-1'>
              {SEARCHING.searchingOrder}
            </p>
          </div>
          <div className='w-[500px] rounded-xl bg-white p-6 '>
            <div>
              <p className=' text-sm font-semibold text-neutral-grey-700'>
                {CREATEORDER.informationPersonSend.phone}{' '}
                <span className='text-red-600'>*</span>
              </p>
              <div className='mt-1'>
                <input
                  {...register('phone')}
                  autoFocus
                  className='rounded-lg border border-neutral-grey-300 py-2 px-3 outline-none text-sm font-medium w-full'
                  placeholder={CREATEORDER.informationPersonSend.phone}
                />
                {errors?.phone && (
                  <p className='text-[14px] leading-5 text-red-500'>
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>
            <div className='mt-4'>
              <p className=' text-sm font-semibold text-neutral-grey-700'>
                {TRANSPORT.productionCode}{' '}
                <span className='text-red-600'>*</span>
              </p>
              <div className='mt-1'>
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
            </div>
            <button
              disabled={!isValid}
              type='submit'
              className='mx-auto w-full flex justify-center mt-6  gap-3 py-[10px]   hover:opacity-90 duration-100 disabled:opacity-60 text-white text-base font-semibold text-center my-auto bg-primary-500 rounded-full h-[44px]'
            >
              {SEARCHING.searching}
              <ArrowRightWhite />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckOrderForm;
