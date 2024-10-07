import React from "react";

interface ILocationNonFillIconProps {
  stroke?: string;
}

const LocationNonFillIcon = (props: ILocationNonFillIconProps) => {
  const { stroke = "black" } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
    >
      <path
        d="M13.25 9.25C13.25 10.6307 12.1307 11.75 10.75 11.75C9.36929 11.75 8.25 10.6307 8.25 9.25C8.25 7.86929 9.36929 6.75 10.75 6.75C12.1307 6.75 13.25 7.86929 13.25 9.25Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 9.25C17 15.2018 10.75 18.625 10.75 18.625C10.75 18.625 4.5 15.2018 4.5 9.25C4.5 5.79822 7.29822 3 10.75 3C14.2018 3 17 5.79822 17 9.25Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default LocationNonFillIcon;
