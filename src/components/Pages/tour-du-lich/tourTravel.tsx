import Button from "@/components/button";
import React from "react";

interface ITourTravelProps {
  image: string;
  id: number;
  description: string;
  btnTitle: string;
  handleBookTour: (arg: number) => void;
}

const TourTravel = (props: ITourTravelProps) => {
  const { id, image, btnTitle, description, handleBookTour } = props;
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-common w-full rounded-lg h-[175px]" />
      <Button onClick={() => handleBookTour(id)}>{btnTitle}</Button>
      <p className="text-black font-normal text-sm">{description}</p>
    </div>
  );
};

export default TourTravel;
