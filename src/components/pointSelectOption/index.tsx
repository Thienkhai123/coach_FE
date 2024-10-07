import { IContractVehicleTranslate } from '@/interfaces/IContractVehicleTranslate';
import React, { useRef, useState } from 'react';
import SearchAddress from '../icons/searchAddress';
import HistoryAddressIcon from '../icons/historyAddress';
import AdressIcon from '../icons/adress';
import { isEmpty } from 'lodash';
import useOnClickOutside from '@/hook/useClickOutside';

interface IPointSelectOption {
  VEHICLE: IContractVehicleTranslate;
  FAKE_LIST_SEARCH_OPTION_CITY: any;
  ref?: any;
  setPoint?: any;
  point?: {
    pointBooking: string;
    destinationBooking: string;
  };
  placeholderInput?: string;
  nameStorage?: string;
}

const PointSelectOption = (props: IPointSelectOption) => {
  const {
    VEHICLE,
    FAKE_LIST_SEARCH_OPTION_CITY,
    setPoint,
    point,
    placeholderInput = VEHICLE.form.placeholderPointBook,
    nameStorage = 'historyCity',
  } = props;
  const historyStotage = localStorage.getItem(nameStorage);
  const [cities, setCities] = useState<any>(FAKE_LIST_SEARCH_OPTION_CITY);
  const [historyCity, sethistoryCity] = useState<any>(
    JSON.parse(historyStotage !== null ? historyStotage : '[]'),
  );

  const onchangeCity = (e: any) => {
    const key = e.target.value;
    if (!isEmpty(key.trim())) {
      const fillter_city = FAKE_LIST_SEARCH_OPTION_CITY?.filter((elm: any) =>
        elm.value.toLowerCase().includes(key.toLowerCase()),
      );
      setCities(fillter_city);
    } else {
      setCities(FAKE_LIST_SEARCH_OPTION_CITY);
    }
  };

  const handleChooseCity = (value: any) => {
    const inclue = historyCity.includes(value);
    if (!inclue) {
      const historyOld = [...historyCity, value];
      sethistoryCity(historyOld);
      localStorage.setItem(nameStorage, JSON.stringify(historyOld));
    }
    setPoint(value);
  };

  return (
    <div className='bg-white  rounded-lg border border-neutral-200 w-[375px] shadow'>
      <div className='p-4 border-b border-neutral-200 flex gap-4 items-center'>
        <div>
          <SearchAddress />
        </div>
        <div>
          <input
            onChange={(e) => onchangeCity(e)}
            className='outline-none text-black placeholder:text-neutral-500 text-sm font-medium w-full disabled:bg-neutral-100'
            placeholder={placeholderInput}
          />
        </div>
      </div>
      <div className='p-4 border-t border-b border-neutral-200'>
        <div className=' flex gap-1 items-center'>
          <div>
            <HistoryAddressIcon />
          </div>
          <div className='text-sm text-black font-semibold'>
            {VEHICLE.form.history}
          </div>
        </div>
        <div className='mt-4 flex gap-2 flex-wrap max-h-[342px] overflow-hidden'>
          {historyCity
            .reverse()
            ?.slice(0, 6)
            ?.map((elm: any, ind: number) => {
              return (
                <div
                  key={ind}
                  onClick={() => handleChooseCity(elm)}
                  className='cursor-pointer px-[10px] py-[3px] rounded-full text-neutral-600  text-sm font-semibold bg-[#ECECEC] line-clamp-1'
                >
                  {elm}
                </div>
              );
            })}
        </div>
      </div>
      <div className='py-4 border-t border-b border-neutral-200 h-[220px] overflow-y-scroll custom-scrollbar-none-border'>
        <div className='px-4 flex gap-1 items-center'>
          <div>
            <AdressIcon />
          </div>
          <div className='text-sm text-black font-semibold'>
            {VEHICLE.form.cityOption}
          </div>
        </div>
        <div>
          {cities?.map((elm: any, ind: number) => {
            return (
              <div key={ind}>
                <div
                  onClick={() => handleChooseCity(elm?.value)}
                  className=' py-[10px] cursor-pointer border-b border-[#ECECEC] '
                >
                  <p className='text-sm font-normal px-4 line-clamp-2'>
                    {elm.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PointSelectOption;
