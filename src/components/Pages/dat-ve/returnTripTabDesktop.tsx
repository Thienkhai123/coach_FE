import { IBookingTranslate } from "@/interfaces/IBookingTranslate";
import TripItem from "./tripItem";
import { ITripData } from "@/interfaces/httpRequest/ITrip";
import moment from "moment";
import { useEffect, useState } from "react";
import { ICityResponse } from "@/interfaces/httpRequest/ICity";
import "moment/locale/vi";
import TripItemDesktop from "./tripItemDesktop";

interface IReturnTripTabDesktopProps {
	tab: number;
	departureDate: string;
	returnDate: string;
	handleChangeTab: Function;
	BOOKING: IBookingTranslate;
}

const ReturnTripTabDesktop = ({
	tab,
	handleChangeTab = () => {},
	BOOKING,
	departureDate,
	returnDate,
}: IReturnTripTabDesktopProps) => {
	const tabList = [
		{
			id: 1,
			title: BOOKING.departure,
			date: departureDate || "",
		},
		{
			id: 2,
			title: BOOKING.return,
			date: returnDate || "",
		},
	];

	return (
		<div>
			<div className='flex flex-col gap-1 mb-4'>
				<div className=' w-full bg-white grid grid-cols-2'>
					{tabList?.map((item, index) => {
						return (
							<div
								key={index}
								onClick={() =>
									handleChangeTab({
										tabId: item.id,
										date: item.date,
									})
								}
								className={`flex items-center justify-center py-3 border-b-2 cursor-pointer ${
									tab === item.id
										? "border-primary-500"
										: "border-transparent"
								}`}>
								<div className='flex items-center gap-1'>
									<p
										className={`first-letter:uppercase text-sm leading-[21px] font-bold  ${
											tab === item.id
												? "text-primary-500"
												: "text-neutral-grey-600"
										}`}>
										{item?.title}:
									</p>

									<p
										className={`first-letter:uppercase text-sm leading-[21px] font-semibold  ${
											tab === item.id
												? "text-primary-500"
												: "text-neutral-grey-600"
										}`}>
										{moment(item?.date)
											.locale("vi")
											.format("dddd, DD/MM/YYYY")}
									</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default ReturnTripTabDesktop;
