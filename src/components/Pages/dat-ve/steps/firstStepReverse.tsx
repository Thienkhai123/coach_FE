import { fetchTripReservedSeats, reservationValidateSeats } from "@/apis/trip";
import Button from "@/components/button";
import ChildNoteIcon from "@/components/icons/child-note";
import SeatIcon from "@/components/icons/seat";
import {
  IReservationStartData,
  IReservationValidateSeatsData,
  ITripReservedSeatResponse,
  ReservationValidateSeatsResponse,
} from "@/interfaces/httpRequest/ITrip";
import { IBookingTranslate } from "@/interfaces/IBookingTranslate";
import { useEffect, useState } from "react";
import SetupSeats from "../setupSeats";
import { useCustomToast } from "@/hook/useToast";

interface IFirstStepReverseProps {
  BOOKING: IBookingTranslate;
  tickets: number;
  handleUpdateBookingSeat: (arg: string[]) => void;
  tripId?: number;
  routeId: number;
  reservationDetail: IReservationStartData;
  tabIndex: number;
  handleUpdateBookingSeatReverse: (arg: string[]) => void;
  selectedSeatPayload?: string[];
}

const RenderLabel = ({ title = "", fill = "#F6CDB5", stroke = "#F6CDB5" }) => {
  return (
    <div className="flex gap-2 items-center">
      <SeatIcon fill={fill} stroke={stroke} />
      <p className="text-sm font-medium text-neutral-grey-700">{title}</p>
    </div>
  );
};

const FirstStepReverse = ({
  BOOKING,
  tickets,
  handleUpdateBookingSeat,
  tripId,
  routeId,
  reservationDetail,
  tabIndex,
  handleUpdateBookingSeatReverse,
  selectedSeatPayload,
}: IFirstStepReverseProps) => {
  const [selectedSeat, setSelectedSeat] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);
  const [listSeatNotAvailable, setListSeatNotAvailable] = useState<string[]>(
    []
  );
  const { toastError } = useCustomToast();
  const { ticketBatchId } = reservationDetail || {};
  const { decks, firstRowSeats, lastRowSeats, seatPerRow } =
    reservationDetail?.trip?.vehicle?.vehicleType?.seatSetup ||
    reservationDetail?.trip?.vehicleType?.seatSetup ||
    {};

  const handleSelect = (id: string) => {
    if (selectedSeat.includes(id)) {
      const cloneSeat = [...selectedSeat];
      const indexSeat = cloneSeat?.findIndex((el) => el === id);
      cloneSeat.splice(indexSeat, 1);
      setSelectedSeat(cloneSeat);
    } else {
      //  if (selectedSeat?.length < tickets) {
      //     setSelectedSeat([...selectedSeat, id]);
      //   }
      setSelectedSeat([...selectedSeat, id]);
    }
  };

  const getTripReservedSeats = async () => {
    if (tripId && routeId) {
      setLoading(true);
      const res: ITripReservedSeatResponse = await fetchTripReservedSeats({
        tripId: tripId,
        routeId: routeId,
      });
      if (res?.isSuccess) {
        setListSeatNotAvailable(res.data);
        setLoading(false);
      } else {
        setListSeatNotAvailable([]);
        setLoading(false);
      }
    }
  };

  const handleSubmit = async () => {
    if (ticketBatchId && selectedSeat?.length > 0) {
      //   setLoading(true);
      //   const res: ReservationValidateSeatsResponse =
      //     await reservationValidateSeats({
      //       seats: selectedSeat?.toString(),
      //       ticketBatchId: ticketBatchId,
      //     });
      if (tabIndex === 1) {
        handleUpdateBookingSeat(selectedSeat);
      } else {
        handleUpdateBookingSeatReverse(selectedSeat);
      }
      //   if (res?.isSuccess) {
      //     if (tabIndex === 1) {
      //       handleUpdateBookingSeat(selectedSeat, res?.data);
      //     } else {
      //       handleUpdateBookingSeatReverse(selectedSeat, res?.data);
      //     }
      //   } else {
      //     setLoading(false);
      //     toastError({
      //       message: res?.errorMessage,
      //       toastId: "validate-seats-mobile-failed",
      //     });
      //   }
    }
  };

  useEffect(() => {
    getTripReservedSeats();
    setSelectedSeat(selectedSeatPayload || []);
  }, [routeId, tripId]);

  return (
    <div className="pb-28 relative">
      <div className="flex justify-between py-5 px-4 gap-2">
        <RenderLabel title={BOOKING.emptyPick} />
        <RenderLabel title={BOOKING.picking} fill="#DF5030" stroke="#DF5030" />
        <RenderLabel title={BOOKING.picked} fill="#D9D9D9" stroke="#D9D9D9" />
      </div>

      <div className="py-3 px-2 mx-4 bg-white rounded-lg border border-neutral-grey-000">
        {Object.keys(decks)?.length === 1 && (
          <div
            className={
              lastRowSeats > 3
                ? "flex flex-col gap-2"
                : "flex flex-col justify-between gap-4"
            }
          >
            <div>
              <p className="mb-4 text-base text-neutral-grey-700 font-medium text-center">
                {BOOKING.downStairs}
              </p>
              <div className="flex flex-col gap-4">
                <SetupSeats
                  handleSelect={handleSelect}
                  list={[...decks[1]?.slice(0, firstRowSeats)]}
                  listSeatNotAvailable={listSeatNotAvailable}
                  selectedSeat={selectedSeat}
                  numberOfSeat={firstRowSeats}
                />
                <SetupSeats
                  handleSelect={handleSelect}
                  list={[
                    ...decks[1]?.slice(
                      firstRowSeats,
                      decks[1]?.length - lastRowSeats
                    ),
                  ]}
                  listSeatNotAvailable={listSeatNotAvailable}
                  selectedSeat={selectedSeat}
                  numberOfSeat={seatPerRow}
                />
                <SetupSeats
                  handleSelect={handleSelect}
                  list={[
                    ...decks[1]?.slice(
                      decks[1]?.length - lastRowSeats,
                      decks[1]?.length
                    ),
                  ]}
                  listSeatNotAvailable={listSeatNotAvailable}
                  selectedSeat={selectedSeat}
                  numberOfSeat={lastRowSeats}
                />
              </div>
            </div>
          </div>
        )}
        {Object.keys(decks)?.length === 2 && (
          <div
            className={
              lastRowSeats > 3
                ? "flex flex-col gap-2"
                : "grid grid-cols-2 gap-4"
            }
          >
            <div>
              <p className="mb-4 text-base text-neutral-grey-700 font-medium text-center">
                {BOOKING.downStairs}
              </p>
              <div className="flex flex-col gap-4">
                <SetupSeats
                  handleSelect={handleSelect}
                  list={[...decks[1]?.slice(0, firstRowSeats)]}
                  listSeatNotAvailable={listSeatNotAvailable}
                  selectedSeat={selectedSeat}
                  numberOfSeat={firstRowSeats}
                />
                <SetupSeats
                  handleSelect={handleSelect}
                  list={[
                    ...decks[1]?.slice(
                      firstRowSeats,
                      decks[1]?.length - lastRowSeats
                    ),
                  ]}
                  listSeatNotAvailable={listSeatNotAvailable}
                  selectedSeat={selectedSeat}
                  numberOfSeat={seatPerRow}
                />
                <SetupSeats
                  handleSelect={handleSelect}
                  list={[
                    ...decks[1]?.slice(
                      decks[1]?.length - lastRowSeats,
                      decks[1]?.length
                    ),
                  ]}
                  listSeatNotAvailable={listSeatNotAvailable}
                  selectedSeat={selectedSeat}
                  numberOfSeat={lastRowSeats}
                />
              </div>
            </div>

            <div>
              <p className="mb-4 text-base text-neutral-grey-700 font-medium text-center">
                {BOOKING.upStairs}
              </p>
              <div className="flex flex-col gap-4">
                <SetupSeats
                  handleSelect={handleSelect}
                  list={[...decks[2]?.slice(0, firstRowSeats)]}
                  listSeatNotAvailable={listSeatNotAvailable}
                  selectedSeat={selectedSeat}
                  numberOfSeat={firstRowSeats}
                />
                <SetupSeats
                  handleSelect={handleSelect}
                  list={[
                    ...decks[2]?.slice(
                      firstRowSeats,
                      decks[2]?.length - lastRowSeats
                    ),
                  ]}
                  listSeatNotAvailable={listSeatNotAvailable}
                  selectedSeat={selectedSeat}
                  numberOfSeat={seatPerRow}
                />
                <SetupSeats
                  handleSelect={handleSelect}
                  list={[
                    ...decks[2]?.slice(
                      decks[2]?.length - lastRowSeats,
                      decks[2]?.length
                    ),
                  ]}
                  listSeatNotAvailable={listSeatNotAvailable}
                  selectedSeat={selectedSeat}
                  numberOfSeat={lastRowSeats}
                />
              </div>
            </div>
          </div>
        )}

        <div className="bg-[#EDF8FF] py-2 px-3 mt-5 rounded">
          <div className="flex items-center gap-2 mb-2">
            <div>
              <ChildNoteIcon />
            </div>
            <p className="font-bold text-sm text-secondary-300">
              {BOOKING.noteGoWithChild}
            </p>
          </div>
          <p className="text-neutral-grey-600 font-bold text-sm">
            {BOOKING.applyforLimousine}
          </p>
          <ul className="list-disc pl-5 mt-1">
            {BOOKING.childNoteList.map((note, ind) => (
              <li
                key={`child-note-${ind}`}
                className="text-neutral-grey-600 font-bold text-sm "
              >
                {note.bold} <span className="font-medium">{note.content}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="p-4 fixed w-full bg-white bottom-0 flex gap-2.5 justify-between">
        <div className="flex-1">
          <p className="text-sm font-semibold text-neutral-grey-500">
            {BOOKING.selectedSeat}
          </p>
          <div className="flex gap-1 group flex-wrap">
            {selectedSeat?.map((seat, ind) => (
              <p
                key={`seat-select-${ind}`}
                className="text-neutral-grey-700 text-sm font-semibold"
              >
                {seat}
                {ind < selectedSeat?.length - 1 && <span>,</span>}
              </p>
            ))}
          </div>
        </div>
        <Button
          onClick={handleSubmit}
          width="w-fit"
          padding="py-2.5 px-[52.5px]"
          borderColor="border-0"
          btnColor={
            selectedSeat?.length === 0 ? "bg-disabled" : "bg-primary-500"
          }
          borderRadius="rounded-full"
          disabled={selectedSeat?.length === 0}
        >
          {BOOKING.continue}
        </Button>
      </div>
    </div>
  );
};

export default FirstStepReverse;
