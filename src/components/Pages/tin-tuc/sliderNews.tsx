import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import "swiper/css";
import Image from "next/legacy/image";
import "@/app/custom.css";
import ArrowRightIcon from "@/components/icons/arrowRight";

type NewsT = {
  id: number;
  customUrl: string;
  image: string;
  title: string;
  createAt: string;
  description: string;
};

interface ISliderNewsProps {
  listNews: NewsT[];
  readmoretext: string;
}

const SliderNews = (props: ISliderNewsProps) => {
  const { listNews, readmoretext } = props;

  const handleChooseNews = (id: any, customUrl?: any) => {
    if (customUrl) {
      window.location.assign(`/tin-tuc/bai-viet?slug=${customUrl}`);
    } else {
      if (id) {
        window.location.assign(`/tin-tuc/bai-viet?slug=${id}`);
      }
    }
  };

  return (
    <div>
      <Swiper
        speed={1000}
        slidesPerView={1}
        slidesPerGroup={1}
        pagination={true}
        spaceBetween={20}
        modules={[Pagination]}
        className="mySwiper"
      >
        {listNews?.map((news, ind) => {
          const { title, createAt, image, description, id, customUrl } = news;
          return (
            <SwiperSlide key={ind}>
              <div className="h-[336px] w-full">
                <div className="h-[175px] relative rounded-xl overflow-hidden">
                  <Image alt="" src={image} layout="fill" quality={100} />
                </div>
                <div className="mt-1">
                  <p className="text-black font-semibold text-sm line-clamp-2	text-left">
                    {title}
                  </p>
                  <p className="text-neutral-grey-600 font-medium text-sm line-clamp-2 text-left">
                    {description}
                  </p>
                  <div className="flex justify-between gap-2 items-center">
                    <p className="text-[#61646B] font-medium text-xs">
                      {createAt}
                    </p>
                    <div
                      className="flex items-center gap-1 mt-1"
                      onClick={() => handleChooseNews(id, customUrl)}
                    >
                      <p className="text-[#0477B8] font-semibold text-sm">
                        {readmoretext}
                      </p>
                      <ArrowRightIcon />
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default SliderNews;
