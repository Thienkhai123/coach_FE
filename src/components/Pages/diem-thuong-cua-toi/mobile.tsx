import React, { useState } from "react";
import { ITranslation } from "@/interfaces/ITranslation";
// import BlockVoucher from "../dat-ve/blockVoucher";
import useModal from "@/hook/useModal";
import FullScreenModal from "@/components/modal/FullScreenModal";
import NavbarBasic from "@/components/navbar/basic";
import { IBookingTranslate } from "@/interfaces/IBookingTranslate";
import Modal from "@/components/modal/Modal";
import Button from "@/components/button";
import { IUserProfile } from "@/interfaces/httpRequest/IUser";
import Voucher from "../dat-ve/voucher";
import { VoucherData } from "@/interfaces/httpRequest/IVoucher";
import { formatNumber, getDaysRange } from "@/helpers/functionHelper";
import Image from "next/legacy/image";
import { IMyPointTranslate } from "@/interfaces/IMyPointTranslate";
import moment from "moment";
import { ExchangeSuccessIcon } from "@/components/icons";
import { IHistoriesPoints } from "@/interfaces/httpRequest/IPoints";
import useTrans from "@/hook/useTrans";

interface IContainerMyPointMobileProps {
  translation: ITranslation;
  userProfile: IUserProfile;
  vouchers: VoucherData[];
  processPoints: number;
  historiesPoint: IHistoriesPoints;
}

const RenderModalContent = ({
  voucher,
  BOOKING,
  POINT,
  toggle,
}: {
  voucher: VoucherData | null;
  BOOKING: IBookingTranslate;
  POINT: IMyPointTranslate;
  toggle: () => void;
}) => {
  const {
    name,
    dateStartExchange,
    dateEndExchange,
    pointExchange,
    dateStartUsage,
  } = voucher || {};

  if (voucher === null) {
    return <div></div>;
  }
  return (
    <div>
      <div className="w-full h-[134px] relative">
        <Image alt="" src="/images/voucher-thumb-mobile.png" layout="fill" />
      </div>
      <div className="p-4">
        <p className="text-black font-semibold text-base">{name}</p>
        <p className="text-[#61646B] text-sm font-medium">
          HSD:{" "}
          {getDaysRange({
            startDate: dateStartExchange,
            expiredDate: dateEndExchange,
            days: BOOKING.days,
          })}
        </p>
      </div>
      <div className="border-t border-b border-t-[#AFB1B6] border-b-[#AFB1B6] p-4">
        <p className="text-black font-semibold text-base">
          {BOOKING.conditionalApply}
        </p>
        <ul className="list-disc list-inside">
          <li className="text-[#61646B] font-medium text-sm">
            {BOOKING.voucherApplyFrom}{" "}
            {moment(dateStartUsage)?.format("DD-MM-YYYY")}{" "}
            {BOOKING.voucherApplyTo}{" "}
            {moment(dateEndExchange)?.format("DD-MM-YYYY")}
          </li>
        </ul>
      </div>
      <div className="p-4">
        <Button onClick={toggle}>
          {BOOKING.exchange + " " + pointExchange + " " + BOOKING.score}
        </Button>
      </div>
    </div>
  );
};

const ContainerMyPointMobile = (props: IContainerMyPointMobileProps) => {
  const { translation, userProfile, vouchers, processPoints, historiesPoint } =
    props;
  const { POINT, BOOKING } = translation;
  const [selectedId, setSelectedId] = useState(0);
  const [modalContent, setModalContent] = useState<VoucherData | null>(null);
  const [open, toggle] = useModal();
  const [open2, toggle2] = useModal();
  const [openModalVoucherList, toggleModalVoucherList] = useModal();
  const [openModalRemoveVoucher, toggleModalRemoveVoucher] = useModal();
  const trans = useTrans();
  const { HEADER } = trans;

  const handleUpdateModalContent = (voucher: VoucherData) => {
    if (!selectedId) {
      if (voucher) {
        setModalContent(voucher);
        toggle();
      }
    } else {
      toggleModalRemoveVoucher();
    }
  };

  const handleRemoveVoucher = () => {
    setSelectedId(0);
    setModalContent(null);
    toggleModalRemoveVoucher();
  };

  const openModalSuccess = () => {
    setSelectedId(modalContent?.voucherId || 0);
    toggle();
    toggle2();
  };

  return (
    <>
      <div className="px-3 flex flex-col gap-2 pt-3">
        <div className="rounded-lg bg-white pt-3">
          <div className="bg-semantic-green-light py-1 px-2 rounded-full w-fit mx-3">
            <p className="text-neutral-grey-600 font-extrabold text-xs uppercase">
              {POINT.myPoints}
            </p>
          </div>
          <div className="grid grid-cols-2 py-4">
            <div className="border-r border-r-[#AFB1B6] px-3">
              <p className="text-neutral-grey-600 font-medium text-sm">
                {POINT.availablePoints}
              </p>
              <p className="text-primary-500 font-bold text-2xl">
                {userProfile?.point || 0}
              </p>
            </div>
            <div className="px-3 ">
              <p className="text-neutral-grey-600 font-medium text-sm">
                {POINT.processingPoints}
              </p>
              <p className="text-primary-500 font-bold text-2xl overflow-hidden text-ellipsis">
                {formatNumber(processPoints)}
              </p>
            </div>
          </div>
        </div>

        {/* <div className="py-4 rounded-xl bg-white">
          <div className="flex gap-4 justify-between px-4 items-center">
            <div className="bg-semantic-green-light py-1 px-2 rounded-full w-fit">
              <p className="text-neutral-grey-600 font-extrabold text-xs uppercase">
                {BOOKING.voucher}
              </p>
            </div>
            <div onClick={toggleModalVoucherList}>
              <p className="text-secondary-300 font-semibold text-sm underline">
                {POINT.seeAll}
              </p>
            </div>
          </div>

          <div className="">
            <BlockVoucher
              BOOKING={BOOKING}
              points={0}
              vouchers={vouchers}
              selectedId={selectedId}
              handleUpdateModalContent={handleUpdateModalContent}
              showcontent={false}
              btnTitle={POINT.claimNow}
              wrapperClassName=""
              seeAll={() => {}}
              slidesPerView={1.1}
            />
          </div>
        </div> */}

        <div className="border border-[#D9D9D9] py-4 rounded-xl px-3 mb-4 bg-white">
          <div className="bg-semantic-green-light py-1 px-2 rounded-full w-fit">
            <p className="text-neutral-grey-600 font-extrabold text-xs uppercase">
              {POINT.pointHistory}
            </p>
          </div>
          <div>
            {historiesPoint.map((history, index) => {
              const {
                createdAt: claimAt,
                point,
                content: title,
                type,
              } = history;
              const thisClaimTime =
                new Date(claimAt).getHours() +
                ":" +
                new Date(claimAt).getMinutes();
              const thisClaimDate = new Date(claimAt).toLocaleDateString();
              return (
                <div
                  key={`history-${index}`}
                  className="py-2 border-b border-b-neutral-grey-100  flex gap-4"
                >
                  <div className="flex-1">
                    <p className="text-neutral-grey-700 font-medium text-sm">
                      {title}
                    </p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <p className="text-neutral-grey-500 font-normal text-sm">
                        {thisClaimTime}
                      </p>
                      <div className="rounded-full w-1 h-1 bg-neutral-grey-300" />
                      <p className="text-neutral-grey-500  font-normal text-sm">
                        {thisClaimDate}
                      </p>
                    </div>
                  </div>
                  <div>
                    {type !== 3 && (
                      <div className="border border-semantic-green rounded-full px-2 py-0.5">
                        <p className="text-semantic-green font-bold text-sm">
                          +{formatNumber(point)} {HEADER.point}
                        </p>
                      </div>
                    )}
                    {type === 3 && (
                      <div className="border border-semantic-red rounded-full px-2 py-0.5">
                        <p className="text-semantic-red font-bold text-sm">
                          -{formatNumber(point)} {HEADER.point}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <FullScreenModal
        open={openModalVoucherList}
        childStyle="animate-fade-in w-screen bg-neutral-grey-100 overflow-y-auto h-[100vh]"
      >
        <NavbarBasic
          title={BOOKING.voucherList}
          handleClick={toggleModalVoucherList}
        />
        {vouchers?.length > 0 && (
          <div className="bg-white p-4 flex flex-col gap-2">
            {vouchers?.map((voucher, ind) => (
              <Voucher
                key={`voucher-item-${ind}`}
                disabled
                voucher={voucher}
                BOOKING={BOOKING}
                isExchange={selectedId === voucher?.voucherId}
                handleSelectVoucher={handleUpdateModalContent}
              />
            ))}
          </div>
        )}
      </FullScreenModal>

      <FullScreenModal open={open}>
        <NavbarBasic title={BOOKING.voucherDetail} handleClick={toggle} />

        <RenderModalContent
          voucher={modalContent}
          BOOKING={BOOKING}
          POINT={POINT}
          toggle={openModalSuccess}
        />
      </FullScreenModal>

      <Modal open={open2} toggleModal={toggle2}>
        <div>
          <div className="flex justify-center mb-4">
            <ExchangeSuccessIcon />
          </div>
          <p className="mb-2 text-semantic-green text-base font-bold text-center">
            {BOOKING.exchangeSucess}
          </p>
          <p className="text-neutral-700 font-medium text-sm text-center mb-1">
            {POINT.youExchangedSuccess}{" "}
            <span className="font-bold">
              {modalContent?.pointExchange} {POINT.points}
            </span>{" "}
            {POINT.take}
          </p>
          <p className="text-primary-500 font-bold text-sm text-center mb-3">
            Voucher {modalContent?.value?.toLocaleString() + "đ"}
          </p>
        </div>
      </Modal>

      <Modal
        open={openModalRemoveVoucher}
        toggleModal={toggleModalRemoveVoucher}
        wrapChildStyle="p-4"
      >
        <div>
          <div className="p-4 flex items-center justify-center border-b border-neutral-grey-200">
            <p className="text-base font-semibold">{BOOKING.confirmCancel}</p>
          </div>
          <div className="max-h-[600px] my-4 overflow-auto  flex flex-col items-center justify-center">
            <p className="text-base text-neutral-grey-700 leading-[24px] font-medium">
              {BOOKING.contentCancel}
            </p>
          </div>

          <div className="flex items-center gap-3 ">
            <Button
              btnColor="bg-neutral-grey-100 group"
              height="h-11"
              borderRadius="rounded-full"
              borderColor="border-none"
              color="text-black "
              fontSize="text-sm"
              onClick={toggleModalRemoveVoucher}
            >
              {BOOKING.cancelApply}
            </Button>
            <Button
              btnColor="disabled:bg-primary-600 bg-primary-500 disabled:opacity-100 group"
              height="h-11"
              borderRadius="rounded-full"
              borderColor="border-none"
              color="group-disabled:text-opacity-60 text-white "
              fontSize="text-sm"
              onClick={handleRemoveVoucher}
            >
              {BOOKING.confirm}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ContainerMyPointMobile;
