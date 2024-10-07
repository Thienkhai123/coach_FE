import Footer from '@/components/footer';
import ArrowLeftIcon from '@/components/icons/arrowLeft';
import DetailDesktopNew from '@/components/Pages/tin-tuc/detailDesktopNew';
import LatestNews from '@/components/Pages/tin-tuc/latestNews';
import { ITranslation } from '@/interfaces/ITranslation';
import React, { Fragment, useEffect, useState } from 'react';
import Modal from '@/components/modal/Modal';
import 'moment/locale/vi';
import useModal from '@/hook/useModal';
import ModalShare from '@/components/Pages/tin-tuc/modalShare';
import Header from '@/components/header';
import { IUserProfile } from '@/interfaces/httpRequest/IUser';

interface IContainerNewsDetailDesktopProps {
  translation: ITranslation;
  new_Detail: any;
  latest_New: any;
  userProfile: IUserProfile;
}

const ContainerNewsDetailDesktop = (
  props: IContainerNewsDetailDesktopProps,
) => {
  const { translation, new_Detail, latest_New, userProfile } = props;

  const [shareModal, toggleShareModal] = useModal();
  const [contentNew, setContentNew] = useState<any>({});
  const [latestNews, setLatestNews] = useState<any>([]);

  const handleShare = () => {
    toggleShareModal();
  };

  const handleChooseNews = (id?: any, customUrl?: any) => {
    if (customUrl !== null) {
      window.location.assign(`/tin-tuc/bai-viet?slug=${customUrl}`);
    } else {
      window.location.assign(`/tin-tuc/bai-viet?slug=${id}`);
    }
  };

  const handleBack = () => {
    window.location.assign(`/tin-tuc`);
  };

  useEffect(() => {
    const news = {
      id: new_Detail?.blogId || 0,
      src: new_Detail?.imageUrl || '',
      nameNew: new_Detail?.title || '',
      createTime: new_Detail?.createdAt || new Date(),
      countSeen: new_Detail?.numberOfViews || 0,
      detail: new_Detail?.content || '',
      performers: new_Detail?.createdByUser || 'Admin',
    };
    setContentNew(news);
  }, [new_Detail]);

  useEffect(() => {
    const news: any = [];
    latest_New?.slice(0, 4)?.forEach((element: any) => {
      const new_Item = {
        id: element?.blogId,
        src: element?.imageUrl || '',
        titleNew: element?.title || '',
        descriptionNew: element?.shortDescription || '',
        enumBlogStatusDisplay: element?.enumBlogStatusDisplay || '',
        countSeen: element?.numberOfViews,
        createTime: element?.createdAt || new Date(),
        customUrl: element?.customUrl,
      };
      news.push(new_Item);
    });
    setLatestNews(news);
  }, [latest_New]);

  return (
    <Fragment>
      <Header userProfile={userProfile} />
      <div className='pt-10 pb-[60px] bg-[#ECECEC]'>
        <div className='w-[1120px] mx-auto'>
          <div
            onClick={() => handleBack()}
            className='cursor-pointer hover:opacity-80 duration-100 h-[36px] w-fit flex gap-2 justify-center items-center px-3 py-[6px] border border-neutral-400 rounded-full'
          >
            <ArrowLeftIcon />{' '}
            <div className='text-sm font-semibold'>{translation.NEWS.back}</div>
          </div>
        </div>
        <div className='mx-auto  mt-4 w-[1120px] '>
          <div>
            <DetailDesktopNew
              {...contentNew}
              NEWTRANS={translation.NEWS}
              handleShare={handleShare}
            />
          </div>
          <div className='mt-4'>
            <LatestNews
              listLatestNew={latestNews}
              NEWTRANS={translation.NEWS}
              handleChooseNews={handleChooseNews}
            />
          </div>
        </div>
      </div>
      <Modal
        toggleModal={handleShare}
        open={shareModal}
        wrapChildStyle='p-0'
        modalStyle='w-[100vw] h-[100vh] flex justify-center items-center fixed bg-black/30 z-[60] left-[calc(0%)] top-[calc(0%)]'
        childStyle='w-[600px] bg-white md:rounded-xl md:min-h-fit min-h-full mx-0  overflow-hidden duration-200 animate-fade-in '
      >
        <ModalShare NEWTRANS={translation.NEWS} handleShare={handleShare} />
      </Modal>
      <div>
        <Footer />
      </div>
    </Fragment>
  );
};

export default ContainerNewsDetailDesktop;
