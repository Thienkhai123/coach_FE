import Button from '@/components/button';
import React, { useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import { vi } from 'date-fns/locale';
import ArrowLeftCalendarIcon from '@/components/icons/arrowLeftCalendar';
import ArrowRightCalendarIcon from '@/components/icons/arrowRightCalendar';
import { ITranslation } from '@/interfaces/ITranslation';
import { useCustomToast } from '@/hook/useToast';

interface IModalPickDateContentRetalCarProps {
  title?: string;
  btnTitle?: string;
  minDate?: Date | null;
  defaultStartDate?: any | null;
  defaultEndDate?: any | null;
  onSubmit: (startDate: Date | null, endDate: Date | null) => void;
  translation: ITranslation;
}

const ModalPickDateContentRetalCar = (
  props: IModalPickDateContentRetalCarProps,
) => {
  const {
    title,
    btnTitle,
    minDate,
    defaultStartDate = new Date(),
    onSubmit,
    defaultEndDate,
    translation,
  } = props;
  const { VEHICLE } = translation;
  const [startDate, setStartDate] = useState<any | null>(
    defaultStartDate || null,
  );
  const [endDate, setEndDate] = useState<any | null>(defaultEndDate || null);
  const [month_Year, setMonth_Year] = useState(new Date());
  const datePickerRef = useRef<any>(null);
  const { toastError } = useCustomToast();
  const getLocaleLang: any = localStorage.getItem('locale');

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
      const newDate = new Date(startDate);
      newDate.setMonth(startDate.getMonth() - 1);
      setStartDate(newDate);
    }
  };

  const handleNextMonth = () => {
    if (datePickerRef.current) {
      const newDate = new Date(startDate);
      newDate.setMonth(startDate.getMonth() + 1);
      setStartDate(newDate);
    }
  };

  return (
    <div className='rounded-tl-2xl rounded-tr-2xl'>
      <div className='px-4 py-3 bg-neutral-grey-100 rounded-tl-2xl rounded-tr-2xl'>
        <p className='text-center font-semibold text-neutral-grey-700 text-base'>
          {VEHICLE.calendar}
        </p>
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
              value={startDate.toLocaleString(
                getLocaleLang !== null ? getLocaleLang : 'vi',
                {
                  day: 'numeric',
                  month: 'numeric',
                  year: 'numeric',
                },
              )}
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
        <div className='w-full flex justify-center mt-3 mb-4'>
          <DatePicker
            selected={null}
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            calendarClassName=' border-none bg-white text-neutral-700 focus:text-[#505462] focus:bg-black'
            selectsRange
            inline
            minDate={new Date()}
            ref={datePickerRef}
            className='w-full'
            dayClassName={(date) => {
              const dateToCheck = new Date(date).setHours(0, 0, 0, 0);
              const today = new Date().setHours(0, 0, 0, 0);
              const startDayCheck = startDate
                ? startDate.setHours(0, 0, 0, 0)
                : null;
              const endDayCheck = endDate ? endDate.setHours(0, 0, 0, 0) : null;
              if (dateToCheck < today) {
                return 'rounded-full bg-white text-neutral-400 w-10 h-10 text-sm text-center pt-[10px] cursor-default';
              }
              if (dateToCheck === startDayCheck) {
                return 'bg-[#0273BC] hover:bg-[#0273BC] text-[#FEFEFE] rounded-full hover:rounded-full w-10 h-10 text-sm text-center pt-[10px]';
              }

              if (dateToCheck === endDayCheck) {
                return 'bg-[#0273BC] hover:bg-[#0273BC] text-[#FEFEFE] rounded-full hover:rounded-full w-10 h-10 text-sm text-center pt-[10px]';
              }

              if (dateToCheck > startDate && dateToCheck < endDate) {
                return 'bg-[#DFF0FB] text-neutral-700 rounded-full  w-10 h-10 text-sm text-center pt-[10px]';
              }

              return 'rounded-full bg-white text-neutral-700 w-10 h-10 text-sm text-center pt-[10px]';
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
        <div className='py-4 border-t'>
          <Button onClick={() => onSubmit(startDate, endDate)}>
            {btnTitle}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModalPickDateContentRetalCar;
