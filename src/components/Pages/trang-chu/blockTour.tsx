import CalendarIcon from "@/components/icons/calendar";
import { IHomeTranslate } from "@/interfaces/IHomeTranslate";
import Image from "next/legacy/image";
import React from "react";

type TourT = {
  image: string;
  title: string;
  duration: string;
  price: string;
  booked: number;
};

interface IBlockTourProps {
  listTour: TourT[];
  HOME: IHomeTranslate;
}

const BlockTour = (props: IBlockTourProps) => {
  const { listTour, HOME } = props;
  return (
    <div className="flex flex-col gap-5">
      {listTour?.map((tour, ind) => {
        const { booked, duration, image, price, title } = tour;
        return (
          <div key={`tour-${ind}`} className="flex gap-3">
            <div>
              <Image
                alt=""
                src={image}
                width={80}
                height={80}
                className="rounded-[4px]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold text-neutral-grey-700">
                {title}
              </p>
              <div className="flex items-center gap-1">
                <CalendarIcon />
                <p className="text-neutral-grey-500 font-medium text-xs">
                  {duration}
                </p>
              </div>
              <p className="text-neutral-grey-700 font-medium text-xs">
                {HOME.onlyWith}{" "}
                <span className="text-primary-500 font-extrabold text-sm">
                  {price}
                </span>
              </p>
              <p className="bg-secondary-600 text-secondary-300 px-2 rounded-full w-fit font-semibold text-xs py-[1px]">
                {booked} {HOME.guestBooked}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BlockTour;
