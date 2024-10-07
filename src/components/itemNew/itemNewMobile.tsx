import Image from 'next/legacy/image';
import React from 'react';
import OclockIcon from '../icons/Oclock';
import EyeIcon from '../icons/eye';
import { INewsTranslate } from '@/interfaces/INewsTranslate';
import moment from 'moment';

interface IItemNewMobile {
  id?: number;
  src?: string;
  titleNew?: string;
  createTime?: string;
  countSeen: number;
  NEWTRANS: INewsTranslate;
  customUrl?: any;
  descriptionNew?: string;
  handleChooseNews: (arg: any, customUrl?: any) => void;
  hidenLine?: boolean;
}

const ItemNewMobile = (props: IItemNewMobile) => {
  const {
    id,
    src,
    countSeen,
    titleNew,
    createTime,
    NEWTRANS,
    handleChooseNews,
    descriptionNew,
    customUrl,
    hidenLine,
  } = props;
  const getLocaleLang: any = localStorage.getItem('locale');
  return (
    <div
      onClick={() => handleChooseNews(id, customUrl)}
      className={`group cursor-pointer  ${
        !hidenLine && 'border-b border-[#D9D9D9] pb-3'
      }`}
    >
      <div className='flex gap-4'>
        <div>
          <Image
            src={src || '/images/news-default.png'}
            alt=''
            width={80}
            height={80}
            objectFit='cover'
            className='rounded'
          />
        </div>
        <div className='flex-1'>
          <p
            className='text-neutral-grey-700 line-clamp-1 font-bold text-sm group-hover:text-secondary-300 transition-all'
            style={{ wordBreak: 'break-word' }}
          >
            {titleNew}
          </p>
          <p
            style={{ wordBreak: 'break-word' }}
            className='text-neutral-grey-700 line-clamp-2 text-sm font-medium group-hover:text-secondary-300 transition-all'
          >
            {descriptionNew}
          </p>
          <div className='flex items-center gap-1 mt-1'>
            <div>
              <OclockIcon />
            </div>
            <div className='text-xs text-neutral-500'>
              {moment(createTime || new Date())
                .locale(getLocaleLang !== null ? getLocaleLang : 'vi')
                .format('dddd, DD/MM/YYYY')}
            </div>
          </div>
          <div className='flex items-center gap-1 mt-[2px]'>
            <div>
              <EyeIcon />
            </div>
            <div className='text-xs text-neutral-500'>
              {NEWTRANS.seen}: {countSeen}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemNewMobile;
