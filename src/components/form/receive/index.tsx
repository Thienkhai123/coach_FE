import React, { FC } from 'react';
import { ICreateOrderTranslate } from '@/interfaces/ICreateOrderTranslate';
interface IReceiveForm {
  CREATEORDER: ICreateOrderTranslate;
  register?: any;
  errors?: any;
}

const ReceiveForm: FC<IReceiveForm> = (props) => {
  const { CREATEORDER, register, errors } = props;
  return (
    <div className='bg-white p-6 rounded-xl'>
      <div className='font-bold text-base text-neutral-grey-700 '>
        {CREATEORDER.informationPersonReceive.informationReceive}
      </div>
      <div className='mt-4 flex flex-col gap-3'>
        <div>
          <p className=' text-sm font-semibold text-neutral-grey-700'>
            {CREATEORDER.informationPersonReceive.fullName}{' '}
            <span className='text-red-600'>*</span>
          </p>
          <div className='mt-1'>
            <input
              {...register('fullNameReceive')}
              autoFocus
              className='rounded-lg border border-neutral-grey-300 py-2 px-3 outline-none text-sm font-medium w-full'
              placeholder={CREATEORDER.informationPersonReceive.fullName}
            />
            {errors.fullNameReceive && (
              <p className='text-[14px] leading-5 text-red-500'>
                {errors.fullNameReceive.message}
              </p>
            )}
          </div>
        </div>
        <div className='grid grid-cols-2 gap-3'>
          <div>
            <p className=' text-sm font-semibold text-neutral-grey-700'>
              {CREATEORDER.informationPersonReceive.phone}{' '}
              <span className='text-red-600'>*</span>
            </p>
            <div className='mt-1'>
              <input
                {...register('phoneReceive')}
                autoFocus
                className='rounded-lg border border-neutral-grey-300 py-2 px-3 outline-none text-sm font-medium w-full'
                placeholder={CREATEORDER.informationPersonReceive.phone}
              />
              {errors.phoneReceive && (
                <p className='text-[14px] leading-5 text-red-500'>
                  {errors.phoneReceive.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <p className=' text-sm font-semibold text-neutral-grey-700'>
              {CREATEORDER.informationPersonReceive.CCCDNumber}{' '}
              <span className='text-red-600'>*</span>
            </p>
            <div className='mt-1'>
              <input
                {...register('CCCDReceive')}
                autoFocus
                className='rounded-lg border border-neutral-grey-300 py-2 px-3 outline-none text-sm font-medium w-full'
                placeholder={CREATEORDER.informationPersonReceive.CCCDNumber}
              />
              {errors.CCCDReceive && (
                <p className='text-[14px] leading-5 text-red-500'>
                  {errors.CCCDReceive.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <div>
          <p className=' text-sm font-semibold text-neutral-grey-700'>
            {CREATEORDER.informationPersonReceive.adress}{' '}
            <span className='text-red-600'>*</span>
          </p>
          <div className='mt-1'>
            <input
              {...register('addressReceive')}
              autoFocus
              className='rounded-lg border border-neutral-grey-300 py-2 px-3 outline-none text-sm font-medium w-full'
              placeholder={CREATEORDER.informationPersonReceive.adress}
            />
            {errors.addressReceive && (
              <p className='text-[14px] leading-5 text-red-500'>
                {errors.addressReceive.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiveForm;
