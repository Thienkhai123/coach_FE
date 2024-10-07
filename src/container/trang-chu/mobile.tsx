import BlockBookingCar from "@/components/Pages/trang-chu/blockBookingCar";
import BlockContact from "@/components/Pages/trang-chu/blockContact";
import BlockNews from "@/components/Pages/trang-chu/blockNews";
import BlockService from "@/components/Pages/trang-chu/blockService";
import SearchRecentList from "@/components/Pages/trang-chu/searchRecent";
import Footer from "@/components/footer";
import FormBookingSeat from "@/components/form/booking-seat";
import Header from "@/components/header";
import { IBookingTranslate } from "@/interfaces/IBookingTranslate";
import { IHomeTranslate } from "@/interfaces/IHomeTranslate";
import { ICityResponse } from "@/interfaces/httpRequest/ICity";
import { Iplaces } from "@/interfaces/httpRequest/IPlaces";
import { IUserProfile } from "@/interfaces/httpRequest/IUser";
import moment from "moment";
import { useEffect, useState } from "react";

const FAKE_SEARCH = [
  {
    from: "TP. Hồ Chí Minh",
    to: "TP. Nha Trang",
    date: "12/05/2022",
  },
  {
    from: "TP. Hồ Chí Minh",
    to: "TP. Nha Trang",
    date: "12/05/2022",
  },
  {
    from: "TP. Hồ Chí Minh",
    to: "TP. Nha Trang",
    date: "12/05/2022",
  },
];

const FAKE_BOOKING_CARS = [
  "/images/booking-car.png",
  "/images/booking-car.png",
  "/images/booking-car.png",
  "/images/booking-car.png",
  "/images/booking-car.png",
  "/images/booking-car.png",
  "/images/booking-car.png",
];

const ContainerHomePageMobile = ({
  HOME,
  BOOKING,
  city,
  userProfile,
  host_News,
  places = [],
}: {
  HOME: IHomeTranslate;
  BOOKING: IBookingTranslate;
  city?: ICityResponse;
  userProfile?: IUserProfile;
  host_News?: any;
  places?: Iplaces;
}) => {
  const [customHostNews, setCustomHostNews] = useState<any>([]);

  const handleSubmit = (params: string) => {
    window.location.assign("/dat-ve?" + params);
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
    host_News?.slice(0, 5)?.forEach((element: any, ind: number) => {
      const new_Item = {
        id: element?.blogId,
        imageUrl: element?.imageUrl,
        title: element?.title,
        description: element?.shortDescription,
        enumBlogStatusDisplay: element?.enumBlogStatusDisplay,
        views: element?.numberOfViews,
        createAt: moment(element?.createAt || new Date()).format(
          "dddd, DD/MM/YYYY"
        ),
        customUrl: element?.customUrl,
        isMain: ind === 0,
      };
      news.push(new_Item);
    });
    setCustomHostNews(news);
  }, [host_News]);

  return (
    <>
      <div className="pb-10">
        <div>
          <div className="w-full h-[282px] bg-header-mobile bg-no-repeat bg-cover">
            <div className="w-full h-[282px] bg-black/30">
              <Header userProfile={userProfile} />
            </div>
          </div>
          <div className="-mt-20 mx-4 relative">
            <FormBookingSeat
              HOME={HOME}
              BOOKING={BOOKING}
              handleActionOnSubmit={handleSubmit}
              city={city}
              places={places}
            />
          </div>
        </div>
        <div className="flex flex-col gap-6 mt-6">
          <div className="ml-4">
            <p className="text-black font-medium text-sm mb-2">
              {HOME.searchRecent}
            </p>
            <SearchRecentList
              listSearchRecent={FAKE_SEARCH}
              city={city}
              HOME={HOME}
              places={places}
            />
          </div>
          {/* <div>
            <BlockBookingCar listBooking={FAKE_BOOKING_CARS} />
          </div> */}
          <BlockContact HOME={HOME} />
          <BlockService HOME={HOME} />
          <BlockNews
            HOME={HOME}
            data={customHostNews}
            handleChooseNews={handleChooseNews}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContainerHomePageMobile;
