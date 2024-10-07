import { IBookingTranslate } from "@/interfaces/IBookingTranslate";
import TripItem from "./tripItem";
import { ITripData } from "@/interfaces/httpRequest/ITrip";
import moment from "moment";

interface IReverseTripListMobileProps {
  trips: ITripData[];
  handleChangeNextStep: (trip: ITripData, type: number) => void;
  BOOKING: IBookingTranslate;
  type: number;
}

const ReverseTripListMobile = ({
  BOOKING,
  trips,
  type,
  handleChangeNextStep,
}: IReverseTripListMobileProps) => {
  const handleClick = (trip: ITripData) => {
    handleChangeNextStep(trip, type);
  };

  return (
    <div className="flex flex-col gap-1 bg-neutral-grey-100">
      {trips?.map((trip, index) => {
        const { trips: tripItems } = trip;
        return (
          <div
            key={`trip-list-${index}`}
            className="flex flex-col gap-1 bg-neutral-grey-100"
          >
            {tripItems?.map((tripItem, ind) => {
              const { startPlace, endPlace, routeSubRoutes } = trip || {};
              const {
                startAt,
                endAt,
                price,
                vehicle,
                ticketCount,
                specialPrice,
                vehicleType: vehicleTypeRoot,
              } = tripItem;
              const { vehicleType } = vehicle || {};
              const { totalSeats, name: nameVehicleType } =
                vehicleType || vehicleTypeRoot || {};

              const startMoment = moment(startAt).format();
              const endMoment = moment(endAt).format();
              const duration = moment.duration(
                moment(endMoment).diff(startMoment)
              );

              const hours = duration.asHours().toFixed(0);
              return (
                <div
                  key={`trip-${ind}`}
                  onClick={() =>
                    handleClick({
                      ...trip,
                      trips: [tripItem],
                    })
                  }
                >
                  <TripItem
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
                    startTime={`${moment(startAt).format("HH:mm")}`}
                    endTime={`${moment(endAt).format("HH:mm")}`}
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
                  />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default ReverseTripListMobile;
