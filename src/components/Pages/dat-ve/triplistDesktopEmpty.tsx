import Button from "@/components/button";
import { IBookingTranslate } from "@/interfaces/IBookingTranslate";
import Image from "next/legacy/image";
import React from "react";

interface ITripListDesktopEmptyProps {
	BOOKING: IBookingTranslate;
}

const TripListDesktopEmpty = (props: ITripListDesktopEmptyProps) => {
	const { BOOKING } = props;
	return (
		<div className=''>
			<div className='bg-white p-6 rounded-xl flex flex-col gap-4 justify-center items-center'>
				<div className='relative w-[200px] h-[200px]'>
					<Image
						alt=''
						src='/images/empty-trip-desktop.png'
						layout='fill'
						quality={100}
					/>
				</div>
				<div className='flex flex-col gap-0.5 items-center'>
					<p className='text-center text-base font-semibold text-neutral-grey-700'>
						{BOOKING.resultNotFound}
					</p>
					<p className='text-center text-sm font-medium text-neutral-grey-600'>
						{BOOKING.pleaseChangeTrip}
					</p>
				</div>
			</div>
		</div>
	);
};

export default TripListDesktopEmpty;
