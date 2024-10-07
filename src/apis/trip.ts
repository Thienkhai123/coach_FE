import { api } from '@/configs/app.config';
import { ICity } from '@/interfaces/httpRequest/ICity';
import {
  IReservationStartPayload,
  IReservationValidateSeatsPayload,
  ITicketInfoPayload,
  ITripPayload,
  ITripPlacesPayload,
} from '@/interfaces/httpRequest/ITrip';
import axios from 'axios';
import https from 'https';
import http from 'http';

export const fetchCity = async (params: ICity) => {
  try {
    const response = await axios.get(api.TRIP.GET_CITY, { params: params });
    return response.data;
  } catch (err) {
    return err;
  }
};

export const fetchPlaces = async ({ keyword = '' }: { keyword?: string }) => {
  try {
    const response = await axios.get(
      `${api.TRIP.GET_PLACES}?pageSize=1000&keyword=${keyword}`,
    );
    return response.data;
  } catch (err) {
    return err;
  }
};

export const fetchVehicleTypes = async (params: any) => {
  try {
    const response = await axios.get(api.TRIP.GET_VEHICLE_TYPES, {
      params: params,
    });
    return response.data;
  } catch (err) {
    return err;
  }
};

export const fetchTrip = async (params: ITripPayload) => {
  try {
    const response = await axios.post(api.TRIP.SEARCH_ROUTE, {
      ...params,
    });
    return response.data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const fetchTripV2 = async (params: ITripPayload) => {
  try {
    const response = await axios.post(api.TRIP.SEARCH_ROUTE_V2, {
      ...params,
    });
    return response.data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const reservationStart = async (params: IReservationStartPayload) => {
  try {
    const response = await axios.post(api.TRIP.RESERVATION_START, {
      ...params,
    });
    return response.data;
  } catch (err: any) {
    return err?.response?.data;
  }
};
export const fetchTripReservedSeats = async (
  params: IReservationStartPayload,
) => {
  try {
    const response = await axios.get(api.TRIP.GET_TRIP_RESERVED_SEATS, {
      params: params,
    });
    return response.data;
  } catch (err) {
    return err;
  }
};

export const reservationValidateSeats = async (
  params: IReservationValidateSeatsPayload,
) => {
  try {
    const response = await axios.post(api.TRIP.RESERVATION_VALIDATE_SEATS, {
      ...params,
    });
    return response.data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const fetchTripStartPlaces = async (params: ITripPlacesPayload) => {
  try {
    const response = await axios.get(api.TRIP.GET_TRIP_START_PLACES, {
      params: params,
    });
    return response.data;
  } catch (err) {
    return err;
  }
};
export const fetchTripEndPlaces = async (params: ITripPlacesPayload) => {
  try {
    const response = await axios.get(api.TRIP.GET_TRIP_END_PLACES, {
      params: params,
    });
    return response.data;
  } catch (err) {
    return err;
  }
};

export const reservationUpdateInfo = async (params: any) => {
  try {
    const response = await axios.post(api.TRIP.RESERVATION_UPDATE_INFO, {
      ...params,
    });
    return response.data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const reservationConfirmPayment = async (params: any) => {
  try {
    const response = await axios.post(api.TRIP.RESERVATION_CONFIRM_PAYMENT, {
      ...params,
    });
    return response.data;
  } catch (err: any) {
    return err?.response?.data;
  }
};
export const fetchTicketInfo = async (params: ITicketInfoPayload) => {
  const { phone, code } = params;
  try {
    const response = await axios.post(
      `${api.TRIP.GET_TICKET_INFO}?code=${code}&phone=${phone}`,
    );
    return response.data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const cancelBatch = async (params: { ticketBatchId: number }) => {
  try {
    const response = await axios.post(
      api.TRIP.CANCEL_BATCH,
      {
        ...params,
      },
      {
        httpsAgent: new https.Agent({ keepAlive: true }),
        httpAgent: new http.Agent({ keepAlive: true }),
      },
    );
    return response.data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const fetchBankInfo = async (params?: any) => {
  try {
    const response = await axios.get(`${api.TRIP.GET_BANK}`);
    return response.data;
  } catch (err: any) {
    return err?.response?.data;
  }
};
