export interface IBankResponse {
  code: string;
  desc: string;
  data: IBankData[];
}

export interface IBankData {
  id: number;
  name: string;
  code: string;
  bin: string;
  shortName: string;
  logo: string;
  transferSupported: number;
  lookupSupported: number;
  short_name: string;
  support: number;
  isTransfer: number;
  swift_code: null | string;
  Infor?: any;
}
