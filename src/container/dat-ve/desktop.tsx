import FilterDesktop from '@/components/Pages/dat-ve/filterDesktop';
import TripListDesktop from '@/components/Pages/dat-ve/tripListDesktop';
import TripListDesktopEmpty from '@/components/Pages/dat-ve/triplistDesktopEmpty';
import FormBookingSearch, { OptionT } from '@/components/booking-search';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { IBookingTranslate } from '@/interfaces/IBookingTranslate';
import { IHomeTranslate } from '@/interfaces/IHomeTranslate';
import Image from 'next/image';
import { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import PickSeatDesktop from '@/components/Pages/dat-ve/pick-seat-desktop';
import { IErrorTranslate } from '@/interfaces/IErrorTranslate';
import { IPlaceholderTranslate } from '@/interfaces/IPlaceholderTranslate';
import { ISignInTranslate } from '@/interfaces/ISignInTranslate';
import { IRequestPaymentTranslate } from '@/interfaces/IRequestPaymentTranslate';
import { IPaymentTranslate } from '@/interfaces/IPaymentTranslate';
import { ICityResponse } from '@/interfaces/httpRequest/ICity';
import { IVehicleTypesResponse } from '@/interfaces/httpRequest/IVehicleTypes';
import { fetchTrip, fetchTripV2 } from '@/apis/trip';
import moment from 'moment';
import { ITripData, ITripResponse } from '@/interfaces/httpRequest/ITrip';
import LoadingView from '@/components/LoadingView';
import LoadingChildComponent from '@/components/LoadingChildComponent';
import { IUserProfile } from '@/interfaces/httpRequest/IUser';
import ReturnTripTabDesktop from '@/components/Pages/dat-ve/returnTripTabDesktop';
import OwnRouteCard from '@/components/Pages/dat-ve/own-route';
import PickSeatReturnDesktop from '@/components/Pages/dat-ve/pick-seat-return-desktop';
import { Iplaces } from '@/interfaces/httpRequest/IPlaces';
const FAKE_TRIPS = [
  {
    startTime: '19:00',
    endTime: '05:00',
    startPlace: 'Bến Xe Trung Tâm Đà Nẵng',
    endPlace: 'Bến Xe Trung Tâm Nha Trang',
    type: 1,
    seats: 20,
    available: 18,
    price: 400000,
    duration: 10,
    model: 'Xe Luxury',
    imageUrl: '/images/trip-demo.png',
  },
  {
    startTime: '19:00',
    endTime: '05:00',
    startPlace: 'Bến Xe Trung Tâm Đà Nẵng',
    endPlace: 'Bến Xe Trung Tâm Nha Trang',
    type: 1,
    seats: 20,
    available: 5,
    price: 350000,
    duration: 10,
    model: 'Xe Limousine',
    imageUrl: '/images/trip-demo.png',
  },
  {
    startTime: '19:00',
    endTime: '05:00',
    startPlace: 'Bến Xe Trung Tâm Đà Nẵng',
    endPlace: 'Bến Xe Trung Tâm Nha Trang',
    type: 1,
    seats: 20,
    available: 18,
    price: 300000,
    duration: 10,
    model: 'Giường nằm truyền thống',
    imageUrl: '/images/trip-demo.png',
  },
  {
    startTime: '19:00',
    endTime: '05:00',
    startPlace: 'Bến Xe Trung Tâm Đà Nẵng',
    endPlace: 'Bến Xe Trung Tâm Nha Trang',
    type: 1,
    seats: 20,
    available: 18,
    price: 300000,
    duration: 10,
    model: 'Giường nằm truyền thống',
    imageUrl: '/images/trip-demo.png',
  },
  {
    startTime: '19:00',
    endTime: '05:00',
    startPlace: 'Bến Xe Trung Tâm Đà Nẵng',
    endPlace: 'Bến Xe Trung Tâm Nha Trang',
    type: 1,
    seats: 20,
    available: 18,
    price: 300000,
    duration: 10,
    model: 'Giường nằm truyền thống',
    imageUrl: '/images/trip-demo.png',
  },
];

interface IFormValues {
  timeStart?: any[];
  carType?: any[];
  floors?: any[];
  prices?: any[];
}
const ContainerBookingPageDesktop = ({
  HOME,
  BOOKING,
  ERROR,
  PLACEHOLDER,
  SIGNIN,
  REQUESTPAYMENT,
  PAYMENT,
  city,
  vehicleTypesList,
  userProfile,
  places,
  tripTitle = '',
}: {
  HOME: IHomeTranslate;
  BOOKING: IBookingTranslate;
  ERROR: IErrorTranslate;
  PLACEHOLDER: IPlaceholderTranslate;
  SIGNIN: ISignInTranslate;
  REQUESTPAYMENT: IRequestPaymentTranslate;
  PAYMENT: IPaymentTranslate;
  city: ICityResponse;
  vehicleTypesList?: OptionT[];
  userProfile?: IUserProfile;
  places?: Iplaces;
  tripTitle?: string;
}) => {
  const timeSlots = [
    {
      id: 0,
      label: `${BOOKING.earlyMorning} 00:00 - 06:00`,
      start: '00:00',
      end: '06:00',
    },
    {
      id: 1,
      label: `${BOOKING.morning} 06:00 - 12:00`,
      start: '06:00',
      end: '12:00',
    },
    {
      id: 2,
      label: `${BOOKING.afternoon} 12:00 - 18:00`,
      start: '12:00',
      end: '18:00',
    },
    {
      id: 3,
      label: `${BOOKING.evening} 18:00 - 24:00`,
      start: '18:00',
      end: '23:59',
    },
  ];
  const priceRanges = [
    { id: 0, label: `${BOOKING.below} 300.000đ`, min: null, max: 300000 },
    { id: 1, label: '300.000đ - 500.000đ', min: 300000, max: 500000 },
    { id: 2, label: `${BOOKING.above} 500.000đ`, min: 500000, max: null },
  ];
  const [step, setStep] = useState(1);
  const [searchQurey, setSearchQuery] = useState<any>({});
  const [selectedTrip, setSelectedTrip] = useState<ITripData | null>(null);
  const [selectedTripDeparture, setSelectedTripDeparture] =
    useState<ITripData | null>(null);
  const [selectedTripReturn, setSelectedTripReturn] =
    useState<ITripData | null>(null);

  const [tripsData, setTripsData] = useState<ITripData[]>();
  const [loading, setLoading] = useState(false);
  const [returnDepartureDate, setReturnDepartureDate] = useState('');
  const [typeTrip, setTypeTrip] = useState(1);
  const [returnTripTab, setReturnTripTab] = useState(1);
  const schema = yup.object().shape({});

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    setError,
    getValues,
    formState: { errors, isValid, isDirty },
  } = useForm<IFormValues>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      timeStart: [],
      carType: [],
      floors: [],
      prices: [],
    },
  });
  const watchTimeStart = watch('timeStart', []) as number[];
  const watchPriceRange = watch('prices', []) as number[];
  const watchCarType = watch('carType', []) as string[];

  const handleChangeReturnTab = ({
    tabId,
    date,
  }: {
    tabId: number;
    date: string;
  }) => {
    if (date && date !== '') {
      setReturnDepartureDate(date);
      setReturnTripTab(tabId);
      // handleFetchByDate(date, tabId);
    }
  };

  const getPriceRange = () => {
    if (watchPriceRange.length === 0) {
      return { minPrice: null, maxPrice: null };
    }

    const sortedRanges = [...watchPriceRange].sort((a, b) => a - b);
    const minPrice = priceRanges[sortedRanges[0]].min;
    const maxPrice = priceRanges[sortedRanges[sortedRanges.length - 1]].max;

    return { minPrice, maxPrice };
  };

  const getStartEndTime = () => {
    if (watchTimeStart.length === 0) {
      return { startTime: null, endTime: null };
    }

    const sortedTimes = [...watchTimeStart].sort((a, b) => a - b);
    const startTime = timeSlots[sortedTimes[0]].start;
    const endTime = timeSlots[sortedTimes[sortedTimes.length - 1]].end;

    return { startTime, endTime };
  };

  const { startTime, endTime } = getStartEndTime();
  const { minPrice, maxPrice } = getPriceRange();

  const resetFilter = () => {
    reset({ timeStart: [], carType: [], floors: [], prices: [] });
  };
  const handleChangeNextStep = (trip: ITripData) => {
    if (typeTrip === 1) {
      if (trip) {
        setSelectedTrip(trip);
        setStep(step + 1);
      }
    } else {
      if (trip) {
        if (returnTripTab === 1) {
          setSelectedTripDeparture(trip);
        } else if (returnTripTab === 2) {
          setSelectedTripReturn(trip);
        }
      }
    }
  };
  const handleClickButtonRoute = (trip: ITripData) => {
    if (typeTrip === 1) {
      if (trip) {
        setSelectedTrip(trip);
        setStep(step + 1);
      }
    } else {
      if (trip) {
        if (returnTripTab === 1) {
          setSelectedTripDeparture(trip);
          setReturnDepartureDate(searchQurey?.returnDate);
          setReturnTripTab(2);
        } else if (returnTripTab === 2) {
          setSelectedTripReturn(trip);
          if (!selectedTripDeparture) {
            setReturnTripTab(1);
            setReturnDepartureDate(searchQurey?.departureDate);
          } else {
            setStep(step + 1);
          }
        }
      }
    }
  };

  const handleChangePrevStep = () => {
    setSelectedTrip(null);
    setStep(step - 1);
  };

  const handleFilter = async () => {
    setLoading(true);
    const searchParams = new URLSearchParams(window.location.search);
    const startPlaceId = searchParams.get('startPlace_id');
    const endPlaceId = searchParams.get('endPlace_id');
    const startCityId = searchParams.get('startCityId');
    const endCityId = searchParams.get('endCityId');
    const departureDate = searchParams.get('startDate');
    const endDateUrl = searchParams.get('endDate');
    const numberOfTicket = searchParams.get('amountTicket');
    const type = searchParams.get('type');
    const vehicleTypeIds = getValues()?.carType;
    const departureTimeStart = startTime;
    const departureTimeEnd = endTime;
    const priceRangeStart = minPrice;
    const priceRangeEnd = maxPrice;
    const startPlace =
      startPlaceId &&
      startPlaceId !== '' &&
      places?.find((e) => e.placeId === parseInt(startPlaceId))?.name;
    const startCity =
      startCityId &&
      startCityId !== '' &&
      city?.result.find((e) => e.id === startCityId)?.text;
    const endPlace =
      endPlaceId &&
      endPlaceId !== '' &&
      places?.find((e) => e.placeId === parseInt(endPlaceId))?.name;
    const endCity =
      endCityId &&
      endCityId !== '' &&
      city?.result.find((e) => e.id === endCityId)?.text;
    const pageSize = 100;
    if (endDateUrl) {
      if (type && parseInt(type) === 2) {
        setTypeTrip(2);
      }
    } else {
      setTypeTrip(1);
    }

    const params = {
      startCityId:
        type &&
        parseInt(type) === 1 &&
        returnTripTab === 1 &&
        startPlaceId &&
        startPlaceId !== ''
          ? 0
          : type && parseInt(type) === 2 && returnTripTab === 2
          ? endCityId
            ? parseInt(endCityId)
            : 0
          : startCityId
          ? parseInt(startCityId)
          : 0,
      endCityId:
        type &&
        parseInt(type) === 1 &&
        returnTripTab === 1 &&
        endPlaceId &&
        endPlaceId !== ''
          ? 0
          : type && parseInt(type) === 2 && returnTripTab === 2
          ? startCityId
            ? parseInt(startCityId)
            : 0
          : endCityId
          ? parseInt(endCityId)
          : 0,
      startPlaceId:
        type &&
        parseInt(type) === 1 &&
        returnTripTab === 1 &&
        startCityId &&
        startCityId !== ''
          ? 0
          : type && parseInt(type) === 2 && returnTripTab === 2
          ? endPlaceId
            ? parseInt(endPlaceId)
            : 0
          : startPlaceId
          ? parseInt(startPlaceId)
          : 0,
      endPlaceId:
        type &&
        parseInt(type) === 1 &&
        returnTripTab === 1 &&
        endCityId &&
        endCityId !== ''
          ? 0
          : type && parseInt(type) === 2 && returnTripTab === 2
          ? startPlaceId
            ? parseInt(startPlaceId)
            : 0
          : endPlaceId
          ? parseInt(endPlaceId)
          : 0,
      departureDate:
        returnDepartureDate !== ''
          ? returnDepartureDate
          : departureDate
          ? moment.utc(departureDate, 'DD-MM-YYYY').toISOString()
          : moment(new Date()).toISOString(),
      numberOfTicket: numberOfTicket ? parseInt(numberOfTicket) : 0,
      departureTimeStart: departureTimeStart ? departureTimeStart : null,
      departureTimeEnd: departureTimeEnd ? departureTimeEnd : null,
      pageSize: pageSize,
      vehicleTypeIds: vehicleTypeIds ? vehicleTypeIds?.toString() : '',
      priceRangeStart: priceRangeStart ? priceRangeStart : null,
      priceRangeEnd: priceRangeEnd ? priceRangeEnd : null,
    };

    setSearchQuery({
      ...params,
      startPlace: startPlace,
      endPlace: endPlace,
      startCity: startCity,
      endCity: endCity,
      returnDate: moment.utc(endDateUrl, 'DD-MM-YYYY').toISOString(),
      departureDate: moment.utc(departureDate, 'DD-MM-YYYY').toISOString(),
    });

    const res: ITripResponse = await fetchTripV2(params);

    if (res?.isSuccess) {
      setTripsData(res.data);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (step === 1) {
      handleFilter();
    }
  }, [watchTimeStart, watchPriceRange, watchCarType, step, returnTripTab]);
  return (
    <div className=''>
      <div>
        <Header userProfile={userProfile} />
      </div>
      {step === 1 && (
        <>
          <div className='relative w-full select-none h-0 pt-[30.53%]'>
            <Image
              src={'/images/banner_hunglong.jpg'}
              alt=''
              objectFit='cover'
              layout='fill'
              quality={100}
            />
          </div>
          <div className='relative h-[144px] bg-neutral-grey-100'>
            <div className='w-full  h-full flex bg-neutral-grey-100 absolute -top-[90px] rounded-t-[20px]'>
              <div className='relative max-w-[1120px] mx-auto w-full'>
                <FormBookingSearch HOME={HOME} city={city} places={places} />
              </div>
            </div>
          </div>
          <div className='max-w-[1120px] mx-auto mb-[60px] mt-10 '>
            <div className='grid grid-cols-[28.57%_67.86%] gap-10 '>
              <div>
                {typeTrip === 2 &&
                  (selectedTripDeparture || selectedTripReturn) && (
                    <div className='mb-4 w-full  bg-white h-fit pb-4 rounded-lg'>
                      <div className='p-4 flex items-center justify-between border-b border-neutral-grey-200'>
                        <p className='text-base  font-semibold'>
                          Chuyến của bạn
                        </p>
                      </div>
                      <div className='py-2 px-4 flex flex-col gap-2'>
                        {selectedTripDeparture && (
                          <OwnRouteCard
                            trip={selectedTripDeparture}
                            BOOKING={BOOKING}
                          />
                        )}
                        {selectedTripReturn && (
                          <OwnRouteCard
                            trip={selectedTripReturn}
                            isReturnTrip={true}
                            BOOKING={BOOKING}
                          />
                        )}
                      </div>
                    </div>
                  )}
                <FilterDesktop
                  vehicleTypesList={vehicleTypesList}
                  timeSlotsList={timeSlots}
                  priceRangesList={priceRanges}
                  BOOKING={BOOKING}
                  register={register}
                  resetFilter={resetFilter}
                  timeStartSelected={getValues()?.timeStart || []}
                  carTypeSelected={getValues()?.carType || []}
                  floorsSelected={getValues()?.floors || []}
                  pricesSelected={getValues()?.prices || []}
                />
              </div>

              <div>
                <div className='flex flex-col gap-1 mb-4'>
                  <p className='text-neutral-grey-700 font-bold text-lg'>
                    {BOOKING.searchResult}: {tripTitle} (
                    {tripsData &&
                    tripsData[0]?.trips &&
                    tripsData[0]?.trips?.length > 0
                      ? tripsData[0]?.trips?.length
                      : 0}
                    )
                  </p>
                  {typeTrip === 1 && (
                    <p className='first-letter:uppercase text-sm leading-[21px] font-semibold text-neutral-grey-600'>
                      {moment(searchQurey?.departureDate)
                        .locale('vi')
                        .format('dddd, DD/MM/YYYY')}
                    </p>
                  )}
                </div>
                {typeTrip === 2 && (
                  <ReturnTripTabDesktop
                    tab={returnTripTab}
                    departureDate={searchQurey.departureDate}
                    returnDate={searchQurey.returnDate}
                    handleChangeTab={handleChangeReturnTab}
                    BOOKING={BOOKING}
                  />
                )}
                {loading ? (
                  <LoadingChildComponent />
                ) : tripsData?.length === 0 ? (
                  <TripListDesktopEmpty BOOKING={BOOKING} />
                ) : (
                  <TripListDesktop
                    tab={returnTripTab}
                    isReturnRoute={typeTrip === 2}
                    selectedTripDeparture={selectedTripDeparture || undefined}
                    selectedTripReturn={selectedTripReturn || undefined}
                    city={city}
                    BOOKING={BOOKING}
                    trips={tripsData || []}
                    handleChangeNextStep={handleChangeNextStep}
                    handleClickButtonRoute={handleClickButtonRoute}
                  />
                )}
              </div>
            </div>
          </div>
        </>
      )}
      {step === 2 && (
        <div>
          {typeTrip === 2 ? (
            <div className='flex flex-col h-full min-h-[100vh] max-w-[1120px] mx-auto mt-10'>
              {selectedTripDeparture && selectedTripReturn && (
                <PickSeatReturnDesktop
                  userProfile={userProfile}
                  REQUESTPAYMENT={REQUESTPAYMENT}
                  BOOKING={BOOKING}
                  ERROR={ERROR}
                  PLACEHOLDER={PLACEHOLDER}
                  SIGNIN={SIGNIN}
                  handleChangePrevStep={handleChangePrevStep}
                  selectedTripDeparture={selectedTripDeparture}
                  selectedTripReturn={selectedTripReturn}
                  PAYMENT={PAYMENT}
                />
              )}
            </div>
          ) : (
            <div className='flex flex-col h-full min-h-[100vh] max-w-[1120px] mx-auto mt-10'>
              {selectedTrip && (
                <PickSeatDesktop
                  userProfile={userProfile}
                  REQUESTPAYMENT={REQUESTPAYMENT}
                  BOOKING={BOOKING}
                  ERROR={ERROR}
                  PLACEHOLDER={PLACEHOLDER}
                  SIGNIN={SIGNIN}
                  handleChangePrevStep={handleChangePrevStep}
                  selectedTrip={selectedTrip}
                  PAYMENT={PAYMENT}
                />
              )}
            </div>
          )}
        </div>
      )}
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default ContainerBookingPageDesktop;
