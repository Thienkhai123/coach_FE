import React from "react";

interface IAccountIconProps {}

const AccountIcon = (props: IAccountIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
    >
      <g clipPath="url(#clip0_12048_4829)">
        <circle
          cx="14"
          cy="14"
          r="13"
          fill="#EFEFF0"
          stroke="#6A6F70"
          strokeWidth="2"
        />
        <circle
          cx="14"
          cy="11.0835"
          r="4.25"
          stroke="#6A6F70"
          strokeWidth="2"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.93066 22.5724C5.34864 19.5091 9.40455 17.5 14.0001 17.5C18.5957 17.5 22.6516 19.5091 25.0696 22.5724C24.6512 23.1118 24.1943 23.6198 23.703 24.0923C21.7345 21.3912 18.2258 19.5 14.0001 19.5C9.77439 19.5 6.26577 21.3912 4.29723 24.0923C3.80591 23.6198 3.34901 23.1118 2.93066 22.5724Z"
          fill="#6A6F70"
        />
      </g>
      <defs>
        <clipPath id="clip0_12048_4829">
          <rect width="28" height="28" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default AccountIcon;
