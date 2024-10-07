import React from "react";

interface ILogoDrawerIconProps {}

const LogoDrawerIcon = (props: ILogoDrawerIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="60"
      height="48"
      viewBox="0 0 60 48"
      fill="none"
    >
      <path
        d="M36.2178 0.875L26.757 20.4572H19.1625L29.0748 0.875H12.0726L0 21.5349L10.3834 38.5454L18.2328 22.7106H25.668L16.2532 42.1949H36.2178L48.2904 21.5349L36.2178 0.875Z"
        fill="url(#paint0_linear_12614_26695)"
      />
      <path
        d="M15.662 43.3146L13.8223 47.125H57.6452L60.0002 43.3146H15.662Z"
        fill="url(#paint1_linear_12614_26695)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_12614_26695"
          x1="-0.0018517"
          y1="21.5349"
          x2="48.2904"
          y2="21.5349"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.02" stopColor="#FFD362" />
          <stop offset="0.15" stopColor="#F4BA62" />
          <stop offset="0.38" stopColor="#F28F3F" />
          <stop offset="0.685" stopColor="#ED693C" />
          <stop offset="1" stopColor="#E83E39" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_12614_26695"
          x1="13.8205"
          y1="45.2198"
          x2="60.0002"
          y2="45.2198"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.02" stopColor="#FFD362" />
          <stop offset="0.15" stopColor="#F4BA62" />
          <stop offset="0.38" stopColor="#F28F3F" />
          <stop offset="0.685" stopColor="#ED693C" />
          <stop offset="1" stopColor="#E83E39" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default LogoDrawerIcon;
