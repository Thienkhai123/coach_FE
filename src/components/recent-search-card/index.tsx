import React, { useRef, useState } from "react";

import RecentIcon from "../icons/recent";
import useTrans from "@/hook/useTrans";
import { ITranslation } from "@/interfaces/ITranslation";
import { ArrowLeftIcon, ArrowRightIcon } from "../icons";

interface IRecentSearchCardProps {
	title: string;
	date: string;
	type?: number;
	endDate?: string;
}

const RecentSearchCard = (props: IRecentSearchCardProps) => {
	const {
		title = "TP. Hồ Chí Minh - TP. Nha Trang",
		date = "12/05/2022",
		type = 1,
		endDate,
	} = props;

	const trans: ITranslation = useTrans();
	const { HOME } = trans;

	return (
		<div className='w-full bg-white hover:-translate-y-0.5 transition-all flex items-start gap-2 p-3 cursor-pointer rounded-lg border border-neutral-grey-200 shadow-[0px_2px_2px_0px_rgba(0,0,0,0.03)]'>
			<div className='w-8 h-8 flex items-center justify-center rounded-full bg-secondary-600 shrink-0'>
				<RecentIcon />
			</div>
			<div className='flex flex-col gap-1 w-full overflow-hidden'>
				<p className='text-sm font-semibold text-neutral-grey-700 truncate text-ellipsis '>
					{title}
				</p>
				<div className='flex items-center gap-2'>
					<p className='text-sm font-medium text-neutral-grey-500'>
						{date}
					</p>
					{type === 2 && endDate && (
						<div className='rotate-180 w-fit'>
							<ArrowLeftIcon
								width='12'
								height='12'
								stroke='#898C8D'
							/>
						</div>
					)}
					{type === 2 && endDate && (
						<p className='text-sm font-medium text-neutral-grey-500'>
							{endDate}
						</p>
					)}
				</div>
				<div className='mt-2 rounded-full bg-secondary-600 py-1 px-2 w-fit'>
					<p className='text-xs font-bold text-secondary-300'>
						{type === 1 ? HOME.oneWay : HOME.roundTrip}
					</p>
				</div>
			</div>
		</div>
	);
};

export default RecentSearchCard;
