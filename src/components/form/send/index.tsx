import React, { FC } from 'react';

import { ICreateOrderTranslate } from '@/interfaces/ICreateOrderTranslate';
import CheckIcon from '@/components/icons/check';

interface ISendForm {
  CREATEORDER: ICreateOrderTranslate;
  refFom?: any;
  register?: any;
  errors?: any;
}

const SendForm: FC<ISendForm> = (props) => {
  const { CREATEORDER, register, errors } = props;
  return (
    <div className='bg-white p-6 rounded-xl'>
      <div className='font-bold text-base text-neutral-grey-700 '>
        {CREATEORDER.informationPersonSend.informationSend}
      </div>
      <div className='mt-4 flex flex-col gap-3'>
        <div>
          <p className=' text-sm font-semibold text-neutral-grey-700'>
            {CREATEORDER.informationPersonSend.fullName}{' '}
            <span className='text-red-600'>*</span>
          </p>
          <div className='mt-1'>
            <input
              {...register('fullName')}
              autoFocus
              className='rounded-lg border border-neutral-grey-300 py-2 px-3 outline-none text-sm font-medium w-full'
              placeholder={CREATEORDER.informationPersonSend.fullName}
            />
            {errors.fullName && (
              <p className='text-[14px] leading-5 text-red-500'>
                {errors.fullName.message}
              </p>
            )}
          </div>
        </div>
        <div className='grid grid-cols-2 gap-3'>
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
              {errors.phone && (
                <p className='text-[14px] leading-5 text-red-500'>
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <p className=' text-sm font-semibold text-neutral-grey-700'>
              {CREATEORDER.informationPersonSend.CCCDNumber}{' '}
              <span className='text-red-600'>*</span>
            </p>
            <div className='mt-1'>
              <input
                {...register('CCCD')}
                autoFocus
                className='rounded-lg border border-neutral-grey-300 py-2 px-3 outline-none text-sm font-medium w-full'
                placeholder={CREATEORDER.informationPersonSend.CCCDNumber}
              />
              {errors.CCCD && (
                <p className='text-[14px] leading-5 text-red-500'>
                  {errors.CCCD.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <div>
          <p className=' text-sm font-semibold text-neutral-grey-700'>
            {CREATEORDER.informationPersonSend.adress}{' '}
            <span className='text-red-600'>*</span>
          </p>
          <div className='mt-1'>
            <input
              {...register('address')}
              autoFocus
              className='rounded-lg border border-neutral-grey-300 py-2 px-3 outline-none text-sm font-medium w-full'
              placeholder={CREATEORDER.informationPersonSend.adress}
            />
            {errors.address && (
              <p className='text-[14px] leading-5 text-red-500'>
                {errors.address.message}
              </p>
            )}
          </div>
        </div>
        <div>
          <p className=' text-sm font-semibold text-neutral-grey-700'>
            {CREATEORDER.informationPersonSend.email}{' '}
          </p>
          <div className='mt-1'>
            <input
              {...register('email')}
              type='email'
              className='rounded-lg border border-neutral-grey-300 py-2 px-3 outline-none text-sm font-medium w-full'
              placeholder={CREATEORDER.informationPersonSend.email}
            />
          </div>
        </div>
        <div>
          <div className='mt-1 flex gap-3'>
            <div className='relative flex justify-center items-center'>
              <input
                {...register('clause')}
                autoFocus
                type='checkbox'
                id='accept'
                className='cursor-pointer rounded-[4px] border border-neutral-grey-200 w-5 h-5 appearance-none indeterminate:bg-gray-300   checked:rounded-[4px] checked:bg-[#228AD1] checked:text-[10px]'
              />
              <label htmlFor='accept' className='absolute cursor-pointer'>
                <CheckIcon />
              </label>
            </div>
            <div>
              <label
                htmlFor='accept'
                className='text-sm font-medium text-neutral-grey-700 cursor-pointer'
              >
                {CREATEORDER.informationPersonSend.content}
              </label>
            </div>
          </div>
          {errors.clause && (
            <p className='text-[14px] leading-5 text-red-500'>
              {errors.clause.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SendForm;
