export type IUserPoints = Root2[];

export interface Root2 {
	voucher: any;
	userPointHistoryId: number;
	type: number;
	isConfirmed: boolean;
	point: number;
	content: string;
	userId: number;
	ticketBatchId: number;
	ticketId: any;
	voucherId: any;
	confirmedByUserId: any;
	confirmedAt: any;
	createdByUserId: number;
	updatedByUserId: number;
	updatedAt: string;
	createdAt: string;
	isActive: boolean;
	isDeleted: boolean;
}

export type IHistoriesPoints = HistoryPoint[];
export interface IHistoryPointResponse {
	errorMessage: string;
	errorExceptionMessage: null;
	successMessage: string;
	statusCode: number;
	totalData: number;
	totalPage: number;
	isSuccess: boolean;
	data: HistoryPoint[];
	errors: null;
	otherData: null;
}

export interface HistoryPoint {
	voucher: any;
	userPointHistoryId: number;
	type: number;
	isConfirmed: boolean;
	point: number;
	content: string;
	userId: number;
	ticketBatchId: number;
	ticketId: any;
	voucherId?: number;
	confirmedByUserId?: number;
	confirmedAt?: string;
	createdByUserId: number;
	updatedByUserId: number;
	updatedAt: string;
	createdAt: string;
	isActive: boolean;
	isDeleted: boolean;
}

export interface IServiceHistories {
	errorMessage: any;
	errorExceptionMessage: any;
	successMessage: string;
	statusCode: number;
	totalData: number;
	totalPage: number;
	isSuccess: boolean;
	data: IServiceHistory[];
	errors: any;
	otherData: any;
}

export interface IServiceHistory {
	statusDisplay: string;
	userNotificationId: number;
	userId: number;
	title: string;
	content: string;
	notifyType: number;
	notifyRole: number;
	url: any;
	createAt: string;
	recordId: number;
	notificationId: any;
	metadata: Metadata;
	isRead: boolean;
	status: number;
	createdByUserId: any;
	updatedByUserId: any;
	updatedAt: string;
	createdAt: string;
	isActive: boolean;
	isDeleted: boolean;
}

export interface Metadata {
	clickCount: number;
	imageUrl: any;
}
