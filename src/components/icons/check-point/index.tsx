import React from "react";

interface ICheckPointIconProps {}

const CheckPointIcon = (props: ICheckPointIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="38"
      viewBox="0 0 13 38"
      fill="none"
    >
      <circle cx="6.5" cy="6.5" r="6.5" fill="#AFB1B6" />
      <circle cx="6.5" cy="6.5" r="3.5" fill="#61646B" />
      <line x1="7" y1="13" x2="7" y2="38" stroke="#61646B" />
    </svg>
  );
};

export default CheckPointIcon;
