import { ICreateOrderTranslate } from '@/interfaces/ICreateOrderTranslate';
import React, { FC, Fragment } from 'react';
import InformationSendNoSignIn from '../informationSendNoSignIn';
import InformationSendSignIn from '../informationSendSignIn';

interface ISendAndReceiveProps {
  signInStatus?: boolean;
  CREATEORDER: ICreateOrderTranslate;
  productData?: any;
  freightData?: any;
  handleSignIn: () => void;
  handleSubmitNoSignInSend: (data: any) => void;
  handleSubmitSignInSend: (data: any) => void;
}

const SendReceive: FC<ISendAndReceiveProps> = (props) => {
  const {
    signInStatus = false,
    CREATEORDER,
    handleSubmitSignInSend,
    handleSubmitNoSignInSend,
    handleSignIn,
  } = props;

  const productData = {
    titleContent: CREATEORDER.productDetail.productTitle + ' ' + 1,
    paymentInfor: [
      {
        name: CREATEORDER.productDetail.contentProduct,
        content: '-',
      },
      {
        name: CREATEORDER.productDetail.weightProduct,
        content: '-',
      },
      {
        name: CREATEORDER.productDetail.sizeProduct,
        content: '-',
      },
      {
        name: CREATEORDER.detailProductSendReceive.typeProduct,
        content: '-',
      },
      {
        name: CREATEORDER.productDetail.collectProduct,
        content: '-',
      },
    ],
  };

  const freightData = {
    titleContent: CREATEORDER.freightDetail.freightTitle,
    paymentInfor: [
      {
        name: CREATEORDER.freightDetail.personPay,
        content: '-',
      },
      {
        name: CREATEORDER.freightDetail.pricePay,
        content: '-',
      },
      {
        name: CREATEORDER.freightDetail.incentivesPay,
        content: '-',
      },
      {
        name: CREATEORDER.freightDetail.totalPay,
        content: '0đ',
      },
    ],
  };

  if (signInStatus)
    return (
      <InformationSendSignIn
        CREATEORDER={CREATEORDER}
        productData={productData}
        freightData={freightData}
        handleOnSubmit={handleSubmitSignInSend}
      />
    );
  else
    return (
      <InformationSendNoSignIn
        handleSignIn={handleSignIn}
        CREATEORDER={CREATEORDER}
        productData={productData}
        freightData={freightData}
        handleOnSubmit={handleSubmitNoSignInSend}
      />
    );
};

export default SendReceive;
