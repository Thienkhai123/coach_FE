import { IBookingTranslate } from "@/interfaces/IBookingTranslate";
import { useEffect, useState } from "react";
import FirstStep from "./steps/firstStep";
import SecondStep from "./steps/secondStep";
import ThirdStep from "./steps/thirdStep";
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
import { cancelBatch, reservationStart } from "@/apis/trip";
import { useCustomToast } from "@/hook/useToast";
import LoadingChildComponent from "@/components/LoadingChildComponent";
import { IUserProfile } from "@/interfaces/httpRequest/IUser";
import { getTimeCountDown } from "@/helpers/functionHelper";
import { IMyPointTranslate } from "@/interfaces/IMyPointTranslate";

interface IPickSeatProps {
  BOOKING: IBookingTranslate;
  ERROR: IErrorTranslate;
  PLACEHOLDER: IPlaceholderTranslate;
  SIGNIN: ISignInTranslate;
  PAYMENT: IPaymentTranslate;
  POINT: IMyPointTranslate;
  handleChangePrevStep: () => void;
  tickets: number;
  selectedTrip: ITripData;
  userProfile: IUserProfile;
  isRevert?: boolean;
  tripInfo: {
    title: string;
    time: string;
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

const FAKE_USER_INFO = {
  name: "nguyen van a",
  phone: "0909333999",
  bornYear: "1999",
  email: "nguyenvana@gmail.com",
};

const DICT_OPTIONS = {
  option1: 1,
  option2: 2,
};

type OptionsT = {
  option1: number;
  option2: number;
};

const PickSeat = ({
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
  isRevert = false,
  tripInfo,
}: IPickSeatProps) => {
  const { trips, tripRoutes, routeId } = selectedTrip || {};
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
  const { toastError } = useCustomToast();
  const [isLoading, setLoading] = useState(false);
  const [reservationDetail, setReservationDetail] =
    useState<IReservationStartData>();
  const [ticketData, setTicketData] = useState<IReservationValidateSeatsData>();
  const [payloadTicket, setPayloadTicket] = useState<any>();
  const [countdownTime, setCountDownTime] = useState<number>(-1);
  const [isAcceptPayment, setIsAcceptPayment] = useState(false);

  const handleUpdateTimeCd = () => {
    const timeCd = getTimeCountDown();
    if (timeCd) {
      setCountDownTime(timeCd);
    }
  };

  const handleRemovePickedSeat = async (reload = false) => {
    const { ticketBatchId } = reservationDetail || {};
    if (ticketBatchId) {
      await cancelBatch({
        ticketBatchId: ticketBatchId,
      }).then(() => {
        if (!reload) {
          setStep(step - 1);
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

  const handleUpdateBookingSeat = (
    seats: string[],
    ticketDataPayload: IReservationValidateSeatsData
  ) => {
    if (JSON.stringify(bookingInformation.seats) !== JSON.stringify(seats)) {
      setBookingInformation({
        ...bookingInformation,
        seats: seats,
        customersInfo: [],
        childrenInfo: [],
      });
      setTicketData(ticketDataPayload);
    }
  };

  const handleUpdateCustomerInformation = (informations: any) => {
    setBookingInformation({
      ...bookingInformation,
      customersInfo: informations,
    });
  };

  const handleUpdateChildrenInfo = (childrenInfo: any) => {
    setBookingInformation({
      ...bookingInformation,
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
      const cloneTicketData = { ...reservationDetail };
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

      setPayloadTicket({ ...payload });
      handleUpdateTimeCd();
      changeNextStep();
    }
  };

  const handleUpdatePickDropLocation = (
    pickLocation: InfoLocationT,
    dropLocation: InfoLocationT
  ) => {
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
    handleUpdateTimeCd();
    changeNextStep();
  };

  const fetchReservationStart = async () => {
    if (tripId && routeId) {
      setLoading(true);
      const res: IReservationStartResponse = await reservationStart({
        tripId: tripId,
        routeId: routeId,
      });
      if (res?.isSuccess) {
        setReservationDetail(res.data);
        setLoading(false);
      } else {
        setLoading(false);

        toastError({
          message: res?.errorMessage,
          toastId: "start-failed",
        });
      }
    }
  };

  useEffect(() => {
    if (step === 1) {
      fetchReservationStart();
    }
  }, [step]);

  window.onbeforeunload = function (e) {
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

      {isLoading && (
        <div className="mt-10">
          <LoadingChildComponent />
        </div>
      )}
      {reservationDetail && Object.keys(reservationDetail)?.length > 0 && (
        <>
          {step === 1 && (
            <FirstStep
              BOOKING={BOOKING}
              tickets={tickets}
              handleUpdateBookingSeat={handleUpdateBookingSeat}
              changeNextStep={changeNextStep}
              seats={bookingInformation.seats}
              tripId={tripId}
              routeId={routeId}
              reservationDetail={reservationDetail}
              setCountDownTime={setCountDownTime}
            />
          )}
        </>
      )}

      {step === 2 && countdownTime >= 0 && (
        <ThirdStep
          BOOKING={BOOKING}
          ERROR={ERROR}
          PLACEHOLDER={PLACEHOLDER}
          SIGNIN={SIGNIN}
          bookingInformation={bookingInformation}
          handleUpdateCustomerInformation={handleUpdateCustomerInformation}
          userInformation={FAKE_USER_INFO}
          handleUpdateChildrenInfo={handleUpdateChildrenInfo}
          handleUpdateUserInfo={handleUpdateUserInfo}
          userProfile={userProfile}
          countdownTime={countdownTime}
        />
      )}

      {step === 3 && !isLoading && countdownTime >= 0 && (
        <SecondStep
          BOOKING={BOOKING}
          seats={bookingInformation.seats}
          handleUpdatePickDropLocation={handleUpdatePickDropLocation}
          childrenInfo={bookingInformation.childrenInfo}
          tripId={tripId}
          routeId={routeId}
          payloadTicket={payloadTicket}
          bookingInformation={bookingInformation}
          countdownTime={countdownTime}
        />
      )}

      {step === 4 && (
        <FourStep
          BOOKING={BOOKING}
          PAYMENT={PAYMENT}
          POINT={POINT}
          changeNextStep={changeNextStep}
          changePrevStep={changePrevStep}
          bookingInformation={bookingInformation}
          payloadTicket={payloadTicket}
          childrenInfo={bookingInformation.childrenInfo}
          userProfile={userProfile}
          countdownTime={countdownTime}
          setCountDownTime={setCountDownTime}
          setIsAcceptPayment={setIsAcceptPayment}
        />
      )}
    </div>
  );
};

export default PickSeat;
