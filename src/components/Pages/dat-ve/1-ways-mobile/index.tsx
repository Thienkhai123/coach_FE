import { cancelBatch, fetchTrip, fetchTripV2 } from "@/apis/trip";
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

type FilterT = {
  times: number[];
  type: number[];
  floor: number;
  price: number[];
};

interface IOneWaysMobileTripsProps {
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

const OneWaysMobileTrips = (props: IOneWaysMobileTripsProps) => {
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
  const [selectedTrip, setSelectedTrip] = useState<ITripData | null>(null);
  const [tripInfo, setTripInfo] = useState({
    title: "",
    time: "",
  });

  const handleChangeNextStep = (trip: ITripData) => {
    if (trip) {
      setSelectedTrip(trip);
      setStep(step + 1);
    }
  };

  const handleChangePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
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
    const res: ITripResponse = await fetchTripV2(params);

    if (res?.isSuccess) {
      setTrips(res.data);
      setFilterPayload({ ...filter });
    }
    setLoading(false);
  };

  useEffect(() => {
    const initData = async () => {
      setLoading(true);
      const searchParams = new URLSearchParams(window.location.search);

      const startCityId = searchParams.get("startCityId");
      const endCityId = searchParams.get("endCityId");
      const startPlaceId = searchParams.get("startPlace_id");
      const endPlaceId = searchParams.get("endPlace_id");
      const departureDate = searchParams.get("startDate");
      const numberOfTicket = searchParams.get("amountTicket");

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
        let query = new URLSearchParams(window.location.search);
        let startDate = query.get("startDate");

        setTrips(res.data);
        setTripInfo({
          title: res?.data[0]?.name || tripTitle || "",
          time: moment(startDate, "DD-MM-YYYY").format("dddd, DD/MM/YYYY"),
        });
        let tmpTickets = numberOfTicket ? parseInt(numberOfTicket) : 1;
        setTickets(tmpTickets);
      }
      setLoading(false);
    };
    initData();
  }, []);

  return (
    <div>
      {step === 1 && (
        <div>
          <NavbarTrip
            {...tripInfo}
            textAction=""
            handleChangePrevStep={handleChangePrevStep}
            handleChange={() => {}}
          />

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
            <TripListMobile
              BOOKING={BOOKING}
              trips={trips}
              handleChangeNextStep={handleChangeNextStep}
            />
          )}
        </div>
      )}
      {step === 2 && (
        <div>
          {selectedTrip && (
            <PickSeat
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

export default OneWaysMobileTrips;
