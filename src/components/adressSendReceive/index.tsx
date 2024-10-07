import React from 'react';
import CircleAdress from '../icons/circle-adress';
import BoxAdress from '../icons/box-adress';
import LineIcon from '../icons/line';

const AdressSendReceive = (props: any) => {
  const { informationPerson } = props;
  return (
    <div className='relative'>
      <div className='absolute top-[22px] left-[9.5px]'>
        <LineIcon />
      </div>
      <div className='flex gap-3'>
        <div>
          <CircleAdress />
        </div>
        <div>
          <p className='text-sm font-bold text-neutral-700'>
            {informationPerson?.fullName}
          </p>
          <div className='mt-[2px] flex items-center gap-2'>
            <div className='text-sm font-medium text-neutral-500'>
              {informationPerson?.phone}
            </div>
            <div className='rounded-full w-1 h-1 bg-neutral-200'></div>
            <div className='text-sm font-medium text-neutral-500'>
              CCCD: {informationPerson?.CCCD}
            </div>
          </div>
        </div>
      </div>
      <div className='flex gap-3 mt-3'>
        <div>
          <BoxAdress />
        </div>
        <div>
          <p className='text-sm font-bold text-neutral-700'>
            {informationPerson?.fullNameReceive}
          </p>
          <div className='mt-[2px] flex items-center gap-2'>
            <div className='text-sm font-medium text-neutral-500'>
              {informationPerson?.phoneReceive}
            </div>
            <div className='rounded-full w-1 h-1 bg-neutral-200'></div>
            <div className='text-sm font-medium text-neutral-500'>
              CCCD: {informationPerson?.CCCDReceive}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdressSendReceive;
