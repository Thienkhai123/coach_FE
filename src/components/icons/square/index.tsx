import React from "react";

const SquareIcon = ({ width = "18", height = "18" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 18 18"
      fill="none"
    >
      <path
        d="M16.5 5.25L9 0.875L1.5 5.25M16.5 5.25L9 9.625M16.5 5.25V12.75L9 17.125M1.5 5.25L9 9.625M1.5 5.25V12.75L9 17.125M9 9.625V17.125"
        stroke="#474C4D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SquareIcon;
