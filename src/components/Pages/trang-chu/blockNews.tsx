import { IHomeTranslate } from '@/interfaces/IHomeTranslate';
import NewsItem from './newItem';
import MainNews from './mainNews';
import Button from '@/components/button';

interface IBlockNews {
  HOME: IHomeTranslate;
  data: any[];
  handleChooseNews: (id: any, customUrl?: any) => void;
}

const FAKE_NEWS = [
  {
    imageUrl: '/images/main-new-demo.png',
    title: 'Khám phá 22 hang động kỳ vĩ mới được phát hiện tại Quảng Bình',
    description:
      'Lorem ipsum dolor sit amet consectetur. Ultricies porta at sed sagittis. Lorem ipsum dolor sit amet...',
    createAt: 'Thứ 3, 05/05/2024',
    views: 131,
    isMain: true,
  },
  {
    imageUrl: '/images/news-demo.png',
    title: 'Giải nhiệt mùa hè',
    description:
      'Lorem ipsum dolor sit amet consectetur. Ultricies porta at sed sagittis. Lorem ipsum dolor sit amet...',
    createAt: 'Thứ bảy, 20/04/2024',
    views: 131,
    comments: 0,
    isMain: false,
  },
  {
    imageUrl: '/images/news-demo.png',
    title: 'Tiêu đề bài viết',
    description:
      'Lorem ipsum dolor sit amet consectetur. Ultricies porta at sed sagittis. Lorem ipsum dolor sit amet...',
    createAt: 'Thứ 3, 05/05/2024',
    views: 131,
    isMain: false,
  },
  {
    imageUrl: '/images/news-demo.png',
    title: 'Tiêu đề bài viết',
    description:
      'Lorem ipsum dolor sit amet consectetur. Ultricies porta at sed sagittis. Lorem ipsum dolor sit amet...',
    createAt: 'Thứ 3, 05/05/2024',
    views: 131,
    isMain: false,
  },
  {
    imageUrl: '/images/news-demo.png',
    title: 'Tiêu đề bài viết',
    description:
      'Lorem ipsum dolor sit amet consectetur. Ultricies porta at sed sagittis. Lorem ipsum dolor sit amet...',
    createAt: 'Thứ 3, 05/05/2024',
    views: 131,
    isMain: false,
  },
];

const BlockNews = ({
  HOME,
  data = FAKE_NEWS,
  handleChooseNews,
}: IBlockNews) => {
  return (
    <div className='px-4 lg:px-0'>
      <div className=' flex items-center justify-between'>
        <p className='text-black text-lg lg:text-xl font-semibold mb-4 '>
          {HOME.news}
        </p>
        <div className='lg:block hidden w-fit '>
          <Button
            onClick={() => {
              window.location.assign('/tin-tuc');
            }}
            width='w-[120px]'
            btnColor='bg-secondary-300'
            borderColor='border-secondary-300'
          >
            {HOME.seeAll}
          </Button>
        </div>
      </div>

      <div className='lg:hidden flex flex-col gap-4'>
        {data?.map((news: any, index: number) => {
          if (!news?.isMain) {
            return (
              <NewsItem
                key={`news-${index}`}
                {...news}
                seenTitle={HOME.seen}
                handleChooseNews={handleChooseNews}
              />
            );
          } else {
            return (
              <MainNews
                key={`news-${index}`}
                handleChooseNews={handleChooseNews}
                {...news}
                readPostText={HOME.readPost}
              />
            );
          }
        })}
      </div>
      <div className='hidden lg:flex flex-row gap-[60px]  mt-6'>
        <div className='w-[600px] shrink-0'>
          {data?.map((news, index) => {
            if (news?.isMain) {
              return (
                <MainNews
                  key={`news-${index}`}
                  {...news}
                  readPostText={HOME.readPost}
                  handleChooseNews={handleChooseNews}
                />
              );
            }
          })}
        </div>
        <div>
          {data?.map((news, index) => {
            if (!news?.isMain) {
              return (
                <NewsItem
                  key={`news-${index}`}
                  {...news}
                  handleChooseNews={handleChooseNews}
                  seenTitle={HOME.seen}
                />
              );
            }
          })}
        </div>
      </div>

      <div className='lg:hidden mt-5 w-fit mx-auto'>
        <Button
          width='w-[120px]'
          onClick={() => {
            window.location.assign('/tin-tuc');
          }}
        >
          {HOME.seeAll}
        </Button>
      </div>
    </div>
  );
};

export default BlockNews;
