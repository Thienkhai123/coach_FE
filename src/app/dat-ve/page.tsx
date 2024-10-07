'use client';
import { fetchCity, fetchPlaces, fetchVehicleTypes } from '@/apis/trip';
import { OptionT } from '@/components/booking-search';
import ContainerBookingPageDesktop from '@/container/dat-ve/desktop';
import ContainerBookingPageMobile from '@/container/dat-ve/mobile';
import useTrans from '@/hook/useTrans';
import { IBookingTranslate } from '@/interfaces/IBookingTranslate';
import { IErrorTranslate } from '@/interfaces/IErrorTranslate';
import { IHomeTranslate } from '@/interfaces/IHomeTranslate';
import { IPaymentTranslate } from '@/interfaces/IPaymentTranslate';
import { IPlaceholderTranslate } from '@/interfaces/IPlaceholderTranslate';
import { IRequestPaymentTranslate } from '@/interfaces/IRequestPaymentTranslate';
import { ISignInTranslate } from '@/interfaces/ISignInTranslate';
import { ICityResponse } from '@/interfaces/httpRequest/ICity';
import { IUserProfile } from '@/interfaces/httpRequest/IUser';
import { IVehicleTypesResponse } from '@/interfaces/httpRequest/IVehicleTypes';
import withCommon from '@/layout/withCommon';
import { useEffect, useState } from 'react';
import TripListMobileEmpty from '@/components/Pages/dat-ve/triplistMobileEmpty';
import '../globals.css';
import { IMyPointTranslate } from '@/interfaces/IMyPointTranslate';
import { Iplaces } from '@/interfaces/httpRequest/IPlaces';

interface IBookingPageProps {
  authen?: boolean;
  userProfile: IUserProfile;
}

type SearchT = {
  id: number;
  value: string;
  isPlace?: boolean;
};

const renderTitle = ({ from = '', to = '' }) => {
  return from + ' - ' + to;
};

const BookingPage = ({ authen = false, userProfile }: IBookingPageProps) => {
  const {
    HOME,
    BOOKING,
    ERROR,
    PLACEHOLDER,
    SIGNIN,
    REQUESTPAYMENT,
    PAYMENT,
    POINT,
  }: {
    HOME: IHomeTranslate;
    BOOKING: IBookingTranslate;
    ERROR: IErrorTranslate;
    PLACEHOLDER: IPlaceholderTranslate;
    SIGNIN: ISignInTranslate;
    REQUESTPAYMENT: IRequestPaymentTranslate;
    PAYMENT: IPaymentTranslate;
    POINT: IMyPointTranslate;
  } = useTrans();
  const [city, setCity] = useState<ICityResponse>();
  const [places, setPlaces] = useState<Iplaces>();
  const [vehicleTypes, setVehicleTypes] = useState<IVehicleTypesResponse[]>();
  const [isValidParams, setIsValidParams] = useState(false);
  const [tripTitle, setTripTitle] = useState({
    from: '',
    to: '',
  });

  const getCity = async () => {
    let query = new URLSearchParams(window.location.search);
    let startCityId = query.get('startCityId');
    let endCityId = query.get('endCityId');
    let startPlace_id = query.get('startPlace_id');
    let endPlace_id = query.get('endPlace_id');
    let tmpTitle = {
      from: '',
      to: '',
    };
    const startPlacesLocal: SearchT[] = JSON.parse(
      localStorage.getItem('startPlace') || `[]`,
    );
    const endPlacesLocal: SearchT[] = JSON.parse(
      localStorage.getItem('endPlace') || `[]`,
    );

    const params = {
      pageSize: 100,
    };
    const res: ICityResponse = await fetchCity(params);
    if (res?.result?.length > 0) {
      if (startCityId) {
        const fromCity =
          res?.result?.find((c) => c?.id === startCityId)?.text || '';
        if (fromCity) {
          tmpTitle.from = fromCity;
        }
      }
      if (endCityId) {
        const toCity =
          res?.result?.find((c) => c?.id === endCityId)?.text || '';
        if (toCity) {
          tmpTitle.to = toCity;
        }
      }
    }
    if (startPlace_id) {
      let fromPlace = '';
      if (startPlacesLocal?.length > 0) {
        fromPlace =
          startPlacesLocal?.find((c) => c?.id === parseInt(startPlace_id || ''))
            ?.value || '';
      }

      if (fromPlace !== '') {
        tmpTitle.from = fromPlace;
      }
    }
    if (endPlace_id) {
      let toPlace = '';
      if (endPlacesLocal?.length > 0) {
        toPlace =
          endPlacesLocal?.find((c) => c?.id === parseInt(endPlace_id || ''))
            ?.value || '';
      }

      if (toPlace !== '') {
        tmpTitle.to = toPlace;
      }
    }
    setTripTitle(tmpTitle);
    setCity(res);
  };

  const getVehicleTypes = async () => {
    const res: IVehicleTypesResponse[] = await fetchVehicleTypes({});
    setVehicleTypes(res);
  };

  const convertVehicleTypesTOptionType = (data?: IVehicleTypesResponse[]) => {
    const tmpVehicleTypes: OptionT[] = [];
    data?.forEach((el) => {
      tmpVehicleTypes.push({
        value: el.name,
        id: el.vehicleTypeId,
      });
    });
    return tmpVehicleTypes;
  };

  useEffect(() => {
    getCity();
    getVehicleTypes();
    const initTripContent = () => {
      let query = new URLSearchParams(window.location.search);
      let startPlace_id = query.get('startPlace_id');
      let endPlace_id = query.get('endPlace_id');
      let startDate = query.get('startDate');
      let startCityId = query.get('startCityId');
      let endCityId = query.get('endCityId');

      if (
        (startPlace_id || startCityId) &&
        (endPlace_id || endCityId) &&
        startDate
      ) {
        setIsValidParams(true);
      }
    };
    initTripContent();
  }, []);

  return (
    <div className='min-h-[100vh] relative flex flex-col'>
      <div className='flex-1 bg-neutral-grey-100'>
        <div className='lg:block hidden'>
          {city && (
            <ContainerBookingPageDesktop
              userProfile={userProfile}
              HOME={HOME}
              BOOKING={BOOKING}
              ERROR={ERROR}
              PLACEHOLDER={PLACEHOLDER}
              SIGNIN={SIGNIN}
              REQUESTPAYMENT={REQUESTPAYMENT}
              PAYMENT={PAYMENT}
              city={city}
              places={places}
              vehicleTypesList={convertVehicleTypesTOptionType(vehicleTypes)}
              tripTitle={renderTitle(tripTitle)}
            />
          )}
        </div>

        <div className='lg:hidden'>
          {!isValidParams && <TripListMobileEmpty BOOKING={BOOKING} />}
          {city?.result && isValidParams && (
            <ContainerBookingPageMobile
              HOME={HOME}
              BOOKING={BOOKING}
              ERROR={ERROR}
              PLACEHOLDER={PLACEHOLDER}
              SIGNIN={SIGNIN}
              PAYMENT={PAYMENT}
              POINT={POINT}
              city={city}
              vehicleTypesList={convertVehicleTypesTOptionType(vehicleTypes)}
              userProfile={userProfile}
              tripTitle={renderTitle(tripTitle)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default withCommon(BookingPage);
