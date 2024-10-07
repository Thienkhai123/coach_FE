import SeatIcon from "@/components/icons/seat";
import { ISeat } from "@/interfaces/httpRequest/ITrip";
import React from "react";

interface ISetupSeatsProps {
  list: ISeat[];
  listSeatNotAvailable: string[];
  selectedSeat: string[];
  numberOfSeat: number;
  handleSelect: (arg: any) => void;
}

const STYLE_SEAT_ICON = {
  1: {
    fill: "#F6CDB5",
    stroke: "#F6CDB5",
  },
  2: {
    fill: "#DF5030",
    color: "white",
    stroke: "#DF5030",
  },
  3: {
    fill: "#D9D9D9",
    stroke: "#D9D9D9",
  },
};

const SetupSeats = (props: ISetupSeatsProps) => {
  const {
    list,
    listSeatNotAvailable,
    selectedSeat,
    numberOfSeat,
    handleSelect,
  } = props || {};

  if (numberOfSeat > 2) {
    return (
      <div
        className={`grid grid-cols-${numberOfSeat} items-center gap-4 justify-center flex-wrap  mx-auto`}
      >
        {list.map((el) => {
          const { seatName = "", seatNumber = 0 } = el || {};
          if (!listSeatNotAvailable?.includes(seatName)) {
            const thisStyle = selectedSeat?.includes(seatName)
              ? STYLE_SEAT_ICON[2]
              : STYLE_SEAT_ICON[1];

            return (
              <div
                key={`down-seat-${seatNumber}`}
                onClick={() => handleSelect(seatName)}
              >
                <SeatIcon
                  width="40"
                  height="37"
                  text={seatName}
                  {...thisStyle}
                />
              </div>
            );
          } else {
            const thisStyle = STYLE_SEAT_ICON[3];
            return (
              <div key={`down-seat-${seatNumber}`}>
                <SeatIcon
                  width="40"
                  height="37"
                  text={seatName}
                  {...thisStyle}
                />
              </div>
            );
          }
        })}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 justify-center flex-wrap w-[100px] mx-auto">
      {list.map((el) => {
        const { seatName = "", seatNumber = 0 } = el || {};
        if (!listSeatNotAvailable?.includes(seatName)) {
          const thisStyle = selectedSeat?.includes(seatName)
            ? STYLE_SEAT_ICON[2]
            : STYLE_SEAT_ICON[1];

          return (
            <div
              key={`down-seat-${seatNumber}`}
              onClick={() => handleSelect(seatName)}
            >
              <SeatIcon width="40" height="37" text={seatName} {...thisStyle} />
            </div>
          );
        } else {
          const thisStyle = STYLE_SEAT_ICON[3];
          return (
            <div key={`down-seat-${seatNumber}`}>
              <SeatIcon width="40" height="37" text={seatName} {...thisStyle} />
            </div>
          );
        }
      })}
    </div>
  );
};

export default SetupSeats;
