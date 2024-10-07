import { IBookingTranslate } from "@/interfaces/IBookingTranslate";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Voucher from "./voucher";
import { VoucherData } from "@/interfaces/httpRequest/IVoucher";

interface IBlockVoucherProps {
  btnTitle?: string;
  BOOKING: IBookingTranslate;
  points: number;
  vouchers: VoucherData[];
  selectedId: number;
  handleUpdateModalContent: (arg: any) => void;
  showcontent?: boolean;
  wrapperClassName?: string;
  seeAll: () => void;
  slidesPerView?: number;
  type?: number;
}

const BlockVoucher = (props: IBlockVoucherProps) => {
  const {
    BOOKING,
    vouchers,
    points,
    handleUpdateModalContent,
    selectedId,
    showcontent = true,
    btnTitle,
    wrapperClassName = "py-4",
    seeAll,
    slidesPerView = 1.3,
    type = 1,
  } = props;

  return (
    <div className={wrapperClassName}>
      {showcontent && (
        <>
          <div className="flex items-center gap-4 justify-between px-4">
            <div className="bg-semantic-green-light py-1 px-2 rounded-full w-fit mb-2">
              {type === 1 && (
                <p className="text-neutral-grey-600 font-extrabold text-xs">
                  {BOOKING.exchangePoints}
                </p>
              )}
              {type === 2 && (
                <p className="text-neutral-grey-600 font-extrabold text-xs">
                  {BOOKING.exchangePoints2}
                </p>
              )}
              {type === 3 && (
                <p className="text-neutral-grey-600 font-extrabold text-xs">
                  {BOOKING.exchangePoints3}
                </p>
              )}
            </div>
            <div onClick={seeAll}>
              <p className="text-neutral-grey-700 text-sm font-semibold underline">
                {BOOKING.seeAll}
              </p>
            </div>
          </div>
          <p className="px-4 mt-2 text-neutral-grey-600 text-sm font-medium">
            {BOOKING.yourPoints}{" "}
            <span className="text-semantic-red font-bold">
              {points} {BOOKING.score}
            </span>
          </p>
        </>
      )}

      <div className="ml-3">
        <Swiper
          speed={1500}
          slidesPerView={slidesPerView}
          slidesPerGroup={1}
          spaceBetween={8}
          className="mySwiper"
        >
          {vouchers.map((voucher, ind) => (
            <SwiperSlide key={ind} className="mt-5">
              <Voucher
                BOOKING={BOOKING}
                voucher={voucher}
                isExchange={selectedId === voucher?.voucherId}
                disabled={
                  points < voucher?.pointExchange &&
                  selectedId !== voucher?.voucherId
                }
                handleSelectVoucher={handleUpdateModalContent}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BlockVoucher;
