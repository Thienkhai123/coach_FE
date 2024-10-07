export type Iplaces = Iplace[];

export interface Iplace {
  isCreate: boolean;
  addressDisplay: string;
  typeDisplay: string;
  ward: Ward;
  district: any;
  city: any;
  startAt: any;
  placeId: number;
  name: string;
  type: number;
  address: string;
  wardId: number;
  districtId: number;
  cityId: number;
  note: any;
  metadata: any;
  createdByUserId: number;
  updatedByUserId: number;
  updatedAt: string;
  createdAt: string;
  isActive: boolean;
  isDeleted: boolean;
}

export interface Ward {
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

export interface District {
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

export interface City {
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
