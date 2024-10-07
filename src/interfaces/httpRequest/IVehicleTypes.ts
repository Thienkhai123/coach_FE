export interface IVehicleTypesResponse {
	isCreate: boolean;
	firstRowSeats: number;
	lastRowSeats: number;
	seatPerRow: number;
	totalDecks: number;
	letters: null;
	seatTypeDisplay: string;
	vehicleTypeId: number;
	name: string;
	manufacturer: null;
	seatType: number;
	totalSeats: number;
	availableSeats: number;
	metadata: null;
	seatSetup: ISeatSetup;
	createdByUserId: number;
	updatedByUserId: number;
	updatedAt: Date;
	createdAt: Date;
	isActive: boolean;
	isDeleted: boolean;
}

export interface ISeatSetup {
	decks: { [key: string]: ISeat[] };
	seats: ISeat[];
	totalDecks: number;
	seatPerRow: number;
	firstRowSeats: number;
	lastRowSeats: number;
	letters: string;
}

export interface ISeat {
	seatNumber: number;
	seatName: string;
	deckNumber: number;
}
