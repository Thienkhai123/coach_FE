import React from "react";

interface IBellIconProps {
	fill?: string;
	width?: string;
	height?: string;
	stroke?: string;
}

const BellIcon = (props: IBellIconProps) => {
	const {
		fill = "",
		width = "20",
		height = "20",
		stroke = "#101F24",
	} = props;
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={width}
			height={height}
			viewBox='0 0 20 20'
			fill='none'>
			<path
				d='M12.8569 15.0817C14.7514 14.857 16.5783 14.4116 18.3111 13.7719C16.8743 12.177 15.9998 10.0656 15.9998 7.75V7.04919C15.9999 7.03281 16 7.01641 16 7C16 3.68629 13.3137 1 10 1C6.68629 1 4 3.68629 4 7L3.9998 7.75C3.9998 10.0656 3.12527 12.177 1.68848 13.7719C3.4214 14.4116 5.24843 14.857 7.14314 15.0818M12.8569 15.0817C11.92 15.1928 10.9666 15.25 9.9998 15.25C9.03317 15.25 8.07988 15.1929 7.14314 15.0818M12.8569 15.0817C12.9498 15.3711 13 15.6797 13 16C13 17.6569 11.6569 19 10 19C8.34315 19 7 17.6569 7 16C7 15.6797 7.05019 15.3712 7.14314 15.0818'
				stroke={stroke}
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
};

export default BellIcon;
