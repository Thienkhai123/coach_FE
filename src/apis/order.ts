import { api } from '@/configs/app.config';
import axios from 'axios';

interface IShipmentLocationPayload {
  locationType: number;
  cityId: number;
}

interface ICreateShipmentPayload {
  loadingLocationId?: any;
  unloadingLocationId?: any;
  senderInfo?: {
    senderName?: string;
    senderPhone?: string;
    senderAddress?: string;
    senderCI?: string;
    email?: string;
  };
  receiverInfo?: {
    receiverName?: string;
    receiverPhone?: string;
    receiverAddress?: string;
    receiverCI?: string;
  };
  isCod?: boolean; //có thu hộ hay không
  cod?: any; // tiền thu hộc
  packages?: IPackages[];
  payer?: number;
}

interface IPackages {
  content: string; // nội dung hàng
  weight: any;
  width: any;
  length: any;
  height: any;
  pickupImageFile: any; // ảnh kiện hàng (1 ảnh)
  typeValues: any;
}

interface IPackageWeights {
  packageTypeId?: number;
}

interface IPackageDemensions {
  packageTypeId?: number;
  packageWeightId?: number;
  page?: number;
}

interface IPackageCost {
  packageTypeId?: number;
  packageWeightId?: number;
  packageDimentionId?: number;
}

export const fetchShipmentLocation = async (
  params: IShipmentLocationPayload,
) => {
  try {
    const response = await axios.get(`${api.SHIPMENT.GET_SHIPMENT_LOCATION}`, {
      params: params,
    });
    return response.data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const createShipmentOrders = async (payload: any) => {
  try {
    const response = await axios.post(
      api.SHIPMENT.CREATE_SHIPMENT_ORDER,
      payload,
    );
    return response.data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const getPackageTypes = async () => {
  try {
    const response = await axios.get(
      `${api.SHIPMENT.GET_PACKAGE_TYPES}?page=1`,
    );
    return response.data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const getPackageWeights = async (payload: IPackageWeights) => {
  try {
    const { packageTypeId } = payload;
    const response = await axios.get(
      `${api.SHIPMENT.GET_PACKAGE_WEIGHT}?packageTypeId=${packageTypeId}&page=1`,
    );
    return response.data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const getPackageDemensions = async (payload: IPackageDemensions) => {
  try {
    const response = await axios.get(api.SHIPMENT.GET_PACKAGE_DIMENSIONS, {
      params: payload,
    });
    return response.data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const getPackageCost = async (payload: IPackageCost) => {
  try {
    const response = await axios.get(api.SHIPMENT.GET_PACKAGE_COST, {
      params: payload,
    });
    return response.data;
  } catch (err: any) {
    return err?.response?.data;
  }
};
