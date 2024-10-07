import CheckIcon from "@/components/icons/check";
import { VoucherData } from "@/interfaces/httpRequest/IVoucher";
import { IBookingTranslate } from "@/interfaces/IBookingTranslate";

interface IVoucherProps {
	title?: string;
	point?: number;
	priceK?: string;
	isExchange?: boolean;
	BOOKING: IBookingTranslate;
	voucher?: VoucherData;
	disabled?: boolean;
	handleSelectVoucher: (arg: any) => void;
}

const convertPriceToK = (val: number) => {
	return val / 1000 + "K";
};

const Voucher = (props: IVoucherProps) => {
	const {
		title = "Giảm ngay 20.000đ khi đặt phiếu xe",
		point = 20,
		priceK = "20K",
		isExchange = false,
		BOOKING,
		voucher,
		disabled = false,
		handleSelectVoucher,
	} = props;
	const { pointExchange, value, name, enumDiscountType } = voucher || {};

	return (
		<div className='h-[92px] relative grid grid-cols-[26.67%_73.33%] overflow-hidden select-none'>
			<div className='bg-white rounded-full w-5 h-5 absolute border-none top-1/2 -translate-y-1/2 -left-[10px]'></div>
			<div className='bg-secondary-500 h-full rounded-l-lg border-r border-white border-dashed flex flex-col items-center justify-center'>
				<p className='text-xs font-medium text-secondary-100 leading-[18px]'>
					Voucher
				</p>
				<p className='text-[22px] font-bold leading-[30px]'>
					{enumDiscountType === 1
						? `${value?.toFixed(0)}%`
						: convertPriceToK(value || 0)}
				</p>
			</div>
			<div className='bg-semantic-blue-light h-full rounded-r-lg px-3 pr-5 py-[10px] flex flex-col justify-between'>
				<p className='text-sm font-semibold line-clamp-2'>{name}</p>
				<div className='flex items-center justify-between'>
					{isExchange ? (
						<div
							onClick={(e) => {
								if (e && e.stopPropagation) {
									e.stopPropagation();
								}
								if (!disabled) {
									handleSelectVoucher(voucher);
								}
							}}
							className='py-1 px-3 rounded-full bg-secondary-300 cursor-pointer flex items-center gap-1'>
							<div className='opacity-60'>
								<CheckIcon />
							</div>
							<p className='text-white text-sm font-semibold text-opacity-60'>
								Đã đổi
							</p>
						</div>
					) : (
						<div
							onClick={(e) => {
								if (e && e.stopPropagation) {
									e.stopPropagation();
								}
								if (!disabled) {
									handleSelectVoucher(voucher);
								}
							}}
							className={`py-1 px-3 rounded-full bg-secondary-300 cursor-pointer`}>
							<p
								className={`text-white text-sm font-semibold ${
									disabled ? "text-opacity-60" : ""
								}`}>
								{BOOKING.exchangeNow}
							</p>
						</div>
					)}

					<p className='text-xs font-semibold text-secondary-100'>
						{`-${pointExchange}`} {BOOKING.score}
					</p>
				</div>
			</div>
			<div className='bg-white rounded-full w-5 h-5 absolute border-none top-1/2 -translate-y-1/2 -right-[10px]'></div>
		</div>
	);
};

export default Voucher;
