import React, { FC, useEffect, useRef, useState } from 'react';
import { ICreateOrderTranslate } from '@/interfaces/ICreateOrderTranslate';
import CheckIcon from '@/components/icons/check';
import SelectOptionCity from '@/components/select-option-city';
import { convertCurrency } from '@/helpers/functionHelper';
import useTrans from '@/hook/useTrans';
import PointSelectOption from '@/components/pointSelectOption';
import { AdressIcon } from '@/components/icons';
import useOnClickOutside from '@/hook/useClickOutside';

interface IAdressSendReceiveForm {
  CREATEORDER: ICreateOrderTranslate;
  register?: any;
  errors?: any;
  collectorStatus?: boolean;
  handleAddProduct?: (data: any) => void;
  moneyCollector?: string;
  city: any;
  adress: any;
  point?: any;
  setPoint?: any;
  destination?: any;
  setDestination?: any;
  setValue: any;
}

const FAKE_LIST_SEARCH_OPTION = [
  { id: 0, value: 'Chọn thành phố' },
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

const FAKE_LIST_ADDRESS_SEND = [
  { id: 0, value: 'Chọn điểm gửi' },
  { id: 1, value: '21 đường số 6' },
  { id: 2, value: '25 đường số 5' },
];

const FAKE_LIST_ADDRESS_RECEIVE = [
  { id: 0, value: 'Chọn điểm nhận' },
  { id: 1, value: '21 đường số 6' },
  { id: 2, value: '25 đường số 5' },
];

const AdressSendReceiveForm: FC<IAdressSendReceiveForm> = (props) => {
  const {
    CREATEORDER,
    register,
    errors,
    collectorStatus,
    moneyCollector,
    city,
    adress,
    setValue,
  } = props;

  const trans = useTrans();
  const { VEHICLE, HOME } = trans;

  const pointRef = useRef(null);
  const destinationRef = useRef(null);
  const addressPointRef = useRef(null);
  const addressDestinationRef = useRef(null);

  const [pointPopup, setPointPopup] = useState<boolean>(false);
  const [destinationPopup, setDestinationPopup] = useState<boolean>(false);
  const [addressPointPopup, setAddressPointPopup] = useState<boolean>(false);
  const [addressDestinationPopup, setAddressDestinationPopup] =
    useState<boolean>(false);

  const [point, setPoint] = useState<any>('');
  const [destination, setDestination] = useState<any>('');
  const [addressPoint, setAddressPoint] = useState<any>('');
  const [addressDestination, setAddressDestination] = useState<any>('');

  const handleOpenPopupPoint = (type = 'point') => {
    if (type === 'point') setPointPopup(true);
    if (type === 'destination') setDestinationPopup(true);
  };

  const handleOpenAddressPopupPoint = (type = 'addressPoint') => {
    if (type === 'addressPoint') setAddressPointPopup(true);
    if (type === 'addressDestination') setAddressDestinationPopup(true);
  };

  const hancdleClosePopupPoint = () => {
    setPointPopup(false);
    setAddressPointPopup(false);
    setDestinationPopup(false);
    setAddressDestinationPopup(false);
  };

  useEffect(() => {
    setValue('citySend', point);
    setValue('adressSend', '');
    setAddressPoint('');
    hancdleClosePopupPoint();
  }, [point, setValue]);

  useEffect(() => {
    setValue('adressSend', addressPoint);
    hancdleClosePopupPoint();
  }, [addressPoint, setValue]);

  useEffect(() => {
    setValue('cityReceive', destination);
    setValue('adressReceive', '');
    setAddressDestination('');
    hancdleClosePopupPoint();
  }, [destination, setValue]);

  useEffect(() => {
    setValue('adressReceive', addressDestination);
    hancdleClosePopupPoint();
  }, [addressDestination, setValue]);

  useOnClickOutside(pointRef, hancdleClosePopupPoint);
  useOnClickOutside(addressPointRef, hancdleClosePopupPoint);
  useOnClickOutside(destinationRef, hancdleClosePopupPoint);
  useOnClickOutside(addressDestinationRef, hancdleClosePopupPoint);

  return (
    <div className='bg-white p-6 rounded-xl'>
      <div className='font-bold text-base text-neutral-grey-700 '>
        {CREATEORDER.informationProductSendReceive.adressSendReceive}
      </div>
      <div className='mt-4 flex flex-col gap-3'>
        <div className='grid grid-cols-2 gap-3 w-full'>
          <div className='w-full'>
            <p className=' text-sm font-semibold text-neutral-grey-700'>
              {CREATEORDER.informationProductSendReceive.citySend}{' '}
              <span className='text-red-600'>*</span>
            </p>
            <div className='mt-1'>
              {/* <SelectOptionCity
                register={register}
                FAKE_LIST_SEARCH_OPTION={city}
                name='citySend'
              /> */}
              <div
                className={`rounded-lg border cursor-pointer flex justify-between gap-3 border-neutral-grey-300 py-2 px-3 outline-none text-sm font-medium w-full`}
              >
                <div
                  onClick={() => {
                    handleOpenPopupPoint();
                  }}
                  className=' relative'
                >
                  <input
                    {...register('citySend')}
                    autoFocus
                    value={point}
                    className='pointer-events-none  outline-none text-sm font-medium w-full disabled:bg-neutral-100'
                    placeholder={
                      CREATEORDER.informationProductSendReceive
                        .placeholderCitySend
                    }
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
                        placeholderInput={HOME.placeholderStart}
                      />
                    </div>
                  )}
                </div>
                <div>
                  <AdressIcon />
                </div>
              </div>
              {errors?.citySend && (
                <p className='text-[14px] leading-5 text-red-500'>
                  {errors?.citySend?.message}
                </p>
              )}
            </div>
          </div>
          <div className='w-full'>
            <p className=' text-sm font-semibold text-neutral-grey-700'>
              {CREATEORDER.informationProductSendReceive.adressSend}{' '}
              <span className='text-red-600'>*</span>
            </p>
            <div className='mt-1'>
              {/* <SelectOptionCity
                register={register}
                FAKE_LIST_SEARCH_OPTION={adress?.adressSends}
                name='adressSend'
                activeIcon={false}
              /> */}
              <div
                className={`rounded-lg border cursor-pointer flex justify-between gap-3 border-neutral-grey-300 py-2 px-3 outline-none text-sm font-medium w-full`}
              >
                <div
                  onClick={() => {
                    handleOpenAddressPopupPoint();
                  }}
                  className=' relative w-full'
                >
                  <input
                    {...register('adressSend')}
                    autoFocus
                    className='pointer-events-none outline-none text-sm font-medium w-full disabled:bg-neutral-100'
                    placeholder={
                      CREATEORDER.informationProductSendReceive
                        .placeholderAdressSend
                    }
                  />
                  {addressPointPopup && (
                    <div
                      ref={addressPointRef}
                      className={`absolute z-10 -left-[14px] top-[36px] duration-200 `}
                    >
                      <PointSelectOption
                        nameStorage='addressPointStorages'
                        point={addressPoint}
                        setPoint={setAddressPoint}
                        VEHICLE={VEHICLE}
                        FAKE_LIST_SEARCH_OPTION_CITY={adress?.adressSends}
                        placeholderInput={HOME.placeholderStart}
                      />
                    </div>
                  )}
                </div>
              </div>
              {errors?.adressSend && (
                <p className='text-[14px] leading-5 text-red-500'>
                  {errors?.adressSend?.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className='grid grid-cols-2 gap-3 w-full'>
          <div className='w-full'>
            <p className=' text-sm font-semibold text-neutral-grey-700'>
              {CREATEORDER.informationProductSendReceive.cityReceive}{' '}
              <span className='text-red-600'>*</span>
            </p>
            <div className='mt-1'>
              {/* <SelectOptionCity
                register={register}
                FAKE_LIST_SEARCH_OPTION={city}
                name='cityReceive'
              /> */}
              <div
                className={`rounded-lg border cursor-pointer flex justify-between gap-3 border-neutral-grey-300 py-2 px-3 outline-none text-sm font-medium w-full`}
              >
                <div
                  onClick={() => {
                    handleOpenPopupPoint('destination');
                  }}
                  className=' relative w-full'
                >
                  <input
                    {...register('cityReceive')}
                    autoFocus
                    value={destination}
                    className='pointer-events-none outline-none text-sm font-medium w-full disabled:bg-neutral-100'
                    placeholder={
                      CREATEORDER.informationProductSendReceive
                        .placeholderCityReceive
                    }
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
                        placeholderInput={
                          trans.CREATEORDER?.informationProductSendReceive
                            ?.placeholderAdressReceive
                        }
                      />
                    </div>
                  )}
                </div>
                <div>
                  <AdressIcon />
                </div>
              </div>
              {errors?.cityReceive && (
                <p className='text-[14px] leading-5 text-red-500'>
                  {errors?.cityReceive?.message}
                </p>
              )}
            </div>
          </div>
          <div className='w-full'>
            <p className=' text-sm font-semibold text-neutral-grey-700'>
              {CREATEORDER.informationProductSendReceive.addressReceive}{' '}
              <span className='text-red-600'>*</span>
            </p>
            <div className='mt-1'>
              {/* <SelectOptionCity
                register={register}
                FAKE_LIST_SEARCH_OPTION={adress?.adressReceives}
                name='adressReceive'
                activeIcon={false}
              /> */}
              <div
                className={`rounded-lg border cursor-pointer flex justify-between gap-3 border-neutral-grey-300 py-2 px-3 outline-none text-sm font-medium w-full`}
              >
                <div
                  onClick={() => {
                    handleOpenAddressPopupPoint('addressDestination');
                  }}
                  className=' relative w-full'
                >
                  <input
                    {...register('adressReceive')}
                    autoFocus
                    className='pointer-events-none outline-none text-sm font-medium w-full disabled:bg-neutral-100'
                    placeholder={
                      CREATEORDER.informationProductSendReceive
                        .placeholderAdressReceive
                    }
                  />
                  {addressDestinationPopup && (
                    <div
                      ref={addressDestinationRef}
                      className={`absolute z-10 -left-[14px] top-[36px] duration-200 `}
                    >
                      <PointSelectOption
                        nameStorage='addressDestinationStorages'
                        point={addressDestination}
                        setPoint={setAddressDestination}
                        VEHICLE={VEHICLE}
                        FAKE_LIST_SEARCH_OPTION_CITY={adress?.adressReceives}
                        placeholderInput={
                          trans.CREATEORDER?.informationProductSendReceive
                            ?.placeholderAdressReceive
                        }
                      />
                    </div>
                  )}
                </div>
              </div>
              {errors?.adressReceive && (
                <p className='text-[14px] leading-5 text-red-500'>
                  {errors?.adressReceive?.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <div>
            <div className='mt-1 flex gap-3 items-center h-[36px]'>
              <div className='relative flex justify-center items-center'>
                <input
                  {...register('collector')}
                  type='checkbox'
                  id='accept'
                  className='cursor-pointer rounded-[4px] border border-neutral-grey-200 w-5 h-5 appearance-none indeterminate:bg-gray-300   checked:rounded-[4px] checked:bg-[#228AD1] checked:text-[10px]'
                />
                <label htmlFor='accept' className='absolute cursor-pointer'>
                  <CheckIcon />
                </label>
              </div>
              <div>
                <label
                  htmlFor='accept'
                  className='text-sm font-medium text-neutral-grey-700 cursor-pointer'
                >
                  {CREATEORDER.informationProductSendReceive.requestCollector}
                </label>
              </div>
            </div>
            <div className='mt-1'>
              <div
                className={`rounded-lg border flex justify-between border-neutral-grey-300 py-2 px-3 ${
                  !collectorStatus ? 'bg-neutral-100' : 'bg-inherit'
                }`}
              >
                <input
                  {...register('moneyCollector')}
                  disabled={!collectorStatus}
                  className='outline-none text-sm font-medium w-full disabled:bg-neutral-100'
                  placeholder={
                    CREATEORDER.informationProductSendReceive.moneyCollector
                  }
                />
                <div className='text-sm font-medium text-neutral-400'>
                  {CREATEORDER.informationProductSendReceive.currency}
                </div>
              </div>
              {errors?.moneyCollector && (
                <p className='text-[14px] leading-5 text-red-500'>
                  {errors?.moneyCollector?.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <p className=' text-sm font-semibold text-neutral-grey-700'>
              {CREATEORDER.informationProductSendReceive.prepaid}{' '}
              <span className='text-red-600'>*</span>
            </p>
            <div className='grid grid-cols-2 mt-[14px]'>
              <div className='flex gap-3'>
                <input
                  id='personSendInput'
                  autoFocus
                  type='radio'
                  name='prepaid'
                  value='person_send'
                  {...register('personSendReceive')}
                  className="relative text-xl h-5 w-5 flex justify-center items-center  cursor-pointer rounded-full appearance-none bg-white border border-neutral-500 checked:border-[#228AD1] checked:after:bg-[#228AD1] checked:after:content-[''] checked:after:w-[12px] checked:after:h-[12px] checked:after:absolute checked:after:rounded-full"
                />
                <label
                  htmlFor='personSendInput'
                  className='text-sm font-medium cursor-pointer'
                >
                  {CREATEORDER.informationProductSendReceive.personSend}
                </label>
              </div>
              <div className='flex gap-3'>
                <input
                  id='personReceiveInput'
                  autoFocus
                  type='radio'
                  name='prepaid'
                  value='person_receive'
                  {...register('personSendReceive')}
                  className="relative text-xl h-5 w-5 flex justify-center items-center  cursor-pointer rounded-full appearance-none bg-white border border-neutral-500 checked:border-[#228AD1] checked:after:bg-[#228AD1] checked:after:content-[''] checked:after:w-[12px] checked:after:h-[12px] checked:after:absolute checked:after:rounded-full"
                />
                <label
                  htmlFor='personReceiveInput'
                  className='text-sm font-medium cursor-pointer'
                >
                  {CREATEORDER.informationProductSendReceive.personReceive}
                </label>
              </div>
              {errors?.personSendReceive && (
                <p className='text-[14px] leading-5 text-red-500'>
                  {errors?.collectorStatus?.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdressSendReceiveForm;
