import React from "react";

interface IFacebookIconProps {}

const FacebookIcon = (props: IFacebookIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="41"
      height="40"
      viewBox="0 0 41 40"
      fill="none"
    >
      <path
        d="M40.75 20C40.75 8.9543 31.7957 0 20.75 0C9.7043 0 0.75 8.9543 0.75 20C0.75 29.9824 8.06367 38.2566 17.625 39.757V25.7812H12.5469V20H17.625V15.5938C17.625 10.5813 20.6109 7.8125 25.1793 7.8125C27.3668 7.8125 29.6562 8.20312 29.6562 8.20312V13.125H27.1344C24.65 13.125 23.875 14.6668 23.875 16.25V20H29.4219L28.5352 25.7812H23.875V39.757C33.4363 38.2566 40.75 29.9824 40.75 20Z"
        fill="#61646B"
      />
    </svg>
  );
};

export default FacebookIcon;
