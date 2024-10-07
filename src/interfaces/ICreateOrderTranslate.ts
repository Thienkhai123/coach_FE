export interface ICreateOrderTranslate {
  createOrderTitle: string;
  informationSendReceive: string;
  informationProduct: string;

  informationPersonSend: IPersonSend;
  informationPersonReceive: IPersonReceive;
  productDetail: IProductDetail;
  freightDetail: IFreightDetail;
  button: IButton;
  signIn: ISignIn;
  errors: IErrorForm;

  informationProductSendReceive: IInformationProductSendReceive;
  detailProductSendReceive: IDetailProductSendReceive;
}

export interface IPersonSend {
  informationSend: string;
  fullName: string;
  phone: string;
  adress: string;
  email: string;
  CCCDNumber: string;
  content: string;
}

export interface IPersonReceive {
  informationReceive: string;
  fullName: string;
  phone: string;
  adress: string;
  CCCDNumber: string;
}

export interface IProductDetail {
  productTitle: string;
  contentProduct: string;
  weightProduct: string;
  sizeProduct: string;
  specialProduct: string;
  collectProduct: string;
  typeProduct: string;
}

export interface IFreightDetail {
  freightTitle: string;
  personPay: string;
  pricePay: string;
  incentivesPay: string;
  totalPay: string;
}

export interface IButton {
  next: string;
  addProduct: string;
}

export interface ISignIn {
  content: string;
  buttonSignIn: string;
}

export interface IErrorForm {
  warningContent: string;
  warningClause: string;
  warningType: string;
}

export interface IInformationProductSendReceive {
  adressSendReceive: string;
  citySend: string;
  placeholderCitySend: string;
  adressSend: string;
  placeholderAdressSend: string;
  cityReceive: string;
  placeholderCityReceive: string;
  addressReceive: string;
  placeholderAdressReceive: string;
  requestCollector: string;
  moneyCollector: string;
  currency: string;
  prepaid: string;
  personSend: string;
  personReceive: string;
}

export interface IDetailProductSendReceive {
  detailProduct: string;
  package: string;
  contentProduct: string;
  placeholderContent: string;
  weight: string;
  placeholderWeight: string;
  placeholderUnitWeight: string;
  size: string;
  descriptionSize: string;
  placeholderUnitSize: string;
  withToHeight: string;
  placeholderSize: string;
  specialProduct: string;
  typeProduct: string;
  specialProductList: ISpecialProductList[];
  imageProduct: string;
}

export interface ISpecialProductList {
  id: number;
  name: string;
  nameField: string;
  typeProduct: string;
}
