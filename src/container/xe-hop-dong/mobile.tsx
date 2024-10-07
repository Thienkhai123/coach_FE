import React, { Fragment, useState } from 'react';
import { ITranslation } from '@/interfaces/ITranslation';
import ContractVehicle from '@/components/Pages/xe-hop-dong/contractVehicle';
import useModal from '@/hook/useModal';
import Modal from '@/components/modal/Modal';
import NavbarAction from '@/components/navbar/action';
import FullModalTourBookingContent from '@/components/Pages/tour-du-lich/fullModalTourBookingContent';
import ModalChooseDurationBooking from '@/components/Pages/xe-hop-dong/modalChooseDurationBooking';
import { ICityResponse } from '@/interfaces/httpRequest/ICity';
import SuccessBooking from '@/components/icons/successBooking';
import { useCustomToast } from '@/hook/useToast';
import { createBookingVehicle } from '@/apis/bookingVehicel';
import { IUserProfile } from '@/interfaces/httpRequest/IUser';
import LoadingView from '@/components/LoadingView';
import moment from 'moment';

interface IContainerContractVehicleMobileProps {
  translation: ITranslation;
  city?: ICityResponse;
  userProfile: IUserProfile;
}

const OPTION_CAR_DEFAULT_VI = [
  { id: 0, value: 'Xe 4-5 chỗ ' },
  { id: 1, value: 'Xe 7 chỗ ' },
  { id: 2, value: 'Xe 12 chỗ ' },
  { id: 3, value: 'Xe 16 chỗ ' },
  { id: 4, value: 'Xe 20 chỗ ' },
  { id: 5, value: 'Xe 24 chỗ ' },
  { id: 6, value: 'Xe 35 chỗ ' },
];

const OPTION_CAR_DEFAULT_EN = [
  { id: 0, value: '4-5 seater car ' },
  { id: 1, value: '7 seater car ' },
  { id: 2, value: '12 seater car ' },
  { id: 3, value: '16 seater car ' },
  { id: 4, value: '20 seater car ' },
  { id: 5, value: '24 seater car ' },
  { id: 6, value: '35 seater car ' },
];

const ContainerContractVehicleMobile = (
  props: IContainerContractVehicleMobileProps,
) => {
  const { translation, city, userProfile } = props;
  const { VEHICLE, BOOKING } = translation;
  const [openChoosingModal, toggleChoosingModal] = useModal();
  const [openModal, toggleModal] = useModal();
  const { toastError } = useCustomToast();
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState({
    id: 0,
    value: '',
  });
  const [tab, setTab] = useState(1);
  const [inforBookingSuccess, setInforBookingSuccess] = useState<any>(null);

  const FAKE_OPTIONS = [
    {
      id: 1,
      value: VEHICLE.bookingByHours,
    },
    {
      id: 2,
      value: VEHICLE.bookingByDays,
    },
    {
      id: 3,
      value: VEHICLE.bookingByMonths,
    },
  ];

  const handleBackHome = () => {
    window.location.assign('/');
  };

  const handleSignIn = () => {
    window.location.assign('/dang-nhap');
  };

  const handleChangeTab = () => {
    setTab(2);
  };

  const handlePrevTab = () => {
    setTab(tab - 1);
  };

  const handleChooseOption = (arg: { id: number; value: string }) => {
    setSelectedOption(arg);
  };

  const handleSubmitChoice = () => {
    // toggleChoosingModal();
    handleChangeTab();
  };

  const handleSubmitBooking = () => {
    toggleModal();
  };

  const handleToggleModal = () => {
    setTab(1);
    window.scrollTo(0, 0);
    toggleModal();
  };

  const handleCloseModalSuccess = () => {
    toggleModal();
    window.location.assign(
      `/chi-tiet-thue-xe?rent=${inforBookingSuccess?.rentalContractId}`,
    );
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    const cityPoint = city?.result?.find(
      (elm: any) => elm?.text === data?.point,
    );
    const cityDes = city?.result?.find(
      (elm: any) => elm?.text === data?.destination,
    );
    const getLocaleLang = localStorage.getItem('locale');

    const vehicleRental_VI = OPTION_CAR_DEFAULT_VI.reduce(
      (acc: any[], elm: any) => {
        const matchingElements = data?.carList?.filter(
          (element: any) => elm?.value.trim() === element?.car.trim(),
        );
        if (matchingElements.length > 0) {
          acc.push(...Array(matchingElements.length).fill(elm));
        }
        return acc;
      },
      [],
    );

    const vehicleRental_EN = OPTION_CAR_DEFAULT_EN.reduce(
      (acc: any[], elm: any) => {
        const matchingElements = data?.carList?.filter(
          (element: any) => elm?.value.trim() === element?.car.trim(),
        );
        if (matchingElements.length > 0) {
          acc.push(...Array(matchingElements.length).fill(elm));
        }
        return acc;
      },
      [],
    );
    const payload = {
      vehicleRentalTypes:
        getLocaleLang === 'en'
          ? vehicleRental_EN?.map((elm) => elm.id)
          : vehicleRental_VI?.map((elm) => elm.id),
      originCityId: cityPoint?.id,
      destinationCityId: cityDes?.id,
      customerName: data?.fullName,
      customerPhone: data?.phone,
      startAt: moment.utc(data?.startTime).toISOString(),
      endAt: moment.utc(data?.endTime).toISOString(),
      vehicleCount: parseInt(data?.numberCar),
    };
    const res = await createBookingVehicle(payload);
    if (res?.isSuccess) {
      setInforBookingSuccess(res?.data);
      handleSubmitBooking();
    } else {
      toastError({
        message: res?.errorMessage,
        toastId: 'booking-car-mobile-failed',
      });
    }
    setLoading(false);
  };

  if (loading) {
    return <LoadingView />;
  }

  return (
    <Fragment>
      {tab === 1 && (
        <div className='pb-[60px] bg-[#ECECEC]'>
          <div className='bg-white py-4 rounded-b-xl'>
            <ContractVehicle
              id={1}
              description='Lorem ipsum dolor sit amet consectetur. Porttitor auctor eu sagittis consequat eros dictum. Mattis netus posuere odio faucibus laoreet placerat. Proin sit at nisl volutpat. Elementum arcu varius nunc risus sit eu aliquam.'
              btnTitle={translation.VEHICLE.contractBooking}
              contractTitle={translation.VEHICLE.contractBooking}
              handleBookVehicle={handleSubmitChoice}
              contentTitle={translation.VEHICLE.contentBooking}
              contentDes='Lorem ipsum dolor sit amet consectetur. Porttitor auctor eu sagittis consequat eros dictum. Mattis netus posuere odio faucibus laoreet placerat. Proin sit at nisl volutpat. Elementum arcu varius nunc risus sit eu aliquam. Lorem ipsum dolor sit amet consectetur. Porttitor auctor eu sagittis consequat eros dictum. Mattis netus posuere odio faucibus laoreet placerat. Proin sit at nisl volutpat. Elementum arcu varius nunc risus sit eu aliquam.'
            />
          </div>
        </div>
      )}
      {tab === 2 && (
        <div className='absolute top-0 z-30 w-full'>
          <NavbarAction
            title={VEHICLE.bookingContractVehicle}
            ActionElement={() => <></>}
            handleClick={handlePrevTab}
          />
          {!userProfile && (
            <div className='bg-[#ECECEC] pb-2'>
              <div className='bg-white px-3 py-4'>
                <div className='bg-[#FCE6D5] rounded-lg py-2 px-3 flex justify-between items-center gap-6'>
                  <div className='text-sm font-medium text-neutral-700'>
                    {translation.CREATEORDER.signIn.content}
                  </div>
                  <div className='min-w-[96px]'>
                    <button
                      onClick={handleSignIn}
                      type='button'
                      className='w-full text-sm text-white px-3 font-semibold text-center my-auto bg-primary-500 rounded-full h-[36px] '
                    >
                      {translation.CREATEORDER.signIn.buttonSignIn}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <FullModalTourBookingContent
            onSubmit={onSubmit}
            translation={translation}
            handleAction={handleSubmitBooking}
            city={city}
          />
        </div>
      )}
      <Modal
        open={openChoosingModal}
        toggleModal={toggleChoosingModal}
        childStyle='animate-fade-in w-screen sm:w-[800px] xl:mx-0 mx-3 bg-white rounded-[12px] overflow-y-auto xl:h-fit max-h-[80vh]'
        wrapChildStyle='px-4 py-6'
      >
        <ModalChooseDurationBooking
          title={VEHICLE.chooseYourContractVehicle}
          description={VEHICLE.pleaseWaitingForRespone}
          options={FAKE_OPTIONS}
          btnTitle={BOOKING.continue}
          btnBackTitle={translation.NEWS.back}
          selectedId={selectedOption.id}
          handleChooseOption={handleChooseOption}
          handleSubmit={handleSubmitChoice}
          handleClose={toggleChoosingModal}
        />
      </Modal>

      <Modal
        open={openModal}
        toggleModal={handleCloseModalSuccess}
        childStyle='animate-fade-in w-screen sm:w-[800px] xl:mx-0 mx-3 bg-white rounded-xl overflow-y-auto xl:h-fit max-h-[80vh] '
        wrapChildStyle='px-4 py-6'
      >
        <div>
          <div className='w-fit mx-auto'>
            <SuccessBooking />
          </div>
          <div className='text-[#00993D] text-base font-bold text-center'>
            {VEHICLE.successTitle}
          </div>
          <div className='mt-2 text-center text-neutral-700 font-medium text-sm'>
            {VEHICLE.successContent}
          </div>
          <div className='mt-6 w-full mx-auto'>
            <button
              onClick={() => handleBackHome()}
              className='text-sm w-full font-semibold hover:shadow-md duration-100 text-[#59180F]  py-2 px-3 text-center rounded-full bg-[#FCE6D5]'
            >
              {VEHICLE.backButton}
            </button>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};

export default ContainerContractVehicleMobile;
