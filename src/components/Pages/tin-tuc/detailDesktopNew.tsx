import EyeBlue from '@/components/icons/eyeBlue';
import OclockBlue from '@/components/icons/oclockBlue';
import UserBlueIcon from '@/components/icons/userBlue';
import { INewsTranslate } from '@/interfaces/INewsTranslate';
import moment from 'moment';
import Image from 'next/legacy/image';
import React from 'react';

interface IDetailDesktopNew {
  src?: string;
  nameNew?: string;
  createTime?: string;
  countSeen?: number;
  userCreate?: string;
  detail?: string;
  NEWTRANS: INewsTranslate;
  performers?: string;
  handleShare: () => void;
}

const defaultData = {
  src: '/images/main-new-demo.png',
  performers: 'Tiến Thành',
  nameNew: 'Khám phá 22 hang động kỳ vĩ mới được phát hiện tại Quảng Bình',
  createTime: 'Thu Jul 11 2024 14:34:09 GMT+0700',
  countSeen: 131,
  userCreate: 'Tiến Thành',
  detail:
    'Ban Quản lý Vườn Quốc gia (VQG) Phong Nha - Kẻ Bàng (Quảng Bình) mới đây đã công bố kết quả khảo sát hang động do đơn vị này phối hợp với đoàn thám hiểm Việt - Anh triển khai. Cuộc khảo sát kéo dài từ ngày 1 đến 15/3, đoàn thám hiểm gồm 12 chuyên gia đã triển khai khảo sát, tìm kiếm tại khu vực VQG Phong Nha - Kẻ Bàng và vùng lân cận thuộc các huyện Minh Hóa, Tuyên Hóa. Bên cạnh khảo sát bổ sung 3 hang động, đoàn thám hiểm phát hiện 22 hang động mới.',
};

const DetailDesktopNew = (props: IDetailDesktopNew) => {
  const {
    src = defaultData.src,
    nameNew = defaultData.nameNew,
    createTime = defaultData.createTime,
    countSeen = defaultData.countSeen,
    detail = defaultData.detail,
    NEWTRANS,
    performers = defaultData.performers,
    handleShare,
  } = props;
  const getLocaleLang: any = localStorage.getItem('locale');
  return (
    <div>
      <div className='rounded-t-xl h-[431.02px] w-full relative'>
        <Image
          src={src || '/images/main-new-demo.png'}
          objectFit='cover'
          layout='fill'
          className='rounded-t-xl'
          priority={true}
        />
      </div>
      <div className='py-6 px-[160px] bg-white rounded-b-xl'>
        <div className='flex justify-between'>
          <div className='text-[24px] font-bold text-[#063F65] max-w-[618px] line-clamp-2'>
            {nameNew}
          </div>
          <div
            onClick={() => handleShare()}
            className='cursor-pointer hover:opacity-80 duration-100 text-sm font-semibold text-white bg-[#DF5030] rounded-full flex justify-center items-center h-[36px] px-4'
          >
            {NEWTRANS.share}
          </div>
        </div>
        <div className='mt-4'>
          <div className='rounded p-2 bg-[#DFF0FB] flex flex-col gap-1'>
            <div className='flex items-center gap-2'>
              <div>
                <OclockBlue />
              </div>
              <div className='text-sm text-neutral-600 first-letter:capitalize'>
                {moment
                  .utc(createTime)
                  .locale(getLocaleLang !== null ? getLocaleLang : 'vi')
                  .format('dddd, DD/MM/YYYY')}
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <div>
                <UserBlueIcon />
              </div>
              <div className='text-sm text-neutral-600'>
                {NEWTRANS.performers} : {performers}
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <div>
                <EyeBlue />
              </div>
              <div className='text-sm text-neutral-600'>
                {NEWTRANS?.seen}: {countSeen}
              </div>
            </div>
          </div>
        </div>
        <div className='mt-4'>
          <div dangerouslySetInnerHTML={{ __html: detail }} />
        </div>
      </div>
    </div>
  );
};

export default DetailDesktopNew;
