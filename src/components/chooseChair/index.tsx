import React, { FC, Fragment } from "react";
import Chair from "../chair";
import { ISeat, ISeatSetup } from "@/interfaces/httpRequest/ITrip";

interface ISeatData {
	seatData: ISeatSetup;
	seatSelecteds: ISeat[];
	handleSelectSeat: Function;
	listSeatNotAvailable: string[];
	isReturnTrip?: boolean;
}

const SelectChair: FC<ISeatData> = (props) => {
	const {
		seatData,
		seatSelecteds,
		handleSelectSeat = () => {},
		listSeatNotAvailable,
		isReturnTrip = false,
	} = props;
	const { seats, firstRowSeats, lastRowSeats, seatPerRow } = seatData || {};
	const renderSeats = (deckNumber: number) => {
		const deckSeats = seats.filter(
			(seat) => seat.deckNumber === deckNumber,
		);

		let rows: ISeat[][] = [];
		let currentRow: ISeat[] = [];
		let seatsInCurrentRow = firstRowSeats;

		for (let i = 0; i < deckSeats.length; i++) {
			currentRow.push(deckSeats[i]);

			let nextRowSeats = seatPerRow;
			if (i + 1 === deckSeats.length - lastRowSeats) {
				nextRowSeats = lastRowSeats;
			}

			if (currentRow.length === seatsInCurrentRow) {
				rows.push(currentRow);
				currentRow = [];
				seatsInCurrentRow = nextRowSeats;
			}
		}

		if (currentRow.length > 0) {
			rows.push(currentRow);
		}

		return rows.map((row, rowIndex) => (
			<div
				key={rowIndex}
				className={`grid grid-cols-${row.length} ${
					isReturnTrip && row.length > 2 ? "gap-1" : "gap-4"
				}`}>
				{row.map((elm, ind) => {
					const { seatName } = elm;
					const chairSelected = seatSelecteds.includes(elm);
					return (
						<Fragment key={ind}>
							{listSeatNotAvailable.includes(seatName) ? (
								<div className='cursor-default'>
									<Chair
										numberChair={elm.seatName}
										fill='#D9D9D9'
										stroke='#D9D9D9'
									/>
								</div>
							) : (
								<Fragment key={ind}>
									{!chairSelected && (
										<div
											className='cursor-pointer'
											onClick={() =>
												handleSelectSeat(elm)
											}>
											<Chair
												numberChair={seatName}
												fill='#FCE6D5'
												stroke='#F6CDB5'
											/>
										</div>
									)}
									{chairSelected && (
										<div
											className='cursor-pointer'
											onClick={() =>
												handleSelectSeat(elm)
											}>
											<Chair
												numberChair={seatName}
												fill='#DF5030'
												stroke='#DF5030'
												colorText='white'
											/>
										</div>
									)}
								</Fragment>
							)}
						</Fragment>
					);
				})}
			</div>
		));
	};
	const deckNumbers = Array.from(
		new Set(seats.map((seat) => seat.deckNumber)),
	);
	return (
		<div
			className={`mt-4 flex justify-center  ${
				isReturnTrip && lastRowSeats > 2 ? "gap-[20px]" : "gap-[60px]"
			}`}>
			{deckNumbers?.map((deck, index) => {
				return (
					<div
						key={index}
						className={` flex flex-col gap-4 ${
							isReturnTrip &&
							(lastRowSeats > 2 || firstRowSeats > 2)
								? "flex-grow"
								: ""
						}`}>
						{renderSeats(deck)}
					</div>
				);
			})}
		</div>
	);
};

export default SelectChair;
