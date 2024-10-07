import BlockBookingCar from "@/components/Pages/trang-chu/blockBookingCar";
import BlockContact from "@/components/Pages/trang-chu/blockContact";
import BlockNews from "@/components/Pages/trang-chu/blockNews";
import BlockService from "@/components/Pages/trang-chu/blockService";
import FormBookingSearch, { OptionT } from "@/components/booking-search";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { IHomeTranslate } from "@/interfaces/IHomeTranslate";
import { ICityResponse } from "@/interfaces/httpRequest/ICity";
import { IUserProfile } from "@/interfaces/httpRequest/IUser";
import moment from "moment";
import Image from "next/legacy/image";
import { useEffect, useState } from "react";
import "moment/locale/vi";
import { Iplaces } from "@/interfaces/httpRequest/IPlaces";

const FAKE_BOOKING_CARS = [
  "/images/booking-car.png",
  "/images/booking-car.png",
  "/images/booking-car.png",
  "/images/booking-car.png",
  "/images/booking-car.png",
  "/images/booking-car.png",
  "/images/booking-car.png",
];

const ContainerHomePageDesktop = ({
  HOME,
  city,
  places,
  userProfile,
  host_News,
}: {
  HOME: IHomeTranslate;
  city?: ICityResponse;
  places?: Iplaces;
  userProfile?: IUserProfile;
  host_News?: any;
}) => {
  const [customHostNews, setCustomHostNews] = useState<any>([]);

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
        createAt: moment(element?.createAt || new Date())
          .locale("vi")
          .format("dddd, DD/MM/YYYY"),
        customUrl: element?.customUrl,
        isMain: ind === 0,
      };
      news.push(new_Item);
    });
    setCustomHostNews(news);
  }, [host_News]);

  return (
    <div>
      <div>
        <Header userProfile={userProfile} />
      </div>
      <div className="relative w-full  select-none  h-0 pt-[30.53%]">
        <Image
          src={"/images/banner_hunglong.jpg"}
          alt=""
          layout="fill"
          objectFit="cover"
          // width={1728}
          // height={528}
          quality={100}
        />
      </div>
      <div className="relative h-[110px] bg-primary-1000">
        <div className="w-full  h-full flex  bg-primary-1000 absolute -top-[96px] rounded-t-[20px]">
          <div className="relative max-w-[1120px] mx-auto w-full">
            <FormBookingSearch HOME={HOME} city={city} places={places} />
          </div>
        </div>
      </div>
      {/* content ở đây */}
      <div className="bg-primary-1000">
        <div className=" ">
          {/* <div className='bg-primary-1000 pt-[60px]'>
            <div className='max-w-[1120px] mx-auto'>
              <BlockBookingCar listBooking={FAKE_BOOKING_CARS} />
            </div>
          </div> */}
          <div className="bg-primary-1000 pb-[60px]">
            <div className="max-w-[1120px] mx-auto">
              <BlockContact HOME={HOME} />
            </div>
          </div>
          <div className="bg-primary-900 py-[60px]">
            <div className="max-w-[1120px] mx-auto lg:px-4">
              <BlockService HOME={HOME} />
            </div>
          </div>
          <div className="bg-primary-1000 py-[60px]">
            <div className="max-w-[1120px] mx-auto ">
              <BlockNews
                HOME={HOME}
                data={customHostNews}
                handleChooseNews={handleChooseNews}
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default ContainerHomePageDesktop;
