import { ITranslation } from '@/interfaces/ITranslation';
import React, { useRef, useState } from 'react';
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import { vi } from 'date-fns/locale/vi';
import ArrowLeftCalendarIcon from '../icons/arrowLeftCalendar';
import ArrowRightCalendarIcon from '../icons/arrowRightCalendar';
import { useCustomToast } from '@/hook/useToast';

registerLocale('vi', vi);

interface ICalendarPoint {
  translation: ITranslation;
  startDate: any;
  setStartDate: any;
  endDate: any;
  setEndDate: any;
}

const CalendarPoint = (props: ICalendarPoint) => {
  const { translation, startDate, setStartDate, endDate, setEndDate } = props;
  const { VEHICLE } = translation;

  const [month_Year, setMonth_Year] = useState(new Date());
  const [state, setState] = useState(new Date());
  const { toastError } = useCustomToast();
  const getLocaleLang: any = localStorage.getItem('locale');

  const datePickerRef = useRef<any>(null);

  const onChange = (dates: any) => {
    const [start, end] = dates;
    const dateStartPoint = new Date(start).setHours(0, 0, 0, 0);
    const dateEndPoint = new Date(end).setHours(0, 0, 0, 0);
    const dateNow = new Date().setHours(0, 0, 0, 0);
    if (dateStartPoint >= dateNow && dateEndPoint >= dateEndPoint) {
      setStartDate(start);
      setEndDate(end);
    } else {
      toastError({
        message: VEHICLE.toastDate,
        toastId: 'validate-seats-failed',
      });
    }
  };

  const handlePreviousMonth = () => {
    if (datePickerRef.current) {
      const newDate = new Date(state);
      newDate.setMonth(newDate.getMonth() - 1);
      setState(newDate);
    }
  };

  const handleNextMonth = () => {
    if (datePickerRef.current) {
      const newDate = new Date(state);
      newDate.setMonth(newDate.getMonth() + 1);
      setState(newDate);
    }
  };

  return (
    <div className='min-w-[375px] rounded-xl border border-neutral-200 shadow'>
      <div className='rounded-t-xl bg-[#ECECEC] py-3 px-4 text-center text-base font-semibold text-neutral-700'>
        {VEHICLE.calendar}
      </div>
      <div className='rounded-b-xl bg-white py-3 px-4'>
        <div className='flex justify-between items-center'>
          <div className='cursor-pointer' onClick={handlePreviousMonth}>
            <ArrowLeftCalendarIcon />
          </div>
          <div className='text-base font-semibold text-neutral-700 text-center'>
            {month_Year.toLocaleString(
              getLocaleLang !== null ? getLocaleLang : 'vi',
              { month: 'long' },
            )}
            , {month_Year.getFullYear()}
          </div>
          <div className='cursor-pointer' onClick={handleNextMonth}>
            <ArrowRightCalendarIcon />
          </div>
        </div>
        <div className='mt-3 flex justify-between items-center'>
          <div className='w-[159px] px-3 py-2 rounded-lg border border-neutral-300'>
            <input
              className='focus:outline-none w-full text-center text-sm font-medium'
              placeholder={VEHICLE.stateDate}
              value={
                startDate !== null
                  ? startDate.toLocaleString(
                      getLocaleLang !== null ? getLocaleLang : 'vi',
                      {
                        day: 'numeric',
                        month: 'numeric',
                        year: 'numeric',
                      },
                    )
                  : ''
              }
            />
          </div>
          <div className='text-base font-normal text-neutral-700'>-</div>
          <div className='w-[159px] px-3 py-2 rounded-lg border border-neutral-300'>
            <input
              className='focus:outline-none w-full text-center text-sm font-medium'
              placeholder={VEHICLE.stateDate}
              value={
                endDate !== null
                  ? endDate.toLocaleString(
                      getLocaleLang !== null ? getLocaleLang : 'vi',
                      {
                        day: 'numeric',
                        month: 'numeric',
                        year: 'numeric',
                      },
                    )
                  : ''
              }
            />
          </div>
        </div>
        <div className='w-full flex justify-center mt-3 '>
          <DatePicker
            selected={state}
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            calendarClassName=' border-none bg-white text-neutral-700 focus:text-[#505462] focus:bg-black'
            selectsRange
            inline
            ref={datePickerRef}
            className='w-full'
            dayClassName={(date) => {
              const dateToCheck = new Date(date).setHours(0, 0, 0, 0);
              const today = new Date().setHours(0, 0, 0, 0);
              const startDayCheck =
                startDate !== null ? startDate.setHours(0, 0, 0, 0) : 0;
              const endDayCheck =
                endDate !== null ? endDate.setHours(0, 0, 0, 0) : 0;

              if (dateToCheck < today) {
                return 'rounded-full   bg-white text-neutral-400 hover:rounded-full w-10 h-10 text-sm text-center  pt-[10px] cursor-default';
              } else {
                if (dateToCheck === startDayCheck) {
                  return 'bg-[#0273BC] hover:opacity-60 duration-100 text-white hover:text-white rounded-full hover:rounded-full w-10 h-10 text-sm text-center  pt-[10px]';
                } else if (dateToCheck === endDayCheck) {
                  return 'bg-[#0273BC] hover:opacity-60 duration-100 text-white hover:text-white  rounded-full hover:rounded-full w-10 h-10 text-sm text-center pt-[10px]';
                } else if (
                  dateToCheck > startDayCheck &&
                  dateToCheck < endDayCheck
                ) {
                  return 'bg-[#DFF0FB]  text-[#101F24] hover:opacity-60 hover:opacity-80 duration-100 rounded-full hover:rounded-full hover:text-white w-10 h-10 text-sm text-center pt-[10px]';
                }
                return 'rounded-full hover:bg-[#ECECEC]  bg-white text-neutral-700 hover:rounded-full w-10 h-10 text-sm text-center  pt-[10px]';
              }
            }}
            weekDayClassName={() => {
              return ' text-sm text-neutral-700 w-10 h-10 text-sm text-center  pt-[10px]';
            }}
            renderCustomHeader={({ date }) => {
              setMonth_Year(date);
              return <div className='hidden'></div>;
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarPoint;
