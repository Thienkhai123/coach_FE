import ArrowBackIcon from "@/components/icons/arrowBack";
import Image from "next/legacy/image";
import React from "react";

interface IMainNewsProps {
	imageUrl: string;
	title?: string;
	createAt?: string;
	readPostText?: string;
	customUrl: string;
	id: number;
	handleChooseNews: (id: any, customUrl?: any) => void;
}

const MainNews = (props: IMainNewsProps) => {
	const {
		id,
		customUrl,
		createAt,
		imageUrl,
		title,
		readPostText,
		handleChooseNews,
	} = props;

	return (
		<div
			onClick={() => {
				handleChooseNews(id, customUrl);
			}}
			className='group cursor-pointer w-full pb-4 border-b lg:border-none border-b-neutral-grey-200'>
			<div className='w-full rounded-lg relative h-[210px] lg:h-[335px] '>
				<Image
					objectFit='cover'
					className='rounded-lg'
					alt='main-news'
					src={imageUrl}
					layout='fill'
				/>
			</div>
			<div className='mt-2'>
				<p className='text-black font-semibold text-base lg:text-2xl group-hover:text-secondary-300 transition-all'>
					{title}
				</p>
			</div>
			<div className='flex mt-1 gap-2 justify-between items-center'>
				<p className='font-normal text-sm lg:text-base text-neutral-grey-500 first-letter:uppercase'>
					{createAt}
				</p>
				<div className='flex items-center gap-0.5'>
					<p className='text-[#0477B8] text-sm font-semibold'>
						{readPostText}
					</p>
					<div className='rotate-180 w-6 h-6 flex items-center justify-center'>
						<ArrowBackIcon width='12' height='7.2' fill='#0477B8' />
					</div>
				</div>
			</div>
		</div>
	);
};

export default MainNews;
