import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "../../../app/custom.css";
import Image from "next/legacy/image";

const BannerSwiper = () => {
  const pagination = {
    clickable: true,
    renderBullet: function (index: number, className: string) {
      return '<span class="' + className + '"></span>';
    },
  };
  return (
    <div className="w-[1140px] mx-auto">
      <Swiper
        speed={2000}
        slidesPerView={3}
        slidesPerGroup={3}
        spaceBetween={12}
        pagination={pagination}
        modules={[Pagination]}
        className="mySwiper"
      >
        {[...Array(9)].map((el, ind) => (
          <SwiperSlide key={ind}>
            <div className="h-[250px] w-full">
              <div className="h-[200px] relative rounded-xl overflow-hidden">
                <Image
                  alt=""
                  src={"/images/slide.jpg"}
                  layout="fill"
                  quality={100}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerSwiper;
