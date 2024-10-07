import { INewsTranslate } from '@/interfaces/INewsTranslate';
import React from 'react';
import PaginationDesktopNews from '@/components/paginationDesktopNews/paginationDesktopNews';
import ItemNew from '@/components/itemNew/itemNewDesktop';

interface IListDesktopNews {
  listNew?: INews[];
  NEWTRANS: INewsTranslate;
  totalPages: number;
  handlePageChange: (arg: any) => void;
  handleChooseNews: (id: any, customUrl?: any) => void;
}

interface INews {
  src?: string;
  titleNew?: string;
  createTime?: string;
  countSeen: number;
  customUrl?: any;
}

const defaultData = {
  listNew: [
    {
      id: 1,
      src: '/images/main-new-demo.png',
      titleNew: 'Giải nhiệt mùa hè',
      createTime: 'Thu Jul 11 2024 14:34:09 GMT+0700',
      countSeen: 131,
    },
    {
      id: 2,
      src: '/images/news-demo.png',
      titleNew: 'Khám phá 22 hang động kỳ vĩ mới được phát hiện tại Quảng Bình',
      createTime: 'Thu Jul 11 2024 14:34:09 GMT+0700',
      countSeen: 131,
    },
    {
      id: 3,
      src: '/images/news-default.png',
      titleNew:
        'Khám phá 22 hang động kỳ vĩ mới được phát hiện tại Quảng Bình Khám phá 22 hang động kỳ vĩ mới được phát hiện tại Quảng Bình',
      createTime: 'Thu Jul 11 2024 14:34:09 GMT+0700',
      countSeen: 131,
    },
    {
      id: 4,
      src: '/images/news-default.png',
      titleNew: 'Khám phá 22 hang động kỳ vĩ mới được phát hiện tại Quảng Bình',
      createTime: 'Thu Jul 11 2024 14:34:09 GMT+0700',
      countSeen: 131,
    },
    {
      id: 4,
      src: '/images/main-new-demo.png',
      titleNew: 'Giải nhiệt mùa hè',
      createTime: 'Thu Jul 11 2024 14:34:09 GMT+0700',
      countSeen: 131,
    },
    {
      id: 4,
      src: '/images/news-demo.png',
      titleNew: 'Khám phá 22 hang động kỳ vĩ mới được phát hiện tại Quảng Bình',
      createTime: 'Thu Jul 11 2024 14:34:09 GMT+0700',
      countSeen: 131,
    },
    {
      id: 4,
      src: '/images/news-default.png',
      titleNew:
        'Khám phá 22 hang động kỳ vĩ mới được phát hiện tại Quảng Bình Khám phá 22 hang động kỳ vĩ mới được phát hiện tại Quảng Bình',
      createTime: 'Thu Jul 11 2024 14:34:09 GMT+0700',
      countSeen: 131,
    },
    {
      id: 4,
      src: '/images/news-default.png',
      titleNew: 'Khám phá 22 hang động kỳ vĩ mới được phát hiện tại Quảng Bình',
      createTime: 'Thu Jul 11 2024 14:34:09 GMT+0700',
      countSeen: 131,
    },
    {
      id: 4,
      src: '/images/main-new-demo.png',
      titleNew: 'Giải nhiệt mùa hè',
      createTime: 'Thu Jul 11 2024 14:34:09 GMT+0700',
      countSeen: 131,
    },
    {
      id: 4,
      src: '/images/news-demo.png',
      titleNew: 'Khám phá 22 hang động kỳ vĩ mới được phát hiện tại Quảng Bình',
      createTime: 'Thu Jul 11 2024 14:34:09 GMT+0700',
      countSeen: 131,
    },
    {
      id: 4,
      src: '/images/news-default.png',
      titleNew:
        'Khám phá 22 hang động kỳ vĩ mới được phát hiện tại Quảng Bình Khám phá 22 hang động kỳ vĩ mới được phát hiện tại Quảng Bình',
      createTime: 'Thu Jul 11 2024 14:34:09 GMT+0700',
      countSeen: 131,
    },
    {
      id: 4,
      src: '/images/news-default.png',
      titleNew: 'Khám phá 22 hang động kỳ vĩ mới được phát hiện tại Quảng Bình',
      createTime: 'Thu Jul 11 2024 14:34:09 GMT+0700',
      countSeen: 131,
    },
  ],
};

const ListDesktopNews = (props: IListDesktopNews) => {
  const {
    listNew = defaultData.listNew,
    NEWTRANS,
    handlePageChange,
    handleChooseNews,
    totalPages,
  } = props;

  return (
    <div className='bg-white p-6 rounded-lg'>
      <div className=' grid grid-cols-4 gap-4'>
        {listNew?.slice(0, 12)?.map((elm: INews, ind: number) => {
          return (
            <div key={ind}>
              <ItemNew
                {...elm}
                NEWTRANS={NEWTRANS}
                handleChooseNews={handleChooseNews}
              />
            </div>
          );
        })}
      </div>
      {totalPages > 1 && (
        <div className='w-fit mx-auto mt-[32px]'>
          <PaginationDesktopNews
            totalPage={Math.ceil(totalPages)}
            handlePageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default ListDesktopNews;
