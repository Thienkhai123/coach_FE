const MenuIcon = ({ stroke = "#101F24" }) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'>
			<path
				d='M3.75 6.75H20.25M3.75 12H20.25M3.75 17.25H12'
				stroke={stroke}
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
};
export default MenuIcon;
