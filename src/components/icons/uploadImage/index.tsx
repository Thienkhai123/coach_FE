import React from "react";

interface IUploadImageIconProps {}

const UploadImageIcon = (props: IUploadImageIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      height="70"
      viewBox="0 0 100 70"
      fill="none"
    >
      <rect x="0.5" y="0.5" width="99" height="69" rx="7.5" stroke="#C0C0C0" />
      <path
        d="M44.8269 29.1749C44.4658 29.7535 43.8613 30.134 43.186 30.2299C42.8066 30.2839 42.4285 30.3422 42.052 30.405C40.9991 30.5804 40.25 31.5066 40.25 32.574V41C40.25 42.2426 41.2574 43.25 42.5 43.25H57.5C58.7426 43.25 59.75 42.2426 59.75 41V32.574C59.75 31.5066 59.0009 30.5804 57.948 30.405C57.5715 30.3422 57.1934 30.2839 56.814 30.2299C56.1387 30.134 55.5342 29.7535 55.1731 29.1749L54.3519 27.8589C53.9734 27.2524 53.3294 26.8584 52.6155 26.82C51.7496 26.7735 50.8775 26.75 50 26.75C49.1225 26.75 48.2504 26.7735 47.3845 26.82C46.6706 26.8584 46.0266 27.2524 45.6481 27.8589L44.8269 29.1749Z"
        stroke="#898C8D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M54.5 35.75C54.5 38.2353 52.4853 40.25 50 40.25C47.5147 40.25 45.5 38.2353 45.5 35.75C45.5 33.2647 47.5147 31.25 50 31.25C52.4853 31.25 54.5 33.2647 54.5 35.75Z"
        stroke="#898C8D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M56.75 33.5H56.7575V33.5075H56.75V33.5Z"
        stroke="#898C8D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default UploadImageIcon;
