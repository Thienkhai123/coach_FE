import { api } from '@/configs/app.config';
import axios from 'axios';

interface payloadShippingOrder {
  phoneNumber: string;
  shippingOrderCode: string;
}

export const fetchShippingOrder = async (payload: any) => {
  try {
    const queryString = new URLSearchParams(payload).toString();
    const response = await axios.get(
      `${api.SHIPMENT.GET_SHIPPING_ORDER_DETAIL}?${queryString}`,
    );
    return response.data;
  } catch (err: any) {
    return err?.response?.data;
  }
};
