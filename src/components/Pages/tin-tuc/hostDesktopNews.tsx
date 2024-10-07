import { INewsTranslate } from '@/interfaces/INewsTranslate';
import moment from 'moment';
import Image from 'next/legacy/image';
import React, { useState } from 'react';
import 'moment/locale/vi';
import ArrowRightIcon from '@/components/icons/arrowRight';
import { Slider } from '@/components/Slider';
import { SwiperSlide } from 'swiper/react';
import HostItemNew from './hostItemNew';

interface HostNews {
  src?: string;
  listImage?: ISlider[];
  titleHostNew?: string;
  descriptionNew?: string;
  createTime?: string;
  NEWTRANS: INewsTranslate;
  listHostNew?: IListHostNews[];
  handleSeePost: (id: any, customUrl?: any) => void;
  handleChooseHostNews: (id: any) => void;
}

interface IListHostNews {
  id?: number;
  src?: string;
  titleHostNew?: string;
  createTime?: string;
  countSeen?: number;
  descriptionNew?: string;
  customUrl?: string;
}

interface ISlider {
  src?: string;
  href?: string;
}

const defaultData = {
  src: '/images/main-new-demo.png',
  listImage: [
    { src: '/images/main-new-demo.png', href: '' },
    { src: '/images/news-demo.png', href: '' },
    { src: '/images/news-default.png', href: '' },
  ],
  titleHostNew: 'Khám phá 22 hang động kỳ vĩ mới được phát hiện tại Quảng Bình',
  descriptionNew:
    'Lorem ipsum dolor sit amet consectetur. Ultricies porta at sed sagittis. Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet consectetur. Ultricies porta at sed sagittis. Lorem ipsum dolor sit amet ',
  createTime: 'Thu Jul 11 2024 14:34:09 GMT+0700',
  listHostNew: [
    // {
    //   id: 1,
    //   src: '/images/news-demo.png',
    //   titleHostNew: 'Giải nhiệt mùa hè',
    //   createTime: 'Thu Jul 11 2024 14:34:09 GMT+0700',
    //   countSeen: 131,
    // },
    // {
    //   id: 1,
    //   src: '/images/news-default.png',
    //   titleHostNew: 'Khám Phá Quảng Bình- Vương Quốc Động',
    //   createTime: 'Thu Jul 11 2024 14:34:09 GMT+0700',
    //   countSeen: 131,
    // },
    // {
    //   id: 1,
    //   src: '/images/news-default.png',
    //   titleHostNew: 'Khám Phá Quảng Bình- Vương Quốc Động',
    //   createTime: 'Thu Jul 11 2024 14:34:09 GMT+0700',
    //   countSeen: 131,
    // },
    // {
    //   id: 1,
    //   src: '/images/news-default.png',
    //   titleHostNew: 'Khám Phá Quảng Bình- Vương Quốc Động',
    //   createTime: 'Thu Jul 11 2024 14:34:09 GMT+0700',
    //   countSeen: 131,
    // },
    // {
    //   id: 1,
    //   src: '/images/news-default.png',
    //   titleHostNew: 'Khám Phá Quảng Bình- Vương Quốc Động',
    //   createTime: 'Thu Jul 11 2024 14:34:09 GMT+0700',
    //   countSeen: 131,
    // },
    // {
    //   id: 1,
    //   src: '/images/news-default.png',
    //   titleHostNew: 'Khám Phá Quảng Bình- Vương Quốc Động',
    //   createTime: 'Thu Jul 11 2024 14:34:09 GMT+0700',
    //   countSeen: 131,
    // },
    // {
    //   id: 1,
    //   src: '/images/news-default.png',
    //   titleHostNew: 'Khám Phá Quảng Bình- Vương Quốc Động',
    //   createTime: 'Thu Jul 11 2024 14:34:09 GMT+0700',
    //   countSeen: 131,
    // },
    // {
    //   id: 1,
    //   src: '/images/news-default.png',
    //   titleHostNew: 'Khám Phá Quảng Bình- Vương Quốc Động',
    //   createTime: 'Thu Jul 11 2024 14:34:09 GMT+0700',
    //   countSeen: 131,
    // },
  ],
};

const HostNews = (props: HostNews) => {
  const {
    NEWTRANS,
    listHostNew = defaultData.listHostNew,
    handleSeePost,
    handleChooseHostNews,
  } = props;

  // const [indexBlog, setIndexBlog] = useState<any>(0);

  // const handleChangeInd = (element: any) => {
  //   setIndexBlog(element?.activeIndex);
  // };

  const getLocaleLang: any = localStorage.getItem('locale');

  return (
    <div className='bg-white p-6 rounded-lg flex  justify-between '>
      <div className='w-[704px]'>
        <Slider
          breakpoints={{
            330: {
              slidesPerView: 1,
              slidesPerGroup: 1,
            },
          }}
          classNameLeft='absolute z-50 left-[8px] top-1/3 -translate-y-1/2'
          classNameRight='absolute z-50 right-[8px] top-1/3 -translate-y-1/2'
          stylePrev='bg-black h-[41px] w-[41px] flex justify-center items-center opacity-[60%]'
          stroke='white'
          hidePrev={listHostNew.length <= 1}
          hideNext={listHostNew.length <= 1}
          classNameSwiper='rounded-lg'
          // handleSlideChange={handleChangeInd}
        >
          {listHostNew?.slice(0, 5)?.map((element: any, ind: number) => {
            const { src, href } = element;
            return (
              <SwiperSlide key={ind} className='flex-wrap'>
                <div>
                  <Image
                    src={src || ''}
                    alt='imagesHost'
                    width={704}
                    height={431.02}
                    objectFit='cover'
                    className='rounded-lg'
                    priority={true}
                  />
                </div>
                <div className='mt-4 w-full'>
                  <p
                    className='text-neutral-700 text-start font-bold transition duration-300 ease-in-out text-lg line-clamp-2'
                    style={{ wordBreak: 'break-word' }}
                  >
                    {element?.titleHostNew}
                  </p>
                  <p
                    className='text-neutral-600  text-start  font-medium transition duration-300 ease-in-out text-sm mt-2 line-clamp-2'
                    style={{ wordBreak: 'break-word' }}
                  >
                    {element?.descriptionNew}
                  </p>
                  <div className='mt-2 flex justify-between '>
                    <div className=' text-sm font-normal transition duration-300 ease-in-out text-neutral-500 first-letter:capitalize'>
                      {moment(element?.createTime || new Date())
                        .locale(getLocaleLang !== null ? getLocaleLang : 'vi')
                        .format('dddd, DD/MM/YYYY')}
                    </div>
                    <div
                      onClick={() =>
                        handleSeePost(element?.id, element?.customUrl)
                      }
                      className='cursor-pointer text-sm font-semibold  text-[#0477B8] flex gap-1 items-center'
                    >
                      {NEWTRANS?.seeMore} <ArrowRightIcon />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Slider>
      </div>
      <div className='w-[328px] '>
        <div className='flex flex-col gap-[24px]'>
          {listHostNew?.slice(0, 5)?.map((elm: IListHostNews, ind: number) => {
            return (
              <div key={ind}>
                <HostItemNew
                  {...elm}
                  handleChooseHostNews={handleChooseHostNews}
                  NEWTRANS={NEWTRANS}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HostNews;
