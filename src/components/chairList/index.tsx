import React from "react";
import ChairMiniIcon from "../icons/chairMini";
import useTrans from "@/hook/useTrans";

const ChairList = () => {
	const trans = useTrans();
	const { BOOKING } = trans;
	const chairArray = [
		{ fill: "#FCE6D5", stroke: "#F6CDB5", content: `${BOOKING.emptyPick}` },
		{ fill: "#DF5030", stroke: "#DF5030", content: `${BOOKING.picking}` },
		{ fill: "#D9D9D9", stroke: "#D9D9D9", content: `${BOOKING.picked}` },
	];
	return (
		<div className='pl-6 py-5'>
			<div className='flex flex-col gap-6 '>
				{chairArray.map((elm, ind: number) => {
					return (
						<div key={ind} className='flex gap-2 items-center'>
							<div>
								<ChairMiniIcon
									fill={elm.fill}
									stroke={elm.stroke}
								/>
							</div>
							<div>
								<p className='text-sm font-medium'>
									{elm.content}
								</p>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default ChairList;
