import ItemNew from '@/components/itemNew/itemNewDesktop';
import ItemNewMobile from '@/components/itemNew/itemNewMobile';
import { INewsTranslate } from '@/interfaces/INewsTranslate';
import React from 'react';

interface ILatestNews {
  NEWTRANS: INewsTranslate;
  listLatestNew?: INews[];
  handleChooseNews: (id?: any, customUrl?: any) => void;
}

interface INews {
  id?: number;
  src?: string;
  titleHostNew?: string;
  createTime?: string;
  countSeen: number;
  customUrl?: any;
}

const defaultData = {
  listNew: [
    {
      src: '/images/main-new-demo.png',
      titleHostNew: 'Giải nhiệt mùa hè',
      createTime: 'Thu Jul 11 2024 14:34:09 GMT+0700',
      countSeen: 131,
    },
    {
      src: '/images/news-demo.png',
      titleHostNew:
        'Khám phá 22 hang động kỳ vĩ mới được phát hiện tại Quảng Bình',
      createTime: 'Thu Jul 11 2024 14:34:09 GMT+0700',
      countSeen: 131,
    },
    {
      src: '/images/news-default.png',
      titleHostNew:
        'Khám phá 22 hang động kỳ vĩ mới được phát hiện tại Quảng Bình Khám phá 22 hang động kỳ vĩ mới được phát hiện tại Quảng Bình',
      createTime: 'Thu Jul 11 2024 14:34:09 GMT+0700',
      countSeen: 131,
    },
    {
      src: '/images/news-default.png',
      titleHostNew:
        'Khám phá 22 hang động kỳ vĩ mới được phát hiện tại Quảng Bình',
      createTime: 'Thu Jul 11 2024 14:34:09 GMT+0700',
      countSeen: 131,
    },
    {
      src: '/images/main-new-demo.png',
      titleHostNew: 'Giải nhiệt mùa hè',
      createTime: 'Thu Jul 11 2024 14:34:09 GMT+0700',
      countSeen: 131,
    },
    {
      src: '/images/news-demo.png',
      titleHostNew:
        'Khám phá 22 hang động kỳ vĩ mới được phát hiện tại Quảng Bình',
      createTime: 'Thu Jul 11 2024 14:34:09 GMT+0700',
      countSeen: 131,
    },
    {
      src: '/images/news-default.png',
      titleHostNew:
        'Khám phá 22 hang động kỳ vĩ mới được phát hiện tại Quảng Bình Khám phá 22 hang động kỳ vĩ mới được phát hiện tại Quảng Bình',
      createTime: 'Thu Jul 11 2024 14:34:09 GMT+0700',
      countSeen: 131,
    },
  ],
};

const LatestNews = (props: ILatestNews) => {
  const {
    NEWTRANS,
    listLatestNew = defaultData.listNew,
    handleChooseNews,
  } = props;

  return (
    <div className='bg-white xl:p-6 p-4 xl:rounded-xl'>
      <div className='py-1 px-2 bg-[#DEF5E0] text-xs font-extrabold text-neutral-grey-600 rounded-full w-fit'>
        {NEWTRANS?.latestNew}
      </div>
      <div className='xl:mt-[32px] mt-3 grid xl:grid-cols-4 md:grid-col-2 grid-col1 gap-4'>
        {listLatestNew?.map((elm: INews, ind: number) => {
          return (
            <div key={ind}>
              <div className='hidden xl:block'>
                <ItemNew
                  {...elm}
                  NEWTRANS={NEWTRANS}
                  handleChooseNews={handleChooseNews}
                />
              </div>
              <div className='block xl:hidden'>
                <ItemNewMobile
                  hidenLine={ind === 3}
                  {...elm}
                  NEWTRANS={NEWTRANS}
                  handleChooseNews={handleChooseNews}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LatestNews;
