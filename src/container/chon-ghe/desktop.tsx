import SelectChair from "@/components/chooseChair";
import { IBookingTranslate } from "@/interfaces/IBookingTranslate";
import { IDemoTranslate } from "@/interfaces/IDemoTranslate";
import { ISeat, ISeatSetup } from "@/interfaces/httpRequest/ITrip";
import React, { useState } from "react";

interface IContainerChooseChairDesktopprops {
	BOOKING: IBookingTranslate;
	handleSelectSeat: Function;
	seatSelected: any[];
	seatData: ISeatSetup;
	listSeatNotAvailable: string[];
}

const ContainerChooseChairDesktop = (
	props: IContainerChooseChairDesktopprops,
) => {
	const {
		BOOKING,
		handleSelectSeat = () => {},
		seatSelected = [],
		seatData,
		listSeatNotAvailable,
	} = props;

	const deckNumbers = Array.from(
		new Set(seatData.seats.map((seat) => seat.deckNumber)),
	);

	return (
		<div className='border rounded-lg border-neutral-grey-200 px-2 py-3'>
			<div
				className={`grid grid-cols-${deckNumbers.length} h-6 items-center`}>
				{deckNumbers?.map((deck, index) => {
					return (
						<div
							key={index}
							className='text-center text-base font-normal'>
							{deck === 1 ? BOOKING.downStairs : BOOKING.upStairs}
						</div>
					);
				})}
			</div>

			<SelectChair
				seatData={seatData}
				listSeatNotAvailable={listSeatNotAvailable}
				seatSelecteds={seatSelected}
				handleSelectSeat={handleSelectSeat}
			/>
		</div>
	);
};

export default ContainerChooseChairDesktop;
