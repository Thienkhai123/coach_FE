import React from "react";

const ClockWait = ({ width = "60", height = "60" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0.5" width="60" height="60" rx="30" fill="#FCE6D5" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M30.5 44C38.232 44 44.5 37.732 44.5 30C44.5 22.268 38.232 16 30.5 16C22.768 16 16.5 22.268 16.5 30C16.5 37.732 22.768 44 30.5 44ZM31.4365 21.2499C31.4365 20.7322 31.0168 20.3124 30.499 20.3124C29.9813 20.3124 29.5615 20.7322 29.5615 21.2499V29.9999C29.5615 30.5177 29.9813 30.9374 30.499 30.9374H37.499C38.0168 30.9374 38.4365 30.5177 38.4365 29.9999C38.4365 29.4822 38.0168 29.0624 37.499 29.0624H31.4365V21.2499Z"
        fill="#DF5030"
      />
    </svg>
  );
};

export default ClockWait;
