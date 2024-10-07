import { IHomeTranslate } from "@/interfaces/IHomeTranslate";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ArrowLeftIcon from "@/components/icons/arrowLeft";
import Image from "next/legacy/image";
import Button from "@/components/button";

interface IBlockService {
  HOME: IHomeTranslate;
}

const FAKE_SERVICES = [
  {
    url: "/tin-tuc/bai-viet?slug=to-chuc-tour-du-lich",
    image: "/images/service1.png",
    title: "Tố chức tour du lịch",
    services: [
      "An toàn trên mọi lộ trình",
      "Giá thành hợp lý",
      "Phương tiện hiện đại, tiện nghi",
      "Tận tâm chăm sóc khách hàng.",
    ],
  },
  {
    url: "/tin-tuc/bai-viet?slug=van-chuyen-hang-hoa",
    image: "/images/service2.png",
    title: "Vận chuyển hàng hóa",
    services: [
      "Giao hàng an toàn & kịp thời.",
      "Dịch vụ tin cậy.",
      "Giao nhận tiện lợi.",
      "Hài lòng mọi khách hàng.",
    ],
  },
  {
    url: "/tin-tuc/bai-viet?slug=vc-khach-ghep-doan",
    image: "/images/service3.png",
    title: "VC khách ghép đoàn",
    services: [
      "Chi phí thấp hơn một tour riêng do chia sẽ được các chi phí cố định như xe vận chuyển, tàu thăm quan, hướng dẫn viên….",
    ],
  },
];

const RenderDot = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="3"
      height="3"
      viewBox="0 0 3 3"
      fill="none"
    >
      <circle cx="1.5" cy="1.5" r="1.5" fill="#101F24" />
    </svg>
  );
};

const BlockService = ({ HOME }: IBlockService) => {
  return (
    <div className="bg-primary-900 py-6 lg:py-0">
      <p className="px-4 text-black text-lg lg:text-xl lg:text-center font-semibold mb-4">
        {HOME.serviceUs}
      </p>

      <div className="ml-4 lg:ml-0 ">
        <Swiper
          speed={1500}
          slidesPerView={1.5}
          slidesPerGroup={1}
          spaceBetween={8}
          // autoHeight={true}
          breakpoints={{
            320: {
              slidesPerView: 1.5,
              slidesPerGroup: 1,
              spaceBetween: 8,
            },

            1100: {
              slidesPerView: 3,
              slidesPerGroup: 1,
              spaceBetween: 8,
            },
          }}
          className="mySwiper"
        >
          {FAKE_SERVICES.map((el, ind) => (
            <SwiperSlide
              key={`service-${ind}`}
              className="!h-auto !items-stretch"
            >
              <a href={el?.url}>
                <div className="w-full h-full  rounded-lg lg:rounded-2xl overflow-hidden flex flex-col justify-between bg-white">
                  <div>
                    <div className="w-full h-[120px] lg:h-[240px] relative rounded-tl-lg rounded-tr-lg lg:rounded-tl-2xl lg:rounded-tr-2xl">
                      <Image
                        alt={`service-image-${ind}`}
                        src={el?.image || ""}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <div className="p-3 lg:p-4 bg-white ">
                      {el?.services?.map((service, index) => (
                        <div
                          key={`service-${index}`}
                          className="flex items-center gap-1.5"
                        >
                          {el?.services?.length > 1 && (
                            <div>
                              <RenderDot />
                            </div>
                          )}
                          <p className="text-neutral-grey-700 font-medium text-sm">
                            {service}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="lg:hidden">
                      <Button
                        btnColor="bg-[#D6422E]"
                        Icon={
                          <div className="rotate-180">
                            <ArrowLeftIcon stroke="white" />
                          </div>
                        }
                      ></Button>
                    </div>
                    <div className="hidden lg:block">
                      <Button
                        btnColor="bg-[#D6422E]"
                        Icon={
                          <div className="rotate-180">
                            <ArrowLeftIcon stroke="white" />
                          </div>
                        }
                      >
                        {HOME.seeMore}
                      </Button>
                    </div>
                  </div>
                </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BlockService;
