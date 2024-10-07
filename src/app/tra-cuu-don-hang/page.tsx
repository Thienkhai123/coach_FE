'use client';
import Footer from '@/components/footer';
import Header from '@/components/header';
import ContainerSearchDesktop from '@/container/tra-cuu-don-hang/desktop';
import ContainerSearchMobile from '@/container/tra-cuu-don-hang/mobile';
import useTrans from '@/hook/useTrans';
import { IUserProfile } from '@/interfaces/httpRequest/IUser';
import { ITranslation } from '@/interfaces/ITranslation';
import withCommon from '@/layout/withCommon';
import '../globals.css';

interface ISearchingPage {
  userProfile: IUserProfile;
}

const SearchingPage = ({ userProfile }: ISearchingPage) => {
  const translation: ITranslation = useTrans();

  return (
    <main className='min-h-[100vh] relative flex flex-col'>
      <div className='flex-1'>
        <Header
          userProfile={userProfile}
          backgroundColorMobile='linear-gradient(90.4deg, #DF5030 -0.55%, #BE3C2A 72.71%)'
          hasBackground
        />
        <div className='lg:block hidden'>
          <ContainerSearchDesktop translation={translation} />
        </div>

        <div className='lg:hidden'>
          <ContainerSearchMobile translation={translation} />
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </main>
  );
};

export default withCommon(SearchingPage);
