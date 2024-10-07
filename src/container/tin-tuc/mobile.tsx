import React, { useEffect, useState } from 'react';
import { ITranslation } from '@/interfaces/ITranslation';
import SliderNews from '@/components/Pages/tin-tuc/sliderNews';
import ListNews from '@/components/Pages/tin-tuc/listNews';
// import PaginationNews from "@/components/Pages/tin-tuc/paginationNews";
import { fetchNewList } from '@/apis/news';
import Button from '@/components/button';
import Footer from '@/components/footer';

interface INews {
  data: any;
  totalPages: number;
}

interface IContainerNewsMobileProps {
  translation: ITranslation;
  host_News: [];
  new_list: INews;
}

type NewsT = {
  id: number;
  customUrl: string;
  image: string;
  title: string;
  createAt: string;
  description: string;
};

type NewsItemT = {
  id: number;
  customUrl: string;
  imageUrl: string;
  title: string;
  createAt: string;
  description: string;
  views: number;
  comments: number;
};

const ContainerNewsMobile = (props: IContainerNewsMobileProps) => {
  const { translation, host_News, new_list } = props;
  const { NEWS, HOME } = translation;
  const [highlightBlogs, setHighlightBlogs] = useState<NewsT[]>([]);
  const [listNews, setListNews] = useState<NewsItemT[]>([]);
  const [page, setPage] = useState(1);

  // const handlePageChange = (id: any) => {
  //   console.log(id);
  // };

  const getLocaleLang: any = localStorage.getItem('locale');
  const handleSeeMoreNews = async () => {
    const res = await fetchNewList({ page: page + 1 });
    if (res?.data) {
      let tmpListNews: NewsItemT[] = [];
      res?.data?.forEach((news: any) => {
        tmpListNews.push({
          id: news?.blogId || 0,
          customUrl: news?.customUrl,
          imageUrl: news?.imageUrl || '',
          title: news?.title || '',
          description: news?.shortDescription || '',
          createAt: news?.createdAt
            ? new Date(news?.createdAt)?.toLocaleString(
                getLocaleLang === 'en' ? 'en-US' : 'vi-VN',
                {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  timeZone: 'Asia/Ho_Chi_Minh',
                },
              )
            : '',
          comments: 0,
          views: news?.numberOfViews || 0,
        });
      });
      setListNews([...listNews, ...tmpListNews]);
    }
    setPage(page + 1);
  };

  useEffect(() => {
    if (host_News?.length > 0) {
      let tmpHightlightBlogs: NewsT[] = [];
      host_News?.slice(0, 3)?.forEach((news: any) => {
        tmpHightlightBlogs?.push({
          id: news?.blogId || 0,
          customUrl: news?.customUrl,
          image: news?.imageUrl || '',
          title: news?.title || '',
          description: news?.shortDescription || '',
          createAt: news?.createdAt
            ? new Date(news?.createdAt)?.toLocaleString(
                getLocaleLang === 'en' ? 'en-US' : 'vi-VN',
                {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  timeZone: 'Asia/Ho_Chi_Minh',
                },
              )
            : '',
        });
      });
      setHighlightBlogs(tmpHightlightBlogs);
    }

    if (new_list?.data?.length > 0) {
      let tmpListNews: NewsItemT[] = [];
      new_list?.data?.forEach((news: any) => {
        tmpListNews.push({
          id: news?.blogId || 0,
          customUrl: news?.customUrl,
          imageUrl: news?.imageUrl || '',
          title: news?.title || '',
          description: news?.shortDescription || '',
          createAt: news?.createdAt
            ? new Date(news?.createdAt)?.toLocaleString(
                getLocaleLang === 'en' ? 'en-US' : 'vi-VN',
                {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  timeZone: 'Asia/Ho_Chi_Minh',
                },
              )
            : '',
          comments: 0,
          views: news?.numberOfViews || 0,
        });
      });
      setListNews(tmpListNews);
    }
  }, []);

  return (
    <div className='bg-neutral-grey-100 flex flex-col gap-2'>
      <div className='bg-white p-4'>
        <div className='bg-semantic-green-light rounded-full py-1 px-2 w-fit mb-3'>
          <p className='text-neutral-grey-600 text-xs font-extrabold'>
            {NEWS.hotNews}
          </p>
        </div>
        <SliderNews listNews={highlightBlogs} readmoretext={NEWS.seeMore} />
      </div>
      <div className='flex flex-col gap-3 bg-white p-4'>
        <div className='bg-semantic-green-light rounded-full py-1 px-2 w-fit mb-3'>
          <p className='text-neutral-grey-600 text-xs font-extrabold'>
            {NEWS.allNews}
          </p>
        </div>
        <ListNews HOME={HOME} listNews={listNews} />
        {new_list?.totalPages > 1 && page < new_list?.totalPages && (
          <Button
            width='w-fit mx-auto mt-2'
            btnColor='bg-secondary-300'
            color='text-white'
            borderColor='border-secondary-300'
            onClick={handleSeeMoreNews}
          >
            {HOME.seeMore}
          </Button>
        )}
        {/* <PaginationNews totalPage={10} handlePageChange={handlePageChange} /> */}
      </div>
      <div className=''>
        <Footer />
      </div>
    </div>
  );
};

export default ContainerNewsMobile;
