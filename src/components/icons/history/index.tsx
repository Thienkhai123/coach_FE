import React from "react";

interface IHistoryIconProps {
  fill?: string;
}

const HistoryIcon = (props: IHistoryIconProps) => {
  const { fill = "#0867A5" } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M5.44216 7.14302L2.77867 7.81105C2.69374 7.83198 2.61051 7.7657 2.61051 7.67675L2.59692 4.85989C2.59692 4.74303 2.72771 4.67675 2.81604 4.75L5.49312 6.89709C5.51335 6.91317 5.52876 6.93477 5.53756 6.95944C5.54637 6.9841 5.54821 7.01081 5.54289 7.0365C5.53757 7.06219 5.52529 7.08582 5.50747 7.10466C5.48965 7.12351 5.46701 7.1368 5.44216 7.14302ZM2.59352 12.3948L3.55665 12.0547C3.59024 12.0428 3.62699 12.045 3.65905 12.0606C3.69111 12.0763 3.71594 12.1042 3.72822 12.1384C3.76049 12.2273 3.79447 12.3145 3.83014 12.4017C4.1325 13.136 4.56566 13.7971 5.11942 14.364C5.66703 14.928 6.31602 15.3776 7.0304 15.6878C7.77046 16.0091 8.56597 16.174 9.36945 16.1727C10.1814 16.1727 10.9679 16.0105 11.7085 15.6878C12.4229 15.3776 13.0719 14.928 13.6195 14.364C14.1715 13.7971 14.6047 13.136 14.9088 12.4017C15.2199 11.6414 15.3794 10.8247 15.3776 10C15.3776 9.16628 15.2196 8.35698 14.9054 7.59651C14.603 6.86221 14.1698 6.20116 13.6161 5.6343C13.0685 5.07027 12.4195 4.62068 11.7051 4.31047C10.9679 3.98779 10.1797 3.82558 9.36775 3.82558C8.55579 3.82558 7.76932 3.98779 7.0287 4.31047C6.31432 4.62068 5.66533 5.07027 5.11772 5.6343C4.94446 5.81396 4.78139 6.00058 4.6319 6.19768L3.61611 5.3814C4.95295 3.62675 7.0338 2.49826 9.37115 2.5C13.4411 2.50175 16.7093 5.89593 16.6686 10.0767C16.6278 14.1843 13.3749 17.5 9.36775 17.5C6.21675 17.5 3.53287 15.4488 2.51028 12.5762C2.4848 12.5029 2.52218 12.4209 2.59352 12.3948Z"
        fill={fill}
      />
      <path
        d="M8.86884 6.02948H9.88283C9.97559 6.02948 10.0515 6.09115 10.0515 6.16652V10.4063L13.0576 12.1725C13.1335 12.2153 13.1504 12.301 13.0934 12.3643L12.4905 13.0324C12.4357 13.0941 12.3303 13.1061 12.2544 13.0616L8.76976 10.9939C8.72549 10.9682 8.7002 10.9271 8.7002 10.8826V6.16652C8.7002 6.09115 8.77609 6.02948 8.86884 6.02948Z"
        fill={fill}
      />
    </svg>
  );
};

export default HistoryIcon;
