import ArrowDownIcon from "@/components/icons/arrowDown";
import ArrowRightIcon from "@/components/icons/arrowRight";
import useOnClickOutside from "@/hook/useClickOutside";
import useTrans from "@/hook/useTrans";
import { IBookingTranslate } from "@/interfaces/IBookingTranslate";
import { IUserProfile } from "@/interfaces/httpRequest/IUser";
import moment from "moment";
import { Fragment, useEffect, useRef, useState } from "react";
import UserBlueIcon from "../icons/userBlue";
import HistoryIcon from "../icons/history";
import UserCircleIcon from "../icons/user-circle";
import StarIcon from "../icons/star";
import LogOutIcon from "../icons/log-out";
import { formatNumber } from "@/helpers/functionHelper";

interface IProfileModal {
	userProfile: IUserProfile;
}

const ProfileModal = (props: IProfileModal) => {
	const { userProfile } = props;
	const ref = useRef(null);
	const [open, setOpen] = useState(false);
	const trans = useTrans();
	const { HEADER } = trans;

	const listIcon = [
		<UserCircleIcon />,
		<HistoryIcon />,
		<StarIcon />,
		<LogOutIcon />,
	];

	const handleClickOutside = () => {
		if (open) {
			setOpen(false);
		}
	};

	useOnClickOutside(ref, handleClickOutside);

	return (
		<div className='w-full'>
			<div ref={ref} className={` w-full  relative flex transition-all`}>
				<div
					className='flex w-full cursor-pointer items-center justify-between'
					onClick={() => {
						setOpen(!open);
					}}>
					<div className='flex items-center gap-1 cursor-pointer'>
						<p className='text-base leading-6 text-white truncate font-semibold max-w-[130px] select-none'>
							{userProfile.name || userProfile.phone}
						</p>

						<div
							className={`transition-transform ${
								open ? "-rotate-90 " : "rotate-90"
							}`}>
							<ArrowRightIcon fill='#FFF' />
						</div>
					</div>
				</div>
				{open && (
					<div className='absolute right-0 top-10 w-[252px] py-4 border border-l-neutral-grey-200 rounded-lg z-10 bg-white flex flex-col gap-2 max-h-[327px] shadow-sm overflow-y-auto'>
						{HEADER.accountSettings &&
						HEADER.accountSettings?.length > 0 ? (
							<div className=' cursor-pointer'>
								{HEADER.accountSettings?.map(
									(
										item: {
											title: string;
											ref: string;
											extraComponent?: boolean;
										},
										ind: number,
									) => {
										const { title, ref, extraComponent } =
											item;
										return (
											<a
												key={ind}
												href={ref}
												className='py-[6px] px-4 hover:bg-primary-1000 flex items-center justify-start gap-4 '>
												{listIcon[ind]}
												<div className='flex items-center gap-1'>
													<p className='text-base font-semibold text-neutral-grey-600'>
														{title}
													</p>
													{extraComponent && (
														<div className='rounded-full px-2 py-1 bg-semantic-green-light'>
															<p className='text-xs font-extrabold text-semantic-green leading-[18px]'>
																{userProfile?.point
																	? userProfile?.point >=
																	  1000
																		? "999+"
																		: formatNumber(
																				userProfile?.point,
																		  )
																	: 0}{" "}
																{HEADER.point}
															</p>
														</div>
													)}
												</div>
											</a>
										);
									},
								)}
							</div>
						) : (
							<div className='px-4'>
								<p className='text-p14'>Chưa có dữ liệu</p>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default ProfileModal;
