import { ICreateOrderTranslate } from '@/interfaces/ICreateOrderTranslate';
import React, { FC, Fragment } from 'react';
import InformationProductSendNoSignIn from '../informationProductSendNoSignIn';
import InformationProductSendSignIn from '../informationProductSendSignIn';

interface ISendAndReceiveProps {
  signInStatus?: boolean;
  CREATEORDER: ICreateOrderTranslate;
  productData?: any;
  freightData?: any;
  handleSignIn: () => void;
  informationPerson: any;
  handleSubmitNoSignInReceive: (data: any) => void;
  handleSubmitSignInReceive: (data: any) => void;
  setImageList: any;
  imageList: any;
  city: any;
  setSelectCity: any;
  adress: {};
  packageWeight?: any;
  packageSize?: any;
  packageTypes: any;
  setPackageWeight: any;
  setPackageSize: any;
}

const InformationProduct: FC<ISendAndReceiveProps> = (props) => {
  const {
    signInStatus = false,
    CREATEORDER,
    productData,
    freightData,
    informationPerson,
    handleSubmitNoSignInReceive,
    handleSubmitSignInReceive,
    setImageList,
    handleSignIn,
    imageList,
    city,
    setSelectCity,
    adress,
    packageTypes,
    packageWeight,
    packageSize,
    setPackageWeight,
    setPackageSize,
  } = props;
  if (signInStatus)
    return (
      <InformationProductSendSignIn
        CREATEORDER={CREATEORDER}
        productData={productData}
        freightData={freightData}
        informationPerson={informationPerson}
        handleOnSubmit={handleSubmitSignInReceive}
        setImageList={setImageList}
        imageList={imageList}
        city={city}
        setSelectCity={setSelectCity}
        adress={adress}
        packageTypes={packageTypes}
        packageWeight={packageWeight}
        packageSize={packageSize}
        setPackageWeight={setPackageWeight}
        setPackageSize={setPackageSize}
      />
    );
  else
    return (
      <InformationProductSendNoSignIn
        CREATEORDER={CREATEORDER}
        productData={productData}
        freightData={freightData}
        informationPerson={informationPerson}
        handleOnSubmit={handleSubmitNoSignInReceive}
        setImageList={setImageList}
        imageList={imageList}
        handleSignIn={handleSignIn}
        city={city}
        setSelectCity={setSelectCity}
        adress={adress}
        packageWeight={packageWeight}
        packageSize={packageSize}
        packageTypes={packageTypes}
        setPackageWeight={setPackageWeight}
        setPackageSize={setPackageSize}
      />
    );
};

export default InformationProduct;
