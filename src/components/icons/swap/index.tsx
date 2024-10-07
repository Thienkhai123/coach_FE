import React from "react";

interface ISwapIconProps {}

const SwapIcon = (props: ISwapIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="12"
      viewBox="0 0 14 12"
      fill="none"
    >
      <path
        d="M10.3333 0.666992V11.3337M10.3333 11.3337L7.66667 8.66699M10.3333 11.3337L13 8.66699M3.66667 11.3337V0.666992M3.66667 0.666992L1 3.33366M3.66667 0.666992L6.33333 3.33366"
        stroke="#373738"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SwapIcon;
