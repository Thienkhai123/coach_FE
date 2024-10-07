import Footer from "@/components/footer";
import HistoryIcon from "@/components/icons/history";
import LogOutIcon from "@/components/icons/log-out";
import StarIcon from "@/components/icons/star";
import UserCircleIcon from "@/components/icons/user-circle";
import { ITranslation } from "@/interfaces/ITranslation";
import { IUserProfile } from "@/interfaces/httpRequest/IUser";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import Voucher from "../dat-ve/voucher";
import useModal from "@/hook/useModal";
import Modal from "@/components/modal/Modal";
import VoucherDetailModal from "../dat-ve/voucherDetailModal";
import ExchangeSuccessIcon from "@/components/icons/exchangeSuccess";
import moment from "moment";
import { VoucherData } from "@/interfaces/httpRequest/IVoucher";
import { IHistoriesPoints } from "@/interfaces/httpRequest/IPoints";
import { formatNumber } from "@/helpers/functionHelper";

interface IContainerMyPointDesktopProps {
  userProfile: IUserProfile;
  translation: ITranslation;
  vouchers: VoucherData[];
  processPoints: number;
  historiesPoint: IHistoriesPoints;
}
const FAKE_VOUCHER = [
  {
    id: 1,
    title: "Giảm ngay 20.000đ khi đặt phiếu xe",
    point: 20,
    priceK: "20K",
    expiredDate: "2024-06-30T10:37:40.329Z",
    conditions: [
      "Lorem ipsum dolor sit amet consectetur. Amet massa lobortis neque risus elementum arcu tincidunt",
      "Lorem ipsum dolor sit amet consectetur. Amet massa lobortis neque risus elementum arcu tincidunt",
      "Lorem ipsum dolor sit amet consectetur. Amet massa lobortis neque risus elementum arcu tincidunt",
      "Lorem ipsum dolor sit amet consectetur. Amet massa lobortis neque risus elementum arcu tincidunt",
    ],
    content:
      "Lorem ipsum dolor sit amet consectetur. Amet massa lobortis neque risus elementum arcu tincidunt.",
    // isExchange : false,
  },
  {
    id: 2,
    title: "Giảm ngay 50.000đ khi đặt phiếu xe",
    point: 50,
    priceK: "50K",
    expiredDate: "2024-06-30T10:37:40.329Z",
    conditions: [
      "Lorem ipsum dolor sit amet consectetur. Amet massa lobortis neque risus elementum arcu tincidunt",
      "Lorem ipsum dolor sit amet consectetur. Amet massa lobortis neque risus elementum arcu tincidunt",
      "Lorem ipsum dolor sit amet consectetur. Amet massa lobortis neque risus elementum arcu tincidunt",
      "Lorem ipsum dolor sit amet consectetur. Amet massa lobortis neque risus elementum arcu tincidunt",
    ],
    content:
      "Lorem ipsum dolor sit amet consectetur. Amet massa lobortis neque risus elementum arcu tincidunt.",
    // isExchange : false,
  },
  {
    id: 3,
    title: "Giảm ngay 60.000đ khi đặt phiếu xe",
    point: 20,
    priceK: "60K",
    expiredDate: "2024-06-30T10:37:40.329Z",
    conditions: [
      "Lorem ipsum dolor sit amet consectetur. Amet massa lobortis neque risus elementum arcu tincidunt",
      "Lorem ipsum dolor sit amet consectetur. Amet massa lobortis neque risus elementum arcu tincidunt",
      "Lorem ipsum dolor sit amet consectetur. Amet massa lobortis neque risus elementum arcu tincidunt",
      "Lorem ipsum dolor sit amet consectetur. Amet massa lobortis neque risus elementum arcu tincidunt",
    ],
    content:
      "Lorem ipsum dolor sit amet consectetur. Amet massa lobortis neque risus elementum arcu tincidunt.",
    // isExchange : false,
  },
  {
    id: 4,
    title: "Giảm ngay 60.000đ khi đặt phiếu xe",
    point: 20,
    priceK: "60K",
    expiredDate: "2024-06-30T10:37:40.329Z",
    conditions: [
      "Lorem ipsum dolor sit amet consectetur. Amet massa lobortis neque risus elementum arcu tincidunt",
      "Lorem ipsum dolor sit amet consectetur. Amet massa lobortis neque risus elementum arcu tincidunt",
      "Lorem ipsum dolor sit amet consectetur. Amet massa lobortis neque risus elementum arcu tincidunt",
      "Lorem ipsum dolor sit amet consectetur. Amet massa lobortis neque risus elementum arcu tincidunt",
    ],
    content:
      "Lorem ipsum dolor sit amet consectetur. Amet massa lobortis neque risus elementum arcu tincidunt.",
    // isExchange : false,
  },
  {
    id: 5,
    title: "Giảm ngay 60.000đ khi đặt phiếu xe",
    point: 20,
    priceK: "60K",
    expiredDate: "2024-06-30T10:37:40.329Z",
    conditions: [
      "Lorem ipsum dolor sit amet consectetur. Amet massa lobortis neque risus elementum arcu tincidunt",
      "Lorem ipsum dolor sit amet consectetur. Amet massa lobortis neque risus elementum arcu tincidunt",
      "Lorem ipsum dolor sit amet consectetur. Amet massa lobortis neque risus elementum arcu tincidunt",
      "Lorem ipsum dolor sit amet consectetur. Amet massa lobortis neque risus elementum arcu tincidunt",
    ],
    content:
      "Lorem ipsum dolor sit amet consectetur. Amet massa lobortis neque risus elementum arcu tincidunt.",
    // isExchange : false,
  },
  {
    id: 6,
    title: "Giảm ngay 60.000đ khi đặt phiếu xe",
    point: 20,
    priceK: "60K",
    expiredDate: "2024-06-30T10:37:40.329Z",
    conditions: [
      "Lorem ipsum dolor sit amet consectetur. Amet massa lobortis neque risus elementum arcu tincidunt",
      "Lorem ipsum dolor sit amet consectetur. Amet massa lobortis neque risus elementum arcu tincidunt",
      "Lorem ipsum dolor sit amet consectetur. Amet massa lobortis neque risus elementum arcu tincidunt",
      "Lorem ipsum dolor sit amet consectetur. Amet massa lobortis neque risus elementum arcu tincidunt",
    ],
    content:
      "Lorem ipsum dolor sit amet consectetur. Amet massa lobortis neque risus elementum arcu tincidunt.",
    // isExchange : false,
  },
  {
    id: 7,
    title: "Giảm ngay 60.000đ khi đặt phiếu xe",
    point: 20,
    priceK: "60K",
    expiredDate: "2024-06-30T10:37:40.329Z",
    conditions: [
      "Lorem ipsum dolor sit amet consectetur. Amet massa lobortis neque risus elementum arcu tincidunt",
      "Lorem ipsum dolor sit amet consectetur. Amet massa lobortis neque risus elementum arcu tincidunt",
      "Lorem ipsum dolor sit amet consectetur. Amet massa lobortis neque risus elementum arcu tincidunt",
      "Lorem ipsum dolor sit amet consectetur. Amet massa lobortis neque risus elementum arcu tincidunt",
    ],
    content:
      "Lorem ipsum dolor sit amet consectetur. Amet massa lobortis neque risus elementum arcu tincidunt.",
    // isExchange : false,
  },
];

const FAKE_HISTORY = [
  {
    id: 1,
    type: 0, //Type =0 là trừ điểm, 1 là cộng điểm
    point: 20,
    trip: "Đà Nẵng - Nha Trang",
    title:
      "Đã dùng 20 điểm từ giao dịch đặt vé xe Đà Nẵng - Nha Trang chuyến 17:00 21/12/2024",
    startAt: new Date(),
    createAt: new Date(),
  },
  {
    id: 2,
    type: 1, //Type =0 là trừ điểm, 1 là cộng điểm
    point: 20,
    title:
      "Đã nhận 20 điểm từ giao dịch đặt vé xe Đà Nẵng - Nha Trang chuyến 17:00 21/12/2024",
    trip: "Đà Nẵng - Nha Trang",
    startAt: new Date(),
    createAt: new Date(),
  },
  {
    id: 3,
    type: 1, //Type =0 là trừ điểm, 1 là cộng điểm
    point: 20,
    trip: "Đà Nẵng - Nha Trang",
    title:
      "Đã nhận 20 điểm từ giao dịch đặt vé xe Đà Nẵng - Nha Trang chuyến 17:00 21/12/2024",
    startAt: new Date(),
    createAt: new Date(),
  },
  {
    id: 4,
    type: 0, //Type =0 là trừ điểm, 1 là cộng điểm
    point: 20,
    title:
      "Đã dùng 20 điểm từ giao dịch đặt vé xe Đà Nẵng - Nha Trang chuyến 17:00 21/12/2024",
    trip: "Đà Nẵng - Nha Trang",
    startAt: new Date(),
    createAt: new Date(),
  },
];

const ContainerMyPointDesktop = (props: IContainerMyPointDesktopProps) => {
  const { userProfile, translation, vouchers, processPoints, historiesPoint } =
    props;
  const { HEADER, POINT, BOOKING, REQUESTPAYMENT } = translation;
  const [voucherDetail, setVoucherDetail] = useState(null);
  const [showVoucherDetailModal, toggleShowVoucherDetailModal] = useModal();
  const [exchangeSuccessModal, toggleExchangeSuccessModal] = useModal();
  const [voucherSelected, setVoucherSelected] = useState<any[]>([]);
  const pathname = usePathname();
  const listIcon = [
    <UserCircleIcon />,
    <HistoryIcon />,
    <StarIcon />,
    <LogOutIcon />,
  ];
  const handleCloseApplyVoucher = () => {
    toggleShowVoucherDetailModal();
    setVoucherDetail(null);
  };
  const handleClickApplyVoucher = () => {
    // toggleShowVoucherDetailModal();
    // setVoucherDetail(null);
    // toggleExchangeSuccessModal();
  };
  const handleSelectVoucher = (voucher: any) => {
    const { id } = voucher || {};
    if (voucherSelected.includes(voucher)) {
      const cloneVoucher = [...voucherSelected];
      const indexVoucher = cloneVoucher?.findIndex((el) => el.id === id);
      cloneVoucher.splice(indexVoucher, 1);
      setVoucherSelected(cloneVoucher);
    } else {
      setVoucherSelected([...voucherSelected, voucher]);
      toggleExchangeSuccessModal();
    }
  };
  const handleClickVoucher = (voucher: any) => {
    setVoucherDetail(voucher);

    toggleShowVoucherDetailModal();
  };
  return (
    <div className="flex flex-col">
      <div className="w-[1120px] mx-auto h-full flex-1   mt-10 mb-[60px]  ">
        <div className="grid grid-cols-[30.62%_67.95%] gap-4 ">
          <div className=" h-fit py-4 w-full bg-white rounded-lg sticky top-4">
            {HEADER.accountSettings && (
              <div className=" cursor-pointer">
                {HEADER.accountSettings?.map(
                  (
                    item: {
                      title: string;
                      ref: string;

                      extraComponent?: boolean;
                    },
                    ind: number
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
                        className="py-2 px-4 hover:bg-primary-1000 flex items-center justify-start gap-4 "
                      >
                        {listIcon[ind]}
                        <div className="flex items-center gap-1">
                          <p
                            className={`text-base font-semibold  ${
                              pathname === ref
                                ? "text-primary-500"
                                : "text-neutral-grey-600"
                            }`}
                          >
                            {title}
                          </p>
                          {extraComponent && (
                            <div className="rounded-full px-2 py-1 bg-semantic-green-light">
                              <p className="text-xs font-extrabold text-semantic-green leading-[18px]">
                                {userProfile?.point
                                  ? userProfile?.point >= 1000
                                    ? "999+"
                                    : formatNumber(userProfile?.point)
                                  : 0}{" "}
                                {HEADER.point}
                              </p>
                            </div>
                          )}
                        </div>
                      </a>
                    );
                  }
                )}
              </div>
            )}
          </div>
          <div className="w-full h-full flex flex-col gap-2">
            <div className="rounded-xl bg-white p-4">
              <div className="px-2 py-1 rounded-full bg-semantic-green-light w-fit">
                <p className="font-extrabold text-neutral-grey-600 text-xs leading-[18px] uppercase">
                  {POINT.myRewardPoints}
                </p>
              </div>
              <div className="grid grid-cols-2 mt-4">
                <div className="border-r border-neutral-grey-200  ">
                  <p className="text-sm leading-[21px] text-neutral-grey-600 font-medium">
                    {POINT.availablePoints}
                  </p>
                  <p className="text-2xl leading-[33.6px] font-bold text-primary-500">
                    {formatNumber(userProfile.point) || 0}
                  </p>
                </div>
                <div className="pl-6">
                  <p className="text-sm leading-[21px] text-neutral-grey-600 font-medium">
                    {POINT.processingPoints}
                  </p>
                  <p className="text-2xl leading-[33.6px] font-bold text-primary-500">
                    {formatNumber(processPoints) || 0}
                  </p>
                </div>
              </div>
            </div>
            {/* <div className='rounded-xl bg-white p-4'>
							<div className='px-2 py-1 rounded-full bg-semantic-green-light w-fit'>
								<p className='font-extrabold text-neutral-grey-600 text-xs leading-[18px]'>
									{`VOUCHER`}
								</p>
							</div>
							<div className='grid grid-cols-2 mt-4 gap-4 max-h-[240px] overflow-auto custom-scrollbar-none-border'>
								{vouchers?.map((voucher, ind) => {
									const {
										name,
										pointExchange,
										numberOfUseDisplay,
										exchangeNumber,
										voucherId,
									} = voucher || {};
									return (
										<div
											key={ind}
											onClick={() => {
												handleClickVoucher(voucher);
											}}>
											<Voucher
												disabled={true}
												voucher={voucher}
												BOOKING={BOOKING}
												isExchange={voucherSelected.includes(
													voucher,
												)}
												handleSelectVoucher={() => {
													handleSelectVoucher(
														voucher,
													);
												}}
											/>
										</div>
									);
								})}
							</div>
						</div> */}
            <div className="rounded-xl bg-white p-4">
              <div className="px-2 py-1 rounded-full bg-semantic-green-light w-fit">
                <p className="font-extrabold text-neutral-grey-600 text-xs leading-[18px] uppercase">
                  {POINT.pointHistory}
                </p>
              </div>
              <div className=" mt-4 flex flex-col gap-3">
                {historiesPoint?.map((history, index) => {
                  const {
                    createdAt: claimAt,
                    point,
                    content: title,
                    type,
                  } = history;
                  return (
                    <div
                      key={index}
                      className="flex items-start justify-between py-2 border-b border-neutral-grey-100"
                    >
                      <div>
                        <p className="text-sm font-medium leading-[19.6px] text-neutral-grey-700 text-ellipsis line-clamp-1">
                          {title}
                        </p>
                        <p className="mt-0.5 text-sm leading-[21px] text-neutral-grey-500 font-normal">
                          {moment(claimAt).format("HH:mm • DD/MM/YYYY")}
                        </p>
                      </div>
                      <div
                        className={`rounded-full px-2 border w-fit ${
                          type === 1 || type === 3
                            ? "border-semantic-red "
                            : "border-semantic-green "
                        }`}
                      >
                        <p
                          className={`text-sm leading-[21px] font-bold ${
                            type === 1 || type === 3
                              ? "text-semantic-red "
                              : "text-semantic-green "
                          }`}
                        >
                          {type === 1 || type === 3
                            ? `-${formatNumber(point)} ${HEADER.point}`
                            : `+${formatNumber(point)} ${HEADER.point}`}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        toggleModal={handleCloseApplyVoucher}
        open={showVoucherDetailModal}
        wrapChildStyle="p-0"
        modalStyle="w-[100vw] h-[100vh] flex justify-center items-center fixed bg-black/30 z-[60] left-[calc(0%)] top-[calc(0%)]"
        childStyle="w-[600px] bg-white md:rounded-xl md:min-h-fit min-h-full mx-0  overflow-hidden duration-200 animate-fade-in "
      >
        <VoucherDetailModal
          POINT={POINT}
          voucher={voucherDetail}
          BOOKING={BOOKING}
          REQUESTPAYMENT={REQUESTPAYMENT}
          handleCloseModal={handleCloseApplyVoucher}
          handleSubmit={() => {
            // handleClickApplyVoucher();
          }}
          userProfile={userProfile}
          voucherSelected={null}
        />
      </Modal>

      <Modal
        open={exchangeSuccessModal}
        toggleModal={toggleExchangeSuccessModal}
        modalStyle="w-[100vw] h-[100vh] flex justify-center items-center fixed bg-black/30 z-[100] left-[calc(0%)] top-[calc(0%)]"
        childStyle="w-[600px] bg-white md:rounded-xl md:min-h-fit min-h-full mx-0  overflow-hidden duration-200 animate-fade-in "
      >
        <div>
          <div className="mx-auto flex justify-center mb-4">
            <ExchangeSuccessIcon />
          </div>
          <p className="mb-2 text-semantic-green text-base font-bold text-center">
            {BOOKING.exchangeSucess}
          </p>
          <p className="text-neutral-grey-700 font-medium text-sm text-center">
            {BOOKING.youExchangeSuccess}{" "}
            <span className="font-bold">20 {BOOKING.score}</span> {BOOKING.get}{" "}
            <span className="text-semantic-red text-base font-bold mt-0.5">
              {BOOKING.voucher} 20.000đ{" "}
            </span>
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default ContainerMyPointDesktop;
