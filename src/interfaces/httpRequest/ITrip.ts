export interface ITripPayload {
  startCityId: number;
  endCityId: number;
  departureDate: string;
  numberOfTicket: number;
  departureTimeStart: string | null;
  departureTimeEnd: string | null;
  vehicleTypeIds: string;
  priceRangeStart?: number | null;
  priceRangeEnd?: number | null;
  pageSize: number;
  deck?: number;
  page?: number;
}
export interface IReservationStartPayload {
  tripId: number;
  routeId: number;
}
export interface ITripStartPlacesPayload {
  tripId: number;
  routeId: number;
}
export interface ITripPlacesPayload {
  tripId: number;
  routeId: number;
}
export interface IReservationValidateSeatsPayload {
  ticketBatchId: number;
  seats: string;
}
export interface ITicketInfoPayload {
  code: string;
  phone: string;
}

export interface ITripResponse {
  errorMessage: null;
  errorExceptionMessage: null;
  successMessage: string;
  statusCode: number;
  totalData: number;
  totalPage: number;
  isSuccess: boolean;
  data: ITripData[];
  errors: null;
  otherData: null;
}

export interface ITrip {
  isCreate: boolean;
  route: ITripData | null;
  vehicle: IVehicle;
  tripDrivers: any[];
  tripDriverAssistants: any[];
  tripRoutes: any[];
  tripPlaces: any[];
  driverIds: null;
  driverAssistantIds: null;
  isCopy: boolean;
  curSubRouteId: null;
  ticketCount: number;
  tripId: number;
  vehicleId: null;
  routeId: number;
  startAt: Date;
  exactStartAt: null;
  endAt: Date;
  exactEndAt: null;
  type: number;
  repeatWeekdays: null;
  repeatStartTime: null;
  repeatEndAt: null;
  price: number;
  specialPrice: number;
  allowOnlineSale: boolean;
  note: null;
  driverSalary: number;
  driverAssistantSalary: number;
  deck1TicketCount: number;
  deck2TicketCount: number;
  metadata: null;
  createdByUserId: number;
  updatedByUserId: number;
  updatedAt: Date;
  createdAt: Date;
  isActive: boolean;
  isDeleted: boolean;
  vehicleType: IVehicleType;
}

export interface ITripRoute {
  trip: ITrip;
  route: ITripData;
  isChecked: boolean;
  timeFromStartMinutes: number;
  tripRouteId: number;
  tripId: number;
  routeId: number;
  startAt: Date;
  exactStartAt: null;
  exactEndAt: null;
  timeFromStart: string;
  price: number;
  specialPrice: number;
  ticketCount: number;
  createdByUserId: number;
  updatedByUserId: number;
  updatedAt: Date;
  createdAt: Date;
  isActive: boolean;
  isDeleted: boolean;
}
export interface IRouteSubRoute {
  subRoute: ITripData;
  routeSubRouteId: number;
  routeId: number;
  subRouteId: number;
  createdByUserId: number;
  updatedByUserId: number;
  updatedAt: Date;
  createdAt: Date;
  isActive: boolean;
  isDeleted: boolean;
}
export interface IRouteSubRoute {
  subRoute: ITripData;
  routeSubRouteId: number;
  routeId: number;
  subRouteId: number;
  createdByUserId: number;
  updatedByUserId: number;
  updatedAt: Date;
  createdAt: Date;
  isActive: boolean;
  isDeleted: boolean;
}

export interface ITripData {
  tripRoutes?: ITripRoute[];
  trips?: ITrip[];
  ticketCounts?: number;
  isCreate: boolean;
  isMainRoute: boolean;
  routeTypeDisplay: string;
  totalPlaceInRoute: number;
  totalPlaceInRouteDisplay: string;
  startPlace: IPlace | null;
  endPlace: IPlace | null;
  parentRoute: null;
  startRoutePlaces: any[];
  endRoutePlaces: any[];
  routeSubRoutes: IRouteSubRoute[];
  routeId: number;
  name: string;
  startPlaceId: number | null;
  endPlaceId: number | null;
  estimationInMinutes: number;
  note: null;
  metadata: null;
  createdByUserId: number;
  updatedByUserId: number;
  updatedAt: Date;
  createdAt: Date;
  isActive: boolean;
  isDeleted: boolean;
}
export interface IPlace {
  isCreate: boolean;
  addressDisplay: string;
  typeDisplay: string;
  ward: null;
  district: null;
  city: null;
  placeId: number;
  name: string;
  type: number;
  address: string;
  wardId: number;
  districtId: number;
  cityId: number;
  note: null;
  metadata: null;
  createdByUserId: number;
  updatedByUserId: number;
  updatedAt: Date;
  createdAt: Date;
  isActive: boolean;
  isDeleted: boolean;
}

export interface IVehicle {
  isCreate: boolean;
  vehicleType: IVehicleType;
  statusDisplay: string;
  vehicleId: number;
  name: string;
  vehicleTypeId: number;
  licenseNumber: string;
  status: number;
  metadata: null;

  createdByUserId: number;
  updatedByUserId: number;
  updatedAt: Date;
  createdAt: Date;
  isActive: boolean;
  isDeleted: boolean;

  firstRowSeats: number;
  lastRowSeats: number;
  seatPerRow: number;
  totalDecks: number;
  letters: null;
  seatTypeDisplay: string;

  manufacturer: null;
  seatType: number;
  totalSeats: number;
  availableSeats: number;

  seatSetup: ISeatSetup;
}
export interface IVehicleType {
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

export interface IReservationStartResponse {
  errorMessage: string;
  errorExceptionMessage: null;
  successMessage: string;
  statusCode: number;
  totalData: number;
  totalPage: number;
  isSuccess: boolean;
  data: IReservationStartData;
  errors: null;
  otherData: null;
}

export interface IReservationStartData {
  trip: ITrip;
  tickets: any[];
  route: IReservationStartRoute;
  tripRoute: null;
  user: null;
  staffUser: null;
  agency: null;
  startPlace: null;
  endPlace: null;
  userPhone: null;
  userName: null;
  userBirthday: null;
  userEmail: null;
  seats: null;
  statusDisplay: string;
  ticketBatchId: number;
  status: number;
  statusChangedAt: Date;
  tripId: number;
  routeId: number;
  userId: null;
  staffUserId: null;
  agencyId: number;
  tripRouteId: null;
  startPlaceId: null;
  endPlaceId: null;
  note: string;
  price: number;
  code: string;
  totalCost: number;
  metadata: null;
  createdByUserId: null;
  updatedByUserId: null;
  updatedAt: Date;
  createdAt: Date;
  isActive: boolean;
  isDeleted: boolean;
}
export interface IReservationStartRoute {
  isCreate: boolean;
  isMainRoute: boolean;
  routeTypeDisplay: string;
  totalPlaceInRoute: number;
  totalPlaceInRouteDisplay: string;
  startPlace: null;
  endPlace: null;
  parentRoute: null;
  startRoutePlaces: any[];
  endRoutePlaces: any[];
  routeSubRoutes: any[];
  routeId: number;
  name: string;
  startPlaceId: number;
  endPlaceId: number;
  estimationInMinutes: number;
  note: null;
  metadata: null;
  createdByUserId: number;
  updatedByUserId: number;
  updatedAt: Date;
  createdAt: Date;
  isActive: boolean;
  isDeleted: boolean;
}

export interface IReservationStartTrip {
  isCreate: boolean;
  route: null;
  vehicle: IVehicle;
  tripDrivers: any[];
  tripDriverAssistants: any[];
  tripRoutes: any[];
  tripPlaces: any[];
  driverIds: null;
  driverAssistantIds: null;
  isCopy: boolean;
  curSubRouteId: null;
  ticketCount: number;
  tripId: number;
  vehicleId: number;
  routeId: number;
  startAt: Date;
  exactStartAt: null;
  endAt: Date;
  exactEndAt: null;
  type: number;
  repeatWeekdays: null;
  repeatStartTime: null;
  repeatEndAt: null;
  price: number;
  specialPrice: number;
  allowOnlineSale: boolean;
  note: null;
  driverSalary: number;
  driverAssistantSalary: number;
  deck1TicketCount: number;
  deck2TicketCount: number;
  metadata: null;
  createdByUserId: number;
  updatedByUserId: number;
  updatedAt: Date;
  createdAt: Date;
  isActive: boolean;
  isDeleted: boolean;
}

export interface ITripReservedSeatResponse {
  errorMessage: null;
  errorExceptionMessage: null;
  successMessage: string;
  statusCode: number;
  totalData: number;
  totalPage: number;
  isSuccess: boolean;
  data: string[];
  errors: null;
  otherData: null;
}
export interface ReservationValidateSeatsResponse {
  errorMessage: string;
  errorExceptionMessage: null;
  successMessage: string;
  statusCode: number;
  totalData: number;
  totalPage: number;
  isSuccess: boolean;
  data: IReservationValidateSeatsData;
  errors: null;
  otherData: null;
}
export interface IReservationUpdateInfoResponse {
  errorMessage: string;
  errorExceptionMessage: null;
  successMessage: string;
  statusCode: number;
  totalData: number;
  totalPage: number;
  isSuccess: boolean;
  data: IReservationValidateSeatsData;
  errors: null;
  otherData: null;
}
export interface ITicket {
  trip: ITrip;
  startPlace: null;
  endPlace: null;
  ticketId: number;
  ticketBatchId: number;
  seatNumber: number;
  seatName: string;
  deckNumber: number;
  type: number;
  paymentStatus: number;
  scheduledDepartAt: Date;
  departAt: null;
  tripId: number;
  routeId: number;
  tripRouteId: null;
  startPlaceId: null;
  endPlaceId: null;
  note: string;
  price: number;
  childPrice: number;
  name: null;
  birthday: null;
  phone: null;
  email: null;
  childName: null;
  childBirthday: null;
  hasChild: boolean;
  metadata: null;
  createdByUserId: null;
  updatedByUserId: null;
  updatedAt: Date;
  createdAt: Date;
  isActive: boolean;
  isDeleted: boolean;
}
export interface IReservationValidateSeatsData {
  trip: ITrip;
  tickets: ITicket[];
  route: null;
  tripRoute: null;
  user: null;
  staffUser: null;
  agency: null;
  startPlace: null;
  endPlace: null;
  userPhone: null;
  userName: null;
  userBirthday: null;
  userEmail: null;
  seats: null;
  statusDisplay: string;
  ticketBatchId: number;
  status: number;
  statusChangedAt: Date;
  tripId: number;
  routeId: number;
  userId: null;
  staffUserId: null;
  agencyId: number;
  tripRouteId: null;
  startPlaceId: null;
  endPlaceId: null;
  note: string;
  price: number;
  code: string;
  totalCost: number;
  metadata: null;
  createdByUserId: null;
  updatedByUserId: null;
  updatedAt: Date;
  createdAt: Date;
  isActive: boolean;
  isDeleted: boolean;
}
export interface ITripPlacesResponse {
  place: IPlace;
  isChecked: boolean;
  tripPlaceId: number;
  tripId: number;
  placeId: number;
  startAt: Date;
  createdByUserId: number;
  updatedByUserId: number;
  updatedAt: Date;
  createdAt: Date;
  isActive: boolean;
  isDeleted: boolean;
}
export interface IPlace {
  isCreate: boolean;
  addressDisplay: string;
  typeDisplay: string;
  ward: null;
  district: null;
  city: null;
  placeId: number;
  name: string;
  type: number;
  address: string;
  wardId: number;
  districtId: number;
  cityId: number;
  note: null;
  metadata: null;
  createdByUserId: number;
  updatedByUserId: number;
  updatedAt: Date;
  createdAt: Date;
  isActive: boolean;
  isDeleted: boolean;
}

export interface ITicketInfoResponse {
  errorMessage: string;
  errorExceptionMessage: string;
  successMessage: string;
  statusCode: number;
  totalData: number;
  totalPage: number;
  isSuccess: boolean;
  data: ITicketInfoData;
  errors: null;
  otherData: null;
}
export interface ITicketInfoData {
  trip: ITrip;
  tickets: ITicket[];
  route: ITripData;
  tripRoute: null;
  user: null;
  staffUser: null;
  agency: null;
  totalVoucherValue: number;
  startPlace: IPlace | null;
  endPlace: IPlace | null;
  userPhone: null;
  userName: null;
  userBirthday: null;
  userEmail: null;
  seats: null;
  statusDisplay: string;
  ticketBatchId: number;
  status: number;
  paymentStatus: number;
  statusChangedAt: Date;
  tripId: number;
  routeId: number;
  userId: number;
  staffUserId: null;
  agencyId: number;
  tripRouteId: null;
  startPlaceId: number;
  endPlaceId: number;
  note: string;
  price: number;
  code: string;
  totalCost: number;
  totalPaid: number;
  metadata: null;
  createdByUserId: null;
  updatedByUserId: null;
  updatedAt: Date;
  createdAt: Date;
  isActive: boolean;
  isDeleted: boolean;
}

export interface IInfoBank {
  isSuccess: boolean;
  code: number;
  exception: any;
  data: IBank;
  errorMessage: any;
  successMessage: string;
  returnMessage: string;
  errorExceptionMessage: any;
  filePath: any;
  errors: any;
}

export interface IBank {
  isCreate: boolean;
  bankData: any;
  bankId: number;
  bin: string;
  name: string;
  shortName: string;
  accountNumber: string;
  accountName: string;
  isPrimary: boolean;
  bankMetadata: any;
  createdByUserId: number;
  updatedByUserId: any;
  updatedAt: string;
  createdAt: string;
  isActive: boolean;
  isDeleted: boolean;
}
