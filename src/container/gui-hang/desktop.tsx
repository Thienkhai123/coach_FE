import {
  createShipmentOrders,
  fetchShipmentLocation,
  getPackageCost,
  getPackageDemensions,
  getPackageWeights,
} from '@/apis/order';
import Footer from '@/components/footer';
import Header from '@/components/header';
import InformationProduct from '@/components/informationProducts';
import LoadingView from '@/components/LoadingView';
import SendReceive from '@/components/send-recieve';
import Tabs from '@/components/Tab';
import { useCustomToast } from '@/hook/useToast';
import {
  IShipmentLocationResponse,
  WeightOutside,
} from '@/interfaces/httpRequest/IOrder';
import { ICreateOrderTranslate } from '@/interfaces/ICreateOrderTranslate';
import { isEmpty, isNull } from 'lodash';
import React, { FC, Fragment, useEffect, useRef, useState } from 'react';

interface ICreateOrderDesktop {
  CREATEORDER: ICreateOrderTranslate;
  city: any;
  userProfile: any;
  typePack: any;
}

interface IInformation {
  CCCD: string;
  CCCDReceive: string;
  address: string;
  addressReceive: string;
  clause: boolean;
  email: string;
  fullName: string;
  fullNameReceive: string;
  phone: string;
  phoneReceive: string;
}

interface IFormDataSendAndReceive {
  citySend: string;
  adressSend: string;
  cityReceive: string;
  adressReceive: string;
  personSendReceive: string;
  collector: boolean;
  moneyCollector: number;
  product: IPackages[];
}

interface IPackages {
  contentProduct: string;
  weightProduct: string;
  sizeProduct: string;
  specialProductList: string;
}

const specialPackageDefault = [
  { id: 0, value: 'HL', fullValue: 'Hàng lạnh' },
  { id: 1, value: 'GTC', fullValue: 'Giá trị cao' },
  { id: 2, value: 'DV', fullValue: 'Dễ vỡ' },
  { id: 3, value: 'NK', fullValue: 'Nguyên khối' },
  { id: 4, value: 'CL', fullValue: 'Chất lỏng' },
  { id: 5, value: 'TT', fullValue: 'Từ tính, Pin' },
  // 0: hàng lạnh, 1: giá trị cao, 2: hàng dễ vỡ, 3: nguyên khối, 4: chất lỏng, 100: khác
];

const ContainerTransportDesktop: FC<ICreateOrderDesktop> = (props) => {
  const { CREATEORDER, city = [], userProfile, typePack } = props;
  const LIST_STEP = [
    {
      id: 1,
      value: `1. ${CREATEORDER.informationSendReceive}`,
    },
    {
      id: 2,
      value: `2. ${CREATEORDER.informationProduct}`,
    },
    {
      id: 3,
      value: ``,
    },
  ];

  const [tab, setTab] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [informationPerson, setInformationPerson] = useState<any>({});
  const [imageList, setImageList] = useState<any>([[]]);
  const [selectCity, setSelectCity] = useState<any>({
    citySend: null,
    cityReceive: null,
  });
  const [adress, setAdress] = useState<any>({
    adressSends: [],
    adressReceives: [],
  });
  const [customCity, setCustomCity] = useState<any>([]);
  const [packageTypes, setPackageTypes] = useState<any>([
    {
      id: 0,
      value: CREATEORDER.productDetail.typeProduct,
    },
  ]);
  const [packageWeight, setPackageWeight] = useState<any>([]);
  const [packageSize, setPackageSize] = useState<any>([]);

  const { toastError } = useCustomToast();

  const changeTab = (tabNumber: number) => {
    if (tabNumber !== 3) {
      setTab(tabNumber);
    }
  };

  const handleSignIn = () => {
    window.location.assign('/dang-nhap');
  };

  const handleSubmitNoSignInSend = (data: any) => {
    setInformationPerson(data);
    changeTab(2);
  };

  const handleSubmitSignInSend = (data: any) => {
    setInformationPerson(data);
    changeTab(2);
  };

  const handleSubmitNoSignInSendAndReceive = async (data: any) => {
    setIsLoading(true);
    const formBody = new FormData();
    const addressSend = adress?.adressSends?.find(
      (element: any) => element.value === data?.adressSend,
    );
    const addressReceive = adress?.adressReceives?.find(
      (element: any) => element.value === data?.adressReceive,
    );

    const payer: any = data?.personSendReceive === 'person_send' ? 0 : 1;

    formBody.append('loadingLocationId', addressSend?.id);
    formBody.append('unloadingLocationId', addressReceive?.id);

    formBody.append('SenderInfo.SenderName', informationPerson?.fullName);
    formBody.append('SenderInfo.SenderPhone', informationPerson?.phone);
    formBody.append('SenderInfo.SenderAddress', informationPerson?.address);
    formBody.append('SenderInfo.SenderCI', informationPerson?.CCCD);
    formBody.append('SenderInfo.Email', informationPerson?.email);

    formBody.append(
      'ReceiverInfo.ReceiverName',
      informationPerson?.fullNameReceive,
    );
    formBody.append(
      'ReceiverInfo.ReceiverPhone',
      informationPerson?.phoneReceive,
    );
    formBody.append(
      'ReceiverInfo.ReceiverAddress',
      informationPerson?.addressReceive,
    );
    formBody.append('ReceiverInfo.ReceiverCI', informationPerson?.CCCDReceive);

    formBody.append('IsCod', data?.collector);
    formBody.append('COD', data?.moneyCollector || 0);
    formBody.append('Payer', payer);

    data?.product?.forEach((element: IPackages, ind: number) => {
      let commonItemsObj = packageTypes?.find(
        (elmDefault: any) => elmDefault?.value === element?.specialProductList,
      );
      let commonItemsList = packageTypes?.filter(
        (elmDefault: any) => elmDefault?.value === element?.specialProductList,
      );
      formBody.append(`Packages[${ind}].Content`, element?.contentProduct);
      formBody.append(
        `Packages[${ind}].packageWeightId`,
        packageWeight[ind]?.id,
      );
      formBody.append(
        `Packages[${ind}].packageDimensionId`,
        packageSize[ind]?.id,
      );
      formBody.append(`Packages[${ind}].packageTypeId`, commonItemsObj?.id);
      // commonItemsList?.forEach((elm: any, ind_type: number) => {
      //   formBody.append(`Packages[${ind}].TypeValues[${ind_type}]`, elm.id);
      // });
      formBody.append(`Packages[${ind}].PickupImageFile`, imageList[ind][0]);
    });
    const res: any = await createShipmentOrders(formBody);
    if (res?.isSuccess && res?.code === 200) {
      const code = res?.data?.shippingOrderCode.replace('#', '');
      const phone = res?.data?.senderInfo?.senderPhone;
      window.location.assign(
        `/xac-nhan-thong-tin-thanh-toan?phone=${phone}&code=${code}`,
      );
      setTab(1);
    } else {
      if (res?.errors?.ShipmentLocation?.length > 0) {
        toastError({
          message: res?.errors?.ShipmentLocation[0],
          toastId: 'validate-seats-failed',
        });
      } else {
        toastError({
          message: res?.errorMessage,
          toastId: 'validate-seats-failed',
        });
      }
    }
    setIsLoading(false);
  };

  const handleSubmitSignInSendAndReceive = async (data: any) => {
    setIsLoading(true);
    const formBody = new FormData();
    const addressSend = adress?.adressSends?.find(
      (element: any) => element.value === data?.adressSend,
    );
    const addressReceive = adress?.adressReceives?.find(
      (element: any) => element.value === data?.adressReceive,
    );

    const payer: any = data?.personSendReceive === 'person_send' ? 0 : 1;

    formBody.append('loadingLocationId', addressSend?.id);
    formBody.append('unloadingLocationId', addressReceive?.id);

    formBody.append('SenderInfo.SenderName', informationPerson?.fullName);
    formBody.append('SenderInfo.SenderPhone', informationPerson?.phone);
    formBody.append('SenderInfo.SenderAddress', informationPerson?.address);
    formBody.append('SenderInfo.SenderCI', informationPerson?.CCCD);
    formBody.append('SenderInfo.Email', informationPerson?.email);

    formBody.append(
      'ReceiverInfo.ReceiverName',
      informationPerson?.fullNameReceive,
    );
    formBody.append(
      'ReceiverInfo.ReceiverPhone',
      informationPerson?.phoneReceive,
    );
    formBody.append(
      'ReceiverInfo.ReceiverAddress',
      informationPerson?.addressReceive,
    );
    formBody.append('ReceiverInfo.ReceiverCI', informationPerson?.CCCDReceive);

    formBody.append('IsCod', data?.collector);
    formBody.append('COD', data?.moneyCollector || 0);
    formBody.append('Payer', payer);

    data?.product?.forEach((element: IPackages, ind: number) => {
      let commonItemsObj = packageTypes?.find(
        (elmDefault: any) => elmDefault?.value === element?.specialProductList,
      );
      let commonItemsList = packageTypes?.filter(
        (elmDefault: any) => elmDefault?.value === element?.specialProductList,
      );
      formBody.append(`Packages[${ind}].Content`, element?.contentProduct);
      formBody.append(
        `Packages[${ind}].packageWeightId`,
        packageWeight[ind]?.id,
      );
      formBody.append(
        `Packages[${ind}].packageDimensionId`,
        packageSize[ind]?.id,
      );
      formBody.append(`Packages[${ind}].packageTypeId`, commonItemsObj?.id);
      // commonItemsList?.forEach((elm: any, ind_type: number) => {
      //   formBody.append(`Packages[${ind}].TypeValues[${ind_type}]`, elm.id);
      // });
      formBody.append(`Packages[${ind}].PickupImageFile`, imageList[ind][0]);
    });
    const res: any = await createShipmentOrders(formBody);
    if (res?.isSuccess && res?.code === 200) {
      const code = res?.data?.shippingOrderCode.replace('#', '');
      const phone = res?.data?.senderInfo?.senderPhone;
      window.location.assign(
        `/xac-nhan-thong-tin-thanh-toan?phone=${phone}&code=${code}`,
      );
      setTab(1);
    } else {
      if (res?.errors?.ShipmentLocation?.length > 0) {
        toastError({
          message: res?.errors?.ShipmentLocation[0],
          toastId: 'validate-seats-failed',
        });
      } else {
        toastError({
          message: res?.errorMessage,
          toastId: 'validate-seats-failed',
        });
      }
    }
    setIsLoading(false);
  };

  //thành phố
  useEffect(() => {
    setIsLoading(true);
    const cities: any = [];
    city?.result?.forEach((element: any) => {
      const city_Item = {
        id: parseInt(element?.id),
        value: element?.text,
      };
      cities.push(city_Item);
    });
    setCustomCity([...customCity, ...cities]);
    setIsLoading(false);
  }, [city]);

  //loại hàng
  useEffect(() => {
    setIsLoading(true);
    const types: any = [];
    typePack?.data?.forEach((element: any) => {
      const type = {
        id: element.packageTypeId,
        value: element?.name,
      };
      types?.push(type);
    });
    setPackageTypes([
      {
        id: 0,
        value: CREATEORDER.productDetail.typeProduct,
      },
      ...types,
    ]);
    setIsLoading(false);
  }, [typePack]);

  //Địa chỉ gửi
  useEffect(() => {
    const fetchAdress = async () => {
      const findCity = city?.result?.find(
        (element: any) => element?.text === selectCity?.citySend,
      );
      if (!isEmpty(findCity)) {
        const payload = {
          locationType: 1,
          cityId: parseInt(findCity?.id),
        };
        const res: IShipmentLocationResponse = await fetchShipmentLocation(
          payload,
        );
        const addressList: any = [];
        res?.data?.forEach((element) => {
          const value = {
            id: element?.shipmentLocationId,
            value: element?.fullAddress,
          };
          addressList.push(value);
        });
        setAdress({ ...adress, adressSends: addressList });
      }
    };
    fetchAdress();
  }, [selectCity?.citySend]);

  //Địa chỉ nhận
  useEffect(() => {
    const fetchAdress = async () => {
      const findCity = city?.result?.find(
        (element: any) => element?.text === selectCity?.cityReceive,
      );
      if (!isEmpty(findCity)) {
        const payload = {
          locationType: 2,
          cityId: parseInt(findCity?.id),
        };
        const res: IShipmentLocationResponse = await fetchShipmentLocation(
          payload,
        );
        const addressList: any = [];
        res?.data?.forEach((element) => {
          const value = {
            id: element?.shipmentLocationId,
            value: element?.fullAddress,
          };
          addressList.push(value);
        });
        setAdress({ ...adress, adressReceives: addressList });
      }
    };
    fetchAdress();
  }, [selectCity?.cityReceive]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tab]);

  if (isLoading) {
    return <LoadingView />;
  }

  return (
    <>
      <div>
        <Header userProfile={userProfile} />
      </div>
      <div className='pt-10 pb-[60px] bg-[#ECECEC]'>
        <div className='mx-auto w-[1120px]'>
          <div className='text-xl font-semibold text-[#101F24]'>
            {CREATEORDER.createOrderTitle}
          </div>
          <div className='mt-4'>
            <Tabs list={LIST_STEP} tab={tab} />
          </div>
          <div className='mt-4'>
            {tab === 1 && (
              <SendReceive
                CREATEORDER={CREATEORDER}
                signInStatus={!isNull(userProfile)}
                handleSignIn={handleSignIn}
                handleSubmitNoSignInSend={handleSubmitNoSignInSend}
                handleSubmitSignInSend={handleSubmitSignInSend}
              />
            )}
            {tab === 2 && (
              <InformationProduct
                handleSignIn={handleSignIn}
                CREATEORDER={CREATEORDER}
                signInStatus={!isNull(userProfile)}
                informationPerson={informationPerson || {}}
                handleSubmitNoSignInReceive={handleSubmitNoSignInSendAndReceive}
                handleSubmitSignInReceive={handleSubmitSignInSendAndReceive}
                setImageList={setImageList}
                imageList={imageList}
                city={customCity}
                setSelectCity={setSelectCity}
                adress={adress}
                packageWeight={packageWeight}
                packageSize={packageSize}
                setPackageWeight={setPackageWeight}
                setPackageSize={setPackageSize}
                packageTypes={packageTypes}
              />
            )}
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default ContainerTransportDesktop;
