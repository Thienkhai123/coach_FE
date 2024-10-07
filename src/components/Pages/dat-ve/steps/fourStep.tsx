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
import ModalPaymentMobile from "../modalPaymentMobile";
import { IPaymentTranslate } from "@/interfaces/IPaymentTranslate";
import { reservationConfirmPayment, reservationUpdateInfo } from "@/apis/trip";
import { useCustomToast } from "@/hook/useToast";
import moment from "moment";
import { IUserProfile } from "@/interfaces/httpRequest/IUser";
import useVoucher from "@/hook/account/useVoucher";
import LoadingView from "@/components/LoadingView";
import { VoucherData } from "@/interfaces/httpRequest/IVoucher";
import { IMyPointTranslate } from "@/interfaces/IMyPointTranslate";
import { IReservationUpdateInfoResponse } from "@/interfaces/httpRequest/ITrip";

interface IFourStepProps {
  authen?: boolean;
  BOOKING: IBookingTranslate;
  PAYMENT: IPaymentTranslate;
  POINT: IMyPointTranslate;
  changeNextStep: () => void;
  changePrevStep: () => void;
  bookingInformation: any;
  payloadTicket: any;
  childrenInfo: any;
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

type PriceT = {
  priceTicket: string;
  promotion: string;
  totalPrice: string;
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

const FourStep = ({
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
  setIsAcceptPayment,
}: IFourStepProps) => {
  const [open, toggle] = useModal();
  const [open2, toggle2] = useModal();
  const [openModalVoucherList, toggleModalVoucherList] = useModal();
  const [openModalPayment, toggleModalPayment] = useModal();
  const [modalContent, setModalContent] = useState<VoucherData | null>(null);
  const [selectedVoucher, setSelectedVoucher] = useState<VoucherData | null>(
    null
  );
  const [informationTrip, setInformationTrip] = useState<any>(null);
  const [informationPrice, setInfomationPrice] = useState<any>(null);
  const { vouchers, handleGetAllVouchers, loading } = useVoucher();
  const [openModalRemoveVoucher, toggleModalRemoveVoucher] = useModal();

  const { toastError } = useCustomToast();

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

  const handleRemoveVoucher = () => {
    setInfomationPrice({
      ...informationPrice,
      promotion: 0,
    });
    setSelectedVoucher(null);
    setModalContent(null);
    toggleModalRemoveVoucher();
  };

  const openModalSuccess = async () => {
    const tmpTotalPrices = informationPrice?.tempTotalPrice || 0;
    let tmpPromotion = 0;
    if (modalContent?.enumDiscountType === 0) {
      tmpPromotion = modalContent?.value || 0;
    }
    if (modalContent?.enumDiscountType === 1) {
      tmpPromotion = Math.round((tmpTotalPrices * modalContent?.value) / 100);
    }
    setSelectedVoucher(modalContent);
    setInfomationPrice({
      ...informationPrice,
      promotion: tmpPromotion,
      totalPayment: tmpTotalPrices - tmpPromotion,
    });
    toggle();
    toggle2();
  };

  const handlePayment = async () => {
    const resVoucher: IReservationUpdateInfoResponse =
      await reservationUpdateInfo({
        ...payloadTicket,
        voucherId: modalContent?.voucherId,
      });
    if (resVoucher?.isSuccess) {
      const timeCd = getTimeCountDown();
      if (timeCd) {
        setCountDownTime(timeCd);
      }
      toggleModalPayment();
    }
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
    setIsAcceptPayment(true);
    await delay(500);
    const res = await reservationConfirmPayment({
      ...payloadTicket,
      voucherId: selectedVoucher?.voucherId,
    });
    if (res?.isSuccess) {
      window.location.assign(
        `/cho-xac-nhan-thanh-toan?phone=${userPhone}&code=${code}`
      );
      // setLoading(false);
    } else {
      toastError({
        message: res?.errorMessage,
        toastId: "confirm-payment-errors",
      });
    }
  };

  useEffect(() => {
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
          tmpExtraFee =
            (childrenWithExtraFees?.length * payloadTicket?.price) / 2;
        }
      }
      setInfomationPrice({
        priceTicket:
          payloadTicket?.price * (payloadTicket?.tickets?.length || 0),
        promotion: 0,
        extraFees: tmpExtraFee,
        totalPrice:
          payloadTicket?.price * (payloadTicket?.tickets?.length || 0) +
          tmpExtraFee,
        tempTotalPrice:
          payloadTicket?.price * (payloadTicket?.tickets?.length || 0) +
          tmpExtraFee,
      });
    }
    handleGetAllVouchers({
      tripId: payloadTicket?.tripId,
      validateUserPoint: userProfile ? true : false,
    });
  }, []);

  return (
    <>
      {loading && <LoadingView />}
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

          {userProfile !== null && (
            <div className="bg-white">
              <BlockVoucher
                BOOKING={BOOKING}
                points={
                  userProfile?.point - (selectedVoucher?.pointExchange || 0)
                }
                vouchers={vouchers}
                selectedId={selectedVoucher?.voucherId || 0}
                handleUpdateModalContent={handleUpdateModalContent}
                seeAll={toggleModalVoucherList}
              />
            </div>
          )}

          <div className="bg-white p-4">
            <div className="bg-semantic-green-light py-1 px-2 rounded-full w-fit mb-2">
              <p className="text-neutral-grey-600 font-extrabold text-xs">
                {BOOKING.detailPrice}
              </p>
            </div>

            <RenderRow
              title={BOOKING.priceTicket}
              value={informationPrice?.priceTicket?.toLocaleString() + "đ"}
            />

            <RenderRow
              title={BOOKING.promotion}
              value={
                informationPrice?.promotion?.toLocaleString() +
                "đ" +
                (selectedVoucher?.enumDiscountType === 1
                  ? ` (${selectedVoucher?.value || 0}%)`
                  : "")
              }
            />

            <RenderRow
              title={BOOKING.extraFeeChildren}
              value={informationPrice?.extraFees?.toLocaleString() + "đ"}
            />

            <RenderRow
              title={BOOKING.totalPrice}
              value={
                (
                  informationPrice?.totalPrice - informationPrice?.promotion
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

        <FullScreenModal
          open={openModalPayment}
          childStyle="animate-fade-in w-screen bg-neutral-grey-100 overflow-y-auto h-[100vh]"
        >
          <ModalPaymentMobile
            BOOKING={BOOKING}
            PAYMENT={PAYMENT}
            toggleModalPayment={toggleModalPayment}
            handleSubmit={handleSubmit}
            payloadTicket={payloadTicket}
            countdownTime={countdownTime}
            informationPrice={informationPrice}
            totalCost={
              informationPrice?.totalPrice - informationPrice?.promotion
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
                  informationPrice?.totalPrice - informationPrice?.promotion
                )?.toLocaleString() +
                "đ"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FourStep;
