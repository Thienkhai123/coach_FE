import React, { useState } from 'react';
import MapIcon from '../icons/map';

interface ISelectOptionCity {
  FAKE_LIST_SEARCH_OPTION: any;
  register?: any;
  errors?: any;
  name: string;
  activeIcon?: boolean;
  styleStatus?: any;
  selectSettingType?: number;
  placeholderUnit?: any;
}

interface ISelectOptionDefaultProps {
  register?: any;
  errors?: any;
  name: string;
  data?: any;
  activeIcon?: boolean;
  styleStatus?: any;
}

interface ISelectOptionCustomProps {
  register?: any;
  errors?: any;
  name: string;
  data?: any;
  activeIcon?: boolean;
  styleStatus?: any;
  placeholderUnit?: string;
}

const styleObject: any = {
  default: {},
  noArrow: {
    ' -webkit-appearance': 'none',
    '-moz-appearance': 'none',
    appearance: 'none',
    background: 'none',
    padding: '0px 4px',
  },
};

const SelectOptionDefault = (props: ISelectOptionDefaultProps) => {
  const {
    register,
    name,
    activeIcon = true,
    styleStatus = 'default',
    data,
  } = props;
  return (
    <div className='flex gap-3 items-center bg-white border border-neutral-grey-300 rounded-lg p-[7.5px_8px_7.5px_12px] h-[36px]'>
      {activeIcon && (
        <div className='opacity-70'>
          <MapIcon />
        </div>
      )}
      <select
        {...register(name)}
        autoFocus
        id={`${name}`}
        className='cursor-pointer custom-scrollbar-none-border text-gray-900 text-[14px] selection:bg-red-500 focus:outline-none  w-full p-0 placeholder:text-neutral-grey-500 line-clamp-1'
        style={styleObject[styleStatus]}
      >
        {data?.map((elm: any, ind: number) => {
          return (
            <option
              key={ind}
              className='w-full py-2 first:text-neutral-500 first:hidden cursor-pointer'
              value={elm?.id === 0 ? '' : elm?.value}
            >
              {elm?.value}
            </option>
          );
        })}
      </select>
    </div>
  );
};

const SelectOptionCustom = (props: ISelectOptionCustomProps) => {
  const {
    register,
    name,
    activeIcon = true,
    styleStatus = 'default',
    data,
    placeholderUnit,
  } = props;
  return (
    <div className='flex gap-3 items-center bg-white border border-neutral-grey-300 rounded-lg p-[7.5px_8px_7.5px_12px] h-[36px]'>
      {activeIcon && (
        <div className='opacity-70'>
          <MapIcon />
        </div>
      )}
      <select
        {...register(name)}
        autoFocus
        id={`${name}`}
        className='cursor-pointer custom-scrollbar-none-border text-gray-900 text-[14px] selection:bg-red-500 focus:outline-none  w-full p-0 placeholder:text-neutral-grey-500 line-clamp-1'
        style={styleObject[styleStatus]}
      >
        {data?.map((elm: any, ind: number) => {
          return (
            <option
              key={ind}
              className='w-full py-2 first:text-neutral-500 first:hidden cursor-pointer'
              value={elm?.id === 0 ? '' : elm?.value}
            >
              {elm?.value}
            </option>
          );
        })}
      </select>
      <div className='max-w-fit text-sm font-medium text-neutral-400 w-full'>
        {placeholderUnit}
      </div>
    </div>
  );
};

const SelectOptionCity = (props: ISelectOptionCity) => {
  const {
    FAKE_LIST_SEARCH_OPTION,
    register,
    name,
    activeIcon = true,
    styleStatus = 'default',
    selectSettingType = 0, // 0: default, 1: custom
    placeholderUnit,
  } = props;

  switch (selectSettingType) {
    case 0:
      return (
        <SelectOptionDefault
          data={FAKE_LIST_SEARCH_OPTION}
          name={name}
          register={register}
          activeIcon={activeIcon}
          styleStatus={styleStatus}
        />
      );
    case 1:
      return (
        <SelectOptionCustom
          data={FAKE_LIST_SEARCH_OPTION}
          name={name}
          register={register}
          activeIcon={activeIcon}
          styleStatus={styleStatus}
          placeholderUnit={placeholderUnit}
        />
      );
    default:
      break;
  }
};

export default SelectOptionCity;
