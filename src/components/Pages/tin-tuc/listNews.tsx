import ClockIcon from '@/components/icons/clock';
import CommentIcon from '@/components/icons/comment';
import EyeOnIcon from '@/components/icons/eyeOn';
import { IHomeTranslate } from '@/interfaces/IHomeTranslate';
import Image from 'next/legacy/image';
import React from 'react';

type NewsT = {
  id: number;
  customUrl: string;
  imageUrl: string;
  title: string;
  description: string;
  createAt: string;
  views: number;
  comments: number;
};

interface IListNewsProps {
  listNews: NewsT[];
  HOME: IHomeTranslate;
}

const ListNews = (props: IListNewsProps) => {
  const { listNews, HOME } = props;

  const handleChooseNews = (id: any, customUrl?: any) => {
    if (customUrl) {
      window.location.assign(`/tin-tuc/bai-viet?slug=${customUrl}`);
    } else {
      if (id) {
        window.location.assign(`/tin-tuc/bai-viet?slug=${id}`);
      }
    }
  };

  return (
    <div className='flex flex-col gap-3'>
      {listNews.map((news, index) => (
        <div
          key={`news-${index}`}
          className='pb-3 border-b'
          onClick={() => handleChooseNews(news?.id, news?.customUrl)}
        >
          <div className='flex gap-4'>
            <div className='rounded w-[90px] h-[90px]'>
              {news?.imageUrl && (
                <Image
                  alt=''
                  width={90}
                  height={90}
                  src={news.imageUrl}
                  className='rounded'
                  objectFit='cover'
                />
              )}
              {!news?.imageUrl && (
                <div className='w-[90px] h-[90px] bg-neutral-grey-100 rounded' />
              )}
            </div>
            <div className='flex-1 overflow-hidden break-all'>
              <p className='text-neutral-grey-700 font-bold text-sm line-clamp-2'>
                {news.title}
              </p>
              <div className='flex items-center gap-1 mt-1'>
                <div>
                  <ClockIcon stroke='#898C8D' />
                </div>
                <p className='text-xs text-neutral-grey-500 font-medium'>
                  {news.createAt}
                </p>
              </div>

              <div className='grid grid-cols-2 gap-2 items-center mt-1'>
                <div className='flex items-center gap-1'>
                  <EyeOnIcon fill='#898C8D' />
                  <p className='text-xs text-neutral-grey-500 font-medium'>
                    {HOME.seen}: {news.views}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListNews;
