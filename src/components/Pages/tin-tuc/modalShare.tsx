import FacebookBlueIcon from '@/components/icons/facebookBlue';
import TwitterIcon from '@/components/icons/twitter';
import { INewsTranslate } from '@/interfaces/INewsTranslate';
import React from 'react';

interface IModalShare {
  NEWTRANS: INewsTranslate;
  handleShare: () => void;
}

const ModalShare = (props: IModalShare) => {
  const { NEWTRANS, handleShare } = props;

  const handleFBShare = () => {
    const linkShare = window.location.href;
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      linkShare,
    )}`;
    window.open(
      facebookShareUrl,
      'sharer',
      'toolbar=0,status=0,width=600,height=400',
    );
  };

  const handleTWShare = () => {
    const linkShare = window.location.href;
    const text = 'Share news';
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      linkShare,
    )}&text=${encodeURIComponent(text)}`;
    window.open(
      twitterShareUrl,
      'sharer',
      'toolbar=0,status=0,width=600,height=400',
    );
  };

  return (
    <div>
      <div className='p-4 w-full text-center bg-neutral-100 text-base font-semibold'>
        {NEWTRANS.sharePostBy}
      </div>
      <div className='flex gap-3 justify-between px-4 py-10'>
        <div
          onClick={() => handleFBShare()}
          className='cursor-pointer w-[278px] border border-neutral-200 rounded-xl py-3 flex justify-center gap-2 items-center'
        >
          <div>
            <FacebookBlueIcon />
          </div>
          <div className='text-base font-medium'>Facebook</div>
        </div>
        <div
          onClick={() => handleTWShare()}
          className='cursor-pointer w-[278px] border border-neutral-200 rounded-xl py-3 flex justify-center gap-2 items-center'
        >
          <div>
            <TwitterIcon />
          </div>
          <div className='text-base font-medium'>X / Twitter</div>
        </div>
      </div>
      <div className=' px-4 pb-6'>
        <div
          onClick={() => handleShare()}
          className='cursor-pointer rounded-full py-[10px] text-base font-semibold text-[#62231A] text-center w-full bg-[#FCE6D5]'
        >
          {NEWTRANS.cancel}
        </div>
      </div>
    </div>
  );
};

export default ModalShare;
