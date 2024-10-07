'use client';
import Header from '@/components/header';
import LoadingView from '@/components/LoadingView';
import ContainerNewsDesktop from '@/container/tin-tuc/desktop';
import ContainerNewsMobile from '@/container/tin-tuc/mobile';
import useTrans from '@/hook/useTrans';
import { IUserProfile } from '@/interfaces/httpRequest/IUser';
import { ITranslation } from '@/interfaces/ITranslation';
import withCommon from '@/layout/withCommon';
import { useEffect, useState } from 'react';
import '../globals.css';
import { fetchHostNews, fetchNewList } from '@/apis/news';

const NewsPage = ({ userProfile }: { userProfile: IUserProfile }) => {
  const translation: ITranslation = useTrans();

  const [host_News, setHot_News] = useState<any>([]);
  const [new_list, setNew_List] = useState<any>([]);
  const [isLoading, setLoading] = useState(true);

  const getHostNews = async () => {
    setLoading(true);
    const res = await fetchHostNews();
    setHot_News(res?.data);
    setLoading(false);
  };

  const getNewList = async (pageNumber = 1) => {
    const res = await fetchNewList({ page: pageNumber });
    setNew_List(res);
  };

  useEffect(() => {
    getHostNews();
    getNewList();
  }, []);

  return (
    <main className='min-h-[100vh] relative flex flex-col'>
      <div className='flex-1'>
        <Header
          userProfile={userProfile}
          backgroundColorMobile='linear-gradient(90.4deg, #DF5030 -0.55%, #BE3C2A 72.71%)'
          hasBackground
        />
        <div className='lg:block hidden'>
          {isLoading && <LoadingView />}
          {!isLoading && (
            <ContainerNewsDesktop
              translation={translation}
              host_News={host_News}
              new_list={new_list}
              getNewList={getNewList}
            />
          )}
        </div>

        <div className='lg:hidden'>
          {isLoading && <LoadingView />}
          {!isLoading && (
            <ContainerNewsMobile
              translation={translation}
              host_News={host_News}
              new_list={new_list}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default withCommon(NewsPage);
