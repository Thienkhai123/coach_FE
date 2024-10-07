export interface IGetShippingOrderDetail {
  isSuccess: boolean;
  code: number;
  exception: any;
  data: Data;
  errorMessage: any;
  successMessage: string;
  errorExceptionMessage: any;
  filePath: any;
  errors: any;
}

export interface Data {
  isCreate: boolean;
  codPaid: number;
  pickupImageFile: any;
  recipientImageFile: any;
  pickupImageUrl: any;
  recipientImageUrl: any;
  weight: number;
  shipmentTrip: any;
  packages: any[];
  packageTypeDisplay: string;
  codStatusDisplay: string;
  codFeeStatusDisplay: string;
  shippingFeeStatusDisplay: string;
  shippingStatusDisplay: string;
  processingStatusDisplay: string;
  dahFeeStatusDisplay: string;
  loadingLocation: LoadingLocation;
  unloadingLocation: UnloadingLocation;
  width: number;
  length: number;
  height: number;
  typeValues: any;
  typeValuesDisplay: string[];
  trackingShippingStatuses: TrackingShippingStatuse[];
  shippingOrderId: number;
  shippingOrderCode: string;
  qrCodeUrl: string;
  totalPackages: number;
  status: number;
  metadata: Metadata;
  senderInfo: SenderInfo;
  receiverInfo: ReceiverInfo;
  shippingFee: number;
  shippingFeeStatus: number;
  codAmount: number;
  codFee: number;
  codStatus: number;
  codFeeStatus: number;
  shippingPackageType: number;
  shippingProcessingStatus: number;
  shippingStatus: number;
  isDeliveryAtHome: boolean;
  dahFee: number;
  dahFeeStatus: number;
  companyId: any;
  wardId: any;
  shipmentTripId: any;
  loadingLocationId: number;
  unloadingLocationId: number;
  unloadingDate: any;
  userId: any;
  payerType: number;
  isCod: boolean;
  createdByUserId: any;
  updatedByUserId: any;
  updatedAt: string;
  createdAt: string;
  isActive: boolean;
  isDeleted: boolean;
}

export interface LoadingLocation {
  isCreate: boolean;
  districtId: any;
  cityId: any;
  cityName: string;
  districtName: string;
  ward: any;
  typeDisplay: string;
  fullAddress: string;
  shipmentLocationId: number;
  name: string;
  address: string;
  wardId: number;
  type: number;
  metadata: any;
  createdByUserId: number;
  updatedByUserId: any;
  updatedAt: string;
  createdAt: string;
  isActive: boolean;
  isDeleted: boolean;
}

export interface UnloadingLocation {
  isCreate: boolean;
  districtId: any;
  cityId: any;
  cityName: string;
  districtName: string;
  ward: any;
  typeDisplay: string;
  fullAddress: string;
  shipmentLocationId: number;
  name: string;
  address: string;
  wardId: number;
  type: number;
  metadata: any;
  createdByUserId: number;
  updatedByUserId: any;
  updatedAt: string;
  createdAt: string;
  isActive: boolean;
  isDeleted: boolean;
}

export interface TrackingShippingStatuse {
  statusDisplay: any;
  trackingShippingStatusId: number;
  status: number;
  note: any;
  metadata: any;
  shippingOrderId: number;
  createdByUserId: any;
  updatedByUserId: any;
  updatedAt: string;
  createdAt: string;
  isActive: boolean;
  isDeleted: boolean;
}

export interface Metadata {
  packageTypeValues: string;
}

export interface SenderInfo {
  senderName: string;
  senderPhone: string;
  senderAddress: string;
  senderCI: string;
  email: string;
}

export interface ReceiverInfo {
  receiverName: string;
  receiverPhone: string;
  receiverAddress: string;
  receiverCI: string;
}
