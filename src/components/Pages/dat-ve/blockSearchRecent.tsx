import { IBookingTranslate } from "@/interfaces/IBookingTranslate";
import { IHomeTranslate } from "@/interfaces/IHomeTranslate";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const FAKE_SEARCH = [
  {
    title: "Tp.Hồ Chí Minh - Nha Trang",
    time: "12/05/2022",
  },
  {
    title: "Tp.Hồ Chí Minh - Nha Trang",
    time: "12/05/2022",
  },
  {
    title: "Tp.Hồ Chí Minh - Nha Trang",
    time: "12/05/2022",
  },
];

const BlockSearchRecent = ({
  BOOKING,
  HOME,
}: {
  BOOKING: IBookingTranslate;
  HOME: IHomeTranslate;
}) => {
  return (
    <div>
      <p className="text-black text-base font-semibold mb-4">
        {HOME.searchRecent}
      </p>

      <Swiper
        speed={1500}
        slidesPerView={1.7}
        slidesPerGroup={1}
        spaceBetween={8}
        className="mySwiper"
      >
        {FAKE_SEARCH.map((el, ind) => (
          <SwiperSlide key={ind}>
            <div className="w-full rounded-lg bg-[#EFEFF0] p-3">
              <p className="text-black text-sm font-medium">{el.title}</p>
              <p className="text-Subtle-1 font-medium text-xs">{el.time}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BlockSearchRecent;
