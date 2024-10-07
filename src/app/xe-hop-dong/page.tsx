'use client';
import { fetchCity } from '@/apis/trip';
import Footer from '@/components/footer';
import Header from '@/components/header';
import ContainerContractVehicleDesktop from '@/container/xe-hop-dong/desktop';
import ContainerContractVehicleMobile from '@/container/xe-hop-dong/mobile';
import useTrans from '@/hook/useTrans';
import { ICityResponse } from '@/interfaces/httpRequest/ICity';
import { IUserProfile } from '@/interfaces/httpRequest/IUser';
import { ITranslation } from '@/interfaces/ITranslation';
import withCommon from '@/layout/withCommon';
import { useEffect, useState } from 'react';
import '../globals.css';

interface IContractVehiclePage {
  userProfile: IUserProfile;
}

const ContractVehiclePage = ({ userProfile }: IContractVehiclePage) => {
  const translation: ITranslation = useTrans();

  const [city, setCity] = useState<ICityResponse>();

  const getCity = async () => {
    const params = {
      pageSize: 100,
    };
    const res: ICityResponse = await fetchCity(params);
    setCity(res);
  };

  useEffect(() => {
    getCity();
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
          <ContainerContractVehicleDesktop
            translation={translation}
            city={city}
          />
        </div>

        <div className='lg:hidden'>
          <ContainerContractVehicleMobile
            userProfile={userProfile}
            translation={translation}
            city={city}
          />
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </main>
  );
};

export default withCommon(ContractVehiclePage);
