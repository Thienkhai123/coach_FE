import React, { Fragment } from 'react';
import DetailPayment from '../requestPayment/detailPayment';
import { ICreateOrderTranslate } from '@/interfaces/ICreateOrderTranslate';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { REGEX_CCCD, REGEX_PHONE } from '@/constant/app';
import ReceiveForm from '../form/receive';
import SendForm from '../form/send';

interface IFormValues {
  fullName?: string;
  phone?: string;
  CCCD?: string;
  address?: string;
  email?: string;
  clause?: boolean;
  fullNameReceive?: string;
  phoneReceive?: string;
  CCCDReceive?: string;
  addressReceive?: string;
}

interface ISendSignInProps {
  CREATEORDER: ICreateOrderTranslate;
  productData: any;
  freightData: any;
  handleOnSubmit: (data: any) => void;
}

const InformationSendSignIn = (props: ISendSignInProps) => {
  const { CREATEORDER, productData, freightData, handleOnSubmit } = props;

  const schema = yup.object().shape({
    fullName: yup.string().required(CREATEORDER.errors.warningContent),
    phone: yup
      .string()
      .nullable()
      .required(CREATEORDER.errors.warningContent)
      .matches(REGEX_PHONE, CREATEORDER.errors.warningType),
    CCCD: yup
      .string()
      .nullable()
      .required(CREATEORDER.errors.warningContent)
      .matches(REGEX_CCCD, CREATEORDER.errors.warningType),
    address: yup.string().required(CREATEORDER.errors.warningContent),
    email: yup.string().email(CREATEORDER.errors.warningType),
    clause: yup
      .boolean()
      .oneOf([true], CREATEORDER.errors.warningClause)
      .required(CREATEORDER.errors.warningClause),
    fullNameReceive: yup.string().required(CREATEORDER.errors.warningContent),
    phoneReceive: yup
      .string()
      .nullable()
      .required(CREATEORDER.errors.warningContent)
      .matches(REGEX_PHONE, CREATEORDER.errors.warningType),
    CCCDReceive: yup
      .string()
      .nullable()
      .required(CREATEORDER.errors.warningContent)
      .matches(REGEX_CCCD, CREATEORDER.errors.warningType),
    addressReceive: yup.string().required(CREATEORDER.errors.warningContent),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormValues>({
    resolver: yupResolver<IFormValues>(schema),
    mode: 'onChange',
    // defaultValues: defaultValues,
  });

  return (
    <Fragment>
      <form
        onSubmit={handleSubmit(handleOnSubmit)}
        className='flex xl:flex-row flex-col gap-4'
      >
        <div className='xl:w-[704px] w-full'>
          <div>
            <SendForm
              register={register}
              errors={errors}
              CREATEORDER={CREATEORDER}
            />
          </div>
          <div className='mt-2'>
            <ReceiveForm
              register={register}
              errors={errors}
              CREATEORDER={CREATEORDER}
            />
          </div>
        </div>
        <div className='xl:w-[400px] w-full'>
          <div className='py-6 px-4 bg-white rounded-xl flex flex-col gap-6'>
            <div className='flex flex-col gap-6'>
              <div className='flex flex-col gap-6'>
                <DetailPayment convertPriceData={productData} />
              </div>
            </div>
            <div>
              <DetailPayment convertPriceData={freightData} />
            </div>
            <div>
              <button
                disabled={!isValid}
                type='submit'
                className='w-full text-white text-base font-semibold text-center my-auto bg-primary-500 rounded-full h-[44px] disabled:opacity-80 disabled:text-opacity-60'
              >
                {CREATEORDER.button.next}
              </button>
            </div>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default InformationSendSignIn;
