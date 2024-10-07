import React from "react";

interface IStarIconProps {
	fill?: string;
	width?: string;
	height?: string;
	stroke?: string;
}

const StarIcon = (props: IStarIconProps) => {
	const {
		fill = "#0273BC",
		width = "20",
		height = "20",
		stroke = "#0273BC",
	} = props;
	return (
		<svg
			width={width}
			height={height}
			viewBox='0 0 20 20'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M9.56858 2.91569C9.7287 2.53071 10.2741 2.53071 10.4342 2.91569L12.2058 7.17524C12.2733 7.33753 12.426 7.44843 12.6012 7.46247L17.1997 7.83114C17.6153 7.86446 17.7839 8.38313 17.4672 8.65438L13.9636 11.6556C13.8301 11.7699 13.7718 11.9494 13.8126 12.1203L14.883 16.6077C14.9798 17.0133 14.5385 17.3339 14.1827 17.1165L10.2457 14.7118C10.0957 14.6202 9.90706 14.6202 9.75705 14.7118L5.82006 17.1165C5.46423 17.3339 5.02302 17.0133 5.11976 16.6077L6.19017 12.1203C6.23095 11.9494 6.17266 11.7699 6.03916 11.6556L2.53556 8.65438C2.2189 8.38313 2.38743 7.86446 2.80305 7.83114L7.40159 7.46247C7.5768 7.44843 7.72943 7.33753 7.79693 7.17524L9.56858 2.91569Z'
				stroke={stroke}
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
};

export default StarIcon;
