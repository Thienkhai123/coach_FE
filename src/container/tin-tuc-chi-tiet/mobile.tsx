import React, { Fragment, useEffect, useState } from 'react';
import { ITranslation } from '@/interfaces/ITranslation';
import NavbarAction from '@/components/navbar/action';
import ShareIcon from '@/components/icons/share';
import useModal from '@/hook/useModal';
import Image from 'next/legacy/image';
import moment from 'moment';
import OclockBlue from '@/components/icons/oclockBlue';
import UserBlueIcon from '@/components/icons/userBlue';
import EyeBlue from '@/components/icons/eyeBlue';
import LatestNews from '@/components/Pages/tin-tuc/latestNews';
import Footer from '@/components/footer';
import TwitterIcon from '@/components/icons/twitter';
import FacebookBlueIcon from '@/components/icons/facebookBlue';
import DrawerBottom2 from '@/components/drawer-bottom2';

interface IContainerNewsDetailMobileProps {
  translation: ITranslation;
  new_Detail: any;
  latest_New: any;
}

const FAKE_DATAS = {
  title: 'Tiêu đề bài viết',
  image: '',
  createAt: 'Thứ 3, 05/05/2024',
  content:
    'Lorem ipsum dolor sit amet consectetur. Morbi dictumst turpis gravida integer tempor vestibulum feugiat risus. Enim tellus dictum urna lorem placerat adipiscing scelerisque fringilla. Eget arcu mi a faucibus tincidunt etiam tempus quam aliquam. Tristique nunc et amet pellentesque tempus urna.',
};

const FAKE_NEWS = [
  {
    imageUrl: '/images/car.jpg',
    title: 'Tiêu đề bài viết',
    description:
      'Lorem ipsum dolor sit amet consectetur. Ultricies porta at sed sagittis. Lorem ipsum dolor sit amet...',
    createAt: 'Thứ 3, 05/05/2024',
    views: 131,
    comments: 0,
  },
  {
    imageUrl: '/images/car.jpg',
    title: 'Tiêu đề bài viết',
    description:
      'Lorem ipsum dolor sit amet consectetur. Ultricies porta at sed sagittis. Lorem ipsum dolor sit amet...',
    createAt: 'Thứ 3, 05/05/2024',
    views: 131,
    comments: 0,
  },
  {
    imageUrl: '/images/car.jpg',
    title: 'Tiêu đề bài viết',
    description:
      'Lorem ipsum dolor sit amet consectetur. Ultricies porta at sed sagittis. Lorem ipsum dolor sit amet...',
    createAt: 'Thứ 3, 05/05/2024',
    views: 131,
    comments: 0,
  },
  {
    imageUrl: '/images/car.jpg',
    title: 'Tiêu đề bài viết',
    description:
      'Lorem ipsum dolor sit amet consectetur. Ultricies porta at sed sagittis. Lorem ipsum dolor sit amet...',
    createAt: 'Thứ 3, 05/05/2024',
    views: 131,
    comments: 0,
  },
  {
    imageUrl: '/images/car.jpg',
    title: 'Tiêu đề bài viết',
    description:
      'Lorem ipsum dolor sit amet consectetur. Ultricies porta at sed sagittis. Lorem ipsum dolor sit amet...',
    createAt: 'Thứ 3, 05/05/2024',
    views: 131,
    comments: 0,
  },
];

const ContainerNewsDetailMobile = (props: IContainerNewsDetailMobileProps) => {
  const { translation, new_Detail, latest_New } = props;
  const { HOME, NEWS, BOOKING } = translation;
  const [open, toggle] = useModal();

  const [latestNews, setLatestNews] = useState<any>([]);
  const getLocaleLang: any = localStorage.getItem('locale');
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

  const handleFBShare = () => {
    const linkShare = window.location.href;
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      linkShare,
    )}`;
    window.open(
      facebookShareUrl,
      'sharer',
      'toolbar=0,status=0,width=600,height=400',
    );
  };

  const handleTWShare = () => {
    const linkShare = window.location.href;
    const text = 'Share news';
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      linkShare,
    )}&text=${encodeURIComponent(text)}`;
    window.open(
      twitterShareUrl,
      'sharer',
      'toolbar=0,status=0,width=600,height=400',
    );
  };

  useEffect(() => {
    const news: any = [];
    latest_New?.slice(0, 5)?.forEach((element: any) => {
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
      <NavbarAction
        title={NEWS.seePost}
        handleClick={handleBack}
        ActionElement={() => (
          <div onClick={toggle}>
            <ShareIcon stroke='white' />
          </div>
        )}
      />
      <div className='flex flex-col gap-2'>
        <div className='bg-white'>
          <div className='w-full h-[200px] relative'>
            <Image
              alt=''
              src={new_Detail?.imageUrl || ''}
              layout='fill'
              objectFit='cover'
            />
          </div>
          <div className='py-3 px-4'>
            <div className='mb-6'>
              <p className='text-[#063F65] font-bold text-base line-clamp-2'>
                {new_Detail.title}
              </p>
              <div className='mt-2'>
                <div className='rounded p-2 bg-[#DFF0FB] flex flex-col gap-1'>
                  <div className='flex items-center gap-2'>
                    <div>
                      <OclockBlue />
                    </div>
                    <div className='text-sm text-neutral-600'>
                      {moment
                        .utc(new_Detail?.createdAt)
                        .locale(getLocaleLang !== null ? getLocaleLang : 'vi')
                        .format('dddd, DD/MM/YYYY')}
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <div>
                      <UserBlueIcon />
                    </div>
                    <div className='text-sm text-neutral-600'>
                      {NEWS.performers} : {new_Detail?.createdByUser || 'Admin'}
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <div>
                      <EyeBlue />
                    </div>
                    <div className='text-sm text-neutral-600'>
                      {NEWS?.seen}: {new_Detail?.numberOfViews}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className='px-4 max-w-prose prose prose-sm sm:prose lg:prose-lg xl:prose-xl overflow-hidden break-words'
              dangerouslySetInnerHTML={{ __html: new_Detail.content }}
            />
          </div>
        </div>
        <div>
          <LatestNews
            listLatestNew={latestNews}
            NEWTRANS={translation.NEWS}
            handleChooseNews={handleChooseNews}
          />
        </div>
      </div>

      <DrawerBottom2
        open={open}
        toggleDrawer={toggle}
        animationName='animation-open-share-post'
        closeStyle='animation-off-share-post'
      >
        <div className=''>
          {/* <div className='flex justify-end'>
            <div onClick={toggle}>
              <CancelIcon />
            </div>
          </div> */}
          <p className='text-center text-[#19191B] font-semibold text-base'>
            {NEWS.sharePostBy}
          </p>
          <div className='flex items-center gap-3 mt-4 mb-7'>
            <button
              onClick={() => handleFBShare()}
              className='p-2 border border-neutral-200 rounded-xl bg-white flex-1 py-3 flex justify-center gap-2 items-center'
            >
              <div className='flex items-center gap-2'>
                <FacebookBlueIcon />
                <p className='text-black font-medium text-base'>Facebook</p>
              </div>
            </button>
            <button
              onClick={() => handleTWShare()}
              className='p-2 border border-neutral-200 rounded-xl bg-white flex-1 py-3 flex justify-center gap-2 items-center'
            >
              <div className='flex items-center gap-2'>
                <TwitterIcon />
                <p className='text-black font-medium text-base overflow-hidden'>
                  X
                </p>
              </div>
            </button>
          </div>
          <div
            onClick={() => toggle()}
            className='cursor-pointer rounded-full py-[10px] text-base font-semibold text-[#62231A] text-center w-full bg-[#FCE6D5]'
          >
            {BOOKING.cancel}
          </div>
        </div>
      </DrawerBottom2>
      <div className='mt-[33px]'>
        <Footer />
      </div>
    </Fragment>
  );
};

export default ContainerNewsDetailMobile;
