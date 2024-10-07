import { IBookingTranslate } from "@/interfaces/IBookingTranslate";
import { useEffect, useState } from "react";
import { IErrorTranslate } from "@/interfaces/IErrorTranslate";
import { IPlaceholderTranslate } from "@/interfaces/IPlaceholderTranslate";
import FourStep from "./steps/fourStep";
import Stepper from "@/components/stepper";
import { ISignInTranslate } from "@/interfaces/ISignInTranslate";
import NavbarTrip from "./navbarTrip";
import { IPaymentTranslate } from "@/interfaces/IPaymentTranslate";
import {
  IReservationStartData,
  IReservationStartResponse,
  IReservationValidateSeatsData,
  ITripData,
} from "@/interfaces/httpRequest/ITrip";
import {
  cancelBatch,
  reservationStart,
  reservationUpdateInfo,
  reservationValidateSeats,
} from "@/apis/trip";
import { useCustomToast } from "@/hook/useToast";
import { IUserProfile } from "@/interfaces/httpRequest/IUser";
import { getTimeCountDown } from "@/helpers/functionHelper";
import { IMyPointTranslate } from "@/interfaces/IMyPointTranslate";
import LoadingView from "@/components/LoadingView";
import FirstStepReverse from "./steps/firstStepReverse";
import ThirdStepReverse from "./steps/thirdStepReverse";
import SecondStepReverse from "./steps/secondStepReverse";
import isEmpty from "lodash/isEmpty";
import FourStepReverse from "./steps/FourStepReverse";

interface IPickSeatReverseMobileProps {
  BOOKING: IBookingTranslate;
  ERROR: IErrorTranslate;
  PLACEHOLDER: IPlaceholderTranslate;
  SIGNIN: ISignInTranslate;
  PAYMENT: IPaymentTranslate;
  POINT: IMyPointTranslate;
  handleChangePrevStep: () => void;
  tickets: number;
  selectedTrip: {
    start: ITripData | null;
    end: ITripData | null;
  };
  userProfile: IUserProfile;
  isRevert?: boolean;
  tripInfo: {
    start: {
      title: string;
      time: string;
    };
    end: {
      title: string;
      time: string;
    };
  };
}

type InfoLocationT = {
  id: number;
  title: string;
  description: string;
  time: string;
};

type BookingSeatT = {
  seats: string[];
  customersInfo: any;
  userInfo: any;
  childrenInfo: any;
  pickLocation: InfoLocationT | {};
  dropLocation: InfoLocationT | {};
};

const LIST_STEP = [
  {
    id: 1,
    value: "1. Chọn ghế",
  },
  {
    id: 2,
    value: "2. Thông tin khách",
  },
  {
    id: 3,
    value: "3. Điểm đón-trả",
  },
  {
    id: 4,
    value: "4. Thanh toán",
  },
];

const DICT_OPTIONS = {
  option1: 1,
  option2: 2,
};

type OptionsT = {
  option1: number;
  option2: number;
};

type TabT = {
  active?: boolean;
  title: string;
  id: number;
  handleClick: (arg: number) => void;
};

const RenderTab = ({ active = false, title, id, handleClick }: TabT) => {
  return (
    <div
      className={`p-3 border-b-[1.5px] ${
        active ? "border-b-primary-500" : "border-b-neutral-grey-200"
      }`}
      onClick={() => handleClick(id)}
    >
      <p
        className={`text-center text-sm ${
          active
            ? "text-primary-500 font-bold"
            : "text-neutral-grey-600 font-semibold"
        }`}
      >
        {title}
      </p>
    </div>
  );
};

type SelectedSeatT = {
  start: string[];
  end: string[];
};

type InfoReverseT = {
  start: IReservationStartData | null;
  end: IReservationStartData | null;
};

const PickSeatReverseMobile = ({
  BOOKING,
  ERROR,
  PLACEHOLDER,
  SIGNIN,
  PAYMENT,
  POINT,
  handleChangePrevStep,
  tickets,
  selectedTrip,
  userProfile,
  tripInfo,
}: IPickSeatReverseMobileProps) => {
  const [tripSelectedData, setTripSelectedData] = useState(selectedTrip?.start);
  const { trips, tripRoutes, routeId } = tripSelectedData || {};
  const { tripId } =
    (trips ? trips[0] : tripRoutes && tripRoutes[0].trip) || {};
  const [step, setStep] = useState(1);
  const [bookingInformation, setBookingInformation] = useState<BookingSeatT>({
    seats: [],
    customersInfo: [],
    userInfo: {},
    childrenInfo: [],
    pickLocation: {},
    dropLocation: {},
  });
  const [bookingInformationReverse, setBookingInformationReverse] =
    useState<BookingSeatT>({
      seats: [],
      customersInfo: [],
      userInfo: {},
      childrenInfo: [],
      pickLocation: {},
      dropLocation: {},
    });
  const { toastError } = useCustomToast();
  const [isLoading, setLoading] = useState(false);
  const [ticketData, setTicketData] = useState<IReservationValidateSeatsData>();
  const [ticketDataReverse, setTicketDataReverse] =
    useState<IReservationValidateSeatsData>();

  const [payloadTicket, setPayloadTicket] = useState<any>();
  const [payloadTicketReverse, setPayloadTicketReverse] = useState<any>();
  const [countdownTime, setCountDownTime] = useState<number>(-1);
  const [tabIndex, setTabIndex] = useState(1);
  const [selectedSeat, setSelectedSeat] = useState<SelectedSeatT>({
    start: [],
    end: [],
  });

  const [infoReverse, setInfoReverse] = useState<InfoReverseT>({
    start: null,
    end: null,
  });
  const [isAcceptPayment, setIsAcceptPayment] = useState(false);

  const handleUpdateTimeCd = () => {
    const timeCd = getTimeCountDown();
    if (timeCd) {
      setCountDownTime(timeCd);
    }
  };

  const handleRemovePickedSeat = async (reload = false) => {
    const { ticketBatchId } = ticketData || {};
    const { ticketBatchId: ticketBatchIdReverse } = ticketDataReverse || {};

    if (ticketBatchId) {
      await cancelBatch({
        ticketBatchId: ticketBatchId,
      }).then(async () => {
        if (ticketBatchIdReverse) {
          await cancelBatch({
            ticketBatchId: ticketBatchIdReverse,
          }).then(() => {
            if (!reload) {
              setStep(step - 1);
              setSelectedSeat({
                start: [],
                end: [],
              });
              setBookingInformation({
                ...bookingInformation,
                seats: [],
              });
              setBookingInformationReverse({
                ...bookingInformationReverse,
                seats: [],
              });
            }
          });
        }
      });
    }
  };

  const changeNextStep = () => {
    if (step < 4) {
      const thisStepper = document.getElementById("stepper-" + step);
      if (thisStepper) {
        thisStepper?.scrollIntoView({ behavior: "smooth", block: "end" });
      }
      setStep(step + 1);
    }
  };

  const changePrevStep = () => {
    if (step === 1) {
      handleChangePrevStep();
    }
    if (step > 1) {
      if (step === 2) {
        handleRemovePickedSeat();
      } else {
        if (step > 2) {
          handleUpdateTimeCd();
        }
        const thisStepper = document.getElementById("stepper-" + (step - 2));
        if (thisStepper) {
          thisStepper?.scrollIntoView({ behavior: "smooth", block: "end" });
        }
        setStep(step - 1);
      }
    }
  };

  const handleUpdateBookingSeat = async (seats: string[]) => {
    if (JSON.stringify(bookingInformation.seats) !== JSON.stringify(seats)) {
      setSelectedSeat({
        ...selectedSeat,
        start: seats,
      });
      if (selectedSeat?.end?.length === 0) {
        handleChangeTab(2);
      } else {
        setLoading(true);
        Promise.all([
          await reservationValidateSeats({
            seats: seats?.toString(),
            ticketBatchId: infoReverse?.start?.ticketBatchId || 0,
          }),
          await reservationValidateSeats({
            seats: selectedSeat?.end?.toString(),
            ticketBatchId: infoReverse?.end?.ticketBatchId || 0,
          }),
        ]).then(function (values) {
          if (values?.length === 2) {
            setBookingInformation({
              ...bookingInformation,
              seats: seats,
              customersInfo: [],
              childrenInfo: [],
            });
            setBookingInformationReverse({
              ...bookingInformation,
              seats: selectedSeat?.end,
              customersInfo: [],
              childrenInfo: [],
            });
            setTicketData(values[0]?.data);
            setTicketDataReverse(values[1]?.data);
            setCountDownTime(600);
            changeNextStep();
          }
        });
        setLoading(false);
      }
    }
  };

  const handleUpdateBookingSeatReverse = async (seats: string[]) => {
    if (
      JSON.stringify(bookingInformationReverse.seats) !== JSON.stringify(seats)
    ) {
      setSelectedSeat({
        ...selectedSeat,
        end: seats,
      });
      if (selectedSeat?.start?.length === 0) {
        handleChangeTab(1);
      } else {
        setLoading(true);
        Promise.all([
          await reservationValidateSeats({
            seats: selectedSeat?.start?.toString(),
            ticketBatchId: infoReverse?.start?.ticketBatchId || 0,
          }),
          await reservationValidateSeats({
            seats: seats?.toString(),
            ticketBatchId: infoReverse?.end?.ticketBatchId || 0,
          }),
        ]).then(function (values) {
          if (values?.length === 2) {
            setBookingInformation({
              ...bookingInformation,
              seats: selectedSeat?.start,
              customersInfo: [],
              childrenInfo: [],
            });
            setBookingInformationReverse({
              ...bookingInformation,
              seats: seats,
              customersInfo: [],
              childrenInfo: [],
            });
            setTicketData(values[0]?.data);
            setTicketDataReverse(values[1]?.data);
            setCountDownTime(600);
            changeNextStep();
          }
        });
        setLoading(false);
      }
    }
  };

  const handleChangeTab = (id = 0) => {
    if (step === 1) {
      if (id === 1) {
        const {
          trips: tripsStart,
          tripRoutes: tripRoutesStart,
          routeId: routeIdStart,
        } = selectedTrip?.start || {};
        const { tripId: tripIdStart } =
          (tripsStart
            ? tripsStart[0]
            : tripRoutesStart && tripRoutesStart[0].trip) || {};
        setTripSelectedData(selectedTrip?.start);
        fetchReservationStart({
          tripIdParam: tripIdStart,
          routeIdParam: routeIdStart,
          tabIndexPayload: 1,
        });
      } else {
        const {
          trips: tripsEnd,
          tripRoutes: tripRoutesEnd,
          routeId: routeIdEnd,
        } = selectedTrip?.end || {};
        const { tripId: tripIdEnd } =
          (tripsEnd ? tripsEnd[0] : tripRoutesEnd && tripRoutesEnd[0].trip) ||
          {};
        setTripSelectedData(selectedTrip?.end);
        fetchReservationStart({
          tripIdParam: tripIdEnd,
          routeIdParam: routeIdEnd,
          tabIndexPayload: 2,
        });
      }
      setTabIndex(id);
    } else {
      if (id === 1) {
        setTripSelectedData(selectedTrip?.start);
      }
      if (id === 2) {
        setTripSelectedData(selectedTrip?.end);
      }
      setTabIndex(id);
    }
  };

  const handleUpdateCustomerInformation = (informations: any) => {
    setBookingInformation({
      ...bookingInformation,
      customersInfo: informations,
    });
  };

  const handleUpdateCustomerInformationReverse = (informations: any) => {
    setBookingInformationReverse({
      ...bookingInformationReverse,
      customersInfo: informations,
    });
  };

  const handleUpdateChildrenInfo = (childrenInfo: any) => {
    setBookingInformation({
      ...bookingInformation,
      childrenInfo: childrenInfo,
    });
  };

  const handleUpdateChildrenInfoReverse = (childrenInfo: any) => {
    setBookingInformationReverse({
      ...bookingInformationReverse,
      childrenInfo: childrenInfo,
    });
  };

  const handleUpdateUserInfo = async (userInfo: any) => {
    setBookingInformation({
      ...bookingInformation,
      userInfo: userInfo,
    });

    if (ticketData) {
      const { customersInfo, childrenInfo } = bookingInformation || {};
      const { bornYear, email, fullName, phone } = userInfo || {};
      const cloneTicketData = { ...infoReverse?.start };
      const fillTickets: any = [];
      ticketData?.tickets?.forEach((el) => {
        const filterTicketCustomersInfo = customersInfo?.find(
          (info: any) => info?.seat === el?.seatName
        );
        const filterTicketChildrenInfo = childrenInfo?.find(
          (info: any) => info?.seat === el?.seatName
        );

        fillTickets.push({
          ...el,
          birthday: filterTicketCustomersInfo?.bornYear || "",
          email: filterTicketCustomersInfo?.email || "",
          phone: filterTicketCustomersInfo?.phone || "",
          name: filterTicketCustomersInfo?.name || "",
          childBirthday: filterTicketChildrenInfo?.bornYear || "",
          childName: filterTicketChildrenInfo?.name || "",
          hasChild: filterTicketChildrenInfo?.option ? true : false,
          type:
            DICT_OPTIONS[filterTicketChildrenInfo?.option as keyof OptionsT] ||
            0,
        });
      });

      let payload = {
        ...cloneTicketData,
        userName: fullName,
        userEmail: email,
        userPhone: phone,
        userBirthday: bornYear,
        tickets: fillTickets,
      };
      setPayloadTicket(payload);
    }
    if (ticketDataReverse) {
      const { customersInfo, childrenInfo } = bookingInformationReverse || {};
      const { bornYear, email, fullName, phone } = userInfo || {};
      const cloneTicketDataReverse = { ...infoReverse?.end };
      const fillTicketsReverse: any = [];
      ticketDataReverse?.tickets?.forEach((el) => {
        const filterTicketCustomersInfoReverse = customersInfo?.find(
          (info: any) => info?.seat === el?.seatName
        );
        const filterTicketChildrenInfoReverse = childrenInfo?.find(
          (info: any) => info?.seat === el?.seatName
        );

        fillTicketsReverse.push({
          ...el,
          birthday: filterTicketCustomersInfoReverse?.bornYear || "",
          email: filterTicketCustomersInfoReverse?.email || "",
          phone: filterTicketCustomersInfoReverse?.phone || "",
          name: filterTicketCustomersInfoReverse?.name || "",
          childBirthday: filterTicketChildrenInfoReverse?.bornYear || "",
          childName: filterTicketChildrenInfoReverse?.name || "",
          hasChild: filterTicketChildrenInfoReverse?.option ? true : false,
          type:
            DICT_OPTIONS[
              filterTicketChildrenInfoReverse?.option as keyof OptionsT
            ] || 0,
        });
      });

      let payload = {
        ...cloneTicketDataReverse,
        userName: fullName,
        userEmail: email,
        userPhone: phone,
        userBirthday: bornYear,
        tickets: fillTicketsReverse,
      };
      setPayloadTicketReverse(payload);
      handleUpdateTimeCd();
      changeNextStep();
      setTripSelectedData(selectedTrip?.start);
      setTabIndex(1);
    }
  };

  const handleUpdatePickDropLocation = async (
    pickLocation: InfoLocationT,
    dropLocation: InfoLocationT
  ) => {
    if (tabIndex === 1) {
      setBookingInformation({
        ...bookingInformation,
        pickLocation: pickLocation,
        dropLocation: dropLocation,
      });
      setPayloadTicket({
        ...payloadTicket,
        endPlaceId: dropLocation?.id,
        startPlaceId: pickLocation?.id,
      });
      if (
        !isEmpty(bookingInformationReverse?.pickLocation) &&
        !isEmpty(bookingInformationReverse?.dropLocation)
      ) {
        setLoading(true);
        Promise.all([
          await reservationUpdateInfo({
            ...payloadTicket,
            endPlaceId: dropLocation?.id,
            startPlaceId: pickLocation?.id,
          }),
          await reservationUpdateInfo(payloadTicketReverse),
        ])
          .then(function (values) {
            if (values?.length === 2) {
              handleUpdateTimeCd();
              changeNextStep();
            }
            setLoading(false);
          })
          .catch((err) => {
            console.log("err: ", err);
            setLoading(false);
          });
      } else {
        setTripSelectedData(selectedTrip?.end);
        setTabIndex(2);
      }
    }
    if (tabIndex === 2) {
      setBookingInformationReverse({
        ...bookingInformationReverse,
        pickLocation: pickLocation,
        dropLocation: dropLocation,
      });
      setPayloadTicketReverse({
        ...payloadTicketReverse,
        endPlaceId: dropLocation?.id,
        startPlaceId: pickLocation?.id,
      });
      if (
        !isEmpty(bookingInformation?.pickLocation) &&
        !isEmpty(bookingInformation?.dropLocation)
      ) {
        setLoading(true);
        Promise.all([
          await reservationUpdateInfo(payloadTicket),
          await reservationUpdateInfo({
            ...payloadTicketReverse,
            endPlaceId: dropLocation?.id,
            startPlaceId: pickLocation?.id,
          }),
        ])
          .then(function (values) {
            if (values?.length === 2) {
              handleUpdateTimeCd();
              changeNextStep();
            }
            setLoading(false);
          })
          .catch((err) => {
            console.log("err: ", err);
            setLoading(false);
          });
      } else {
        setTripSelectedData(selectedTrip?.start);
        setTabIndex(1);
      }
    }
  };

  const fetchReservationStart = async ({
    tripIdParam = 0,
    routeIdParam = 0,
    tabIndexPayload = 1,
  }) => {
    if (tripIdParam && routeIdParam) {
      if (tabIndexPayload === 1 && infoReverse?.start === null) {
        setLoading(true);
        const res: IReservationStartResponse = await reservationStart({
          tripId: tripIdParam,
          routeId: routeIdParam,
        });
        if (res?.isSuccess) {
          setInfoReverse({
            ...infoReverse,
            start: res.data,
          });

          setLoading(false);
        } else {
          setLoading(false);

          toastError({
            message: res?.errorMessage,
            toastId: "start-failed",
          });
        }
      }
      if (tabIndexPayload === 2 && infoReverse?.end === null) {
        setLoading(true);
        const res: IReservationStartResponse = await reservationStart({
          tripId: tripIdParam,
          routeId: routeIdParam,
        });
        if (res?.isSuccess) {
          setInfoReverse({
            ...infoReverse,
            end: res.data,
          });

          setLoading(false);
        } else {
          setLoading(false);

          toastError({
            message: res?.errorMessage,
            toastId: "end-failed",
          });
        }
      }
    }
  };

  useEffect(() => {
    if (step === 1) {
      fetchReservationStart({
        tripIdParam: tripId,
        routeIdParam: routeId,
      });
    }
  }, [step]);

  window.onbeforeunload = function () {
    if (!isAcceptPayment) {
      handleRemovePickedSeat(true);
    }
  };

  return (
    <div>
      <NavbarTrip
        title={BOOKING.paymentInformation}
        time=""
        textAction=""
        handleChange={() => {}}
        handleChangePrevStep={changePrevStep}
      />
      <Stepper list={LIST_STEP} step={step} />

      {(step === 1 || step === 3) && (
        <div className="grid grid-cols-2 bg-white">
          <RenderTab
            id={1}
            title={tripInfo?.start?.time}
            active={tabIndex === 1}
            handleClick={handleChangeTab}
          />
          <RenderTab
            id={2}
            title={tripInfo?.end?.time}
            active={tabIndex === 2}
            handleClick={handleChangeTab}
          />
        </div>
      )}

      {isLoading && <LoadingView />}
      {infoReverse?.start &&
        Object.keys(infoReverse?.start)?.length > 0 &&
        tabIndex === 1 && (
          <>
            {step === 1 && (
              <FirstStepReverse
                BOOKING={BOOKING}
                tickets={tickets}
                handleUpdateBookingSeat={handleUpdateBookingSeat}
                tripId={tripId}
                routeId={routeId || 0}
                reservationDetail={infoReverse?.start}
                tabIndex={tabIndex}
                handleUpdateBookingSeatReverse={handleUpdateBookingSeatReverse}
                selectedSeatPayload={selectedSeat?.start}
              />
            )}
          </>
        )}

      {infoReverse?.end &&
        Object.keys(infoReverse?.end)?.length > 0 &&
        tabIndex === 2 && (
          <>
            {step === 1 && (
              <FirstStepReverse
                BOOKING={BOOKING}
                tickets={tickets}
                handleUpdateBookingSeat={handleUpdateBookingSeat}
                tripId={tripId}
                routeId={routeId || 0}
                reservationDetail={infoReverse?.end}
                tabIndex={tabIndex}
                handleUpdateBookingSeatReverse={handleUpdateBookingSeatReverse}
                selectedSeatPayload={selectedSeat?.end}
              />
            )}
          </>
        )}

      {step === 2 && countdownTime >= 0 && (
        <ThirdStepReverse
          BOOKING={BOOKING}
          ERROR={ERROR}
          PLACEHOLDER={PLACEHOLDER}
          SIGNIN={SIGNIN}
          bookingInformation={bookingInformation}
          bookingInformationReverse={bookingInformationReverse}
          handleUpdateCustomerInformation={handleUpdateCustomerInformation}
          handleUpdateCustomerInformationReverse={
            handleUpdateCustomerInformationReverse
          }
          handleUpdateChildrenInfo={handleUpdateChildrenInfo}
          handleUpdateChildrenInfoReverse={handleUpdateChildrenInfoReverse}
          handleUpdateUserInfo={handleUpdateUserInfo}
          userProfile={userProfile}
          countdownTime={countdownTime}
        />
      )}

      {step === 3 &&
        !isLoading &&
        countdownTime >= 0 &&
        !isEmpty(bookingInformation?.userInfo) && (
          <SecondStepReverse
            BOOKING={BOOKING}
            tripId={tripId}
            routeId={routeId || 0}
            seats={bookingInformation.seats}
            seatsReverse={bookingInformationReverse.seats}
            childrenInfo={bookingInformation.childrenInfo}
            childrenInfoReverse={bookingInformationReverse.childrenInfo}
            payloadTicket={payloadTicket}
            payloadTicketReverse={payloadTicketReverse}
            bookingInformation={bookingInformation}
            bookingInformationReverse={bookingInformationReverse}
            countdownTime={countdownTime}
            handleUpdatePickDropLocation={handleUpdatePickDropLocation}
            step={step}
            tabIndex={tabIndex}
          />
        )}

      {step === 4 && (
        <FourStepReverse
          BOOKING={BOOKING}
          PAYMENT={PAYMENT}
          POINT={POINT}
          changeNextStep={changeNextStep}
          changePrevStep={changePrevStep}
          bookingInformation={bookingInformation}
          bookingInformationReverse={bookingInformationReverse}
          payloadTicket={payloadTicket}
          payloadTicketReverse={payloadTicketReverse}
          childrenInfo={bookingInformation.childrenInfo}
          childrenInfoReverse={bookingInformationReverse.childrenInfo}
          userProfile={userProfile}
          countdownTime={countdownTime}
          setCountDownTime={setCountDownTime}
          setIsAcceptPayment={setIsAcceptPayment}
        />
      )}
    </div>
  );
};

export default PickSeatReverseMobile;
