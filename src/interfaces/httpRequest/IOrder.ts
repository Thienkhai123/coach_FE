export interface IShipmentLocationResponse {
  data: Daum[];
  recordsTotal: number;
  recordsFiltered: number;
  currentPage: number;
  currentRecords: number;
  pageSize: number;
  totalPages: number;
}

interface Daum {
  isCreate: boolean;
  districtId: any;
  cityId: any;
  cityName: string;
  districtName: string;
  ward: Ward;
  typeDisplay: string;
  fullAddress: string;
  shipmentLocationId: number;
  name: string;
  address: string;
  wardId: number;
  type: number;
  metadata: any;
  createdByUserId: number;
  updatedByUserId: number;
  updatedAt: string;
  createdAt: string;
  isActive: boolean;
  isDeleted: boolean;
}

interface Ward {
  district: District;
  isCreate: boolean;
  wardId: number;
  refWardId: string;
  name: string;
  districtId: number;
  createdByUserId: number;
  updatedByUserId: number;
  updatedAt: string;
  createdAt: string;
  isActive: boolean;
  isDeleted: boolean;
}

interface District {
  city: City;
  wards: any[];
  isCreate: boolean;
  districtId: number;
  refDistrictId: string;
  name: string;
  cityId: number;
  createdByUserId: number;
  updatedByUserId: number;
  updatedAt: string;
  createdAt: string;
  isActive: boolean;
  isDeleted: boolean;
}

interface City {
  districts: any[];
  isCreate: boolean;
  districtsCount: number;
  cityId: number;
  name: string;
  refCityId: string;
  countryId: any;
  createdByUserId: number;
  updatedByUserId: number;
  updatedAt: string;
  createdAt: string;
  isActive: boolean;
  isDeleted: boolean;
}

export interface PackageOutside {
  data: DataPackage[];
  recordsTotal: number;
  recordsFiltered: number;
  currentPage: number;
  currentRecords: number;
  pageSize: number;
  totalPages: number;
}

export interface DataPackage {
  isCreate: boolean;
  packageTypeId: number;
  name: string;
  packageTypeMetadata: any;
  createdByUserId: number;
  updatedByUserId: any;
  updatedAt: string;
  createdAt: string;
  isActive: boolean;
  isDeleted: boolean;
}

export interface WeightOutside {
  data: DataWeightPackage[];
  recordsTotal: number;
  recordsFiltered: number;
  currentPage: number;
  currentRecords: number;
  pageSize: number;
  totalPages: number;
}

export interface DataWeightPackage {
  isCreate: boolean;
  weightDisplay: string;
  packageWeightId: number;
  minWeight: number;
  maxWeight: number;
  packageWeightMetadata: any;
  createdByUserId: number;
  updatedByUserId: any;
  updatedAt: string;
  createdAt: string;
  isActive: boolean;
  isDeleted: boolean;
}

export interface DemensionOutSide {
  data: DataDemensionPackage[];
  recordsTotal: number;
  recordsFiltered: number;
  currentPage: number;
  currentRecords: number;
  pageSize: number;
  totalPages: number;
}

export interface DataDemensionPackage {
  isCreate: boolean;
  weightDisplay: string;
  packageWeightId: number;
  minWeight: number;
  maxWeight: number;
  packageWeightMetadata: any;
  createdByUserId: number;
  updatedByUserId: any;
  updatedAt: string;
  createdAt: string;
  isActive: boolean;
  isDeleted: boolean;
}

export interface DimensionProps {
  isCreate: boolean;
  dimensionDisplay: string;
  packageDimensionId: number;
  length: number;
  height: number;
  width: number;
  packageDimensionMetadata: any;
  createdByUserId: number;
  updatedByUserId: any;
  updatedAt: string;
  createdAt: string;
  isActive: boolean;
  isDeleted: boolean;
}

export interface CostPackages {
  isSuccess: boolean;
  code: number;
  exception: any;
  data: DataCostPackages;
  errorMessage: any;
  successMessage: string;
  errorExceptionMessage: any;
  filePath: any;
  errors: any;
}

export interface DataCostPackages {
  isCreate: boolean;
  packageType: CostPackageType;
  packageDimension: PackageDimension;
  packageWeight: PackageWeight;
  shipmentCostId: number;
  packageTypeId: number;
  packageWeightId: number;
  packageDimensionId: number;
  price: number;
  shipmentCostMetadata: any;
  createdByUserId: number;
  updatedByUserId: any;
  updatedAt: string;
  createdAt: string;
  isActive: boolean;
  isDeleted: boolean;
}

export interface CostPackageType {
  isCreate: boolean;
  packageTypeId: number;
  name: string;
  packageTypeMetadata: any;
  createdByUserId: number;
  updatedByUserId: any;
  updatedAt: string;
  createdAt: string;
  isActive: boolean;
  isDeleted: boolean;
}

export interface PackageDimension {
  isCreate: boolean;
  dimensionDisplay: string;
  packageDimensionId: number;
  length: number;
  height: number;
  width: number;
  packageDimensionMetadata: any;
  createdByUserId: number;
  updatedByUserId: any;
  updatedAt: string;
  createdAt: string;
  isActive: boolean;
  isDeleted: boolean;
}

export interface PackageWeight {
  isCreate: boolean;
  weightDisplay: string;
  packageWeightId: number;
  minWeight: number;
  maxWeight: number;
  packageWeightMetadata: any;
  createdByUserId: number;
  updatedByUserId: any;
  updatedAt: string;
  createdAt: string;
  isActive: boolean;
  isDeleted: boolean;
}
