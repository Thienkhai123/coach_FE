export interface IVoucherResponse {
  errorMessage: any;
  errorExceptionMessage: any;
  successMessage: string;
  statusCode: number;
  totalData: number;
  totalPage: number;
  isSuccess: boolean;
  data: VoucherData[];
  errors: any;
  otherData: any;
}

export interface VoucherData {
  isCreate: boolean;
  isSameExchangeAndUsageTime: boolean;
  isUnlimitExchangeNumber: boolean;
  status: number;
  statusDisplay: string;
  numberOfUseDisplay: string;
  updatedByUser: any;
  createdByUser: any;
  voucherId: number;
  name: string;
  pointExchange: number;
  enumDiscountType: number;
  value: number;
  dateStartExchange: string;
  dateEndExchange: string;
  dateStartUsage: string;
  dateEndUsage: string;
  exchangeNumber: number;
  createdByUserId: number;
  updatedByUserId: number;
  updatedAt: string;
  createdAt: string;
  isActive: boolean;
  isDeleted: boolean;
}
