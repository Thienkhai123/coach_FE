import { IBookingTranslate } from "@/interfaces/IBookingTranslate";
import TripItem from "./tripItem";
import CancelIcon from "@/components/icons/cancel";
import Button from "@/components/button";
import CheckIcon from "@/components/icons/check";
import { Fragment } from "react";
import { OptionT } from "@/components/booking-search";

interface IFilterDesktopProps {
	BOOKING: IBookingTranslate;
	register: any;
	resetFilter: Function;
	timeStartSelected: any[];
	carTypeSelected: any[];
	floorsSelected: any[];
	pricesSelected: any[];
	vehicleTypesList?: OptionT[];
	timeSlotsList?: any[];
	priceRangesList?: any[];
}
const TIMES = [
	{
		id: 1,
		value: "Sáng sớm 00:00 - 06:00 (0)",
	},
	{
		id: 2,
		value: "Buổi sáng 06:00 - 12:00 (2)",
	},
	{
		id: 3,
		value: "Buổi chiều 12:00 - 18:00 (3)",
	},
	{
		id: 4,
		value: "Buổi tối 18:00 - 24:00 (1)",
	},
];
const CAR_TYPES = [
	{
		id: 1,
		value: "Giường nằm 40",
	},
	{
		id: 2,
		value: "Luxury",
	},
	{
		id: 3,
		value: "Giường nằm truyền thống",
	},
	{
		id: 4,
		value: "Limousine",
	},
];
const FLOORS = [
	{
		id: 1,
		value: "Tầng trên",
	},
	{
		id: 2,
		value: "Tầng dưới",
	},
];
const PRICES = [
	{
		id: 1,
		value: "Dưới 300.000đ",
	},
	{
		id: 2,
		value: "300.000đ-500.000đ",
	},
	{
		id: 3,
		value: "Trên 500.000đ",
	},
];
const FilterDesktop = ({
	BOOKING,
	register,
	vehicleTypesList = [],
	resetFilter = () => {},
	timeStartSelected = [],
	carTypeSelected = [],
	floorsSelected = [],
	pricesSelected = [],
	timeSlotsList = [],
	priceRangesList = [],
}: IFilterDesktopProps) => {
	return (
		<div className='w-full  bg-white h-fit pb-4 rounded-lg'>
			<div className='p-4 flex items-center justify-between border-b border-neutral-grey-200'>
				<p className='text-base  font-semibold'>{BOOKING.filter}</p>
				<div className='flex items-center gap-2 '>
					{/* <CancelIcon />
					<p className='text-sm font-semibold'>
						{BOOKING.clearFilter}
					</p> */}
					<button
						onClick={() => resetFilter()}
						className='group p-0 text-semantic-red flex items-center gap-2 disabled:text-neutral-grey-300'
						disabled={
							timeStartSelected.length === 0 &&
							carTypeSelected.length === 0 &&
							floorsSelected.length === 0 &&
							pricesSelected.length === 0
						}>
						<div className='group-disabled:hidden group-enabled:block'>
							<CancelIcon width='12' height='12' fill='#E61C1C' />
						</div>
						<div className='group-enabled:hidden group-disabled:block'>
							<CancelIcon width='12' height='12' fill='#C0C0C0' />
						</div>
						<p className='font-semibold text-sm'>
							{BOOKING.clearFilter}
						</p>
					</button>
				</div>
			</div>
			<div className='mt-2 '>
				<div className='py-2 border-b border-neutral-grey-100'>
					<p className='text-sm font-bold px-4'>
						{BOOKING.timeStart}
					</p>
					<div className='mt-2 flex flex-col gap-1'>
						{timeSlotsList.map((time, index) => {
							return (
								<label key={index} className='group '>
									<div className='flex items-center gap-3 py-[6px] px-4 cursor-pointer hover:bg-secondary-600 transition-all'>
										<div className=' relative w-fit h-fit'>
											<input
												type='checkbox'
												value={time.id}
												{...register("timeStart")}
												className='appearance-none block w-5 h-5 accent-button bg-white border peer checked:bg-secondary-300 border-neutral-500 checked:border-none rounded'
											/>
											<div className='absolute top-0 w-full h-full flex items-center justify-center  opacity-0 peer-checked:opacity-100'>
												<CheckIcon />
											</div>
										</div>
										<p className='text-sm font-medium  transition-all text-neutral-grey-700'>
											{time.label}
										</p>
									</div>
								</label>
							);
						})}
					</div>
				</div>
				<div className='py-2 px-4 border-b border-neutral-grey-100'>
					<p className='text-sm font-bold'>{BOOKING.carType}</p>
					<div className='mt-2 flex flex-wrap gap-1'>
						{vehicleTypesList.map((carType, idn) => {
							const isChecked = carTypeSelected.includes(
								carType.id.toString(),
							);
							return (
								<Fragment key={idn}>
									<input
										type='checkbox'
										value={carType.id}
										{...register("carType")}
										id={`carType_${carType.id}`}
										hidden={true}
										className={`appearance-none  `}
									/>
									<label
										htmlFor={`carType_${carType.id}`}
										className={`group  rounded-full   cursor-pointer select-none  w-fit px-3 flex items-center  py-1 transition-all ${
											isChecked
												? "gap-1 bg-secondary-300"
												: "bg-neutral-grey-100 hover:bg-neutral-grey-200"
										}`}>
										{isChecked && (
											<div className=' relative w-fit h-fit'>
												<CheckIcon
												// width='12'
												// height='12'
												// viewBox='0 0 12 12'
												/>
											</div>
										)}
										<p
											className={`text-sm font-medium  transition-all  ${
												isChecked
													? "text-white"
													: "text-neutral-grey-700"
											} `}>
											{carType.value}
										</p>
									</label>
								</Fragment>
							);
						})}
					</div>
				</div>
				{/* <div className='py-2 px-4 border-b border-neutral-grey-100'>
					<p className='text-sm font-bold'>{BOOKING.floor}</p>
					<div className='mt-2 flex flex-wrap gap-1'>
						{FLOORS.map((floor, idn) => {
							const isChecked = floorsSelected.includes(
								floor.id.toString(),
							);
							return (
								<Fragment key={idn}>
									<input
										type='checkbox'
										value={floor.id}
										{...register("floors")}
										id={`floor_${floor.id}`}
										hidden={true}
										className={`appearance-none  `}
									/>
									<label
										htmlFor={`floor_${floor.id}`}
										className={`group  rounded-full   cursor-pointer select-none  w-fit px-3 flex items-center  py-1 transition-all ${
											isChecked
												? "gap-1 bg-secondary-300"
												: "bg-neutral-grey-100 hover:bg-neutral-grey-200"
										}`}>
										{isChecked && (
											<div className=' relative w-fit h-fit'>
												<CheckIcon
												// width='12'
												// height='12'
												// viewBox='0 0 12 12'
												/>
											</div>
										)}
										<p
											className={`text-sm font-medium  transition-all  ${
												isChecked
													? "text-white"
													: "text-neutral-grey-700"
											} `}>
											{floor.value}
										</p>
									</label>
								</Fragment>
							);
						})}
					</div>
				</div> */}

				<div className='py-2 px-4'>
					<p className='text-sm font-bold'>{BOOKING.price}</p>
					<div className='mt-2 flex flex-wrap gap-1'>
						{priceRangesList.map((price, idn) => {
							const isChecked = pricesSelected.includes(
								price.id.toString(),
							);
							return (
								<Fragment key={idn}>
									<input
										type='checkbox'
										value={price.id}
										{...register("prices")}
										id={`price_${price.id}`}
										hidden={true}
										className={`appearance-none  `}
									/>
									<label
										htmlFor={`price_${price.id}`}
										className={`group  rounded-full   cursor-pointer select-none  w-fit px-3 flex items-center  py-1 transition-all ${
											isChecked
												? "gap-1 bg-secondary-300"
												: "bg-neutral-grey-100 hover:bg-neutral-grey-200"
										}`}>
										{isChecked && (
											<div className=' relative w-fit h-fit'>
												<CheckIcon
												// width='12'
												// height='12'
												// viewBox='0 0 12 12'
												/>
											</div>
										)}
										<p
											className={`text-sm font-medium  transition-all  ${
												isChecked
													? "text-white"
													: "text-neutral-grey-700"
											} `}>
											{price.label}
										</p>
									</label>
								</Fragment>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default FilterDesktop;
