import React, { FC } from 'react';
import PaymentInformation from '../payment-Information';
import {
  IPaymentDetail,
  IPaymentInformation,
  IRequestPaymentTranslate,
} from '@/interfaces/IRequestPaymentTranslate';

interface IDetailPayment {
  REQUESTPAYMENT?: IRequestPaymentTranslate;
  convertPriceData: IPaymentInformation;
}

const DetailPayment: FC<IDetailPayment> = (props) => {
  const { REQUESTPAYMENT, convertPriceData } = props;

  return (
    <div>
      <div className='py-1 px-2 bg-[#DEF5E0] text-xs font-extrabold text-neutral-grey-600 rounded-full w-fit uppercase'>
        {convertPriceData?.titleContent}
      </div>
      <div>
        {convertPriceData?.paymentInfor?.map(
          (elm: IPaymentDetail, ind: number) => {
            return (
              <div key={ind} className='mt-2'>
                <PaymentInformation
                  type={elm?.typeComponent}
                  name={elm?.name}
                  content={elm?.content}
                  colorText={elm?.colorText}
                />
              </div>
            );
          },
        )}
      </div>
    </div>
  );
};

export default DetailPayment;
