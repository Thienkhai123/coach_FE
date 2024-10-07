"use client";
import { fetchCity, fetchPlaces } from "@/apis/trip";
import ContainerHomePageDesktop from "@/container/trang-chu/desktop";
import ContainerHomePageMobile from "@/container/trang-chu/mobile";
import useTrans from "@/hook/useTrans";
import { ICityResponse } from "@/interfaces/httpRequest/ICity";
import { IUserProfile } from "@/interfaces/httpRequest/IUser";
import { IBookingTranslate } from "@/interfaces/IBookingTranslate";
import { IHomeTranslate } from "@/interfaces/IHomeTranslate";
import withCommon from "@/layout/withCommon";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import { fetchHostNews } from "@/apis/news";
import "./globals.css";
import { Iplaces } from "@/interfaces/httpRequest/IPlaces";
import LoadingView from "@/components/LoadingView";

interface IHomePageProps {
  userProfile: IUserProfile;
}

const HomePage = ({ userProfile }: IHomePageProps) => {
  const {
    HOME,
    BOOKING,
  }: { HOME: IHomeTranslate; BOOKING: IBookingTranslate } = useTrans();

  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState<ICityResponse>();
  const [places, setPlaces] = useState<Iplaces>();
  const [host_News, setHot_News] = useState<any>([]);

  const getHostNews = async () => {
    setLoading(true);
    const res = await fetchHostNews();
    setHot_News(res?.data);
    setLoading(false);
  };

  const getCity = async () => {
    setLoading(true);
    const params = {
      pageSize: 100,
    };
    const res: ICityResponse = await fetchCity(params);
    setCity(res);
    setLoading(false);
  };

  // const getPlaces = async () => {
  //   setLoading(true);
  //   const res: Iplaces = await fetchPlaces({ keyword: "" });
  //   setPlaces(res);
  //   setLoading(false);
  // };

  useEffect(() => {
    getCity();
    // getPlaces();
    getHostNews();
  }, []);

  return (
    <main className="min-h-[100vh] relative flex flex-col">
      {loading && <LoadingView />}
      <div className="flex-1">
        <div className="lg:block hidden">
          <ContainerHomePageDesktop
            HOME={HOME}
            host_News={host_News}
            city={city}
            userProfile={userProfile}
            places={places}
          />
        </div>

        <div className="lg:hidden">
          <ContainerHomePageMobile
            HOME={HOME}
            BOOKING={BOOKING}
            city={city}
            host_News={host_News}
            userProfile={userProfile}
            places={places}
          />
        </div>
      </div>
    </main>
  );
};

export default withCommon(HomePage);
