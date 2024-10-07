export interface ILoginPayload {
	phone: string;
	password: string;
}

export interface IRegisterPayload {
	phone: string;
	password: string;
	verifyCode: string;
}
export interface IForgetPasswordVerifyCodePayload {
	phone: string;
	code: string;
}

export interface IRegisterVerifyPayload {
	phone: string;
}

export interface IForgetPasswordPayload {
	phone: string;
	code: string;
	newPassword: string;
	reEnterPassword: string;
}
export interface IChangePasswordPayload {
	userId: number;
	oldPassword: string;
	password: string;
	rePassword: string;
}

export interface IForgetPasswordVerifyPayload {
	phone: string;
}
