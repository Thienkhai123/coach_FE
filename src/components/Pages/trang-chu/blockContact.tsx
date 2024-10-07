import { IHomeTranslate } from "@/interfaces/IHomeTranslate";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import LocationIcon from "@/components/icons/location";
import PhoneIcon from "@/components/icons/phone";
import LocationNonFillIcon from "@/components/icons/location-none-fill";
import Button from "@/components/button";
import { Navigation } from "swiper/modules";
import ArrowLeftIcon from "@/components/icons/arrowLeft";
import { useEffect, useState } from "react";

interface IBlockContact {
  HOME: IHomeTranslate;
}

const FAKE_CONTACTS = [
  {
    title: "Trụ sở chính",
    address: "338 Trần Khát Chân, Hai Bà Trưng, HN",
    hotline: "Hotline: 0914.077.779 - 0963.388.388",
    line: "0914077779",
  },
  {
    title: "Vp Mỹ Đình",
    address: "Nhà 01 Ngõ 2 Đình Thôn, Mỹ Đình, HN",
    hotline: "Hotline: 0914.077.779 - 0963.388.388",
    line: "0914077779",
  },
  {
    title: "VP Đồng Hới",
    address: "19A Lý Thường Kiệt, Đồng Hới, Q.Bình",
    hotline: "Hotline: 0914.077.779 - 0963.388.388",
    line: "0914077779",
  },
  {
    title: "VP Ba Đồn",
    address: "23 Hùng Vương, Ba Đồn, Q.Bình",
    hotline: "Hotline: 0914.077.779 - 0963.388.388",
    line: "0914077779",
  },
  {
    title: "VP Lệ Thủy",
    address: "Ng Tất Thành, Kiến Giang, Lệ Thủy, QB",
    hotline: "Hotline: 0914.077.779 - 0963.388.388",
    line: "0914077779",
  },
  {
    title: "Vp Đồng Lê",
    address: "TK 02, TT Đồng Lê, Tuyên Hóa, QB",
    hotline: "Hotline: 0914.077.779 - 0963.388.388",
    line: "0914077779",
  },
  {
    title: "Vp Lệ Ninh",
    address: "Tổ DP 2, TT Lệ Ninh, Mỹ Đức- QB",
    hotline: "Hotline: 0914.077.779 - 0963.388.388",
    line: "0914077779",
  },
  {
    title: "Vp Phong Nha",
    address: "TDP Xuân Tiến, TT Phong Nha, Bố Trạch, Q.Bình",
    hotline: "Hotline: 0914.077.779 - 0963.388.388",
    line: "0914077779",
  },
  {
    title: "VP Sân Bay Nội Bài",
    address: "Sân Bay Nội Bài, Sóc Sơn, Hà Nội",
    hotline: "Hotline: 0914.077.779 - 0963.388.388",
    line: "0914077779",
  },
];

const BlockContact = ({ HOME }: IBlockContact) => {
  const [searchHistories, setHistories] = useState([]);

  useEffect(() => {
    const localHistories: any = localStorage.getItem("searchHistory");
    if (localHistories && localHistories?.length > 0) {
      setHistories(localHistories);
    }
  }, []);

  return (
    <div className={`${searchHistories?.length > 0 ? "sm:mt-20" : ""}`}>
      <div className="flex items-center justify-between mb-4 lg:mb-6">
        <p className="px-4 lg:px-0 text-black text-base lg:text-xl font-semibold ">
          {HOME.contact}
        </p>
        <div className="lg:flex hidden items-center gap-4">
          <div className="prev cursor-pointer">
            <ArrowLeftIcon />
          </div>
          <div className="next rotate-180 cursor-pointer">
            <ArrowLeftIcon />
          </div>
        </div>
      </div>

      <div className="ml-4 lg:ml-0 ">
        <Swiper
          // speed={1500}
          slidesPerView={1.7}
          slidesPerGroup={1}
          spaceBetween={8}
          className="mySwiper lg:!pb-2"
          modules={[Navigation]}
          navigation={{
            nextEl: ".next",
            prevEl: ".prev",
          }}
          breakpoints={{
            320: {
              slidesPerView: 1.7,
              slidesPerGroup: 1,
              spaceBetween: 8,
              speed: 1500,
            },

            1100: {
              slidesPerView: 3.9,
              slidesPerGroup: 3.9,
              spaceBetween: 8,
              speed: 600,
            },
          }}
        >
          {FAKE_CONTACTS.map((el, ind) => (
            <SwiperSlide
              key={ind}
              style={{
                height: "auto",
              }}
            >
              <div className="w-full h-full flex flex-col rounded-lg border border-l-neutral-grey-100 overflow-hidden bg-white shadow-[0px_5px_8px_-2px_rgba(0,0,0,0.05),0px_2px_4px_-2px_rgba(0,0,0,0.06)]">
                <div className="text-center p-2 border-b bg-[#0867A4] ">
                  <p className="text-white font-bold text-sm">{el?.title}</p>
                </div>
                <div className="p-2 flex-1">
                  <div className="flex gap-2">
                    <div className="">
                      <LocationNonFillIcon stroke="#0273BC" />
                    </div>
                    <p className="text-neutral-600 font-medium text-sm ">
                      {el?.address}
                    </p>
                  </div>

                  <div className="flex gap-2 ">
                    <div className="pt-1 pl-1">
                      <PhoneIcon fill="#0273BC" />
                    </div>
                    <p className="text-neutral-600 font-medium text-sm">
                      {el?.hotline}
                    </p>
                  </div>
                </div>

                <div className="text-center p-2 border-t">
                  <Button
                    type="link"
                    color="text-[#0867A4]"
                    href={`tel:${el.line}`}
                  >
                    {HOME.callNow}
                  </Button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BlockContact;
