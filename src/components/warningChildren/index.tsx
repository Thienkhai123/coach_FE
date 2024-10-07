import React from 'react';
import StrollerIcon from '../icons/stroller';
import {
  IDemoTranslate,
  IWarningListTranslate,
} from '@/interfaces/IDemoTranslate';
import { IBookingTranslate } from '@/interfaces/IBookingTranslate';

interface IWarningChildrenProps {
  BOOKING: IBookingTranslate;
}

const WarningChildren = (props: IWarningChildrenProps) => {
  const { BOOKING } = props;
  return (
    <div className='rounded px-3 py-2 bg-blue'>
      <div className='flex gap-2 items-center'>
        <div>
          <StrollerIcon />
        </div>
        <div className='text-sm text-blue-300 font-bold'>
          {BOOKING.noteGoWithChild}
        </div>
      </div>
      <div className='mt-2'>
        <div className='text-sm  font-bold '>{BOOKING.applyforLimousine}</div>
        <div className='mt-1'>
          <ul className='list-disc list-inside'>
            {BOOKING.childNoteList.map((note, ind) => {
              return (
                <li key={ind} className='text-sm  font-bold '>
                  {note.bold}{' '}
                  <span className='font-normal'>{note.content}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className='mt-2'>
        <div className='text-sm  font-bold '>{BOOKING.applyforTradition}</div>
        <div className='mt-1'>
          <ul className='list-disc list-inside'>
            {BOOKING.childNoteTraditionList.map((note, ind) => {
              return (
                <li key={ind} className='text-sm  font-bold '>
                  {note.bold}{' '}
                  <span className='font-normal'>{note.content}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WarningChildren;
