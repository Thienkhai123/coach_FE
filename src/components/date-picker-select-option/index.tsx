import useOnClickOutside from "@/hook/useClickOutside";
import { Fragment, useEffect, useRef, useState } from "react";
import ArrowDownIcon from "../icons/arrowDown";
import MapPinIcon from "../icons/map-pin";
import DatePicker from "react-datepicker";
import moment from "moment";
import { vi } from "date-fns/locale";

interface IDatePickerSelectOption {
	register: any;
	className?: string;
	name: string;

	errors: any;
	placeholder: string;
	setValue: any;
	getValues: any;
	Icon?: any;
	index?: number;
	showIcon?: boolean;
	onChange?: Function;
}

const DatePickerSelectOption = (props: IDatePickerSelectOption) => {
	const {
		register,
		className = "bg-transparent pl-4 w-full outline-none cursor-pointer transition-all placeholder:hover:text-primary-400 placeholder:text-neutral-grey-500 placeholder:text-base h-6",
		name,
		placeholder,
		errors,
		getValues,
		setValue,
		Icon,
		index,
		showIcon = true,
		onChange = () => {},
	} = props;
	const ref = useRef(null);
	const [open, setOpen] = useState(false);
	const [startDate, setStartDate] = useState<Date | null>(new Date());

	const handleClickOutside = () => {
		if (open) {
			setOpen(false);
		}
	};

	useOnClickOutside(ref, handleClickOutside);

	return (
		<div className='w-full'>
			<div ref={ref} className='w-full relative flex  transition-all'>
				<div
					className='flex w-full cursor-pointer items-center gap-2'
					onClick={() => {
						setOpen(!open);
					}}>
					{showIcon && (
						<div className='w-8 h-8 rounded-full bg-primary-900 flex items-center justify-center shrink-0'>
							{Icon ? <Icon /> : <MapPinIcon />}
						</div>
					)}
					<div className='flex flex-col'>
						{getValues(name) && (
							<p className='text-sm font-medium text-neutral-grey-500'>
								{placeholder}
							</p>
						)}
						<input
							type='text'
							readOnly
							{...register(name)}
							// autoComplete='off'
							// defaultValue={currentValue?.value}
							className={`${className} `}
							placeholder={placeholder}

							// onChange={(e) => queryOptionByName(e.target.value)}
						/>
					</div>
					{/* {Icon ? (
						<div className='px-4 lg:block hidden'>
							<Icon />
						</div>
					) : (
						<div className={`lg:block hidden pr-4`}>
							<div
								className={`transition-transform ${
									open ? "rotate-180 " : "rotate-0"
								}`}>
								<ArrowDownIcon />
							</div>
						</div>
					)} */}
				</div>
				{open && (
					<div className='absolute -left-4 top-12 w-[375px] py-2 border border-neutral-grey-200 rounded-lg z-10 bg-white flex flex-col  max-h-[405px] shadow-[12px_12px_16px_-4px_rgba(0,0,0,0.08),0px_4px_6px_-2px_rgba(0,0,0,0.03)] '>
						<div>
							<DatePicker
								selected={startDate}
								onChange={(date) => {
									setStartDate(date);
									setValue(
										name,
										moment(date).format("DD/MM/YYYY"),
									);
									setValue(`${name}_datetime`, date);

									handleClickOutside();
								}}
								shouldCloseOnSelect={false}
								minDate={
									name === "endDate"
										? getValues(`startDate_datetime`)
											? moment(
													getValues(
														`startDate_datetime`,
													),
											  ).toDate()
											: new Date()
										: new Date()
								}
								locale={vi}
								inline
								calendarClassName='custom-calendar-qb '
							/>
						</div>
					</div>
				)}
			</div>
			{errors[name] && (
				<p className='text-red-500 text-p12'>{errors[name]?.message}</p>
			)}
		</div>
	);
};

export default DatePickerSelectOption;
