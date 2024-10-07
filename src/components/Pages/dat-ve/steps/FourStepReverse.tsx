import CountDown from "@/components/count-down";
import { IBookingTranslate } from "@/interfaces/IBookingTranslate";
import { useEffect, useState } from "react";
import BlockVoucher from "../blockVoucher";
import useModal from "@/hook/useModal";
import FullScreenModal from "@/components/modal/FullScreenModal";
import {
  delay,
  getDaysRange,
  getTimeCountDown,
} from "@/helpers/functionHelper";
import Modal from "@/components/modal/Modal";
import NavbarBasic from "@/components/navbar/basic";
import Button from "@/components/button";
import Image from "next/legacy/image";
import Voucher from "../voucher";
import ExchangeSuccessIcon from "@/components/icons/exchangeSuccess";
import { IPaymentTranslate } from "@/interfaces/IPaymentTranslate";
import { reservationConfirmPayment, reservationUpdateInfo } from "@/apis/trip";
import { useCustomToast } from "@/hook/useToast";
import moment from "moment";
import { IUserProfile } from "@/interfaces/httpRequest/IUser";
import useVoucher from "@/hook/account/useVoucher";
import LoadingView from "@/components/LoadingView";
import { VoucherData } from "@/interfaces/httpRequest/IVoucher";
import { IMyPointTranslate } from "@/interfaces/IMyPointTranslate";
import ModalPaymentMobileReverse from "../modalPaymentMobileReverse";

interface IFourStepProps {
  authen?: boolean;
  BOOKING: IBookingTranslate;
  PAYMENT: IPaymentTranslate;
  POINT: IMyPointTranslate;
  changeNextStep: () => void;
  changePrevStep: () => void;
  bookingInformation: any;
  bookingInformationReverse: any;
  payloadTicket: any;
  payloadTicketReverse: any;
  childrenInfo: any;
  childrenInfoReverse: any;
  userProfile: IUserProfile;
  countdownTime: number;
  setCountDownTime: (arg: number) => void;
  isRevert?: boolean;
  setIsAcceptPayment: (arg: any) => void;
}

type InfomationT = {
  routes: string;
  timeLeave: string;
  carType: string;
  pickLocation: string;
  dropLocation: string;
  amountSeats: string;
  seats: string;
  totalPriceGo: string;
};

const RenderRow = ({ title = "", value = "-" }) => {
  return (
    <div className="flex justify-between items-center gap-4 py-2 border-b border-b-neutral-grey-100">
      <p className="text-neutral-grey-600 font-medium text-sm">{title}</p>
      <p className="text-neutral-grey-700 font-semibold text-sm">{value}</p>
    </div>
  );
};

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
            {moment(dateStartUsage)?.format("HH:mm,DD-MM-YYYY")}{" "}
            {BOOKING.voucherApplyTo}{" "}
            {moment(dateEndExchange)?.format("HH:mm,DD-MM-YYYY")}
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

const FourStepReverse = ({
  BOOKING,
  PAYMENT,
  POINT,
  changePrevStep,
  bookingInformation,
  payloadTicket,
  childrenInfo,
  userProfile,
  countdownTime,
  setCountDownTime,
  isRevert = false,
  bookingInformationReverse,
  payloadTicketReverse,
  childrenInfoReverse,
  setIsAcceptPayment,
}: IFourStepProps) => {
  const [open, toggle] = useModal();
  const [openReverse, toggleReverse] = useModal();
  const [open2, toggle2] = useModal();
  const [open2Reverse, toggle2Reverse] = useModal();
  const [openModalVoucherList, toggleModalVoucherList] = useModal();
  const [openModalVoucherListReverse, toggleModalVoucherListReverse] =
    useModal();
  const [openModalPayment, toggleModalPayment] = useModal();
  const [modalContent, setModalContent] = useState<VoucherData | null>(null);
  const [modalContentReverse, setModalContentReverse] =
    useState<VoucherData | null>(null);
  const [selectedVoucher, setSelectedVoucher] = useState<VoucherData | null>(
    null
  );
  const [selectedVoucherReverse, setSelectedVoucherReverse] =
    useState<VoucherData | null>(null);
  const [informationTrip, setInformationTrip] = useState<any>(null);
  const [informationTripReverse, setInformationTripReverse] =
    useState<any>(null);
  const [informationPrice, setInfomationPrice] = useState<any>(null);
  const [informationPriceReverse, setInfomationPriceReverse] =
    useState<any>(null);
  const { vouchers, handleGetAllVouchers, loading } = useVoucher();
  const {
    vouchers: vouchersReverse,
    handleGetAllVouchers: handleGetAllVouchersReverse,
    loading: loadingReverse,
  } = useVoucher();

  const [totalPriceTrips, setTotalPriceTrips] = useState(0);
  const [totalPromotion, setTotalPromotion] = useState({
    start: 0,
    end: 0,
  });
  const [totalExtraFees, setTotalExtraFees] = useState({
    start: 0,
    end: 0,
  });
  const [isLoading, setisLoading] = useState(false);
  const [openModalRemoveVoucher, toggleModalRemoveVoucher] = useModal();
  const [openModalRemoveVoucherReverse, toggleModalRemoveVoucherReverse] =
    useModal();

  const handleUpdateModalContent = (voucher: VoucherData) => {
    if (!selectedVoucher) {
      if (voucher) {
        setModalContent(voucher);
        toggle();
      }
    } else {
      if (selectedVoucher?.voucherId === voucher?.voucherId) {
        toggleModalRemoveVoucher();
      } else {
        if (voucher) {
          setModalContent(voucher);
          toggle();
        }
      }
    }
  };

  const handleUpdateModalContentReverse = (voucher: VoucherData) => {
    if (!selectedVoucherReverse) {
      if (voucher) {
        setModalContentReverse(voucher);
        toggleReverse();
      }
    } else {
      if (selectedVoucherReverse?.voucherId === voucher?.voucherId) {
        toggleModalRemoveVoucherReverse();
      } else {
        if (voucher) {
          setModalContentReverse(voucher);
          toggleReverse();
        }
      }
    }
  };

  const handleExhangeVoucherInModalList = (voucher: VoucherData) => {
    if (!selectedVoucher) {
      if (voucher) {
        setModalContent(voucher);
        toggleModalVoucherList();
        toggle();
      }
    } else {
      if (selectedVoucher?.voucherId === voucher?.voucherId) {
        toggleModalRemoveVoucher();
      } else {
        if (voucher) {
          setModalContent(voucher);
          toggleModalVoucherList();
          toggle();
        }
      }
    }
  };

  const handleExhangeVoucherInModalListReverse = (voucher: VoucherData) => {
    if (!selectedVoucherReverse) {
      if (voucher) {
        setModalContentReverse(voucher);
        toggleModalVoucherListReverse();
        toggleReverse();
      }
    } else {
      if (selectedVoucherReverse?.voucherId === voucher?.voucherId) {
        toggleModalRemoveVoucherReverse();
      } else {
        if (voucher) {
          setModalContentReverse(voucher);
          toggleModalVoucherListReverse();
          toggleReverse();
        }
      }
    }
  };

  const openModalSuccess = async () => {
    let tmpPromotion = 0;
    if (modalContent?.enumDiscountType === 0) {
      tmpPromotion = modalContent?.value || 0;
    }
    if (modalContent?.enumDiscountType === 1) {
      let thisExtraFees = 0;
      const childrenWithExtraFees = childrenInfo?.filter(
        (child: any) => child?.option === "option2"
      );
      if (childrenWithExtraFees?.length > 0) {
        thisExtraFees +=
          (childrenWithExtraFees?.length * payloadTicket?.price) / 2;
      }
      const thisFinalPrice =
        payloadTicket?.price * (payloadTicket?.tickets?.length || 0) +
        thisExtraFees;
      tmpPromotion = Math.round(thisFinalPrice * (modalContent?.value / 100));
    }
    setSelectedVoucher(modalContent);
    setTotalPromotion({
      ...totalPromotion,
      start: tmpPromotion,
    });
    toggle();
    toggle2();
  };

  const openModalSuccessReverse = async () => {
    let tmpPromotion = 0;
    if (modalContentReverse?.enumDiscountType === 0) {
      tmpPromotion = modalContentReverse?.value || 0;
    }
    if (modalContentReverse?.enumDiscountType === 1) {
      let thisExtraFees = 0;
      const childrenWithExtraFees = childrenInfoReverse?.filter(
        (child: any) => child?.option === "option2"
      );
      if (childrenWithExtraFees?.length > 0) {
        thisExtraFees +=
          (childrenWithExtraFees?.length * payloadTicketReverse?.price) / 2;
      }
      const thisFinalPrice =
        payloadTicketReverse?.price *
          (payloadTicketReverse?.tickets?.length || 0) +
        thisExtraFees;
      tmpPromotion = Math.round(
        thisFinalPrice * (modalContentReverse?.value / 100)
      );
    }
    setSelectedVoucherReverse(modalContentReverse);
    setTotalPromotion({
      ...totalPromotion,
      end: tmpPromotion,
    });
    toggleReverse();
    toggle2Reverse();
  };

  const handleRemoveVoucher = () => {
    setTotalPromotion({
      ...totalPromotion,
      start: 0,
    });
    setSelectedVoucher(null);
    setModalContent(null);
    toggleModalRemoveVoucher();
  };

  const handleRemoveVoucherReverse = () => {
    setTotalPromotion({
      ...totalPromotion,
      end: 0,
    });
    setSelectedVoucherReverse(null);
    setModalContentReverse(null);
    toggleModalRemoveVoucherReverse();
  };

  const handlePayment = async () => {
    Promise.all([
      await reservationUpdateInfo({
        ...payloadTicket,
        voucherId: modalContent?.voucherId,
      }),
      await reservationUpdateInfo({
        ...payloadTicketReverse,
        voucherId: modalContentReverse?.voucherId,
      }),
    ])
      .then(function (values) {
        if (values?.length === 2) {
          const timeCd = getTimeCountDown();
          if (timeCd) {
            setCountDownTime(timeCd);
          }
          toggleModalPayment();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const INFORMATION = {
    routes: BOOKING.routes,
    timeLeave: BOOKING.timeLeave,
    carType: BOOKING.carType,
    pickLocation: BOOKING.pickLocation,
    dropLocation: BOOKING.dropLocation,
    amountSeats: BOOKING.amountSeats,
    seats: BOOKING.seatLocation,
    totalPriceGo: BOOKING.totalPriceGo,
  };

  const handleSubmit = async () => {
    const { userPhone, code } = payloadTicket;
    const { code: codeReturn } = payloadTicketReverse;
    setIsAcceptPayment(true);
    await delay(500);
    setisLoading(true);
    Promise.all([
      await reservationConfirmPayment(payloadTicket),
      await reservationConfirmPayment(payloadTicketReverse),
    ])
      .then(function (values) {
        if (values?.length === 2) {
          window.location.assign(
            `/cho-xac-nhan-thanh-toan?phone=${userPhone}&code=${code}&codeReturn=${codeReturn}`
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    let totalTripsPrice = 0;
    let tmpExtraFeeStart = 0;
    let tmpExtraFeeEnd = 0;
    if (Object.keys(bookingInformation)?.length > 0) {
      setInformationTrip({
        routes: payloadTicket?.route?.name || "",
        timeLeave:
          moment(payloadTicket?.trip.startAt).format("HH:mm, DD/MM/YYYY") || "",
        carType: payloadTicket?.trip?.vehicle?.name || "",
        pickLocation: bookingInformation?.pickLocation?.title || "",
        dropLocation: bookingInformation?.dropLocation?.title || "",
        amountSeats: bookingInformation?.seats?.length || 0,
        seats: bookingInformation?.seats?.toString() || "",
      });

      let tmpExtraFee = 0;

      if (childrenInfo?.length > 0) {
        const childrenWithExtraFees = childrenInfo?.filter(
          (child: any) => child?.option === "option2"
        );
        if (childrenWithExtraFees?.length > 0) {
          tmpExtraFeeStart =
            (childrenWithExtraFees?.length * payloadTicket?.price) / 2;
          tmpExtraFee =
            (childrenWithExtraFees?.length * payloadTicket?.price) / 2;
        }
      }
      setInfomationPrice({
        priceTicket:
          (
            payloadTicket?.price * (payloadTicket?.tickets?.length || 0)
          )?.toLocaleString() + "đ",
      });
      totalTripsPrice +=
        payloadTicket?.price * (payloadTicket?.tickets?.length || 0) +
        tmpExtraFee;
    }
    if (Object.keys(bookingInformationReverse)?.length > 0) {
      setInformationTripReverse({
        routes: payloadTicketReverse?.route?.name || "",
        timeLeave:
          moment(payloadTicketReverse?.trip.startAt).format(
            "HH:mm, DD/MM/YYYY"
          ) || "",
        carType: payloadTicketReverse?.trip?.vehicle?.name || "",
        pickLocation: bookingInformationReverse?.pickLocation?.title || "",
        dropLocation: bookingInformationReverse?.dropLocation?.title || "",
        amountSeats: bookingInformationReverse?.seats?.length || 0,
        seats: bookingInformationReverse?.seats?.toString() || "",
      });
      let tmpExtraFee = 0;

      if (childrenInfoReverse?.length > 0) {
        const childrenWithExtraFees = childrenInfoReverse?.filter(
          (child: any) => child?.option === "option2"
        );
        if (childrenWithExtraFees?.length > 0) {
          tmpExtraFeeEnd +=
            (childrenWithExtraFees?.length * payloadTicketReverse?.price) / 2;
          tmpExtraFee =
            (childrenWithExtraFees?.length * payloadTicketReverse?.price) / 2;
        }
      }
      setInfomationPriceReverse({
        priceTicket:
          (
            payloadTicketReverse?.price *
            (payloadTicketReverse?.tickets?.length || 0)
          )?.toLocaleString() + "đ",
      });
      totalTripsPrice +=
        payloadTicketReverse?.price *
          (payloadTicketReverse?.tickets?.length || 0) +
        tmpExtraFee;
    }
    handleGetAllVouchers({
      tripId: payloadTicket?.tripId,
      validateUserPoint: userProfile ? true : false,
    });
    handleGetAllVouchersReverse({
      tripId: payloadTicketReverse?.tripId,
      validateUserPoint: userProfile ? true : false,
    });
    setTotalPriceTrips(totalTripsPrice);
    setTotalExtraFees({
      start: tmpExtraFeeStart,
      end: tmpExtraFeeEnd,
    });
  }, []);

  return (
    <>
      {(loading || loadingReverse || isLoading) && <LoadingView />}
      <div className="relative pb-40">
        <div className="bg-[#EFEFF0] flex flex-col gap-2">
          <div className="bg-white p-4">
            <div className="bg-semantic-green-light py-1 px-2 rounded-full w-fit mb-2">
              <p className="text-neutral-grey-600 font-extrabold text-xs">
                {BOOKING.informationGo}
              </p>
            </div>
            {informationTrip &&
              Object.keys(informationTrip)?.map((info, index) => (
                <RenderRow
                  key={`information-${index}`}
                  title={INFORMATION[info as keyof InfomationT]}
                  value={informationTrip[info]}
                />
              ))}
          </div>

          <div className="bg-white p-4">
            <div className="bg-semantic-green-light py-1 px-2 rounded-full w-fit mb-2">
              <p className="text-neutral-grey-600 font-extrabold text-xs">
                {BOOKING.informationBack}
              </p>
            </div>
            {informationTripReverse &&
              Object.keys(informationTripReverse)?.map((info, index) => (
                <RenderRow
                  key={`information-reverse-${index}`}
                  title={INFORMATION[info as keyof InfomationT]}
                  value={informationTripReverse[info]}
                />
              ))}
          </div>

          {userProfile !== null && (
            <>
              <div className="bg-white">
                <BlockVoucher
                  BOOKING={BOOKING}
                  points={
                    userProfile?.point -
                    (selectedVoucher?.pointExchange || 0) -
                    (selectedVoucherReverse?.pointExchange || 0)
                  }
                  vouchers={vouchers}
                  selectedId={selectedVoucher?.voucherId || 0}
                  handleUpdateModalContent={handleUpdateModalContent}
                  seeAll={toggleModalVoucherList}
                  type={2}
                />
              </div>

              <div className="bg-white">
                <BlockVoucher
                  BOOKING={BOOKING}
                  points={
                    userProfile?.point -
                    (selectedVoucher?.pointExchange || 0) -
                    (selectedVoucherReverse?.pointExchange || 0)
                  }
                  vouchers={vouchersReverse}
                  selectedId={selectedVoucherReverse?.voucherId || 0}
                  handleUpdateModalContent={handleUpdateModalContentReverse}
                  seeAll={toggleModalVoucherListReverse}
                  type={3}
                />
              </div>
            </>
          )}

          <div className="bg-white p-4">
            <div className="bg-semantic-green-light py-1 px-2 rounded-full w-fit mb-2">
              <p className="text-neutral-grey-600 font-extrabold text-xs">
                {BOOKING.detailPrice}
              </p>
            </div>

            {informationPrice?.priceTicket && (
              <RenderRow
                title={BOOKING.priceTicket}
                value={informationPrice?.priceTicket}
              />
            )}

            {informationPriceReverse?.priceTicket && (
              <RenderRow
                title={BOOKING.priceTicket2}
                value={informationPriceReverse?.priceTicket}
              />
            )}

            <RenderRow
              title={BOOKING.promotion + " - " + BOOKING.departure}
              value={
                totalPromotion?.start?.toLocaleString() +
                "đ" +
                (selectedVoucher?.enumDiscountType === 1
                  ? ` (${selectedVoucher?.value || 0}%)`
                  : "")
              }
            />

            <RenderRow
              title={BOOKING.promotion + " - " + BOOKING.return}
              value={
                totalPromotion?.end?.toLocaleString() +
                "đ" +
                (selectedVoucherReverse?.enumDiscountType === 1
                  ? ` (${selectedVoucherReverse?.value || 0}%)`
                  : "")
              }
            />

            <RenderRow
              title={BOOKING.extraFee + " - " + BOOKING.departure}
              value={totalExtraFees?.start?.toLocaleString() + "đ"}
            />
            <RenderRow
              title={BOOKING.extraFee + " - " + BOOKING.return}
              value={totalExtraFees?.end?.toLocaleString() + "đ"}
            />

            <RenderRow
              title={BOOKING.totalPrice}
              value={
                (
                  totalPriceTrips -
                  totalPromotion?.start -
                  totalPromotion?.end
                )?.toLocaleString() + "đ"
              }
            />
          </div>
        </div>

        <FullScreenModal open={open}>
          <NavbarBasic title={BOOKING.voucherDetail} handleClick={toggle} />

          <RenderModalContent
            voucher={modalContent}
            BOOKING={BOOKING}
            POINT={POINT}
            toggle={openModalSuccess}
          />
        </FullScreenModal>

        <FullScreenModal open={openReverse}>
          <NavbarBasic
            title={BOOKING.voucherDetail}
            handleClick={toggleReverse}
          />

          <RenderModalContent
            voucher={modalContentReverse}
            BOOKING={BOOKING}
            POINT={POINT}
            toggle={openModalSuccessReverse}
          />
        </FullScreenModal>

        <FullScreenModal
          open={openModalVoucherList}
          childStyle="animate-fade-in w-screen bg-neutral-grey-100 overflow-y-auto h-[100vh]"
        >
          <NavbarBasic
            title={BOOKING.voucherList}
            handleClick={toggleModalVoucherList}
          />
          <div className="bg-white p-4 flex flex-col gap-2">
            {vouchers?.map((voucher, ind) => (
              <Voucher
                key={`voucher-item-${ind}`}
                BOOKING={BOOKING}
                voucher={voucher}
                isExchange={
                  (selectedVoucher?.voucherId || 0) === voucher?.voucherId
                }
                handleSelectVoucher={handleExhangeVoucherInModalList}
              />
            ))}
          </div>
        </FullScreenModal>

        <FullScreenModal
          open={openModalVoucherListReverse}
          childStyle="animate-fade-in w-screen bg-neutral-grey-100 overflow-y-auto h-[100vh]"
        >
          <NavbarBasic
            title={BOOKING.voucherList}
            handleClick={toggleModalVoucherListReverse}
          />
          <div className="bg-white p-4 flex flex-col gap-2">
            {vouchersReverse?.map((voucher, ind) => (
              <Voucher
                key={`voucher-item-${ind}`}
                BOOKING={BOOKING}
                voucher={voucher}
                isExchange={
                  (selectedVoucherReverse?.voucherId || 0) ===
                  voucher?.voucherId
                }
                handleSelectVoucher={handleExhangeVoucherInModalListReverse}
              />
            ))}
          </div>
        </FullScreenModal>

        <Modal
          open={open2}
          toggleModal={toggle2}
          childStyle="animate-fade-in w-screen sm:w-[800px] xl:mx-0 mx-3 bg-white rounded-xl overflow-y-auto xl:h-fit max-h-[80vh] "
        >
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
              Voucher{" "}
              {modalContent?.enumDiscountType === 0
                ? modalContent?.value?.toLocaleString() + "đ"
                : parseInt(modalContent?.value?.toString() || "0") + "%"}
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

        <Modal
          open={openModalRemoveVoucherReverse}
          toggleModal={toggleModalRemoveVoucherReverse}
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
                onClick={toggleModalRemoveVoucherReverse}
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
                onClick={handleRemoveVoucherReverse}
              >
                {BOOKING.confirm}
              </Button>
            </div>
          </div>
        </Modal>

        <Modal
          open={open2Reverse}
          toggleModal={toggle2Reverse}
          childStyle="animate-fade-in w-screen sm:w-[800px] xl:mx-0 mx-3 bg-white rounded-xl overflow-y-auto xl:h-fit max-h-[80vh] "
        >
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
                {modalContentReverse?.pointExchange} {POINT.points}
              </span>{" "}
              {POINT.take}
            </p>
            <p className="text-primary-500 font-bold text-sm text-center mb-3">
              Voucher{" "}
              {modalContentReverse?.enumDiscountType === 0
                ? modalContentReverse?.value?.toLocaleString() + "đ"
                : parseInt(modalContentReverse?.value?.toString() || "0") + "%"}
            </p>
          </div>
        </Modal>

        <FullScreenModal
          open={openModalPayment}
          childStyle="animate-fade-in w-screen bg-neutral-grey-100 overflow-y-auto h-[100vh]"
        >
          <ModalPaymentMobileReverse
            BOOKING={BOOKING}
            PAYMENT={PAYMENT}
            toggleModalPayment={toggleModalPayment}
            handleSubmit={handleSubmit}
            payloadTicket={payloadTicket}
            payloadTicketReverse={payloadTicketReverse}
            countdownTime={countdownTime}
            totalPrices={
              totalPriceTrips - totalPromotion?.start - totalPromotion?.end
            }
          />
        </FullScreenModal>

        <div className="fixed bottom-0 z-10 p-4 bg-white w-full border border-neutral-grey-100 shadow-[gba(0,0,0,0.06),rgba(0,0,0,0.03)] ">
          <p className="text-black text-sm font-semibold text-center mb-3">
            {BOOKING.expiredBookingDuration}{" "}
            {countdownTime && <CountDown inputTimer={countdownTime} />}
            {!countdownTime && "--:--"}
          </p>
          <div className="flex gap-1">
            <Button
              onClick={changePrevStep}
              btnColor="bg-common"
              color="text-black"
              borderType="border-none"
              width="w-[100px]"
            >
              {BOOKING.cancel}
            </Button>

            <Button onClick={handlePayment}>
              {BOOKING.payment +
                " - " +
                (
                  totalPriceTrips -
                  totalPromotion?.start -
                  totalPromotion?.end
                )?.toLocaleString() +
                "đ"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FourStepReverse;
