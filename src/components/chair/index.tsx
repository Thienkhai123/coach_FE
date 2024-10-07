import React from "react";
import ChairIcon from "../icons/chair";

const Chair = (props: {
	numberChair: string;
	fill: string;
	stroke: string;
	colorText?: string;
}) => {
	const {
		numberChair = "1",
		fill = "#FCE6D5",
		stroke = "#F6CDB5",
		colorText = "",
	} = props;
	return (
		<div className='relative flex justify-center items-center'>
			<ChairIcon fill={fill} stroke={stroke} width='40' height='37' />
			<div className='absolute pb-1 flex items-center justify-center'>
				<p
					className={`${
						numberChair?.length > 3 ? "text-[10px]" : "text-xs"
					} font-normal leading-6`}
					style={{ color: colorText }}>
					{numberChair}
				</p>
			</div>
		</div>
	);
};

export default Chair;
