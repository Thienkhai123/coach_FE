import { ICreateOrderTranslate } from '@/interfaces/ICreateOrderTranslate';
import React, { FC } from 'react';

interface INotificationSigninProps {
  CREATEORDER: ICreateOrderTranslate;
  handleSignIn: () => void;
}

const NotificationSignin: FC<INotificationSigninProps> = (props) => {
  const { CREATEORDER, handleSignIn } = props;
  return (
    <div className='p-4 rounded-lg bg-white'>
      <div className='p-4 rounded-lg bg-primary-900 flex justify-between items-center'>
        <div className='text-neutral-grey-700 font-medium text-sm w-[216px]'>
          {CREATEORDER.signIn.content}
        </div>
        <div>
          <button
            type='button'
            onClick={() => handleSignIn()}
            className='w-full text-sm text-white px-3 font-semibold text-center my-auto bg-primary-500 rounded-full h-[36px]'
          >
            {CREATEORDER.signIn.buttonSignIn}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationSignin;
