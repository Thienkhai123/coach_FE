const EclipseIcon = ({ width = "14", height = "14", stroke = "#878F91" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 14 14"
      fill="none"
    >
      <circle
        cx="7"
        cy="7"
        r="5"
        fill="#F3F3F3"
        stroke={stroke}
        strokeWidth="4"
      />
    </svg>
  );
};

export default EclipseIcon;
