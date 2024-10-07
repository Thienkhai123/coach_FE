import useOnClickOutside from "@/hook/useClickOutside";
import { Fragment, useEffect, useRef, useState } from "react";
import ArrowDownIcon from "../icons/arrowDown";
import MapPinIcon from "../icons/map-pin";
import DatePicker from "react-datepicker";
import moment from "moment";
import { vi } from "date-fns/locale";
import Modal from "../modal/Modal";
import useModal from "@/hook/useModal";

interface IDatePickerCustom {
	register: any;
	name: string;
	title: string;
	errors: any;
	placeholder: string;
	setValue: any;
	getValues: any;
	Icon?: any;
	index?: number;
	showIcon?: boolean;
	onChange?: Function;
	required?: boolean;
}

const DatePickerCustom = (props: IDatePickerCustom) => {
	const {
		register,
		title,
		name,
		placeholder,
		errors,
		getValues,
		setValue,
		Icon,
		index,
		showIcon = true,
		required = false,
		onChange = () => {},
	} = props;
	const ref = useRef(null);
	const [open, setOpen] = useModal();
	const [startDate, setStartDate] = useState<Date | null>(new Date());

	// const handleClickOutside = () => {
	// 	if (open) {
	// 		setOpen();
	// 	}
	// };

	// useOnClickOutside(ref, handleClickOutside);

	return (
		<div className='w-full'>
			{title && (
				<p className='text-sm font-semibold text-neutral-grey-700 mb-1'>
					{title}{" "}
					{required && <span className='text-semantic-red'>*</span>}
				</p>
			)}
			<div ref={ref} className='w-full relative flex  transition-all'>
				<div
					className='flex w-full cursor-pointer items-center gap-2'
					onClick={() => {
						setOpen();
					}}>
					{showIcon && (
						<div className='w-8 h-8 rounded-full bg-primary-900 flex items-center justify-center shrink-0'>
							{Icon ? <Icon /> : <MapPinIcon />}
						</div>
					)}
					<div className='flex flex-col w-full'>
						<input
							type='text'
							readOnly
							{...register(name)}
							// autoComplete='off'
							// defaultValue={currentValue?.value}
							className={`border border-neutral-grey-300 py-2 px-3 rounded-lg w-full`}
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
			</div>
			{errors[`${name}_datetime`] && (
				<p className='text-red-500 text-p12'>
					{errors[`${name}_datetime`]?.message}
				</p>
			)}
			<Modal
				toggleModal={setOpen}
				open={open}
				wrapChildStyle='p-0'
				modalStyle='w-[100vw] h-[100vh] flex justify-center items-center fixed bg-black/30 z-[60] left-[calc(0%)] top-[calc(0%)]'
				childStyle='w-fit p-6 bg-white md:rounded-xl md:min-h-fit min-h-full mx-0  overflow-hidden duration-200 animate-fade-in '>
				<DatePicker
					showYearDropdown
					yearDropdownItemNumber={121}
					scrollableYearDropdown
					selected={startDate}
					onChange={(date) => {
						setStartDate(date);
						setValue(name, moment(date).format("DD/MM/YYYY"));
						setValue(`${name}_datetime`, date);
						setOpen();
					}}
					shouldCloseOnSelect={false}
					minDate={moment().subtract(120, "years").toDate()}
					maxDate={new Date()}
					locale={vi}
					inline
					calendarClassName='custom-calendar-qb'
				/>
			</Modal>
		</div>
	);
};

export default DatePickerCustom;
