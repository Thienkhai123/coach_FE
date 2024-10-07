import { fetchAllVouchers } from "@/apis/voucher";
import {
  IVoucherResponse,
  VoucherData,
} from "@/interfaces/httpRequest/IVoucher";
import { useState } from "react";

const useVoucher = () => {
  const [loading, setLoading] = useState(false);
  const [vouchers, setVouchers] = useState<VoucherData[]>([]);

  const handleGetAllVouchers = async ({
    validateUserPoint = false,
    tripId = 0,
  }: {
    validateUserPoint?: boolean;
    tripId?: number;
  }) => {
    setLoading(true);
    const payload = {
      validateUserPoint,
      tripId,
    };
    const { data, isSuccess, errorMessage }: IVoucherResponse =
      await fetchAllVouchers(payload);
    if (isSuccess) {
      setVouchers(data);
    } else {
      console.log(errorMessage);
    }
    setLoading(false);
  };

  return { vouchers, handleGetAllVouchers, loading };
};

export default useVoucher;
