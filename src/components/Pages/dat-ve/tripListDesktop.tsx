import { IBookingTranslate } from "@/interfaces/IBookingTranslate";
import TripItem from "./tripItem";
import { ITripData } from "@/interfaces/httpRequest/ITrip";
import moment from "moment";
import { useEffect, useState } from "react";
import { ICityResponse } from "@/interfaces/httpRequest/ICity";
import "moment/locale/vi";
import TripItemDesktop from "./tripItemDesktop";

type TripT = {
  startTime: string;
  endTime: string;
  startPlace: string;
  endPlace: string;
  type: number;
  seats: number;
  available: number;
  price: number;
  duration: number;
  model: string;
  imageUrl: string;
};

interface ITripListDesktopProps {
  trips: ITripData[];
  handleChangeNextStep: (trip: ITripData) => void;
  handleClickButtonRoute: (trip: ITripData) => void;
  BOOKING: IBookingTranslate;
  city?: ICityResponse;
  selectedTripDeparture?: ITripData;
  selectedTripReturn?: ITripData;
  isReturnRoute?: boolean;
  tab?: number;
}

const TripListDesktop = ({
  BOOKING,
  trips,
  handleChangeNextStep,
  handleClickButtonRoute,
  city,
  selectedTripDeparture,
  selectedTripReturn,
  isReturnRoute = false,
  tab,
}: ITripListDesktopProps) => {
  const [searchData, setSearchData] = useState<any>();

  const handleClick = (trip: ITripData) => {
    handleChangeNextStep(trip);
  };
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams?.size > 0) {
      const startPlace_id = searchParams.get("startPlace_id");
      const endPlace_id = searchParams.get("endPlace_id");
      const startDateUrl = searchParams.get("startDate");
      const endDateUrl = searchParams.get("endDate");
      const amountTicketUrl = searchParams.get("amountTicket");
      const typeUrl = searchParams.get("type");
      const tmpDef = {
        startPlace_id: parseInt(startPlace_id || "0"),
        endPlace_id: parseInt(endPlace_id || "0"),
        startPlace: city?.result.find((e) => e.id === startPlace_id)?.text,
        endPlace: city?.result.find((e) => e.id === endPlace_id)?.text,
        startDate_datetime: moment(startDateUrl, "DD-MM-YYYY").toDate(),
        endDate_datetime: moment(endDateUrl, "DD-MM-YYYY").toDate(),
        startDate: startDateUrl
          ? moment(startDateUrl, "DD-MM-YYYY").format("DD/MM/YYYY")
          : "",
        amountTicket: amountTicketUrl || "",
        type: typeUrl ? parseInt(typeUrl) : 1,
      };
      setSearchData(tmpDef);
    }
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-1 lg:gap-2 bg-neutral-grey-100">
        {trips?.map((trip, index) => {
          if (trip.trips && trip.trips?.length > 0) {
            const {
              trips,
              tripRoutes,
              startPlace,
              endPlace,
              routeSubRoutes,
              routeId,
            } = trip || {};
            if (trips && trips?.length > 0) {
              return trips?.map((item, idx) => {
                const {
                  startAt,
                  endAt,
                  price,
                  vehicle,
                  ticketCount,
                  specialPrice,
                  tripId,
                  vehicleType: vehicleTypeRoot,
                } = item;
                const { vehicleType } = vehicle || {};
                const { totalSeats, name: nameVehicleType } =
                  vehicleType || vehicleTypeRoot || {};

                const startMoment = moment(startAt).format();
                const endMoment = moment(endAt).format();
                const duration = moment.duration(
                  moment(endMoment).diff(startMoment)
                );
                const hours = duration.asHours().toFixed(0);
                const tripDepartureSelected =
                  selectedTripDeparture?.trips &&
                  selectedTripDeparture?.trips?.length > 0 &&
                  selectedTripDeparture?.trips[0]?.tripId === tripId;
                const tripReturnSelected =
                  selectedTripReturn?.trips &&
                  selectedTripReturn?.trips.length > 0 &&
                  selectedTripReturn?.trips[0]?.tripId === tripId;

                return (
                  <div
                    key={`trip-${idx}`}
                    onClick={() => {
                      handleClick({
                        ...trip,
                        trips: [item],
                      });
                    }}
                  >
                    <TripItemDesktop
                      isSelected={tripDepartureSelected || tripReturnSelected}
                      vehicleType={nameVehicleType || ""}
                      startPlace={
                        startPlace
                          ? startPlace?.name
                          : routeSubRoutes[0].subRoute.startPlace?.name || ""
                      }
                      endPlace={
                        endPlace
                          ? endPlace?.name
                          : routeSubRoutes[routeSubRoutes.length - 1].subRoute
                              .endPlace?.name || ""
                      }
                      available={(totalSeats || 0) - (ticketCount || 0)}
                      startTime={`${moment(item.startAt).format("HH:mm")}`}
                      endTime={`${moment(item.endAt).format("HH:mm")}`}
                      BOOKING={BOOKING}
                      type={0}
                      seats={totalSeats || 0}
                      price={
                        (specialPrice && specialPrice > 0
                          ? specialPrice
                          : price) || 0
                      }
                      duration={parseInt(hours)}
                      model={vehicle?.name || ""}
                      imageUrl={"/images/trip-demo.png"}
                      handleClickButton={() =>
                        handleClickButtonRoute({
                          ...trip,
                          trips: [item],
                        })
                      }
                    />
                  </div>
                );
              });
            } else if (tripRoutes && tripRoutes.length > 0) {
              return tripRoutes?.map((itemRoute, idx) => {
                const {
                  startAt,
                  endAt,
                  price,
                  vehicle,
                  ticketCount,
                  specialPrice,
                  tripId,
                  vehicleType: vehicleTypeRoot,
                } = itemRoute.trip;
                const { vehicleType } = vehicle || {};
                const { totalSeats, name: nameVehicleType } =
                  vehicleType || vehicleTypeRoot || {};

                const startMoment = moment(startAt).format();
                const endMoment = moment(endAt).format();
                const duration = moment.duration(
                  moment(endMoment).diff(startMoment)
                );
                const hours = duration.asHours().toFixed(0);
                const tripDepartureSelected =
                  selectedTripDeparture?.trips &&
                  selectedTripDeparture?.trips?.length > 0 &&
                  selectedTripDeparture?.trips[0]?.tripId === tripId;
                const tripReturnSelected =
                  selectedTripReturn?.trips &&
                  selectedTripReturn?.trips.length > 0 &&
                  selectedTripReturn?.trips[0]?.tripId === tripId;

                return (
                  <div
                    key={`trip-${idx}`}
                    onClick={() => {
                      handleClick({
                        ...trip,
                        trips: [itemRoute.trip],
                      });
                    }}
                  >
                    <TripItemDesktop
                      isSelected={tripDepartureSelected || tripReturnSelected}
                      vehicleType={nameVehicleType || ""}
                      startPlace={
                        startPlace
                          ? startPlace?.name
                          : routeSubRoutes[0].subRoute.startPlace?.name || ""
                      }
                      endPlace={
                        endPlace
                          ? endPlace?.name
                          : routeSubRoutes[routeSubRoutes.length - 1].subRoute
                              .endPlace?.name || ""
                      }
                      available={(totalSeats || 0) - (ticketCount || 0)}
                      startTime={`${moment(itemRoute.trip.startAt).format(
                        "HH:mm"
                      )}`}
                      endTime={`${moment(itemRoute.trip.endAt).format(
                        "HH:mm"
                      )}`}
                      BOOKING={BOOKING}
                      type={0}
                      seats={totalSeats || 0}
                      price={
                        (specialPrice && specialPrice > 0
                          ? specialPrice
                          : price) || 0
                      }
                      duration={parseInt(hours)}
                      model={vehicle?.name || ""}
                      imageUrl={"/images/trip-demo.png"}
                      handleClickButton={
                        () => {}
                        // handleClickButtonRoute({
                        // 	...itemRoute,
                        // 	trips: [item],
                        // })
                      }
                    />
                  </div>
                );
              });
            }
          }
        })}
      </div>
    </div>
  );
};

export default TripListDesktop;
