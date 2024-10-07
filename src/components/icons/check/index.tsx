const CheckIcon = ({ width = "16", height = "16", viewBox = "0 0 16 16" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="check">
        <path
          id="Icon"
          d="M13.3242 4.25L6.44922 11.125L3.32422 8"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

export default CheckIcon;
