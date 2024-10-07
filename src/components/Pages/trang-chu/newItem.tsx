import ClockIcon from "@/components/icons/clock";
import CommentIcon from "@/components/icons/comment";
import EyeOnIcon from "@/components/icons/eyeOn";
import Image from "next/legacy/image";
import React from "react";

interface INewsItemProps {
	imageUrl: string;
	title?: string;
	createAt?: string;
	seenTitle?: string;
	views?: number;
	description?: string;
	customUrl: string;
	id: number;
	handleChooseNews: (id: any, customUrl?: any) => void;
}

const NewsItem = (props: INewsItemProps) => {
	const {
		id,
		customUrl,
		createAt,
		description,
		imageUrl,
		seenTitle,
		title,
		views,
		handleChooseNews,
	} = props;

	return (
		<div
			onClick={() => {
				handleChooseNews(id, customUrl);
			}}
			className='group cursor-pointer pb-4'>
			<div className='flex gap-4'>
				<div className='min-w-[80px]'>
					<Image
						alt=''
						width={80}
						height={80}
						src={imageUrl}
						objectFit='cover'
					/>
				</div>
				<div className='flex-1'>
					<p
						style={{ wordBreak: "break-word" }}
						className='text-neutral-grey-700 line-clamp-1 font-bold text-sm group-hover:text-secondary-300 transition-all'>
						{title}
					</p>
					<p
						style={{ wordBreak: "break-word" }}
						className='text-neutral-grey-700 line-clamp-2 text-sm font-medium group-hover:text-secondary-300 transition-all'>
						{description}
					</p>
					<div className='flex items-center gap-1 mt-1'>
						<ClockIcon stroke='#898C8D' />
						<p className='text-xs text-neutral-grey-500 font-medium first-letter:uppercase'>
							{createAt}
						</p>
					</div>

					<div className='grid grid-cols-2 gap-2 items-center mt-1'>
						<div className='flex items-center gap-1'>
							<EyeOnIcon fill='#898C8D' />
							<p className='text-xs text-neutral-grey-500 font-medium'>
								{seenTitle}: {views}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NewsItem;
