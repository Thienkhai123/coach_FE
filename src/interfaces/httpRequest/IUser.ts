export interface IUserProfileResponse {
  errorMessage: null;
  successMessage: string;
  statusCode: number;
  totalData: number;
  totalPage: number;
  isSuccess: boolean;
  data: IUserProfile;
  errors: null;
  otherData: null;
}

export interface IUserProfile {
  userId: number;
  email: string;
  name: string;
  phone: string;
  renewToken: null;
  gender: number;
  birthday: null;
  password: string;
  cityId: null;
  cityName: string;
  point: number;
  districtId: null;
  districtName: string;
  wardId: null;
  wardName: string;
  address: string;
}
export interface IUpdateProfilePayload {
  name: string;
  phone: string;
  email: string;
  birthday: string;
  address: string;
  gender: number;
}
export interface IUpdateProfileResponse {
  errorMessage: string;
  successMessage: string;
  statusCode: number;
  totalData: number;
  totalPage: number;
  isSuccess: boolean;
  data: IUserProfile;
  errors: null;
  otherData: null;
}

export interface INotification {
  errorMessage: any;
  errorExceptionMessage: any;
  successMessage: string;
  statusCode: number;
  totalData: number;
  totalPage: number;
  isSuccess: boolean;
  data: DataNoti[];
  errors: any;
  otherData: any;
}

export interface DataNoti {
  statusDisplay: string;
  userNotificationId: number;
  userId: number;
  title: string;
  content: string;
  statusColor: string;
  notifyType: number;
  notifyRole: number;
  url: any;
  createAt: string;
  recordId: number;
  notificationId: any;
  metadata: MetadataNoti;
  isRead: boolean;
  status: number;
  createdByUserId: any;
  updatedByUserId: any;
  updatedAt: string;
  createdAt: string;
  isActive: boolean;
  isDeleted: boolean;
}

export interface MetadataNoti {
  clickCount: number;
  imageUrl: any;
}
