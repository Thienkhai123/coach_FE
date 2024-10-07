export interface IRequestPaymentTranslate {
	waitPayment: string;
	waitPaymentSuccess: string;
	warningTitle: string;
	warningDes: string;
	contenPyamentFaild: string;
	contenPyamentLinkFaild: string;
	contenPyamentToCheck: string;
	contentWaitPayment: string;
	contentLoginPyament: string;
	detailOrder: IDetailRequestPaymentTranslate;
	button: IButtonRequestPaymentTranslate;
	cancelChangeTickets: string;
	infoRentalCar: string;
	amount: string;
	cancelRental: string;
	cancelRentalCar: string;
}

export interface IDetailRequestPaymentTranslate {
	tiltePrice: string;
	chairPrice: string;
	incentives: string;
	totalPrice: string;
	titlePerson: string;
	fullName: string;
	numberPhone: string;
	email: string;
	birthday: string;
	childrenSeat: string;
	forChildrenUnder25kg: string;
	optional: string;
	titleInformationChildren: string;
	titlePickDrop: string;
	titleTrip: string;
	titleTripReturn: string;
	ticket: string;
	routes: string;
	seat: string;
	timeStart: string;
	type: string;
	pickupPoint: string;
	paypoints: string;
	numberChair: string;
	locationChair: string;
	contactUsByPhone: string;
	cancel: string;
	notFoundTitle: string;
	notFoundContent: string;
	seeQR: string;
}

export interface IButtonRequestPaymentTranslate {
	cancelButton: string;
	homeButton: string;
}

export interface IPaymentInformation {
	titleContent: string;
	paymentInfor: IPaymentDetail[];
}

export interface IPaymentDetail {
	typeComponent?: number;
	name: string;
	content: string;
	colorText?: string;
}
