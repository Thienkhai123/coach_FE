export interface ICity {
	keyword?: string;
	page?: number;
	pageSize?: number;
	startCityId?: number;
}

export interface ICityResponse {
	result: ICityResult[];
	more: boolean;
}

export interface ICityResult {
	id: string;
	text: string;
	image: string;
	other?: null;
}
