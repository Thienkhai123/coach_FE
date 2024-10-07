export interface IRentalResponse {
  isSuccess: boolean;
  code: number;
  exception: any;
  data: IRental;
  errorMessage: any;
  successMessage: string;
  returnMessage: string;
  errorExceptionMessage: any;
  filePath: any;
  errors: any;
}

export interface IRental {
  isCreate: boolean;
  statusDisplay: string;
  vehicleRentalIds: any;
  rentalContractPayments: any[];
  originCity: OriginCity;
  destinationCity: DestinationCity;
  vehicleRentalContracts: any[];
  vehicleRentalTypes: any;
  schedule: any;
  vehicleRentalTypesDisplay: string[];
  vehicleRentalTypeGroups: VehicleRentalTypeGroup[];
  rentalContractId: number;
  customerName: string;
  customerPhone: string;
  originCityId: number;
  destinationCityId: number;
  startAt: string;
  endAt: string;
  status: number;
  totalPaymentAmount: number;
  metadata: Metadata;
  vehicleCount: number;
  userId: any;
  discount: number;
  createdByUserId: any;
  updatedByUserId: any;
  updatedAt: string;
  createdAt: string;
  isActive: boolean;
  isDeleted: boolean;
}

export interface VehicleRentalTypeGroup {
  count: number;
  vehicleRentalType: number;
  vehicleRentalTypeDisplay: string;
}

export interface Metadata {
  customerSchedule: any;
  advisorSchedule: any;
  vehicleRentalTypes: number[];
  reason: any;
}

export interface OriginCity {
  districts: any[];
  isCreate: boolean;
  districtsCount: number;
  cityId: number;
  name: string;
  refCityId: string;
  countryId: any;
  createdByUserId: number;
  updatedByUserId: number;
  updatedAt: string;
  createdAt: string;
  isActive: boolean;
  isDeleted: boolean;
}

export interface DestinationCity {
  districts: any[];
  isCreate: boolean;
  districtsCount: number;
  cityId: number;
  name: string;
  refCityId: string;
  countryId: any;
  createdByUserId: number;
  updatedByUserId: number;
  updatedAt: string;
  createdAt: string;
  isActive: boolean;
  isDeleted: boolean;
}
