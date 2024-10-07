import { api } from "@/configs/app.config";
import axios from "axios";

type VoucherParamsT = {
  validateUserPoint?: boolean;
  tripId?: number;
};

export const fetchAllVouchers = async ({
  validateUserPoint = true,
  tripId,
}: VoucherParamsT) => {
  try {
    const params = new URLSearchParams();
    params.append("validateUserPoint", validateUserPoint ? "true" : "false");
    if (tripId) {
      params.append("tripId", tripId?.toString());
    }
    const query = params?.toString();
    const response = await axios.post(
      `${api.VOUCHER.GET_ALL_VOUCHERS}?${query}`,
      {
        params: {
          validateUserPoint: validateUserPoint,
          tripId: tripId ? tripId : undefined,
        },
      }
    );
    return response.data;
  } catch (err) {
    return err;
  }
};
