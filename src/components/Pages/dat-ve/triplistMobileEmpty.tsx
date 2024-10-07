import Button from "@/components/button";
import { IBookingTranslate } from "@/interfaces/IBookingTranslate";
import Image from "next/legacy/image";
import React from "react";

interface ITripListMobileEmptyProps {
  BOOKING: IBookingTranslate;
}

const TripListMobileEmpty = (props: ITripListMobileEmptyProps) => {
  const { BOOKING } = props;
  const handleClick = () => {
    window.location.href = "/";
  };
  return (
    <div className="py-6 px-4">
      <div className="bg-white p-4 rounded-xl flex flex-col gap-4 justify-center items-center">
        <div>
          <Image
            alt=""
            src="/images/empty-trip-mobile.png"
            width={200}
            height={200}
          />
        </div>
        <div className="flex flex-col gap-0.5 items-center">
          <p className="text-center text-base font-semibold text-neutral-grey-700">
            {BOOKING.resultNotFound}
          </p>
          <p className="text-center text-sm font-medium text-neutral-grey-600">
            {BOOKING.pleaseChangeTrip}
          </p>
        </div>
        <Button width="w-fit" onClick={handleClick}>
          {BOOKING.changeTrip}
        </Button>
      </div>
    </div>
  );
};

export default TripListMobileEmpty;
