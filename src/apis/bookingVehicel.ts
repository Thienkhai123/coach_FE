import { api } from "@/configs/app.config";
import axios from "axios";

export const createBookingVehicle = async (payload: any) => {
  try {
    const response = await axios.post(api.VEHICLE.CREATE_VEHICLE, payload);
    return response.data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const getVehicleRentalDetail = async ({ id }: { id: string }) => {
  try {
    const response = await axios.get(`${api.VEHICLE.GET_VEHICLE_DETAIL}/${id}`);
    return response.data;
  } catch (err) {
    return err;
  }
};
