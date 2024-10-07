import BoxAdress from '@/components/icons/box-adress';
import CircleAdress from '@/components/icons/circle-adress';
import LineOrderIcon from '@/components/icons/lineOrder';
import OclockIcon from '@/components/icons/Oclock';
import { ITranslation } from '@/interfaces/ITranslation';
import moment from 'moment';
import React from 'react';

interface IAddressSendReceiveOrder {
  informationPerson?: any;
  translation: ITranslation;
}

const defaultData = {
  fullName: 'Nguyễn Thanh Hải',
  phone: '0333336060',
  CCCD: '123456789',
  city: 'Nha Trang',
  address: 'văn phòng 41 Nguyễn Trãi',
  createAt: new Date(),
  fullNameReceive: 'Nguyễn Văn Bình',
  phoneReceive: '0333336060',
  CCCDReceive: '123456789',
  cityReceive: 'Nha Trang',
  addressReceive: 'văn phòng 41 Nguyễn Trãi',
};

const AddressSendReceiveOrder = (props: IAddressSendReceiveOrder) => {
  const { informationPerson = defaultData, translation } = props;
  return (
    <div className='relative'>
      <div className='absolute top-[22px] left-[9.5px]'>
        <LineOrderIcon />
      </div>
      <div className='flex gap-3'>
        <div>
          <CircleAdress />
        </div>
        <div>
          <p className='text-sm font-bold text-neutral-700 line-clamp-1'>
            {informationPerson.fullName}
          </p>
          <div className='mt-[2px] md:flex items-center gap-2'>
            <div className='text-sm font-medium text-neutral-500'>
              SDT: {informationPerson.phone}
            </div>
            <div className='rounded-full w-1 h-1 bg-neutral-200  hidden md:block'></div>
            <div className='text-sm font-medium text-neutral-500'>
              CCCD: {informationPerson.CCCD}
            </div>
          </div>
          <div className='mt-[2px] flex items-center gap-2'>
            <div className='text-sm font-medium text-neutral-500 line-clamp-1'>
              {informationPerson.city} - {informationPerson.address}
            </div>
          </div>
          <div className='mt-1 flex items-center gap-2'>
            <div className='flex gap-1 items-center'>
              <OclockIcon />{' '}
              <div className='text-xs font-medium text-[#373738]'>
                {translation.ORDER.createOrder}{' '}
                {moment(informationPerson.createAt).format('hh:mm,DD/MM/YYYY')}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex gap-3 mt-3'>
        <div className='md:mt-6'>
          <BoxAdress />
        </div>
        <div>
          <p className='text-sm font-bold text-neutral-700 line-clamp-1'>
            {informationPerson.fullNameReceive}
          </p>
          <div className='mt-[2px] md:flex items-center gap-2'>
            <div className='text-sm font-medium text-neutral-500'>
              SDT: {informationPerson.phoneReceive}
            </div>
            <div className='rounded-full w-1 h-1 bg-neutral-200 hidden md:block'></div>
            <div className='text-sm font-medium text-neutral-500'>
              CCCD: {informationPerson.CCCDReceive}
            </div>
          </div>
          <div className='mt-[2px] flex items-center gap-2'>
            <div className='text-sm font-medium text-neutral-500 line-clamp-1'>
              {informationPerson.cityReceive} -{' '}
              {informationPerson.addressReceive}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressSendReceiveOrder;
