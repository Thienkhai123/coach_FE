import Image from 'next/legacy/image';
import React from 'react';
import OclockIcon from '../icons/Oclock';
import EyeIcon from '../icons/eye';
import { INewsTranslate } from '@/interfaces/INewsTranslate';
import moment from 'moment';

interface IItemNew {
  id?: number;
  src?: string;
  titleNew?: string;
  createTime?: string;
  countSeen: number;
  NEWTRANS: INewsTranslate;
  customUrl?: any;
  handleChooseNews: (arg: any, customUrl?: any) => void;
}

const ItemNew = (props: IItemNew) => {
  const {
    id,
    src,
    countSeen,
    titleNew,
    createTime,
    NEWTRANS,
    handleChooseNews,
    customUrl,
  } = props;
  const getLocaleLang: any = localStorage.getItem('locale');
  return (
    <div
      onClick={() => handleChooseNews(id, customUrl)}
      className='min-h-[356px] w-[256px] cursor-pointer'
    >
      <div>
        <Image
          src={src || '/images/news-default.png'}
          alt=''
          width={256}
          height={256}
          objectFit='cover'
          className='rounded-lg'
        />
      </div>
      <div className='mt-3'>
        <div>
          <div>
            <p
              className='text-neutral-700 font-bold text-sm  line-clamp-2'
              style={{ wordBreak: 'break-word' }}
            >
              {titleNew}
            </p>
          </div>
          <div className='flex items-center gap-1 mt-1'>
            <div>
              <OclockIcon />
            </div>
            <div className='text-xs text-neutral-500 first-letter:capitalize'>
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

export default ItemNew;
