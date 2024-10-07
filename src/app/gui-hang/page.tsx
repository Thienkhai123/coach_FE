"use client";
import { fetchCity } from "@/apis/trip";
import ContainerTransportDesktop from "@/container/gui-hang/desktop";
import ContainerTransportMobile from "@/container/gui-hang/mobile";
import useTrans from "@/hook/useTrans";
import { ICityResponse } from "@/interfaces/httpRequest/ICity";
import { IUserProfile } from "@/interfaces/httpRequest/IUser";
import { ITranslation } from "@/interfaces/ITranslation";
import withCommon from "@/layout/withCommon";
import { useEffect, useState } from "react";
import "../globals.css";
import { PackageOutside } from "@/interfaces/httpRequest/IOrder";
import { getPackageTypes } from "@/apis/order";

interface ITransportPageProps {
  userProfile: IUserProfile;
}

const TransportPage = ({ userProfile }: ITransportPageProps) => {
  const translation: ITranslation = useTrans();

  const [city, setCity] = useState<ICityResponse>();
  const [typePack, setTypePack] = useState<PackageOutside>();

  const getCity = async () => {
    const params = {
      pageSize: 100,
    };
    const res: ICityResponse = await fetchCity(params);
    setCity(res);
  };

  const getPackagesType = async () => {
    const res: PackageOutside = await getPackageTypes();
    setTypePack(res);
  };

  useEffect(() => {
    getCity();
    getPackagesType();
  }, []);

  return (
    <main className="min-h-[100vh] relative flex flex-col">
      <div className="flex-1 bg-neutral-grey-100">
        <div className="lg:block hidden">
          <ContainerTransportDesktop
            CREATEORDER={translation.CREATEORDER}
            city={city}
            userProfile={userProfile}
            typePack={typePack}
          />
        </div>

        <div className="lg:hidden">
          <ContainerTransportMobile
            translation={translation}
            city={city}
            typePack={typePack}
          />
        </div>
      </div>
    </main>
  );
};

export default withCommon(TransportPage);
