import { createShipmentOrders } from '@/apis/order';
import Button from '@/components/button';
import BoxAdress from '@/components/icons/box-adress';
import CircleAdress from '@/components/icons/circle-adress';
import FullScreenModal from '@/components/modal/FullScreenModal';
import useModal from '@/hook/useModal';
import { ITranslation } from '@/interfaces/ITranslation';
import React, { useState } from 'react';
import ModalPaymentOrderMobile from './modalPaymentOrderMobile';
import { useCustomToast } from '@/hook/useToast';

type InforSenderT = {
  fullName: string;
  phone: string;
  indentify: string;
  email: string;
  address: string;
};

type LocationsT = {
  from: string;
  fromId: number;
  to: string;
  toId: number;
};

type PayerInforT = {
  payer: number;
  collection: boolean;
  values: number;
  totalCost: number;
};

type ProductionItemT = {
  content: string;
  pickupImageFile: string;
  packageTypeId: number;
  packageWeightId: number;
  packageDimensionId: number;
};

interface ITransportState {
  sender: InforSenderT;
  receiver: InforSenderT;
  locations: LocationsT;
  productions: ProductionItemT[];
  fees: PayerInforT;
}

interface IFiveStepProps {
  translation: ITranslation;
  transportState: ITransportState;
  changeNextStep: () => void;
}

type ProductionT = {
  content: string;
  weightName: string;
  sizeName: string;
};

const RenderRow = ({ title = '', value = '-' }) => {
  return (
    <li className='flex justify-between items-center gap-4 py-2 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-b-neutral-grey-100'>
      <p className='text-neutral-grey-600 font-medium text-sm'>{title}</p>
      <p className='text-neutral-grey-700 font-semibold text-sm'>{value}</p>
    </li>
  );
};

const FiveStep = (props: IFiveStepProps) => {
  const { translation, transportState } = props;
  const { BOOKING, TRANSPORT, PAYMENT } = translation;
  const { sender, locations, fees, productions, receiver } =
    transportState || {};
  const [openModalPayment, toggleModalPayment] = useModal();
  const { toastError } = useCustomToast();
  const [code, setCode] = useState('');

  const PRODUCTIONS = {
    content: TRANSPORT.content,
    weightName: TRANSPORT.weightText,
    sizeName: TRANSPORT.sizeText,
  };

  const handleCreateOrder = async () => {
    const formBody: any = new FormData();

    formBody.append('loadingLocationId', locations?.fromId);
    formBody.append('unloadingLocationId', locations?.toId);

    formBody.append('SenderInfo.SenderName', sender?.fullName);
    formBody.append('SenderInfo.SenderPhone', sender?.phone);
    formBody.append('SenderInfo.SenderAddress', sender?.address);
    formBody.append('SenderInfo.SenderCI', sender?.indentify);
    formBody.append('SenderInfo.Email', sender?.email);

    formBody.append('ReceiverInfo.ReceiverName', receiver?.fullName);
    formBody.append('ReceiverInfo.ReceiverPhone', receiver?.phone);
    formBody.append('ReceiverInfo.ReceiverAddress', receiver?.address);
    formBody.append('ReceiverInfo.ReceiverCI', receiver?.indentify);

    formBody.append('IsCod', fees?.collection || false);
    formBody.append('COD', fees?.values || 0);
    formBody.append('Payer', fees?.payer);

    productions?.forEach((prod, ind) => {
      formBody.append(`Packages[${ind}].Content`, prod?.content);
      formBody.append(
        `Packages[${ind}].packageWeightId`,
        prod?.packageWeightId,
      );
      formBody.append(
        `Packages[${ind}].packageDimensionId`,
        prod?.packageDimensionId,
      );
      formBody.append(`Packages[${ind}].packageTypeId`, prod?.packageTypeId);
      formBody.append(
        `Packages[${ind}].PickupImageFile`,
        prod?.pickupImageFile,
      );
    });
    const res: any = await createShipmentOrders(formBody);
    if (res?.isSuccess) {
      setCode(res?.data?.shippingOrderCode);
      if (fees?.payer === 1) {
        toggleModalPayment();
      } else {
        const thisCode = res?.data?.shippingOrderCode?.replace('#', '');
        window.location.assign(
          `/xac-nhan-thong-tin-thanh-toan?phone=${sender?.phone}&code=${thisCode}`,
        );
      }
    } else {
      toastError({
        message: res?.errorMessage,
        toastId: 'create-order-failed',
      });
    }
  };

  const handlePayment = () => {
    const thisCode = code?.replace('#', '');
    window.location.assign(
      `/xac-nhan-thong-tin-thanh-toan?phone=${sender?.phone}&code=${thisCode}`,
    );
  };
  return (
    <>
      <div className='relative pb-24'>
        <div>
          <div className='flex flex-col gap-2 bg-common'>
            <div className='bg-white py-3 px-4'>
              <div className='flex gap-3'>
                <div className='flex flex-col gap-1 items-center'>
                  <CircleAdress />
                  <div className='flex-1 border border-dashed'></div>
                </div>
                <div>
                  <p className='text-neutral-grey-700 font-bold text-sm'>
                    {sender?.fullName}
                  </p>
                  <p className='text-neutral-grey-500 font-medium text-sm'>
                    {BOOKING.phoneTitle}: {sender?.phone}
                  </p>
                  <p className='text-neutral-grey-500 font-medium text-sm'>
                    {BOOKING.indentify}:{sender?.indentify}
                  </p>
                  <p className='text-neutral-grey-500 font-medium text-sm'>
                    {locations?.from}
                  </p>
                </div>
              </div>
              <div className='flex gap-3 mt-1'>
                <div>
                  <BoxAdress />
                </div>
                <div>
                  <p className='text-neutral-grey-700 font-bold text-sm'>
                    {receiver?.fullName}
                  </p>
                  <p className='text-neutral-grey-500 font-medium text-sm'>
                    {BOOKING.phoneTitle}: {receiver?.phone}
                  </p>
                  <p className='text-neutral-grey-500 font-medium text-sm'>
                    {BOOKING.indentify}: {receiver?.indentify}
                  </p>
                  <p className='text-neutral-grey-500 font-medium text-sm'>
                    {locations?.to}
                  </p>
                </div>
              </div>
            </div>

            {productions?.map((prod, ind) => (
              <div className='bg-white px-4 py-3' key={`prod-${ind}`}>
                <div className='bg-semantic-green-light py-1 px-2 rounded-full w-fit mb-2'>
                  <p className='text-neutral-grey-600 font-extrabold text-xs'>
                    {TRANSPORT.product2} {ind + 1}
                  </p>
                </div>
                <ul className='flex flex-col'>
                  {Object.keys(PRODUCTIONS)?.map((production, index) => (
                    <RenderRow
                      key={`information-prod-${index}`}
                      title={PRODUCTIONS[production as keyof ProductionT]}
                      value={prod[
                        production as keyof ProductionItemT
                      ]?.toString()}
                    />
                  ))}
                </ul>
              </div>
            ))}

            <div className='bg-white px-4 py-3'>
              <div className='bg-semantic-green-light py-1 px-2 rounded-full w-fit mb-2'>
                <p className='text-neutral-grey-600 font-extrabold text-xs uppercase'>
                  {TRANSPORT.feeDetails}
                </p>
              </div>
              <ul className='flex flex-col bg-white'>
                <RenderRow
                  title={TRANSPORT.freightPayer}
                  value={
                    fees?.payer === 1 ? TRANSPORT.sender : TRANSPORT.receiver
                  }
                />
                <RenderRow
                  title={TRANSPORT.fees}
                  value={fees?.totalCost?.toLocaleString() + 'đ'}
                />
                <RenderRow title={BOOKING.promotion} value='0' />
                <RenderRow
                  title={TRANSPORT.totalFees}
                  value={fees?.totalCost?.toLocaleString() + 'đ'}
                />
                <RenderRow
                  title={TRANSPORT.collection}
                  value={
                    fees?.values > 0
                      ? fees?.values?.toLocaleString()
                      : TRANSPORT.no
                  }
                />
              </ul>
            </div>
          </div>
        </div>
        <div className='p-4 bg-white fixed z-0 bottom-0 w-full drop-shadow-xl border'>
          <div className='flex gap-2.5'>
            <Button
              btnColor='bg-common'
              color='text-black'
              borderType='border-none'
            >
              {BOOKING.cancel}
            </Button>

            <Button onClick={handleCreateOrder}>{BOOKING.payment}</Button>
          </div>
        </div>
      </div>
      <FullScreenModal
        open={openModalPayment}
        childStyle='animate-fade-in w-screen bg-neutral-grey-100 overflow-y-auto h-[100vh]'
      >
        <ModalPaymentOrderMobile
          BOOKING={BOOKING}
          PAYMENT={PAYMENT}
          toggleModalPayment={toggleModalPayment}
          handleSubmit={handlePayment}
          code={sender?.phone + ' ' + code}
          totalPayment={fees?.totalCost || 0}
        />
      </FullScreenModal>
    </>
  );
};

export default FiveStep;
