import {
  getPackageCost,
  getPackageDemensions,
  getPackageWeights,
} from "@/apis/order";
import {
  DataWeightPackage,
  DimensionProps,
  WeightOutside,
} from "@/interfaces/httpRequest/IOrder";
import { useState } from "react";

interface IPackagesProps {
  weights: DataWeightPackage[];
  dimensions: DimensionProps[];
}

const usePackages = () => {
  const [packagesProps, setPackagesProps] = useState<IPackagesProps>({
    weights: [],
    dimensions: [],
  });

  const handleGetWeights = async ({
    packageTypeId,
  }: {
    packageTypeId: number;
  }) => {
    const res: WeightOutside = await getPackageWeights({
      packageTypeId: packageTypeId,
    });
    if (res?.data?.length > 0) {
      setPackagesProps({
        ...packagesProps,
        weights: res?.data || [],
      });
    }
  };

  const handleGetDimensions = async ({
    packageTypeId,
    packageWeightId,
  }: {
    packageTypeId: number;
    packageWeightId: number;
  }) => {
    const res = await getPackageDemensions({
      packageTypeId: packageTypeId,
      packageWeightId: packageWeightId,
    });
    if (res?.data?.length > 0) {
      setPackagesProps({
        ...packagesProps,
        dimensions: res?.data || [],
      });
    }
  };

  const handleGetCost = async ({
    packageTypeId,
    packageWeightId,
    packageDimentionId,
  }: {
    packageTypeId: number;
    packageWeightId: number;
    packageDimentionId: number;
  }) => {
    const res = await getPackageCost({
      packageTypeId: packageTypeId,
      packageWeightId: packageWeightId,
      packageDimentionId: packageDimentionId,
    });
    if (res?.isSuccess) {
      return res?.data?.price || 0;
    }
  };

  return {
    packagesProps,
    handleGetWeights,
    handleGetDimensions,
    handleGetCost,
  };
};

export default usePackages;
