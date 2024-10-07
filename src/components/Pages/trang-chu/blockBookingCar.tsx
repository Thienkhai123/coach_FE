import Image from "next/legacy/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

interface IBlockBookingCarProps {
	listBooking: string[];
}

const BlockBookingCar = (props: IBlockBookingCarProps) => {
	const { listBooking } = props;
	return (
		<Swiper
			speed={1200}
			// slidesPerView={1.1}
			// slidesPerGroup={1}
			// spaceBetween={8}
			centeredSlides={true}
			loop={true}
			autoplay={{
				delay: 2500,
				disableOnInteraction: false,
			}}
			breakpoints={{
				320: {
					slidesPerView: 1.1,
					slidesPerGroup: 1,
					spaceBetween: 8,
				},

				1100: {
					slidesPerView: 2.5,
					slidesPerGroup: 1,
					spaceBetween: 16,
				},
			}}
			className='mySwiper'
			modules={[Autoplay]}>
			{listBooking.map((booking, ind) => (
				<SwiperSlide key={`booking-car-${ind}`}>
					<div className='w-full h-[200px] rounded-lg relative'>
						<Image alt='' src={booking} layout='fill' />
					</div>
				</SwiperSlide>
			))}
		</Swiper>
	);
};

export default BlockBookingCar;
