import CalendarIcon from '@/components/icons/calendar';
import React from 'react';
import DatePicker from 'react-datepicker';

interface IInputDateProps {
  startDate: Date | null;
  setStartDate: (arg: any) => void;
  optional?: any;
}

const InputDate = (props: IInputDateProps) => {
  const { startDate, setStartDate, optional } = props;

  return (
    <label>
      <div className='flex gap-2 items-center border-2 border-[#dde2e8] rounded-lg py-2 px-4'>
        <div className='flex-1'>
          <DatePicker
            popperClassName='datePicker'
            selected={startDate}
            dateFormat='dd/MM/yyyy'
            onChange={(date) => setStartDate(date)}
            className='outline-0'
            {...optional}
            popperPlacement='bottom-end'
          />
        </div>
        <CalendarIcon />
      </div>
    </label>
  );
};

export default InputDate;
