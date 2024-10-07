import Footer from '@/components/footer';
import 'moment/locale/vi';
import HostNews from '@/components/Pages/tin-tuc/hostDesktopNews';
import ListDesktopNews from '@/components/Pages/tin-tuc/listDesktopNews';
import { ITranslation } from '@/interfaces/ITranslation';
import React, { Fragment, useEffect, useState } from 'react';
interface IContainerNewsDesktopProps {
  translation: ITranslation;
  host_News: [];
  new_list: INews;
  getNewList: (pageNumber: number) => void;
}
interface INews {
  data: any;
  totalPages: number;
}

const ContainerNewsDesktop = (props: IContainerNewsDesktopProps) => {
  const { translation, host_News, new_list, getNewList } = props;

  const [customHostNews, setCustomHostNews] = useState<any>([]);
  const [customListNew, setCustomListNew] = useState<any>([]);

  const handleSeePost = (id?: 1, customUrl?: any) => {
    if (customUrl !== null) {
      window.location.assign(`/tin-tuc/bai-viet?slug=${customUrl}`);
    } else {
      window.location.assign(`/tin-tuc/bai-viet?slug=${id}`);
    }
  };

  const handleChooseHostNews = (id?: any, customUrl?: any) => {
    if (customUrl !== null) {
      window.location.assign(`/tin-tuc/bai-viet?slug=${customUrl}`);
    } else {
      window.location.assign(`/tin-tuc/bai-viet?slug=${id}`);
    }
  };

  const handlePageChange = async (element: any) => {
    const { selected } = element;
    await getNewList(selected + 1);
  };

  const handleChooseNews = (id: any, customUrl?: any) => {
    if (customUrl !== null) {
      window.location.assign(`/tin-tuc/bai-viet?slug=${customUrl}`);
    } else {
      window.location.assign(`/tin-tuc/bai-viet?slug=${id}`);
    }
  };

  useEffect(() => {
    const news: any = [];
    host_News?.forEach((element: any) => {
      const new_Item = {
        id: element?.blogId,
        src: element?.imageUrl,
        titleHostNew: element?.title,
        descriptionNew: element?.shortDescription,
        enumBlogStatusDisplay: element?.enumBlogStatusDisplay,
        countSeen: element?.numberOfViews,
        createTime: element?.createdAt,
        customUrl: element?.customUrl,
      };
      news.push(new_Item);
    });
    setCustomHostNews(news);
  }, [host_News]);

  useEffect(() => {
    const news: any = [];
    new_list?.data?.forEach((element: any) => {
      const new_Item = {
        id: element?.blogId,
        src: element?.imageUrl,
        titleNew: element?.title,
        descriptionNew: element?.shortDescription,
        enumBlogStatusDisplay: element?.enumBlogStatusDisplay,
        countSeen: element?.numberOfViews,
        createTime: element?.createdAt,
        customUrl: element?.customUrl,
      };
      news.push(new_Item);
    });
    setCustomListNew(news);
  }, [new_list]);

  return (
    <Fragment>
      <div className='pt-10 pb-[60px] bg-[#ECECEC]'>
        <div className='mx-auto w-fit'>
          <div>
            <HostNews
              listHostNew={customHostNews}
              NEWTRANS={translation.NEWS}
              handleSeePost={handleSeePost}
              handleChooseHostNews={handleChooseHostNews}
            />
          </div>
          <div className='mt-4'>
            <ListDesktopNews
              totalPages={new_list?.totalPages || 1}
              listNew={customListNew}
              NEWTRANS={translation.NEWS}
              handlePageChange={handlePageChange}
              handleChooseNews={handleChooseNews}
            />
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </Fragment>
  );
};

export default ContainerNewsDesktop;
