import ArrowDownIcon from "@/components/icons/arrowDown";
import FullScreenModal from "@/components/modal/FullScreenModal";
import useModal from "@/hook/useModal";
import { IBookingTranslate } from "@/interfaces/IBookingTranslate";
import { useEffect, useState } from "react";
import ContentModal from "../contentModal";
import CountDown from "@/components/count-down";
import Button from "@/components/button";
import { ITripPlacesResponse } from "@/interfaces/httpRequest/ITrip";
import { fetchTripEndPlaces, fetchTripStartPlaces } from "@/apis/trip";
import moment from "moment";
import LoadingChildComponent from "@/components/LoadingChildComponent";
import { convertTimesToSeconds } from "@/helpers/functionHelper";

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

interface ISecondStepProps {
  BOOKING: IBookingTranslate;
  handleUpdatePickDropLocation: (
    arg1: InfoLocationT,
    arg2: InfoLocationT
  ) => void;
  seats: string[];
  childrenInfo: any;
  tripId?: number;
  routeId: number;
  payloadTicket: any;
  bookingInformation: BookingSeatT;
  countdownTime: number;
}

const SecondStep = ({
  BOOKING,
  handleUpdatePickDropLocation,
  seats,
  childrenInfo,
  routeId,
  tripId,
  payloadTicket,
  bookingInformation,
  countdownTime,
}: ISecondStepProps) => {
  const [openPickingModal, togglePickingModal] = useModal();
  const [openDropingModal, toggleDropingModal] = useModal();
  const [selectedPicking, setSelectedPicking] = useState<any>();
  const [selectedDroping, setSelectedDroping] = useState<any>();
  const [extraFee, setExtraFee] = useState(0);
  const [listStartPlaces, setListStartPlaces] = useState<InfoLocationT[]>([]);
  const [listEndPlaces, setListEndPlaces] = useState<InfoLocationT[]>([]);
  const { price, tickets, trip } = payloadTicket || {};

  const handleSelectPickLocation = (pickingInfo: InfoLocationT) => {
    if (pickingInfo) {
      setSelectedPicking(pickingInfo);
      togglePickingModal();
    }
  };

  const handleSelectDropLocation = (pickingInfo: InfoLocationT) => {
    if (pickingInfo) {
      setSelectedDroping(pickingInfo);
      toggleDropingModal();
    }
  };

  const handleSubmit = async () => {
    handleUpdatePickDropLocation(selectedPicking, selectedDroping);
  };

  useEffect(() => {
    const getTripStartPlaces = async () => {
      if (tripId && routeId) {
        const res: ITripPlacesResponse[] = await fetchTripStartPlaces({
          tripId: tripId,
          routeId: routeId,
        });
        if (res?.length > 0) {
          const tmpStart: InfoLocationT[] = [];
          const sortList = res?.sort(
            (a, b) =>
              new Date(a?.startAt)?.getTime() - new Date(b?.startAt)?.getTime()
          );
          sortList?.forEach((el) => {
            tmpStart.push({
              id: el?.placeId,
              title: el?.place?.name,
              description: el?.place?.address,
              time: moment(el?.startAt).format("HH:mm"),
            });
          });
          setListStartPlaces(tmpStart);
        } else {
          setListStartPlaces([]);
        }
      }
    };
    const getTripEndPlaces = async () => {
      if (tripId && routeId) {
        const res: ITripPlacesResponse[] = await fetchTripEndPlaces({
          tripId: tripId,
          routeId: routeId,
        });
        if (res?.length > 0) {
          const tmpEnd: InfoLocationT[] = [];
          const sortList = res?.sort(
            (a, b) =>
              new Date(a?.startAt)?.getTime() - new Date(b?.startAt)?.getTime()
          );
          sortList?.forEach((el) => {
            tmpEnd.push({
              id: el?.placeId,
              title: el?.place?.name,
              description: el?.place?.address,
              time: moment(el?.startAt).format("HH:mm"),
            });
          });
          setListEndPlaces(tmpEnd);
        } else {
          setListEndPlaces([]);
        }
      }
    };
    if (childrenInfo?.length > 0) {
      const childrenWithExtraFees = childrenInfo?.filter(
        (child: any) => child?.option === "option2"
      );
      if (childrenWithExtraFees?.length > 0) {
        const tmpExtraFee = (childrenWithExtraFees?.length * price) / 2;
        setExtraFee(tmpExtraFee);
      }
    }
    if (Object?.keys(bookingInformation?.pickLocation)?.length > 0) {
      setSelectedPicking(bookingInformation?.pickLocation);
    }
    if (Object?.keys(bookingInformation?.dropLocation)?.length > 0) {
      setSelectedDroping(bookingInformation?.dropLocation);
    }
    getTripStartPlaces();
    getTripEndPlaces();
  }, []);

  if (listEndPlaces?.length === 0 || listStartPlaces?.length === 0) {
    return (
      <div className="mt-10">
        <LoadingChildComponent />
      </div>
    );
  }
  return (
    <div className="relative pb-40">
      <div className="flex flex-col gap-2">
        <div className="bg-white p-4">
          <div className="mb-2">
            <p className="mb-2 text-sm text-neutral-grey-700 font-semibold">
              {BOOKING.pickPlace} <span className="text-semantic-red">*</span>
            </p>
            <div
              className="w-full relative flex items-center justify-between rounded-[4px] border border-neutral-grey-300 py-2 px-3 gap-2"
              onClick={togglePickingModal}
            >
              <p className="text-sm text-neutral-grey-600 font-medium">
                {selectedPicking?.title || BOOKING.pickPlace}
              </p>
              <ArrowDownIcon />
            </div>
          </div>
          <p className="text-[#61646B] text-xs mb-4">
            {BOOKING.pleaseArrivedAt} {selectedPicking?.title}{" "}
            <span className="font-bold text-semantic-red">
              {BOOKING.before}{" "}
              {selectedPicking?.time
                ? selectedPicking?.time +
                  " " +
                  moment(trip?.startAt).format("DD/MM/YYYY")
                : "--:--"}
            </span>{" "}
            {BOOKING.toTransferBeforeGettingOnBus}
          </p>
          <div className="mb-2">
            <p className="mb-2 text-sm text-neutral-grey-700 font-semibold">
              {BOOKING.dropPlace} <span className="text-semantic-red">*</span>
            </p>
            <div
              className="w-full relative flex items-center justify-between rounded-[4px] border border-neutral-grey-300 py-2 px-3 gap-2"
              onClick={toggleDropingModal}
            >
              <p className="text-sm text-neutral-grey-600 font-medium">
                {selectedDroping?.title || BOOKING.dropPlace}
              </p>
              <ArrowDownIcon />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 py-2 bg-white p-4">
          <div className="bg-semantic-green-light py-1 px-2 rounded-full w-fit">
            <p className="text-neutral-grey-600 font-extrabold text-xs">
              {BOOKING.tempCalculate}
            </p>
          </div>
          <div className="flex justify-between items-center gap-2">
            <p className="text-neutral-grey-700 text-sm font-medium">
              {BOOKING.seatLocation}
            </p>
            <p className="text-neutral-grey-700 text-base font-medium">
              {seats?.toString()}
            </p>
          </div>

          {extraFee > 0 && (
            <>
              <div className="flex justify-between items-center gap-2">
                <p className="text-neutral-grey-700 font-semibold text-sm">
                  {BOOKING.seatPrice}
                </p>
                <p className="text-neutral-grey-700 font-bold text-sm">
                  {(price * (tickets?.length || 0))?.toLocaleString()} đ
                </p>
              </div>
              <div className="flex justify-between items-center gap-2">
                <p className="text-neutral-grey-700 font-semibold text-sm">
                  {BOOKING.extraFeeChildren}
                </p>
                <p className="text-neutral-grey-700 font-bold text-sm">
                  {extraFee?.toLocaleString()} đ
                </p>
              </div>
            </>
          )}
          <div className="border border-[#EFEFF0] w-full" />
          <div className="flex justify-between items-center gap-2">
            <p className="text-neutral-grey-700 text-base font-bold">
              {BOOKING.totalCalculate}
            </p>
            <p className="text-primary-400 text-base font-extrabold">
              {(price * (tickets?.length || 0) + extraFee)?.toLocaleString()} đ
            </p>
          </div>
        </div>
      </div>

      <FullScreenModal
        open={openPickingModal}
        childStyle="animate-fade-in w-screen bg-neutral-grey-100 overflow-y-auto h-[100vh]"
      >
        <ContentModal
          title={BOOKING.choosePickingLocation}
          list={listStartPlaces}
          handleSelect={handleSelectPickLocation}
          selectedPicking={selectedPicking}
          placeholder={BOOKING.placeholderSearchLocation}
          seeLocationText={BOOKING.seeLocation}
          toggleModal={togglePickingModal}
        />
      </FullScreenModal>

      <FullScreenModal
        open={openDropingModal}
        childStyle="animate-fade-in w-screen bg-neutral-grey-100 overflow-y-auto h-[100vh]"
      >
        <ContentModal
          title={BOOKING.dropLocation}
          list={listEndPlaces}
          handleSelect={handleSelectDropLocation}
          selectedPicking={selectedDroping}
          placeholder={BOOKING.placeholderSearchLocation}
          seeLocationText={BOOKING.seeLocation}
          toggleModal={toggleDropingModal}
        />
      </FullScreenModal>

      <div className="p-4 fixed bottom-0 z-10 bg-white w-full border border-neutral-grey-100 shadow-[gba(0,0,0,0.06),rgba(0,0,0,0.03)]">
        <p className="text-black text-sm font-semibold text-center mb-3">
          {BOOKING.expiredBookingDuration}{" "}
          {countdownTime && <CountDown inputTimer={countdownTime} />}
          {!countdownTime && "--:--"}
        </p>
        <Button
          onClick={handleSubmit}
          disabled={!selectedPicking || !selectedDroping}
          borderRadius="rounded-full"
          btnColor={
            selectedPicking && selectedDroping
              ? "bg-primary-500"
              : "bg-primary-600"
          }
          fontSize={
            selectedPicking && selectedDroping
              ? "text-base"
              : "text-base opacity-50"
          }
        >
          {BOOKING.continue}
        </Button>
      </div>
    </div>
  );
};

export default SecondStep;