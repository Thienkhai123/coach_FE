import { IContractVehicleTranslate } from '@/interfaces/IContractVehicleTranslate';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { REGEX_CCCD, REGEX_PHONE } from '@/constant/app';
import { ITransportTranslate } from '@/interfaces/ITransportTranslate';
import { ITranslation } from '@/interfaces/ITranslation';
import AdressIcon from '@/components/icons/adress';
import CalendarIcon from '@/components/icons/calendar';
import CalendarPointIcon from '@/components/icons/calendarPoint';
import SelectOptionCity from '@/components/select-option-city';
import CheckIcon from '@/components/icons/check';
import StartPlaceSelectOption from '@/components/start-place-select-option';
import PointSelectOption from '@/components/pointSelectOption';
import useOnClickOutside from '@/hook/useClickOutside';
import CalendarPoint from '@/components/calendarPoint';
import moment from 'moment';
import { isEmpty } from 'lodash';

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
  car?: {};
}

interface IFormCarBooking {
  translation: ITranslation;
  handleOnSubmit: (data: any) => void;
  city: any;
}

const FAKE_LIST_SEARCH_OPTION_CAR_VI = [
  { id: 0, value: '' },
  { id: 1, value: 'Xe 4-5 chỗ ' },
  { id: 2, value: 'Xe 7 chỗ ' },
  { id: 3, value: 'Xe 12 chỗ ' },
  { id: 4, value: 'Xe 16 chỗ ' },
  { id: 5, value: 'Xe 20 chỗ ' },
  { id: 6, value: 'Xe 24 chỗ ' },
  { id: 7, value: 'Xe 35 chỗ ' },
];

const FAKE_LIST_SEARCH_OPTION_CAR_EN = [
  { id: 0, value: '' },
  { id: 1, value: '4-5 seater car ' },
  { id: 2, value: '7 seater car ' },
  { id: 3, value: '12 seater car ' },
  { id: 4, value: '16 seater car ' },
  { id: 5, value: '20 seater car ' },
  { id: 6, value: '24 seater car ' },
  { id: 7, value: '35 seater car ' },
];

const FAKE_LIST_SEARCH_OPTION_CITY = [
  { id: 90, value: 'An Giang ' },
  { id: 1, value: 'Bà Rịa - Vũng Tàu ' },
  { id: 2, value: 'Bạc Liêu ' },
  { id: 3, value: 'Bắc Kạn ' },
  { id: 4, value: 'Bắc Giang ' },
  { id: 5, value: 'Bắc Ninh ' },
  { id: 6, value: 'Bến Tre ' },
  { id: 7, value: 'Bình Dương ' },
  { id: 8, value: 'Bình Định ' },
  { id: 9, value: 'Bình Phước ' },
  { id: 10, value: 'Bình Thuận ' },
  { id: 11, value: 'Cà Mau ' },
  { id: 12, value: 'Cao Bằng ' },
  { id: 13, value: 'Cần Thơ ' },
  { id: 14, value: 'Đà Nẵng ' },
  { id: 15, value: 'Đắk Lắk ' },
  { id: 16, value: 'Đắk Nông ' },
  { id: 17, value: 'Đồng Nai ' },
  { id: 18, value: 'Đồng Tháp ' },
  { id: 19, value: 'Điện Biên ' },
  { id: 20, value: 'Gia Lai ' },
  { id: 21, value: 'Hà Giang ' },
  { id: 22, value: 'Hà Nam ' },
  { id: 23, value: 'Hà Nội ' },
  { id: 24, value: 'Hà Tĩnh ' },
  { id: 25, value: 'Hải Dương ' },
  { id: 26, value: 'Hải Phòng ' },
  { id: 27, value: 'Hòa Bình ' },
  { id: 28, value: 'Hậu Giang ' },
  { id: 29, value: 'Hưng Yên ' },
  { id: 30, value: 'TP. Hồ Chí Minh ' },
  { id: 31, value: 'Khánh Hòa ' },
  { id: 32, value: 'Kiên Giang ' },
  { id: 33, value: 'Kon Tum ' },
  { id: 34, value: 'Lai Châu ' },
  { id: 35, value: 'Lào Cai ' },
  { id: 36, value: 'Lạng Sơn ' },
  { id: 37, value: 'Lâm Đồng ' },
  { id: 38, value: 'Long An ' },
  { id: 39, value: 'Nam Định ' },
  { id: 40, value: 'Nghệ An ' },
  { id: 41, value: 'Ninh Bình ' },
  { id: 42, value: 'Ninh Thuận ' },
  { id: 43, value: 'Phú Thọ ' },
  { id: 44, value: 'Phú Yên ' },
  { id: 45, value: 'Quảng Bình ' },
  { id: 46, value: 'Quảng Nam ' },
  { id: 47, value: 'Quảng Ngãi ' },
  { id: 48, value: 'Quảng Ninh ' },
  { id: 49, value: 'Quảng Trị ' },
  { id: 50, value: 'Sóc Trăng ' },
  { id: 51, value: 'Sơn La ' },
  { id: 52, value: 'Tây Ninh ' },
  { id: 53, value: 'Thái Bình ' },
  { id: 54, value: 'Thái Nguyên ' },
  { id: 55, value: 'Thanh Hóa ' },
  { id: 56, value: 'Thừa Thiên - Huế ' },
  { id: 57, value: 'Tiền Giang ' },
  { id: 58, value: 'Trà Vinh ' },
  { id: 59, value: 'Tuyên Quang ' },
  { id: 60, value: 'Vĩnh Long ' },
  { id: 61, value: 'Vĩnh Phúc ' },
  { id: 62, value: 'Yên Bái ' },
  { id: 63, value: 'Long Xuyên (LONGXUYEN)' },
  { id: 64, value: 'Châu Đốc (CHAUDOC)' },
  { id: 65, value: 'Tịnh Biên ' },
  { id: 66, value: 'Tri Tôn ' },
  { id: 67, value: 'Quy Nhơn ' },
  { id: 68, value: 'An Nhơn ' },
  { id: 69, value: 'Phan Thiết ' },
  { id: 70, value: 'Năm Căn ' },
  { id: 71, value: 'Thốt Nốt ' },
  { id: 72, value: 'Buôn Ma Thuột ' },
  { id: 73, value: 'Cư Jút ' },
  { id: 74, value: 'Cao Lãnh ' },
  { id: 75, value: 'Sa Đéc ' },
  { id: 76, value: 'Hồng Ngự ' },
  { id: 77, value: 'Vị Thanh ' },
  { id: 78, value: 'Nha Trang ' },
  { id: 79, value: 'Cam Ranh ' },
  { id: 80, value: 'Ninh Hòa ' },
  { id: 81, value: 'Rạch Giá ' },
  { id: 82, value: 'Hà Tiên ' },
  { id: 83, value: 'Vĩnh Thuận ' },
  { id: 84, value: 'Đà Lạt ' },
  { id: 85, value: 'Bảo Lộc ' },
  { id: 86, value: 'Đơn Dương ' },
  { id: 87, value: 'Phan Rang-Tháp Chàm ' },
  { id: 88, value: 'Tuy Hoà ' },
  { id: 89, value: 'Đại Lộc ' },
  { id: 90, value: 'Vĩnh Châu  ' },
  { id: 91, value: 'Ngã Năm ' },
  { id: 92, value: 'Bình Minh ' },
  { id: 93, value: 'Trà Ôn ' },
  { id: 94, value: 'Phường Hộ Phòng ' },
  { id: 95, value: 'Phường Mũi Né ' },
  { id: 96, value: 'Thị Trấn Đại Ngãi ' },
];

const FormCarBooking = (props: IFormCarBooking) => {
  const { translation, handleOnSubmit, city } = props;
  const { VEHICLE, CREATEORDER, HOME } = translation;

  const pointRef = useRef(null);
  const destinationRef = useRef(null);
  const calendarRef = useRef(null);
  const [pointPopup, setPointPopup] = useState<boolean>(false);
  const [destinationPopup, setDestinationPopup] = useState<boolean>(false);
  const [calendarPopup, setCalendarPopup] = useState<boolean>(false);
  const [point, setPoint] = useState<any>('');
  const [destination, setDestination] = useState<any>('');
  const [startDate, setStartDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>(null);

  const handleOpenPopupPoint = (type = 'point') => {
    if (type === 'point') setPointPopup(true);
    if (type === 'destination') setDestinationPopup(true);
  };

  const getLocaleLang = localStorage.getItem('locale');

  const handleOpenPopupCalendar = () => {
    setCalendarPopup(true);
    // setEndDate(null);
    // setStartDate(null);
  };

  const hancdleClosePopupPoint = () => {
    setPointPopup(false);
  };

  const hancdleClosePopupDestination = () => {
    setDestinationPopup(false);
  };

  const handleClosePopupCalendar = () => {
    setCalendarPopup(false);
  };

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
    formState: { errors, isValid },
    watch,
    setValue,
    getValues,
  } = useForm<IFormValues>({
    resolver: yupResolver<IFormValues>(schema),
    mode: 'onChange',
    defaultValues: {
      numberCar: 1,
      carList: [{ car: 1 }],
    },
  });

  const numberCarArray = watch('numberCar') || '1';
  const resultNumberCar =
    typeof numberCarArray === 'string'
      ? parseInt(numberCarArray)
      : numberCarArray;

  const carArray = watch('carList') || [];

  useOnClickOutside(pointRef, hancdleClosePopupPoint);
  useOnClickOutside(destinationRef, hancdleClosePopupDestination);
  useOnClickOutside(calendarRef, handleClosePopupCalendar);

  useEffect(() => {
    setValue('point', point);
    hancdleClosePopupPoint();
  }, [point, setValue]);

  useEffect(() => {
    const car: any = { car: '' };
    setValue('carList', Array(resultNumberCar).fill(car));
  }, [watch('numberCar')]);

  useEffect(() => {
    setValue('destination', destination);
    hancdleClosePopupDestination();
  }, [destination, setValue]);

  useEffect(() => {
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

    if (endDate !== null && startDate !== null) {
      handleClosePopupCalendar();
    }
  }, [startDate, endDate]);

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <div className='bg-white rounded-xl p-6 flex flex-col gap-6'>
        <div>
          <div className='uppercase w-fit py-[3px] px-3 text-xs text-neutral-600 font-extrabold bg-[#DEF5E0] rounded-full'>
            {VEHICLE.form.connect}
          </div>
          <div className='grid grid-cols-2 gap-3 mt-2'>
            <div>
              <p className=' text-sm font-semibold text-neutral-grey-700'>
                {VEHICLE.form.fullName} <span className='text-red-600'>*</span>
              </p>
              <div className='mt-1'>
                <input
                  {...register('fullName')}
                  autoFocus
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
              <p className=' text-sm font-semibold text-neutral-grey-700'>
                {VEHICLE.form.phone} <span className='text-red-600'>*</span>
              </p>
              <div className='mt-1'>
                <input
                  {...register('phone')}
                  autoFocus
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
        <div>
          <div className=' uppercase w-fit py-[3px] px-3 text-xs text-neutral-600 font-extrabold bg-[#DEF5E0] rounded-full'>
            {VEHICLE.form.inforOrder}
          </div>
          <div className='grid grid-cols-2 gap-3 mt-2'>
            <div>
              <p className=' text-sm font-semibold text-neutral-grey-700'>
                {VEHICLE.form.pointBook} <span className='text-red-600'>*</span>
              </p>
              <div className='mt-1'>
                <div
                  className={`rounded-lg border flex justify-between gap-3 border-neutral-grey-300 py-2 px-3 outline-none text-sm font-medium w-full`}
                >
                  <div
                    onClick={() => {
                      handleOpenPopupPoint();
                    }}
                    className=' relative'
                  >
                    <input
                      {...register('point')}
                      autoFocus
                      className='outline-none text-sm font-medium w-full disabled:bg-neutral-100'
                      placeholder={VEHICLE.form.placeholderPointBook}
                    />
                    {pointPopup && (
                      <div
                        ref={pointRef}
                        className={`absolute z-10 -left-[14px] top-[36px] duration-200 `}
                      >
                        <PointSelectOption
                          point={point}
                          setPoint={setPoint}
                          VEHICLE={VEHICLE}
                          FAKE_LIST_SEARCH_OPTION_CITY={city}
                        />
                      </div>
                    )}
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
              <p className=' text-sm font-semibold text-neutral-grey-700'>
                {VEHICLE.form.destinationBook}{' '}
                <span className='text-red-600'>*</span>
              </p>
              <div className='mt-1'>
                <div
                  className={`rounded-lg border flex justify-between gap-3 border-neutral-grey-300 py-2 px-3 outline-none text-sm font-medium w-full`}
                >
                  <div
                    onClick={() => {
                      handleOpenPopupPoint('destination');
                    }}
                    className='w-full relative'
                  >
                    <input
                      {...register('destination')}
                      autoFocus
                      className='outline-none text-sm font-medium w-full disabled:bg-neutral-100'
                      placeholder={VEHICLE.form.placeholderPointBook2}
                    />
                    {destinationPopup && (
                      <div
                        ref={destinationRef}
                        className={`absolute z-10 -left-[14px] top-[36px] duration-200 `}
                      >
                        <PointSelectOption
                          point={destination}
                          setPoint={setDestination}
                          VEHICLE={VEHICLE}
                          FAKE_LIST_SEARCH_OPTION_CITY={city}
                        />
                      </div>
                    )}
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
          </div>
          <div className='mt-3'>
            <p className=' text-sm font-semibold text-neutral-grey-700'>
              {VEHICLE.form.time} <span className='text-red-600'>*</span>
            </p>
            <div className='mt-1'>
              <div className='relative'>
                <div
                  onClick={() => {
                    handleOpenPopupCalendar();
                  }}
                  className={`rounded-lg border flex justify-between gap-3 border-neutral-grey-300 py-2 px-3 outline-none text-sm font-medium w-full`}
                >
                  <div className='w-full'>
                    <input
                      {...register('timeDay')}
                      autoFocus
                      // value={
                      //   endDate !== null
                      //     ? `${moment(startDate).format('DD')} ${
                      //         translation.VEHICLE.months
                      //       } ${moment(startDate).format('MMM')} - ${moment(
                      //         endDate,
                      //       ).format('DD')} ${
                      //         translation.VEHICLE.months
                      //       } ${moment(endDate).format('MM')}`
                      //     : ''
                      // }
                      // value={
                      //   endDate !== null
                      //     ? `${moment(startDate).format('DD')}  ${moment(
                      //         startDate,
                      //       ).format('MMM')} - ${moment(endDate).format(
                      //         'DD',
                      //       )}  ${moment(endDate).format('MM')}`
                      //     : ''
                      // }
                      className='outline-none text-sm font-medium w-full disabled:bg-neutral-100'
                      placeholder={VEHICLE.form.placeholderTime}
                    />
                  </div>
                  <div className=' cursor-pointer'>
                    <CalendarPointIcon />
                  </div>
                </div>
                {calendarPopup && (
                  <div
                    ref={calendarRef}
                    className='absolute left-0 top-[44px] z-10'
                  >
                    <CalendarPoint
                      translation={translation}
                      startDate={startDate}
                      setStartDate={setStartDate}
                      endDate={endDate}
                      setEndDate={setEndDate}
                    />
                  </div>
                )}
              </div>
              {errors?.timeDay && (
                <p className='text-[14px] leading-5 text-red-500'>
                  {errors?.timeDay.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <div>
          <div className=' uppercase w-fit py-[3px] px-3 text-xs text-neutral-600 font-extrabold bg-[#DEF5E0] rounded-full'>
            {VEHICLE.form.inforCar}
          </div>
          {/* Số lượng xe */}
          <div className='mt-3'>
            <p className=' text-sm font-semibold text-neutral-grey-700'>
              {VEHICLE.form.numberCarBook}{' '}
              <span className='text-red-600'>*</span>
            </p>
            <div className='mt-1'>
              <input
                {...register('numberCar')}
                autoFocus
                min={1}
                defaultValue={1}
                className='rounded-lg border border-neutral-grey-300 py-2 px-3 outline-none text-sm font-medium w-full'
                // placeholder={VEHICLE.form.placeholderFullName}
              />
              {errors?.numberCar && (
                <p className='text-[14px] leading-5 text-red-500'>
                  {errors.numberCar.message}
                </p>
              )}
            </div>
          </div>
          {/* Loại xe */}
          <div className='grid  grid-cols-2 gap-2'>
            {Array(resultNumberCar)
              .fill('')
              ?.map((elm: any, ind: number) => {
                return (
                  <div
                    key={ind}
                    className={`mt-3   ${
                      resultNumberCar % 2 !== 0
                        ? 'last:col-span-2'
                        : 'col-span-1'
                    }`}
                  >
                    <p className='text-sm font-semibold text-neutral-grey-700'>
                      {VEHICLE.form.typeCar} {ind + 1}{' '}
                      <span className='text-red-600'>*</span>
                    </p>
                    <div className='mt-1'>
                      <div className='mt-1'>
                        {getLocaleLang === 'en' ? (
                          <SelectOptionCity
                            register={register}
                            FAKE_LIST_SEARCH_OPTION={
                              FAKE_LIST_SEARCH_OPTION_CAR_EN
                            }
                            name={`carList[${ind}].car`}
                            activeIcon={false}
                          />
                        ) : (
                          <SelectOptionCity
                            register={register}
                            FAKE_LIST_SEARCH_OPTION={
                              FAKE_LIST_SEARCH_OPTION_CAR_VI
                            }
                            name={`carList[${ind}].car`}
                            activeIcon={false}
                          />
                        )}
                        {errors?.carList?.[ind]?.car && (
                          <p className='text-[14px] leading-5 text-red-500'>
                            {errors?.carList?.[ind]?.car?.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          {/* thuê xe */}
          <div className='mt-2 hidden'>
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
      <div className=' mt-5'>
        <button
          disabled={!isValid}
          type='submit'
          className='mx-auto w-[320px] flex justify-center  gap-3 py-[10px]   hover:opacity-90 duration-100 disabled:opacity-60 text-white text-base font-semibold text-center my-auto bg-primary-500 rounded-full h-[44px]'
        >
          {VEHICLE.form.save}
        </button>
      </div>
    </form>
  );
};

export default FormCarBooking;
