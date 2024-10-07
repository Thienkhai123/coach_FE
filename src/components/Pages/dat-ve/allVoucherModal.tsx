import Image from "next/image";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { IBookingTranslate } from "@/interfaces/IBookingTranslate";
import { IErrorTranslate } from "@/interfaces/IErrorTranslate";
import { IPlaceholderTranslate } from "@/interfaces/IPlaceholderTranslate";
import { ISignInTranslate } from "@/interfaces/ISignInTranslate";
import { IRequestPaymentTranslate } from "@/interfaces/IRequestPaymentTranslate";
import Button from "@/components/button";
import { getDaysLeft } from "@/helpers/functionHelper";
import Voucher from "./voucher";
import CrossIcon from "@/components/icons/cross";
import CancelIcon from "@/components/icons/cancel";
import { VoucherData } from "@/interfaces/httpRequest/IVoucher";
import { IUserProfile } from "@/interfaces/httpRequest/IUser";

interface IAllVoucherProps {
	BOOKING: IBookingTranslate;
	PLACEHOLDER?: IPlaceholderTranslate;
	SIGNIN?: ISignInTranslate;
	REQUESTPAYMENT: IRequestPaymentTranslate;
	listVoucher: any[];
	voucherSelected: VoucherData | null;
	handleCloseModal: () => void;
	handleSelectVoucher: Function;
	userProfile: IUserProfile;
	currentPoint?: number;
}

const AllVoucherModal = (props: IAllVoucherProps) => {
	const {
		BOOKING,
		listVoucher,
		PLACEHOLDER,
		SIGNIN,
		REQUESTPAYMENT,
		userProfile,
		voucherSelected,
		handleCloseModal = () => {},
		handleSelectVoucher = () => {},
		currentPoint = 0,
	} = props;

	return (
		<div className={``}>
			<div className='p-4 flex items-center justify-center border-b border-neutral-grey-200 relative'>
				<p className='text-base font-semibold'>{BOOKING.allVoucher}</p>
				<div
					onClick={() => {
						handleCloseModal();
					}}
					className='absolute right-5 cursor-pointer'>
					<CancelIcon width='14' height='14' fill='#6A6F70' />
				</div>
			</div>
			<div className='max-h-[640px] overflow-auto  flex flex-col p-4 gap-2'>
				{listVoucher?.map((voucher, index) => {
					const { voucherId } = voucher || {};
					return (
						<Voucher
							key={index}
							disabled={
								voucherSelected?.voucherId !== voucherId &&
								currentPoint < voucher?.pointExchange
							}
							BOOKING={BOOKING}
							voucher={voucher}
							isExchange={
								voucherSelected &&
								voucherSelected.voucherId === voucherId
									? true
									: false
							}
							handleSelectVoucher={() => {
								handleSelectVoucher(voucher);
							}}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default AllVoucherModal;
