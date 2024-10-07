import ArrowDownIcon from "@/components/icons/arrowDown";
import ArrowRightIcon from "@/components/icons/arrowRight";
import useOnClickOutside from "@/hook/useClickOutside";
import { IBookingTranslate } from "@/interfaces/IBookingTranslate";
import moment from "moment";
import { Fragment, useEffect, useRef, useState } from "react";

export type optionType = {
	id: number | string;
	value: string;
	description: string;
	location: string;
	startAt?: Date;
};

interface IInputSelectOption {
	register: any;
	className?: string;
	name: string;
	placeholder: string;
	errors: any;
	listOpt?: optionType[];
	setValue: any;
	getValues: any;
	Icon?: any;
	index?: number;
	title?: string;
	onChange?: Function;
	BOOKING: IBookingTranslate;
	required?: boolean;
}

const SelectOptionBooking = (props: IInputSelectOption) => {
	const {
		register,
		className = "bg-transparent  w-full outline-none cursor-pointer placeholder:text-neutral-grey-600 text-sm font-medium ",
		name,
		placeholder,
		errors,
		listOpt = [],
		setValue,
		Icon,
		index,
		title,
		getValues,
		BOOKING,
		required,
		onChange = () => {},
	} = props;
	const ref = useRef(null);
	const [open, setOpen] = useState(false);
	const [currentValue, setCurrentValue] = useState<optionType>();

	const handleClickOutside = () => {
		if (open) {
			setOpen(false);
		}
	};

	useOnClickOutside(ref, handleClickOutside);

	return (
		<div className='w-full'>
			{title && (
				<p className='text-sm font-semibold text-neutral-grey-700 mb-1'>
					{title}{" "}
					{required && <span className='text-semantic-red'>*</span>}
				</p>
			)}
			<div
				ref={ref}
				className={`${
					open ? "border-secondary-300" : "border-neutral-grey-300"
				} w-full  relative flex rounded-lg border  p-3 py-1.5 hover:border-button-2 transition-all`}>
				<div
					className='flex w-full cursor-pointer items-center justify-between'
					onClick={() => {
						setOpen(!open);
					}}>
					<input
						type='text'
						readOnly
						{...register(name)}
						// autoComplete='off'
						defaultValue={currentValue?.value}
						className={`${className} ${
							open &&
							"text-secondary-300 placeholder:text-secondary-300"
						}`}
						placeholder={placeholder}

						// onChange={(e) => queryOptionByName(e.target.value)}
					/>
					{Icon ? (
						<div className='px-4 lg:block hidden'>
							<Icon />
						</div>
					) : (
						<div className={`lg:block hidden`}>
							<div
								className={`transition-transform ${
									open ? "-rotate-90 " : "rotate-90"
								}`}>
								<ArrowRightIcon fill='#000' />
							</div>
						</div>
					)}
				</div>
				{open && (
					<div className='absolute left-0 top-11 w-[400px] py-4 border border-l-neutral-grey-200 rounded-lg z-10 bg-white flex flex-col gap-2 max-h-[327px] shadow-sm overflow-y-auto'>
						{listOpt && listOpt?.length > 0 ? (
							<div className=' cursor-pointer'>
								{listOpt?.map((opt, ind) => {
									const {
										id,
										value,
										description,
										location,
										startAt,
									} = opt;
									return (
										<div
											key={ind}
											onClick={() => {
												setValue(name, value);
												setValue(`${name}_id`, id);
												// setCurrentValue(opt);
												handleClickOutside();
												onChange(index, id);
											}}
											className='py-[10px] px-4 hover:bg-primary-1000 flex items-center justify-start gap-6 '>
											<div className='flex items-start gap-3'>
												<input
													type='radio'
													className='accent-[#228AD1] w-5 h-5 mt-1 '
													readOnly
													checked={
														getValues(
															`${name}_id`,
														) === id
													}
												/>
												<div className='flex flex-col items-start gap-1 max-w-[322px]'>
													{/* 222px */}
													<p className='text-sm font-semibold text-neutral-grey-700'>
														{startAt
															? `${moment(
																	startAt,
															  ).format(
																	"HH:mm",
															  )} - `
															: ""}
														{value}
													</p>
													<p className='w-full text-xs font-normal text-Subtle-1 truncate'>
														{description}
														{description}
													</p>
												</div>
											</div>
											{/* <p className='text-sm font-semibold text-secondary-300 underline'>
												{BOOKING.seeLocation}
											</p> */}
										</div>
									);
								})}
							</div>
						) : (
							<div className='px-4'>
								<p className='text-p14'>Chưa có dữ liệu</p>
							</div>
						)}
					</div>
				)}
			</div>
			{errors[name] && (
				<p className='text-red-500 text-p12'>{errors[name]?.message}</p>
			)}
		</div>
	);
};

export default SelectOptionBooking;
