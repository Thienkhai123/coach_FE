import { IBookingTranslate } from "@/interfaces/IBookingTranslate";
import TripItem from "./tripItem";
import { ITripData } from "@/interfaces/httpRequest/ITrip";
import moment from "moment";
import { useEffect, useState } from "react";
import { ICityResponse } from "@/interfaces/httpRequest/ICity";
import "moment/locale/vi";
import TripItemDesktop from "./tripItemDesktop";
import { EclipseIcon } from "@/components/icons";

interface IOwnRouteCardProps {
	trip: ITripData;
	BOOKING: IBookingTranslate;
	isReturnTrip?: boolean;
}

const OwnRouteCard = ({
	trip,
	BOOKING,
	isReturnTrip = false,
}: IOwnRouteCardProps) => {
	const { trips, tripRoutes, startPlace, endPlace, routeSubRoutes } =
		trip || {};
	const { startAt, endAt, price, vehicle, ticketCount, specialPrice } =
		(trips ? trips[0] : tripRoutes && tripRoutes[0].trip) || {};
	const { vehicleType } = vehicle || {};
	const { totalSeats, name: nameVehicleType } = vehicleType || {};

	const startMoment = moment(startAt).format();
	const endMoment = moment(endAt).format();
	const duration = moment.duration(moment(endMoment).diff(startMoment));

	const hours = duration.asHours().toFixed(0);

	return (
		<div className='rounded-lg bg-neutral-grey-000 p-3'>
			<p
				className={`font-bold text-sm  ${
					isReturnTrip ? "text-primary-500" : "text-secondary-300"
				}`}>
				{`${isReturnTrip ? BOOKING.return : BOOKING.departure}: `}
				<span className='first-letter:uppercase inline-block'>
					{moment(startAt).locale("vi").format("dddd, DD/MM/YYYY")}
				</span>
			</p>
			<div className='mt-2 flex gap-2 items-center'>
				<p className='text-neutral-grey-700 text-base font-bold'>
					{`${moment(startAt).format("HH:mm")}`}
				</p>
				<div className='flex-1 flex items-center'>
					<EclipseIcon
						stroke={isReturnTrip ? "#DF5030" : "#0273BC"}
					/>
					<div className='flex-1 border border-dashed ml-3' />
					<p className='text-neutral-grey-600 text-xs  font-medium'>
						{parseInt(hours)} {BOOKING.hours}
					</p>
					<div className='flex-1 border border-dashed mr-3' />
					<EclipseIcon
						stroke={isReturnTrip ? "#DF5030" : "#0273BC"}
					/>
				</div>
				<p className='text-neutral-grey-700 text-base font-bold'>
					{`${moment(endAt).format("HH:mm")}`}
				</p>
			</div>
			<div className='flex items-center justify-between gap-7 '>
				<p className='text-neutral-grey-600 text-xs lg:text-sm font-semibold'>
					{startPlace
						? startPlace?.name
						: routeSubRoutes[0].subRoute.startPlace?.name || ""}
				</p>
				<p className='text-neutral-grey-600 text-xs lg:text-sm font-semibold text-end'>
					{endPlace
						? endPlace?.name
						: routeSubRoutes[routeSubRoutes.length - 1].subRoute
								.endPlace?.name || ""}
				</p>
			</div>
		</div>
	);
};

export default OwnRouteCard;
