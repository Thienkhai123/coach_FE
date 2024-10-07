import { api } from "@/configs/app.config";
import { IUpdateProfilePayload } from "@/interfaces/httpRequest/IUser";
import axios from "axios";

export const fetchUserProfile = async () => {
  try {
    const response = await axios.get(api.USER.PROFILE);
    return response.data;
  } catch (err) {
    return err;
  }
};

export const updateProfile = async (params: IUpdateProfilePayload) => {
  try {
    const response = await axios.patch(api.USER.UPDATE_PROFILE, {
      ...params,
    });
    return response.data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const fetchUserPoints = async () => {
  try {
    const response = await axios.get(api.USER.GET_POINTS);
    return response.data;
  } catch (err) {
    return err;
  }
};

export const fetchHistoriesPoints = async () => {
  try {
    const response = await axios.get(api.USER.HISTORIES_POINTS);
    return response.data;
  } catch (err) {
    return err;
  }
};

export const fetchHistoriesServices = async () => {
  try {
    const response = await axios.get(
      `${api.USER.HISTORIES_SERVICES}?pageSize=1000`
    );
    return response.data;
  } catch (err) {
    return err;
  }
};

export const fetchUserNotifications = async (payload: any) => {
  try {
    const { page = 1, pageSize = 100 } = payload;
    const response = await axios.get(
      `${api.USER.GET_NOTIFICATIONS}?page=${page}&pageSize=${pageSize}`
    );
    return response.data;
  } catch (err) {
    return err;
  }
};

export const fetchReadNotifications = async (payload: any) => {
  try {
    const response = await axios.post(`${api.USER.READ_NOTIFICATIONS}`, {
      ids: payload,
    });
    return response.data;
  } catch (err) {
    return err;
  }
};

export const deleteAccount = async () => {
  try {
    const response = await axios.post(`${api.USER.DELETE_ACCOUNT}`);
    return response.data;
  } catch (err) {
    return err;
  }
};
