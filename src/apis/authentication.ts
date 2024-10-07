import { api } from "@/configs/app.config";
import {
	IChangePasswordPayload,
	IForgetPasswordPayload,
	IForgetPasswordVerifyCodePayload,
	IForgetPasswordVerifyPayload,
	ILoginPayload,
	IRegisterPayload,
	IRegisterVerifyPayload,
} from "@/interfaces/httpRequest/IAuthentication";
import axios from "axios";

export const requestLogin = async (params: ILoginPayload) => {
	try {
		const response = await axios.post(api.AUTHENTICATION.LOGIN, {
			...params,
		});
		return response?.data;
	} catch (err: any) {
		return err?.response?.data;
	}
};

export const requestRegister = async (params: IRegisterPayload) => {
	try {
		const response = await axios.post(api.AUTHENTICATION.REGISTER, {
			...params,
		});
		return response.data;
	} catch (err: any) {
		return err?.response?.data;
	}
};

export const requestRegisterVerify = async (params: IRegisterVerifyPayload) => {
	const { phone } = params;
	try {
		const response = await axios.post(
			`${api.AUTHENTICATION.REGISTER_VERIFY}?phone=${phone}`,
			{
				...params,
			},
		);
		return response.data;
	} catch (err: any) {
		return err?.response?.data;
	}
};

export const requestForgetPassword = async (params: IForgetPasswordPayload) => {
	try {
		const response = await axios.post(api.AUTHENTICATION.FORGET_PASSWORD, {
			...params,
		});
		return response.data;
	} catch (err: any) {
		return err?.response?.data;
	}
};
export const forgetPasswordVerifyCode = async (
	params: IForgetPasswordVerifyCodePayload,
) => {
	try {
		const response = await axios.post(
			api.AUTHENTICATION.FORGET_PASSWORD_VERIFY_CODE,
			{
				...params,
			},
		);
		return response.data;
	} catch (err: any) {
		return err?.response?.data;
	}
};

export const requestForgetPasswordVerify = async (
	params: IForgetPasswordVerifyPayload,
) => {
	const { phone } = params;
	try {
		const response = await axios.post(
			`${api.AUTHENTICATION.FORGET_PASSWORD_VERIFY}?phone=${phone}`,
			{
				...params,
			},
		);
		return response.data;
	} catch (err: any) {
		return err?.response?.data;
	}
};

export const changePassword = async (params: IChangePasswordPayload) => {
	try {
		const response = await axios.post(api.AUTHENTICATION.CHANGE_PASSWORD, {
			...params,
		});
		return response.data;
	} catch (err: any) {
		return err?.response?.data;
	}
};
