import Image from "next/image";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { IBookingTranslate } from "@/interfaces/IBookingTranslate";

import { IPlaceholderTranslate } from "@/interfaces/IPlaceholderTranslate";
import { ISignInTranslate } from "@/interfaces/ISignInTranslate";
import { IRequestPaymentTranslate } from "@/interfaces/IRequestPaymentTranslate";
import Button from "@/components/button";

import { IPaymentTranslate } from "@/interfaces/IPaymentTranslate";

interface ICancelTicketModalProps {
  REQUESTPAYMENT: IRequestPaymentTranslate;

  handleCloseModal?: () => void;
}

const CancelTicketModal = (props: ICancelTicketModalProps) => {
  const { REQUESTPAYMENT, handleCloseModal = () => {} } = props;

  return (
    <div className={``}>
      <div className="p-4 flex items-center justify-center border-b border-neutral-grey-100 bg-neutral-grey-000 relative">
        <p className="text-base font-semibold">
          {REQUESTPAYMENT.detailOrder.contactUsByPhone}
        </p>
        {/* <div
					onClick={() => {
						handleCloseModal();
					}}
					className='absolute right-5 cursor-pointer'>
					<CancelIcon width='14' height='14' fill='#6A6F70' />
				</div> */}
      </div>
      <div className="max-h-[640px] overflow-auto  flex flex-col p-4 gap-2 bg-white">
        <div className="flex flex-col gap-3  ">
          <a
            href="tel:0914077779"
            className="text-[#237EE9] font-medium text-xl w-full py-4 rounded-xl border border-neutral-grey-200 text-center hover:bg-secondary-600 transition-all"
          >
            0914.077.779
          </a>
          <a
            href="tel:0963388388"
            className="text-[#237EE9] font-medium text-xl w-full py-4 rounded-xl border border-neutral-grey-200 text-center hover:bg-secondary-600 transition-all"
          >
            0963.388.388
          </a>
        </div>
      </div>
      <div className="flex flex-col items-center gap-3 p-4 pb-6">
        <Button
          btnColor="disabled:bg-primary-600 bg-primary-900 disabled:opacity-100 group"
          height="h-11"
          borderRadius="rounded-full"
          borderColor="border-none"
          color="group-disabled:text-opacity-60 text-primary-200 "
          // disabled={!isValid}
          // actionType='submit'
          onClick={() => handleCloseModal()}
        >
          {REQUESTPAYMENT.detailOrder.cancel}
        </Button>
      </div>
    </div>
  );
};

export default CancelTicketModal;
