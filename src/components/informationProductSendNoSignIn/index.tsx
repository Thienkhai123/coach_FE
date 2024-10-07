import { ICreateOrderTranslate } from '@/interfaces/ICreateOrderTranslate';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import AdressSendReceiveForm from '../form/adress-send-receive';
import InformationProductForm from '../form/information-product';
import DetailPayment from '../requestPayment/detailPayment';
import NotificationSignin from '../notificationSignin';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import AdressSendReceive from '../adressSendReceive';
import { convertKilogram } from '@/helpers/functionHelper';
import { isEmpty } from 'lodash';

interface IInformationProductSendNoSignInProps {
  signInStatus?: boolean;
  CREATEORDER: ICreateOrderTranslate;
  productData: any;
  freightData?: any;
  handleSignIn: () => void;
  informationPerson: any;
  handleOnSubmit: (data: any) => void;
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

const defaultValueProduct = {
  // product form
  contentProduct: '',
  weightProduct: '',
  sizeProduct: '',
  specialProductList: [],
};

const InformationProductSendNoSignIn = (
  props: IInformationProductSendNoSignInProps,
) => {
  const {
    CREATEORDER,
    handleSignIn,
    informationPerson,
    handleOnSubmit,
    setImageList,
    imageList,
    city,
    setSelectCity,
    adress,
    packageWeight,
    packageSize,
    packageTypes,
    setPackageWeight,
    setPackageSize,
  } = props;

  const formRef = useRef<any>(null);
  const [fields, setFields] = useState<any>([defaultValueProduct]);
  const [costPackages, setCostPackages] = useState<any>([]);

  const schemaDefault = {
    //user form
    citySend: yup.string().required(CREATEORDER.errors.warningContent),
    adressSend: yup.string().required(CREATEORDER.errors.warningContent),
    cityReceive: yup.string().required(CREATEORDER.errors.warningContent),
    adressReceive: yup.string().required(CREATEORDER.errors.warningContent),
    personSendReceive: yup.string().required(CREATEORDER.errors.warningContent),
    collector: yup.boolean(),
    moneyCollector: yup.string(),
  };

  const schemaProductDefault = {
    // product form
    contentProduct: yup
      .string()
      .required(CREATEORDER.errors.warningContent)
      .notOneOf([''], CREATEORDER.errors.warningContent),
    weightProduct: yup
      .string()
      .typeError(CREATEORDER.errors.warningType)
      .required(CREATEORDER.errors.warningContent),
    sizeProduct: yup
      .string()
      .typeError(CREATEORDER.errors.warningType)
      .required(CREATEORDER.errors.warningContent),
    specialProductList: yup
      .string()
      .typeError(CREATEORDER.errors.warningType)
      .required(CREATEORDER.errors.warningContent),
  };

  const schema = yup.object().shape({
    ...schemaDefault,
    product: yup.array().of(yup.object().shape({ ...schemaProductDefault })),
  });

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors, isValid },
  } = useForm<any>({
    resolver: yupResolver<any>(schema),
    mode: 'onChange',
    // defaultValues: defaultValues,
  });

  const handleAddProduct = (status = false) => {
    setFields([...fields, defaultValueProduct]);
    if (status) {
      const imageListOld: any = [...imageList, []];
      setImageList(imageListOld);
    }
  };

  const handleAddImage = (ind: any = 0, event: any) => {
    const file = event.target.files;
    if (ind <= imageList.length) {
      const addImage = [...imageList, imageList[ind]?.push(file[0])];
      const fileList = addImage.filter((elm: any) => typeof elm !== 'number');
      setImageList(fileList);
    } else {
      setImageList([...imageList, []]);
      const addImage = [...imageList, imageList[ind]?.push(file[0])];
      const fileList = addImage.filter((elm: any) => typeof elm !== 'number');
      setImageList(fileList);
    }

    // chọn nhiều hình ảnh và check size image
    // const maxSize = 0.4 * 1024 * 1024; // 400kb
    // if (file[0].size < maxSize) {
    // if (file.length === 1) {
    // if (ind <= imageList.length - 1) {
    //   const addImage = [...imageList, imageList[ind]?.push(file[0])];
    //   const fileList = addImage.filter((elm: any) => typeof elm !== 'number');
    //   setImageList(fileList);
    // } else {
    //   setImageList([...imageList, imageList.push([])]);
    //   const addImage = [...imageList, imageList[ind]?.push(file[0])];
    //   const fileList = addImage.filter((elm: any) => typeof elm !== 'number');
    //   setImageList(fileList);
    // }
    // } else {
    //   for (let index = 0; index < file.length; index++) {
    //     const element = file[index];
    //     if (ind <= imageList.length - 1) {
    //       const addImage = [...imageList, imageList[ind]?.push(element)];
    //       const fileList = addImage.filter(
    //         (elm: any) => typeof elm !== 'number',
    //       );
    //       setImageList(fileList);
    //     } else {
    //       setImageList([...imageList, imageList.push([])]);
    //       const addImage = [...imageList, imageList[ind]?.push(element)];
    //       const fileList = addImage.filter(
    //         (elm: any) => typeof elm !== 'number',
    //       );
    //       setImageList(fileList);
    //     }
    //   }
    // }
    // } else {
    //   toastError({
    //     message: 'Vui lòng chọn hình ảnh không quá 500Kb!',
    //     toastId: 'image Size',
    //   });
    // }
  };

  const handleRemoveImage = (ind: any = 0, indImage: any, status = false) => {
    if (imageList.length > 0 && status) {
      const imageListOld: any = [...imageList];
      imageList.forEach((element: any, index: number) => {
        if (ind === index) {
          const removeImage = element.splice(indImage, 1);
          imageListOld[ind] === removeImage;
        }
      });
      setImageList(imageListOld);
    }
  };

  const handleSelectWeight = (ind: any, weightObj: any) => {
    const packageWeightOld = [...packageWeight];
    if (ind <= packageWeight.length - 1) {
      packageWeightOld[ind] = weightObj;
      setPackageWeight(packageWeightOld);
    } else {
      const packageWeightNew = [...packageWeightOld, weightObj];
      setPackageWeight(packageWeightNew);
    }
  };

  const handleSelectDemensions = (ind: any, demensions: any) => {
    const packageDemensionsOld = [...packageSize];
    if (ind <= packageSize.length - 1) {
      packageDemensionsOld[ind] = demensions;
      setPackageSize(packageDemensionsOld);
    } else {
      const packageWeightNew = [...packageDemensionsOld, demensions];
      setPackageSize(packageWeightNew);
    }
  };

  const collectorStatus = watch('collector') || false;
  const moneyCollector = watch('moneyCollector') || 0;

  const productData: any = [];
  fields?.forEach((element: any, ind: number) => {
    const paymentInfor = {
      titleContent: CREATEORDER.productDetail.productTitle + ' ' + (ind + 1),
      paymentInfor: [
        {
          name: CREATEORDER.productDetail.contentProduct,
          content: watch(`product[${ind}].contentProduct`)
            ? watch(`product[${ind}].contentProduct`)
            : '-',
        },
        {
          name: CREATEORDER.productDetail.weightProduct,
          content: watch(`product[${ind}].weightProduct`)
            ? watch(`product[${ind}].weightProduct`)
            : '-',
        },
        {
          name: CREATEORDER.productDetail.sizeProduct,
          content: watch(`product[${ind}].sizeProduct`)
            ? watch(`product[${ind}].sizeProduct`)
            : '-',
        },
        {
          name: CREATEORDER.detailProductSendReceive.typeProduct,
          content: watch(`product[${ind}].specialProductList`)
            ? watch(`product[${ind}].specialProductList`)
            : 'Không',
        },
        // {
        //   name: CREATEORDER.productDetail.collectProduct,
        //   content: moneyCollector
        //     ? parseInt(moneyCollector).toLocaleString() + 'đ'
        //     : '-',
        // },
      ],
    };
    productData.push(paymentInfor);
  });

  const freightData = {
    titleContent: CREATEORDER.freightDetail.freightTitle,
    paymentInfor: [
      {
        name: CREATEORDER.freightDetail.personPay,
        content:
          watch('personSendReceive')?.length > 0
            ? watch('personSendReceive') === 'person_send'
              ? CREATEORDER.informationProductSendReceive.personSend
              : CREATEORDER.informationProductSendReceive.personReceive
            : '-',
      },
      {
        name: CREATEORDER.freightDetail.pricePay,
        content:
          costPackages?.length > 0
            ? costPackages
                ?.reduce((sum: any, product: any) => sum + product?.price, 0)
                ?.toLocaleString() + 'đ'
            : '0đ',
      },
      {
        name: CREATEORDER.freightDetail.incentivesPay,
        content: '0đ',
      },
      {
        name: CREATEORDER.freightDetail.totalPay,
        content:
          costPackages?.length > 0
            ? costPackages
                ?.reduce((sum: any, product: any) => sum + product?.price, 0)
                ?.toLocaleString() + 'đ'
            : '0đ',
      },
      {
        name: CREATEORDER.productDetail.collectProduct,
        content: moneyCollector
          ? parseInt(moneyCollector).toLocaleString() + 'đ'
          : '0đ',
      },
    ],
  };

  useEffect(() => {
    setSelectCity({
      citySend: watch('citySend'),
      cityReceive: watch('cityReceive'),
    });
  }, [watch('citySend'), watch('cityReceive')]);

  return (
    <Fragment>
      <form
        onSubmit={handleSubmit(handleOnSubmit)}
        className='flex xl:flex-row flex-col gap-4'
      >
        <div className='xl:w-[704px] w-full'>
          <div>
            <AdressSendReceiveForm
              CREATEORDER={CREATEORDER}
              register={register}
              errors={errors}
              collectorStatus={collectorStatus}
              moneyCollector={moneyCollector}
              city={city}
              adress={adress}
              setValue={setValue}
            />
          </div>
          <div ref={formRef} className='mt-2'>
            <InformationProductForm
              handleRemoveImage={handleRemoveImage}
              CREATEORDER={CREATEORDER}
              register={register}
              errors={errors}
              handleAddProduct={handleAddProduct}
              validateForm={fields}
              control={control}
              imageList={imageList}
              handleAddImage={handleAddImage}
              packageTypes={packageTypes}
              watch={watch}
              packageWeight={packageWeight}
              packageSize={packageSize}
              handleSelectWeight={handleSelectWeight}
              handleSelectDemensions={handleSelectDemensions}
              setCostPackages={setCostPackages}
              costPackages={costPackages}
              setValue={setValue}
            />
          </div>
        </div>
        <div className='xl:w-[400px] w-full'>
          <div className='py-6 px-4 bg-white rounded-xl flex flex-col gap-6'>
            <div>
              <AdressSendReceive informationPerson={informationPerson} />
            </div>
            <div className='flex flex-col gap-6'>
              {productData?.map((elm: any, ind: number) => {
                return (
                  <div key={ind}>
                    <DetailPayment convertPriceData={elm} />
                  </div>
                );
              })}
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
          <div className='mt-2'>
            <NotificationSignin
              handleSignIn={handleSignIn}
              CREATEORDER={CREATEORDER}
            />
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default InformationProductSendNoSignIn;
