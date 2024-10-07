import Button from "@/components/button";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { vi } from "date-fns/locale";

interface IModalPickDateContentProps {
  title?: string;
  btnTitle?: string;
  minDate?: Date | null;
  dateSelected?: Date | null;
  onSubmit: (arg: Date | null) => void;
}

const ModalPickBirthday = (props: IModalPickDateContentProps) => {
  const { title, btnTitle, minDate, dateSelected, onSubmit } = props;
  const [startDate, setStartDate] = useState<Date | null>(dateSelected || null);

  return (
    <div className="rounded-tl-2xl rounded-tr-2xl">
      <div className="px-4 py-3 bg-neutral-grey-100 rounded-tl-2xl rounded-tr-2xl">
        <p className="text-center font-semibold text-neutral-grey-700 text-base">
          {title}
        </p>
      </div>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        shouldCloseOnSelect={false}
        maxDate={minDate || new Date()}
        inline
        calendarClassName="custom-calendar-qb"
        locale={vi}
      />
      <div className="p-4 border-t">
        <Button onClick={() => onSubmit(startDate)}>{btnTitle}</Button>
      </div>
    </div>
  );
};

export default ModalPickBirthday;
