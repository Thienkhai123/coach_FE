import { fetchTrip, fetchTripV2 } from "@/apis/trip";
import { OptionT } from "@/components/booking-search";
import { getRangeTripPrice, getRangeTripTime } from "@/helpers/functionHelper";
import { ICityResponse } from "@/interfaces/httpRequest/ICity";
import { ITripData, ITripResponse } from "@/interfaces/httpRequest/ITrip";
import { IUserProfile } from "@/interfaces/httpRequest/IUser";
import { IBookingTranslate } from "@/interfaces/IBookingTranslate";
import { IErrorTranslate } from "@/interfaces/IErrorTranslate";
import { IHomeTranslate } from "@/interfaces/IHomeTranslate";
import { IMyPointTranslate } from "@/interfaces/IMyPointTranslate";
import { IPaymentTranslate } from "@/interfaces/IPaymentTranslate";
import { IPlaceholderTranslate } from "@/interfaces/IPlaceholderTranslate";
import { ISignInTranslate } from "@/interfaces/ISignInTranslate";
import moment from "moment";
import React, { useEffect, useState } from "react";
import NavbarTrip from "../navbarTrip";
import FilterMobile from "../filterMobile";
import LoadingChildComponent from "@/components/LoadingChildComponent";
import TripListMobileEmpty from "../triplistMobileEmpty";
import TripListMobile from "../tripListMobile";
import PickSeat from "../pick-seat";
import ReverseTripListMobile from "../tripReverseListMobile";
import PickSeatReverseMobile from "../pick-seat-reverse-mobile";

type FilterT = {
  times: number[];
  type: number[];
  floor: number;
  price: number[];
};
interface ITwoWaysMobileTripsProps {
  HOME: IHomeTranslate;
  BOOKING: IBookingTranslate;
  ERROR: IErrorTranslate;
  PLACEHOLDER: IPlaceholderTranslate;
  SIGNIN: ISignInTranslate;
  PAYMENT: IPaymentTranslate;
  POINT: IMyPointTranslate;
  city?: ICityResponse;
  vehicleTypesList?: OptionT[];
  userProfile: IUserProfile;
  tripTitle?: string;
}

type TabT = {
  active?: boolean;
  title: string;
  id: number;
  handleClick: (arg: number) => void;
};

type TripInfoT = {
  start: {
    title: string;
    time: string;
  };
  end: {
    title: string;
    time: string;
  };
};

type TripSelectedT = {
  start: ITripData | null;
  end: ITripData | null;
};

const RenderTab = ({ active = false, title, id, handleClick }: TabT) => {
  return (
    <div
      className={`p-3 border-b-[1.5px] ${
        active ? "border-b-primary-500" : "border-transparent"
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

const TwoWaysMobileTrips = (props: ITwoWaysMobileTripsProps) => {
  const {
    HOME,
    BOOKING,
    ERROR,
    PLACEHOLDER,
    SIGNIN,
    PAYMENT,
    POINT,
    city,
    vehicleTypesList,
    userProfile,
    tripTitle = "",
  } = props;
  const [step, setStep] = useState(1);
  const [trips, setTrips] = useState<ITripData[]>([]);
  const [tickets, setTickets] = useState(1);
  const [loading, setLoading] = useState(false);
  const [filterPayload, setFilterPayload] = useState<FilterT>({
    times: [],
    type: [],
    floor: 0,
    price: [],
  });
  const [selectedTrip, setSelectedTrip] = useState<TripSelectedT>({
    start: null,
    end: null,
  });
  const [tripInfo, setTripInfo] = useState<TripInfoT>({
    start: {
      title: "",
      time: "",
    },
    end: {
      title: "",
      time: "",
    },
  });
  const [tabIndex, setTabIndex] = useState(1);

  const handleChangePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      setTabIndex(1);
      initData();
    } else {
      window.location.assign("/");
    }
  };

  const handleApplyFilter = async (filter: FilterT) => {
    setLoading(true);
    const { floor, price, times, type } = filter;
    const { startTime, endTime } = getRangeTripTime(times);
    const { priceRangeStart, priceRangeEnd } = getRangeTripPrice(price);
    const searchParams = new URLSearchParams(window.location.search);
    const startCityId = searchParams.get("startCityId");
    const endCityId = searchParams.get("endCityId");
    const startPlaceId = searchParams.get("startPlace_id");
    const endPlaceId = searchParams.get("endPlace_id");
    const departureDate = searchParams.get("startDate");
    // const endDateUrl = searchParams.get("endDate");
    const numberOfTicket = searchParams.get("amountTicket");
    const pageSize = 100;

    const params = {
      startCityId: startCityId ? parseInt(startCityId) : 0,
      endCityId: endCityId ? parseInt(endCityId) : 0,
      startPlaceId: startPlaceId ? parseInt(startPlaceId) : 0,
      endPlaceId: endPlaceId ? parseInt(endPlaceId) : 0,
      departureDate: departureDate
        ? moment.utc(departureDate, "DD-MM-YYYY").toISOString()
        : moment(new Date()).toISOString(),
      numberOfTicket: numberOfTicket ? parseInt(numberOfTicket) : 1,
      departureTimeStart: startTime,
      departureTimeEnd: endTime,
      pageSize: pageSize,
      vehicleTypeIds: type?.toString(),
      priceRangeStart: priceRangeStart,
      priceRangeEnd: priceRangeEnd,
    };
    const res: ITripResponse = await fetchTrip(params);

    if (res?.isSuccess) {
      setTrips(res.data);
      setFilterPayload({ ...filter });
    }
    setLoading(false);
  };

  const handleInitTab = ({ dataTitle = "" }) => {
    let query = new URLSearchParams(window.location.search);
    let startDate = query.get("startDate");
    let endDate = query.get("endDate");

    setTripInfo({
      start: {
        title: dataTitle || tripTitle || "",
        time: moment(startDate, "DD-MM-YYYY").format("dddd, DD/MM/YYYY"),
      },
      end: {
        title: dataTitle || tripTitle || "",
        time: moment(endDate, "DD-MM-YYYY").format("dddd, DD/MM/YYYY"),
      },
    });
  };

  const initData = async () => {
    setLoading(true);
    const searchParams = new URLSearchParams(window.location.search);

    const startCityId = searchParams.get("startCityId");
    const endCityId = searchParams.get("endCityId");
    const startPlaceId = searchParams.get("startPlace_id");
    const endPlaceId = searchParams.get("endPlace_id");
    const departureDate = searchParams.get("startDate");
    const numberOfTicket = searchParams.get("amountTicket");
    const tmpTickets = numberOfTicket ? parseInt(numberOfTicket) : 1;

    const params = {
      startCityId: startCityId ? parseInt(startCityId) : 0,
      endCityId: endCityId ? parseInt(endCityId) : 0,
      startPlaceId: startPlaceId ? parseInt(startPlaceId) : 0,
      endPlaceId: endPlaceId ? parseInt(endPlaceId) : 0,
      departureDate: departureDate
        ? moment.utc(departureDate, "DD-MM-YYYY").toISOString()
        : moment(new Date()).toISOString(),
      numberOfTicket: numberOfTicket ? parseInt(numberOfTicket) : 1,
      pageSize: 100,
      departureTimeStart: null,
      departureTimeEnd: null,
      vehicleTypeIds: "",
    };
    const res: ITripResponse = await fetchTripV2(params);
    if (res?.isSuccess) {
      setTrips(res.data);
      setTickets(tmpTickets);
      handleInitTab({ dataTitle: res?.data[0]?.name });
    }
    setLoading(false);
  };

  const handleFetchTrips = async ({ tabId = 1 }) => {
    setLoading(true);
    const searchParams = new URLSearchParams(window.location.search);
    const cloneFilter = { ...filterPayload };
    let startCityId = "";
    let endCityId = "";
    let startPlaceId = "";
    let endPlaceId = "";
    let departureDate = "";
    const numberOfTicket = searchParams.get("amountTicket");
    const tmpTickets = numberOfTicket ? parseInt(numberOfTicket) : 1;
    const { floor, price, times, type } = cloneFilter;
    const { startTime, endTime } = getRangeTripTime(times);
    const { priceRangeStart, priceRangeEnd } = getRangeTripPrice(price);
    const extraFilter = {
      departureTimeStart: startTime,
      departureTimeEnd: endTime,
      pageSize: 100,
      vehicleTypeIds: type?.toString(),
      priceRangeStart: priceRangeStart,
      priceRangeEnd: priceRangeEnd,
    };

    if (tabId === 1) {
      startCityId = searchParams.get("startCityId") || "";
      endCityId = searchParams.get("endCityId") || "";
      departureDate = searchParams.get("startDate") || "";
      startPlaceId = searchParams.get("startPlace_id") || "";
      endPlaceId = searchParams.get("endPlace_id") || "";
    } else {
      startCityId = searchParams.get("endCityId") || "";
      endCityId = searchParams.get("startCityId") || "";
      departureDate = searchParams.get("endDate") || "";
      startPlaceId = searchParams.get("endPlace_id") || "";
      endPlaceId = searchParams.get("startPlace_id") || "";
    }

    const params = {
      startCityId: startCityId ? parseInt(startCityId) : 0,
      endCityId: endCityId ? parseInt(endCityId) : 0,
      startPlaceId: startPlaceId ? parseInt(startPlaceId) : 0,
      endPlaceId: endPlaceId ? parseInt(endPlaceId) : 0,
      departureDate: departureDate
        ? moment.utc(departureDate, "DD-MM-YYYY").toISOString()
        : moment(new Date()).toISOString(),
      numberOfTicket: numberOfTicket ? parseInt(numberOfTicket) : 1,
      ...extraFilter,
    };

    const res: ITripResponse = await fetchTripV2(params);
    if (res?.isSuccess) {
      setTrips(res.data);
      setTickets(tmpTickets);
    }
    setLoading(false);
  };

  const handleChangeTab = (id = 0) => {
    if (id) {
      setTabIndex(id);
      handleFetchTrips({ tabId: id });
    }
  };

  const handleChangeNextStep = (trip: ITripData, type: number) => {
    if (trip && type) {
      if (type === 1) {
        setSelectedTrip({
          ...selectedTrip,
          start: trip,
        });
        if (selectedTrip?.end === null) {
          setTabIndex(2);
          handleFetchTrips({ tabId: 2 });
        } else {
          setStep(step + 1);
        }
      } else {
        setSelectedTrip({
          ...selectedTrip,
          end: trip,
        });
        if (selectedTrip?.start === null) {
          setTabIndex(1);
          handleFetchTrips({ tabId: 1 });
        } else {
          setStep(step + 1);
        }
      }
    }
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    <div>
      {step === 1 && (
        <div>
          <NavbarTrip
            {...tripInfo?.start}
            textAction=""
            handleChangePrevStep={handleChangePrevStep}
            handleChange={() => {}}
          />
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
          <FilterMobile
            BOOKING={BOOKING}
            onSubmit={handleApplyFilter}
            filterPayload={filterPayload}
            vehicleTypesList={vehicleTypesList}
          />
          {loading && (
            <div className="mt-10">
              <LoadingChildComponent />
            </div>
          )}
          {trips?.length === 0 && !loading && (
            <TripListMobileEmpty BOOKING={BOOKING} />
          )}
          {trips?.length > 0 && !loading && (
            <ReverseTripListMobile
              BOOKING={BOOKING}
              trips={trips}
              type={tabIndex}
              handleChangeNextStep={handleChangeNextStep}
            />
          )}
        </div>
      )}
      {step === 2 && (
        <div>
          {selectedTrip?.start && selectedTrip?.end && (
            <PickSeatReverseMobile
              BOOKING={BOOKING}
              ERROR={ERROR}
              PLACEHOLDER={PLACEHOLDER}
              SIGNIN={SIGNIN}
              PAYMENT={PAYMENT}
              POINT={POINT}
              handleChangePrevStep={handleChangePrevStep}
              tickets={tickets}
              selectedTrip={selectedTrip}
              userProfile={userProfile}
              tripInfo={tripInfo}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default TwoWaysMobileTrips;
