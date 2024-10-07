import HistoryIcon from "@/components/icons/history";
import LogOutIcon from "@/components/icons/log-out";
import StarIcon from "@/components/icons/star";
import UserCircleIcon from "@/components/icons/user-circle";
import { ITranslation } from "@/interfaces/ITranslation";
import { usePathname } from "next/navigation";
import React from "react";
import HistoryItem from "./historyItem";
import { IUserProfile } from "@/interfaces/httpRequest/IUser";
import { formatNumber } from "@/helpers/functionHelper";

const defaultData = {
	histories: [
		{
			idNoti: 0,
			isTypeOfNoti: true,
			isTypeOfNotiDisplay: "Gửi hàng",
			isTypeOfProduct: 4,
			notiName: "Bạn đã tạo thành công đơn hàng #MDH1002345 từ... đến...",
			createAt: new Date(),
			bookingType: 1,
		},
		{
			idNoti: 1,
			isTypeOfNoti: true,
			isTypeOfNotiDisplay: "Vé xe",
			isTypeOfProduct: 2,
			notiName:
				"Bạn đã đặt vé xe Đà Nẵng - Nha Trang chuyến 17:00 21/12/2024",
			createAt: new Date(),
			bookingType: 0,
		},
		{
			idNoti: 2,
			isTypeOfNoti: false,
			isTypeOfNotiDisplay: "Tour du lịch",
			isTypeOfProduct: 1,
			notiName: "Bạn đã huỷ tour du lịch...",
			createAt: new Date(),
			bookingType: 0,
		},
		{
			idNoti: 3,
			isTypeOfNoti: false,
			isTypeOfNotiDisplay: "Xe hợp đồng",
			isTypeOfProduct: 4,
			notiName: "Bạn đã đặt thành công xe hợp đồng",
			createAt: new Date(),
			bookingType: 0,
		},
	],
};

interface IHistoriesBooking {
	translation: ITranslation;
	histories?: IHistory[];
	handleLinkHistory: (idNoti?: any, type?: any) => void;
	userProfile?: IUserProfile;
}

interface IHistory {
	idNoti: number;
	isTypeOfNoti: boolean;
	isTypeOfNotiDisplay: string;
	isTypeOfProduct: number;
	notiName: string;
	createAt: any;
	bookingType: number; // {0: trạng thái đặt vé xe, 1: trạng thái ký gửi hàng hóa}
}

const HistoriesBooking = (props: IHistoriesBooking) => {
	const {
		translation,
		histories = defaultData.histories,
		handleLinkHistory,
		userProfile,
	} = props;
	const { HEADER, ACCOUNT, SIGNIN, ERROR } = translation;
	const pathname = usePathname();
	const listIcon = [
		<UserCircleIcon />,
		<HistoryIcon />,
		<StarIcon />,
		<LogOutIcon />,
	];
	return (
		<div className='grid grid-cols-[30.62%_67.95%] gap-4'>
			<div className=' h-fit py-4 w-full bg-white rounded-lg'>
				{HEADER.accountSettings && (
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
								const {
									title,
									ref,

									extraComponent,
								} = item;
								return (
									<a
										key={ind}
										href={ref}
										className='py-2 px-4 hover:bg-primary-1000 flex items-center justify-start gap-4 '>
										{listIcon[ind]}
										<div className='flex items-center gap-1'>
											<p
												className={`text-base font-semibold  ${
													pathname === ref
														? "text-primary-500"
														: "text-neutral-grey-600"
												}`}>
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
				)}
			</div>
			<div className='w-full h-full '>
				<div className='rounded-xl bg-white p-4 '>
					<div className='py-1 px-2 bg-[#DEF5E0] text-xs font-extrabold text-neutral-grey-600 rounded-full w-fit uppercase'>
						{translation.HISTORY.serviceHistory}
					</div>
					<div className='mt-4 max-h-[530px] overflow-y-auto custom-scrollbar-none-border'>
						{histories?.length > 0 ? (
							histories?.map((elm: any, ind: number) => {
								return (
									<div key={ind}>
										<HistoryItem
											{...elm}
											trans={translation}
											handleLinkHistory={
												handleLinkHistory
											}
										/>
									</div>
								);
							})
						) : (
							<div className='px-4'>
								<p className='text-p14'>Chưa có dữ liệu</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default HistoriesBooking;
