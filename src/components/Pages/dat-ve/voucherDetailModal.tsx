import Image from "next/image";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { IBookingTranslate } from "@/interfaces/IBookingTranslate";
import { IErrorTranslate } from "@/interfaces/IErrorTranslate";
import { IPlaceholderTranslate } from "@/interfaces/IPlaceholderTranslate";
import { ISignInTranslate } from "@/interfaces/ISignInTranslate";
import { IRequestPaymentTranslate } from "@/interfaces/IRequestPaymentTranslate";
import Button from "@/components/button";
import { getDaysLeft, getDaysRange } from "@/helpers/functionHelper";
import moment from "moment";
import { IMyPointTranslate } from "@/interfaces/IMyPointTranslate";
import { IUserProfile } from "@/interfaces/httpRequest/IUser";
import { VoucherData } from "@/interfaces/httpRequest/IVoucher";

interface IVoucherDetailProps {
	BOOKING: IBookingTranslate;
	PLACEHOLDER?: IPlaceholderTranslate;
	SIGNIN?: ISignInTranslate;
	POINT: IMyPointTranslate;
	REQUESTPAYMENT: IRequestPaymentTranslate;
	voucher: VoucherData | null;
	handleCloseModal: () => void;
	handleSubmit: Function;
	userProfile: IUserProfile;
	voucherSelected: VoucherData | null;
	currentPoint?: number;
}

const VoucherDetailModal = (props: IVoucherDetailProps) => {
	const {
		BOOKING,
		voucher,
		PLACEHOLDER,
		SIGNIN,
		REQUESTPAYMENT,
		POINT,
		userProfile,
		handleCloseModal = () => {},
		handleSubmit = () => {},
		voucherSelected,
		currentPoint = 0,
	} = props;

	if (voucher) {
		return (
			<div className={``}>
				<div className='p-4 flex items-center justify-center border-b border-neutral-grey-200'>
					<p className='text-base font-semibold'>
						{BOOKING.voucherDetail}
					</p>
				</div>
				<div className='max-h-[600px] overflow-auto  flex flex-col'>
					<div className='w-full h-[214px] relative'>
						<Image
							src={"/images/voucher_banner.png"}
							alt={""}
							layout='fill'
						/>
					</div>
					<div className='p-4 border-b border-neutral-grey-200'>
						<p className='text-lg font-semibold text-black'>
							{voucher?.name}
						</p>
						<p className='text-sm font-medium text-neutral-grey-500'>
							HSD:{" "}
							{getDaysRange({
								startDate: voucher?.dateStartExchange,
								expiredDate: voucher?.dateEndExchange,
								days: BOOKING.days,
							})}
						</p>
					</div>
					<div className='p-3 border-b border-neutral-grey-200'>
						<p className='text-sm font-bold text-black'>
							{BOOKING.conditionalApply}
						</p>
						<ul className='list-disc list-inside pl-1'>
							{/* {voucher?.conditions?.map(
								(condition: any, index: number) => {
									return (
										<li
											key={`condition-${index}`}
											className='text-neutral-grey-600 font-normal text-sm leading-[21px]'>
											{condition}
										</li>
									);
								},
							)} */}
							<li className='text-[#61646B] font-medium text-sm'>
								{BOOKING.voucherApplyFrom}{" "}
								{moment(voucher?.dateStartUsage)?.format(
									"HH:mm,DD-MM-YYYY",
								)}{" "}
								{BOOKING.voucherApplyTo}{" "}
								{moment(voucher?.dateEndExchange)?.format(
									"HH:mm,DD-MM-YYYY",
								)}
							</li>
						</ul>
					</div>
					{/* <div className='p-3 '>
						<p className='text-sm font-bold text-black'>
							{BOOKING.contentApply}
						</p>
						<p className='text-neutral-grey-600 font-normal text-sm leading-[21px]'>
							{voucher.name}
						</p>
					</div> */}
				</div>

				<div className='flex items-center gap-3 p-4 pb-6'>
					<Button
						btnColor='bg-neutral-grey-100 group'
						height='h-11'
						borderRadius='rounded-full'
						borderColor='border-none'
						color='text-black '
						// disabled={seatSelected.length === 0}
						// actionType='submit'
						onClick={() => handleCloseModal()}>
						{BOOKING.back}
					</Button>
					<Button
						btnColor='disabled:bg-primary-600 bg-primary-500 disabled:opacity-100 group'
						height='h-11'
						borderRadius='rounded-full'
						borderColor='border-none'
						color='group-disabled:text-opacity-60 text-white '
						disabled={
							voucherSelected?.voucherId !== voucher.voucherId &&
							currentPoint < voucher?.pointExchange
						}
						// actionType='submit'
						onClick={() => handleSubmit(voucher)}>
						{BOOKING.exchange} {voucher?.pointExchange}{" "}
						{BOOKING.score} {BOOKING.now}
					</Button>
				</div>
			</div>
		);
	}
};

export default VoucherDetailModal;
