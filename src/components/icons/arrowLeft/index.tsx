const ArrowLeftIcon = ({ stroke = "#101F24", width = "20", height = "18" }) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={width}
			height={height}
			viewBox='0 0 20 18'
			fill='none'>
			<path
				d='M8.5 16.5L1 9M1 9L8.5 1.5M1 9H19'
				stroke={stroke}
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
};

export default ArrowLeftIcon;
