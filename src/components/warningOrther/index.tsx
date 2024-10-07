import React from 'react';
import StrollerIcon from '../icons/stroller';
import {
  IDemoTranslate,
  IWarningListTranslate,
} from '@/interfaces/IDemoTranslate';
import { IBookingTranslate } from '@/interfaces/IBookingTranslate';

interface IWarningOrtherProps {
  BOOKING: IBookingTranslate;
}

const WarningOrther = (props: IWarningOrtherProps) => {
  const { BOOKING } = props;
  return (
    <div className='rounded px-3 py-2 bg-blue'>
      <div className='flex gap-2 items-center'>
        {/* <div>
          <StrollerIcon />
        </div> */}
        <div className='text-sm text-blue-300 font-bold'>
          {BOOKING.policyOnOrther}
        </div>
      </div>
      <div className='mt-2'>
        {/* <div className='text-sm  font-bold '>{BOOKING.contentLuggage}</div> */}
        <div className='mt-1'>
          <ul className='list-disc lg:pl-0 pl-5 lg:list-inside'>
            {BOOKING.policyOnOrtherList.map((note, ind) => {
              return (
                <li key={ind} className='text-sm  font-bold '>
                  <span className='lg:font-normal font-medium'>
                    {note.content}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WarningOrther;
