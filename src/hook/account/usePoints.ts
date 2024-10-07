import { fetchUserPoints } from "@/apis/user";
import { IUserPoints } from "@/interfaces/httpRequest/IPoints";
import { useState } from "react";

const usePoints = () => {
  const [points, setPoints] = useState<IUserPoints>([]);
  const [loading, setLoading] = useState(false);
  const [processPoints, setProcessPoints] = useState(0);

  const handleGetUserPoints = async () => {
    setLoading(true);
    const res: IUserPoints = await fetchUserPoints();
    if (res?.length > 0) {
      let tmpProcess = 0;
      res?.forEach((userPoint) => {
        tmpProcess += userPoint?.point || 0;
      });
      setPoints(res);
      setProcessPoints(tmpProcess);
    }
    setLoading(false);
  };

  return {
    points,
    processPoints,
    loading,
    handleGetUserPoints,
  };
};

export default usePoints;
