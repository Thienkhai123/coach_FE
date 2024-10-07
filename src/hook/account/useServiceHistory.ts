import { fetchHistoriesServices } from "@/apis/user";
import {
  IServiceHistories,
  IServiceHistory,
} from "@/interfaces/httpRequest/IPoints";
import { useState } from "react";

const useServiceHistory = () => {
  const [serviceHistories, setServiceHistories] = useState<IServiceHistory[]>(
    []
  );
  const [loading, setLoading] = useState(false);

  const handleGetHistoriesPoints = async () => {
    setLoading(true);
    const res: IServiceHistories = await fetchHistoriesServices();
    if (res?.isSuccess && res?.data?.length > 0) {
      setServiceHistories(res.data?.reverse());
    }
    setLoading(false);
  };

  return {
    serviceHistories,
    loading,
    handleGetHistoriesPoints,
  };
};

export default useServiceHistory;
