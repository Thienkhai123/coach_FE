import React from "react";

interface IInformationIconProps {}

const InformationIcon = (props: IInformationIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="17"
      viewBox="0 0 18 17"
      fill="none"
    >
      <path
        d="M8.375 7.84338L8.40957 7.8261C8.88717 7.5873 9.42493 8.01867 9.29542 8.5367L8.70458 10.9001C8.57507 11.4181 9.11283 11.8495 9.59043 11.6107L9.625 11.5934M16.5 8.46838C16.5 12.6105 13.1421 15.9684 9 15.9684C4.85786 15.9684 1.5 12.6105 1.5 8.46838C1.5 4.32625 4.85786 0.968384 9 0.968384C13.1421 0.968384 16.5 4.32625 16.5 8.46838ZM9 5.34338H9.00625V5.34963H9V5.34338Z"
        stroke="#237EE9"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default InformationIcon;
