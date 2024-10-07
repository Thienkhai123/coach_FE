import EyeIcon from '@/components/icons/eye';
import OclockIcon from '@/components/icons/Oclock';
import { INewsTranslate } from '@/interfaces/INewsTranslate';
import moment from 'moment';
import Image from 'next/legacy/image';
import React from 'react';

interface IHostItemNew {
  handleChooseHostNews: (id: any, customUrl?: any) => void;
  id?: any;
  src?: any;
  countSeen?: any;
  titleHostNew?: any;
  createTime?: any;
  NEWTRANS: INewsTranslate;
  customUrl?: any;
}

const HostItemNew = (props: IHostItemNew) => {
  const {
    id,
    src,
    countSeen,
    titleHostNew,
    createTime,
    handleChooseHostNews,
    NEWTRANS,
    customUrl,
  } = props;
  const getLocaleLang: any = localStorage.getItem('locale');
  return (
    <div
      onClick={() => handleChooseHostNews(id, customUrl)}
      className='flex gap-4 cursor-pointer '
    >
      <div className=' min-w-[80px] h-[80px] relative '>
        <Image
          src={src || ''}
          alt='imagesNew'
          layout='fill'
          objectFit='cover'
          className='rounded'
          priority={true}
        />
      </div>
      <div>
        <div>
          <p
            className='text-neutral-700 font-bold text-sm  line-clamp-2'
            style={{ wordBreak: 'break-word' }}
          >
            {titleHostNew}
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
  );
};

export default HostItemNew;
