import { ITranslation } from '@/interfaces/ITranslation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { REGEX_PHONE } from '@/constant/app';
import CheckIcon from '@/components/icons/check';
import CalendarPointIcon from '@/components/icons/calendarPoint';
import moment from 'moment';
import AdressIcon from '@/components/icons/adress';
import useModal from '@/hook/useModal';
import FullScreenModal from '@/components/modal/FullScreenModal';
import SearchTripContent from '../trang-chu/searchTripContent';
import { ICityResponse } from '@/interfaces/httpRequest/ICity';
import DrawerBottom from '@/components/drawer-bottom';
import ModalPickDateContentRetalCar from './modalPickDateContentRetalCar';
import SelectOptionCar from './selectOptionCar';

interface IFullModalTourBookingContentProps {
  translation: ITranslation;
  handleAction: () => void;
  city?: ICityResponse;
  onSubmit: (data: any) => void;
}

interface IFormValues {
  fullName?: string;
  phone?: string;
  point?: string;
  destination?: string;
  timeDay?: string;
  numberCar?: number;
  carList?: ICar[];
  driver?: boolean;
  startTime?: any;
  endTime?: any;
}
interface ICar {
  car?: string;
}

const FAKE_LIST_SEARCH = [
  'An Giang',
  'Cà Mau',
  'Hà Nội',
  'Hải Phòng',
  'TPHCM',
  'Vũng Tàu',
];

const FAKE_LIST_SEARCH_OPTION_CAR_VI = [
  { id: 1, value: 'Xe 4-5 chỗ ' },
  { id: 2, value: 'Xe 7 chỗ ' },
  { id: 3, value: 'Xe 12 chỗ ' },
  { id: 4, value: 'Xe 16 chỗ ' },
  { id: 5, value: 'Xe 20 chỗ ' },
  { id: 6, value: 'Xe 24 chỗ ' },
  { id: 7, value: 'Xe 35 chỗ ' },
];

const FAKE_LIST_SEARCH_OPTION_CAR_EN = [
  { id: 1, value: '4-5 seater car ' },
  { id: 2, value: '7 seater car ' },
  { id: 3, value: '12 seater car ' },
  { id: 4, value: '16 seater car ' },
  { id: 5, value: '20 seater car ' },
  { id: 6, value: '24 seater car ' },
  { id: 7, value: '35 seater car ' },
];

const FullModalTourBookingContent = (
  props: IFullModalTourBookingContentProps,
) => {
  const { translation, city, onSubmit } = props;
  const { HOME, BOOKING, CREATEORDER, VEHICLE } = translation;
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [openModalStartLocation, toggleModalStartLocation] = useModal();
  const [openModalEndLocation, toggleModalEndLocation] = useModal();
  const [openModalPickStartDate, toggleModalPickStartDate] = useModal();

  const getLocaleLang = localStorage.getItem('locale');

  const schema = yup.object().shape({
    fullName: yup.string().required(CREATEORDER.errors.warningContent),
    phone: yup
      .string()
      .nullable()
      .required(CREATEORDER.errors.warningContent)
      .matches(REGEX_PHONE, CREATEORDER.errors.warningType),
    point: yup.string().required(CREATEORDER.errors.warningContent),
    destination: yup.string().required(CREATEORDER.errors.warningContent),
    timeDay: yup.string().required(CREATEORDER.errors.warningContent),
    startTime: yup.string(),
    endTime: yup.string(),
    numberCar: yup
      .number()
      .min(1, CREATEORDER.errors.warningType)
      .typeError(CREATEORDER.errors.warningType)
      .required(CREATEORDER.errors.warningContent),
    carList: yup.array().of(
      yup.object().shape({
        car: yup
          .string()
          .required(CREATEORDER.errors.warningContent)
          .notOneOf([''], CREATEORDER.errors.warningContent),
      }),
    ),
    driver: yup.boolean(),
  });
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors, isValid },
  } = useForm<IFormValues>({
    resolver: yupResolver<IFormValues>(schema),
    mode: 'onChange',
    defaultValues: {},
  });

  const endDateValue = getValues('endTime');
  const startDateValue = getValues('startTime');

  const numberCarArray = watch('numberCar') || '1';
  const resultNumberCar =
    typeof numberCarArray === 'string'
      ? parseInt(numberCarArray)
      : numberCarArray;

  const handleUpdateValueFrom = (obj: { id: string; text: string }) => {
    setValue('point', obj?.text);
    toggleModalStartLocation();
  };

  const handleUpdateValueTo = (obj: { id: string; text: string }) => {
    setValue('destination', obj?.text);
    toggleModalEndLocation();
  };

  const handleOpenPopupCalendar = () => {
    setEndDate(null);
    setStartDate(new Date());
    toggleModalPickStartDate();
  };

  const handlePickDate = (startDate: Date | null, endDate: Date | null) => {
    setValue('startTime', startDate);
    setValue('endTime', endDate);
    if (getLocaleLang === 'en') {
      setValue(
        'timeDay',
        endDate !== null
          ? `${moment(startDate).format('MMMM')} ${moment(startDate).format(
              'DD',
            )} - ${moment(endDate).format('MMMM')} ${moment(endDate).format(
              'DD',
            )}  `
          : '',
      );
    } else {
      setValue(
        'timeDay',
        endDate !== null
          ? `${moment(startDate).format('DD')} ${
              translation.VEHICLE.months
            } ${moment(startDate).format('MM')} - ${moment(endDate).format(
              'DD',
            )} ${translation.VEHICLE.months} ${moment(endDate).format('MM')}`
          : '',
      );
    }
    if (endDate !== null) {
      toggleModalPickStartDate();
    }
  };

  useEffect(() => {
    const car: any = { car: '' };
    setValue('carList', Array(resultNumberCar).fill(car));
  }, [watch('numberCar')]);

  return (
    <div className='relative bg-common '>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-2'>
          {/* Thông tin */}
          <div className='bg-white  py-3 px-4'>
            <div className='uppercase w-fit py-[3px] px-3 text-xs text-neutral-600 font-extrabold bg-[#DEF5E0] rounded-full'>
              {VEHICLE.form.connect}
            </div>
            <div className='grid grid-cols-1 gap-3 mt-3'>
              <div>
                <div className=' text-sm font-semibold text-neutral-grey-700'>
                  {VEHICLE.form.fullName}{' '}
                  <span className='text-red-600'>*</span>
                </div>
                <div className='mt-1'>
                  <input
                    {...register('fullName')}
                    className='rounded-lg border border-neutral-grey-300 py-2 px-3 outline-none text-sm font-medium w-full'
                    placeholder={VEHICLE.form.placeholderFullName}
                  />
                  {errors?.fullName && (
                    <p className='text-[14px] leading-5 text-red-500'>
                      {errors.fullName.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <div className=' text-sm font-semibold text-neutral-grey-700'>
                  {VEHICLE.form.phone} <span className='text-red-600'>*</span>
                </div>
                <div className='mt-1'>
                  <input
                    {...register('phone')}
                    className='rounded-lg border border-neutral-grey-300 py-2 px-3 outline-none text-sm font-medium w-full'
                    placeholder={VEHICLE.form.placeholderPhone}
                  />
                  {errors.phone && (
                    <p className='text-[14px] leading-5 text-red-500'>
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Tuyến xe */}
          <div className='bg-white  py-3  px-4'>
            <div className=' uppercase w-fit py-[3px] px-3 text-xs text-neutral-600 font-extrabold bg-[#DEF5E0] rounded-full'>
              {VEHICLE.form.inforOrder}
            </div>
            <div className='flex flex-col gap-3'>
              <div className='mt-3'>
                <div className=' text-sm  font-semibold text-neutral-grey-700 mb-1'>
                  {VEHICLE.form.pointBook}{' '}
                  <span className='text-red-600'>*</span>
                </div>
                <div className='mt-1'>
                  <div
                    className={`rounded-lg border flex justify-between gap-3 border-neutral-grey-300 py-2 px-3 outline-none text-sm font-medium w-full`}
                  >
                    <div
                      onClick={() => {
                        toggleModalStartLocation();
                      }}
                      className=' relative'
                    >
                      <input
                        {...register('point')}
                        autoComplete='off'
                        className='outline-none text-sm font-medium w-full disabled:bg-neutral-100'
                        placeholder={VEHICLE.form.placeholderPointBook}
                      />
                    </div>
                    <div>
                      <AdressIcon />
                    </div>
                  </div>
                  {errors?.point && (
                    <p className='text-[14px] leading-5 text-red-500'>
                      {errors?.point.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <div className=' text-sm font-semibold text-neutral-grey-700 mb-1'>
                  {VEHICLE.form.destinationBook}{' '}
                  <span className='text-red-600'>*</span>
                </div>
                <div className='mt-1'>
                  <div
                    className={`rounded-lg border flex justify-between gap-3 border-neutral-grey-300 py-2 px-3 outline-none text-sm font-medium w-full`}
                  >
                    <div
                      onClick={() => {
                        toggleModalEndLocation();
                      }}
                      className='w-full relative'
                    >
                      <input
                        {...register('destination')}
                        autoComplete='off'
                        className='outline-none text-sm font-medium w-full disabled:bg-neutral-100'
                        placeholder={VEHICLE.form.placeholderDestinationBook}
                      />
                    </div>
                    <div>
                      <AdressIcon />
                    </div>
                  </div>
                  {errors?.destination && (
                    <p className='text-[14px] leading-5 text-red-500'>
                      {errors?.destination.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <div className=' text-sm font-semibold text-neutral-grey-700 mb-1'>
                  {VEHICLE.form.time} <span className='text-red-600'>*</span>
                </div>
                <div
                  onClick={handleOpenPopupCalendar}
                  className={`rounded-lg border flex justify-between gap-3 border-neutral-grey-300 py-2 px-3 outline-none text-sm font-medium w-full`}
                >
                  <div className='w-full'>
                    <input
                      {...register('timeDay')}
                      autoComplete='off'
                      value={
                        endDate !== null
                          ? `${moment(startDate).format('DD')} ${
                              translation.VEHICLE.months
                            } ${moment(startDate).format('MM')} - ${moment(
                              endDate,
                            ).format('DD')} ${
                              translation.VEHICLE.months
                            } ${moment(endDate).format('MM')}`
                          : ''
                      }
                      className='outline-none text-sm font-medium w-full disabled:bg-neutral-100'
                      placeholder={VEHICLE.form.placeholderTime}
                    />
                  </div>
                  <div>
                    <CalendarPointIcon />
                  </div>
                </div>
                {errors?.timeDay && (
                  <p className='text-[14px] leading-5 text-red-500'>
                    {errors.timeDay.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Chọn xe */}
          <div className='bg-white py-3 px-4'>
            <div className='uppercase w-fit py-[3px] px-3 text-xs text-neutral-600 font-extrabold bg-[#DEF5E0] rounded-full'>
              {VEHICLE.form.inforCar}
            </div>
            {/* Số lượng xe */}
            <div className='flex flex-col gap-3 mt-3'>
              <div>
                <div className=' text-sm font-semibold text-neutral-grey-700'>
                  {VEHICLE.form.numberCarBook}{' '}
                  <span className='text-red-600'>*</span>
                </div>
                <div className='mt-1'>
                  <input
                    {...register('numberCar')}
                    min={1}
                    defaultValue={1}
                    className='rounded-lg border border-neutral-grey-300 py-2 px-3 outline-none text-sm font-medium w-full'
                  />
                  {errors?.numberCar && (
                    <p className='text-[14px] leading-5 text-red-500'>
                      {errors.numberCar.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            {/* Loại xe */}
            <div className='grid  grid-cols-1 '>
              {Array(resultNumberCar)
                .fill('')
                ?.map((elm: any, ind: number) => {
                  return (
                    <div key={ind}>
                      {getLocaleLang === 'en' ? (
                        <SelectOptionCar
                          index={ind}
                          translation={translation}
                          register={register}
                          errors={errors}
                          dataCar={FAKE_LIST_SEARCH_OPTION_CAR_EN}
                          setValue={setValue}
                          name={`carList[${ind}].car`}
                        />
                      ) : (
                        <SelectOptionCar
                          index={ind}
                          translation={translation}
                          register={register}
                          errors={errors}
                          dataCar={FAKE_LIST_SEARCH_OPTION_CAR_VI}
                          setValue={setValue}
                          name={`carList[${ind}].car`}
                        />
                      )}
                    </div>
                  );
                })}
            </div>
            {/* thuê xe */}
            <div className='mt-3 hidden'>
              <div className=' flex gap-3 items-center h-[36px]'>
                <div className='relative flex justify-center items-center'>
                  <input
                    {...register('driver')}
                    type='checkbox'
                    id='acceptDriver'
                    className='cursor-pointer rounded-[4px] border border-neutral-grey-200 w-5 h-5 appearance-none indeterminate:bg-gray-300   checked:rounded-[4px] checked:bg-[#228AD1] checked:text-[10px]'
                  />
                  <label
                    htmlFor='acceptDriver'
                    className='absolute cursor-pointer'
                  >
                    <CheckIcon />
                  </label>
                </div>
                <div>
                  <label
                    htmlFor='acceptDriver'
                    className='text-sm font-medium text-neutral-grey-700 cursor-pointer'
                  >
                    {VEHICLE.form.driverBook}{' '}
                    <span className='text-red-600'>*</span>
                  </label>
                </div>
              </div>
              {errors?.driver && (
                <p className='text-[14px] leading-5 text-red-500'>
                  {errors.driver.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className='p-4 bg-white w-full drop-shadow-xl border mt-10'>
          <button
            // disabled={!isValid}
            type='submit'
            className='mx-auto w-full flex justify-center  gap-3 py-[10px]   hover:opacity-90 duration-100 disabled:opacity-60 text-white text-base font-semibold text-center my-auto bg-primary-500 rounded-full h-[44px]'
          >
            {VEHICLE.form.save}
          </button>
        </div>
      </form>
      <FullScreenModal open={openModalStartLocation}>
        <SearchTripContent
          open={openModalStartLocation}
          title={HOME.startPlace}
          placeholder={HOME.placeholderSearchCity}
          searchRecentTitle={HOME.searchRecent}
          listLocation={city?.result}
          listSearch={FAKE_LIST_SEARCH}
          onSelect={handleUpdateValueFrom}
          onCancel={toggleModalStartLocation}
          searchLocationTitle={HOME.cityDistrict}
          notFoundText={HOME.locationNotFound}
        />
      </FullScreenModal>
      <FullScreenModal open={openModalEndLocation}>
        <SearchTripContent
          open={openModalEndLocation}
          title={HOME.endPlace}
          placeholder={HOME.placeholderSearchCity}
          searchRecentTitle={HOME.searchRecent}
          listLocation={city?.result}
          listSearch={FAKE_LIST_SEARCH}
          onSelect={handleUpdateValueTo}
          onCancel={toggleModalEndLocation}
          searchLocationTitle={HOME.cityDistrict}
          notFoundText={HOME.locationNotFound}
        />
      </FullScreenModal>

      <DrawerBottom
        open={openModalPickStartDate}
        toggleDrawer={toggleModalPickStartDate}
        wrapChildStyle=''
        childStyle='w-screen bg-white rounded-tl-2xl rounded-tr-xl animation-height'
      >
        <ModalPickDateContentRetalCar
          title={HOME.pickStartDate}
          btnTitle={BOOKING.continue}
          defaultStartDate={startDateValue}
          onSubmit={handlePickDate}
          translation={translation}
          defaultEndDate={endDateValue}
        />
      </DrawerBottom>
    </div>
  );
};

export default FullModalTourBookingContent;
