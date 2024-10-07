import { createBookingVehicle } from '@/apis/bookingVehicel';
import Footer from '@/components/footer';
import FormCarBooking from '@/components/form/form-car-booking';
import LoadingView from '@/components/LoadingView';
import Modal from '@/components/modal/Modal';
import CarsRental from '@/components/Pages/xe-hop-dong/carsRental';
import IntroduceCarRental from '@/components/Pages/xe-hop-dong/introduceCarRental';
import ModalSuccessBooking from '@/components/Pages/xe-hop-dong/modalSuccessBooking';
import TypeBooking from '@/components/Pages/xe-hop-dong/typeBooking';
import useModal from '@/hook/useModal';
import { useCustomToast } from '@/hook/useToast';
import { ITranslation } from '@/interfaces/ITranslation';
import { isEmpty } from 'lodash';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

interface IContainerContractVehicleDesktopProps {
  translation: ITranslation;
  city: any;
}

interface IIntroduceBookingProps {
  translation: ITranslation;
  bookingType: any;
  handleChooseBooking: (value: any) => void;
  handleBooking: () => void;
}

interface ICarBookingProps {
  translation: ITranslation;
  handleBack: () => void;
  typeBooking: any;
  city: any;
  setStep: any;
}

const IntroduceBooking = (props: IIntroduceBookingProps) => {
  const { translation, bookingType, handleChooseBooking, handleBooking } =
    props;
  return (
    <div className=' pb-[60px] bg-[#ECECEC]'>
      <div className='bg-white py-10'>
        <div className='mx-auto w-fit'>
          <div>
            <IntroduceCarRental translation={translation.VEHICLE} />
          </div>
          <div className='mt-4'>
            <CarsRental
              translation={translation.VEHICLE}
              bookingType={bookingType}
              handleChooseBooking={handleChooseBooking}
              handleBooking={handleBooking}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const CarBooking = (props: ICarBookingProps) => {
  const { translation, handleBack, typeBooking, city, setStep } = props;
  const [successModal, toggleShareModal] = useModal();
  const { toastError } = useCustomToast();
  const [loading, setLoading] = useState(false);
  const [inforBookingSuccess, setInforBookingSuccess] = useState<any>(null);

  const handleOpen_CloseModal = () => {
    toggleShareModal();
  };

  const handleCloseModalSuccess = () => {
    toggleShareModal();
    window.location.assign(
      `/chi-tiet-thue-xe?rent=${inforBookingSuccess?.rentalContractId}`,
    );
  };
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

  const handleOnSubmit = async (data: any) => {
    setLoading(true);
    const cityPoint = city?.find(
      (elm: any, ind: number) => elm?.value === data?.point,
    );
    const cityDes = city?.find(
      (elm: any, ind: number) => elm?.value === data?.destination,
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
      handleOpen_CloseModal();
      // setStep(1);
    } else {
      toastError({
        message: res?.errorMessage,
        toastId: 'validate-seats-failed',
      });
    }
    setLoading(false);
  };

  const handleBackHome = () => {
    window.location.assign('/');
  };

  if (loading) {
    return <LoadingView />;
  }

  return (
    <div className='pt-10 pb-[60px] bg-[#ECECEC]'>
      <div className='mx-auto w-fit'>
        <div className='w-[640px]'>
          <div>
            <TypeBooking
              typeBooking={typeBooking}
              translation={translation.VEHICLE}
              handleBack={handleBack}
            />
          </div>
          <div className='mt-6'>
            <FormCarBooking
              translation={translation}
              handleOnSubmit={handleOnSubmit}
              city={city}
            />
          </div>
        </div>
      </div>
      <Modal
        toggleModal={handleCloseModalSuccess}
        open={successModal}
        wrapChildStyle='p-0'
        modalStyle='w-[100vw] h-[100vh] flex justify-center items-center fixed bg-black/30 z-[60] left-[calc(0%)] top-[calc(0%)]'
        childStyle='w-[600px] bg-white md:rounded-xl md:min-h-fit min-h-full mx-0  overflow-hidden duration-200 animate-fade-in '
      >
        <ModalSuccessBooking
          translation={translation.VEHICLE}
          handleBackHome={handleBackHome}
        />
      </Modal>
    </div>
  );
};

const ContainerContractVehicleDesktop = (
  props: IContainerContractVehicleDesktopProps,
) => {
  const { translation, city } = props;

  const [bookingType, setBookingType] = useState<any>();
  const [step, setStep] = useState<any>(1);
  const [customCity, setCustomCity] = useState<any>();

  const handleChooseBooking = (value: any) => {
    setBookingType(value);
  };

  const handleBooking = () => {
    // if (!isEmpty(bookingType)) {
    setStep(2);
    window.scrollTo(0, 0);
    // }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(step - 1);
      setBookingType('');
    }
  };

  useEffect(() => {
    const cities: any = [];
    city?.result?.forEach((element: any) => {
      const city_Item = {
        id: parseInt(element?.id),
        value: element?.text,
      };
      cities.push(city_Item);
    });
    setCustomCity(cities);
  }, [city]);

  return (
    <div>
      {step === 1 && (
        <IntroduceBooking
          bookingType={bookingType}
          translation={translation}
          handleChooseBooking={handleChooseBooking}
          handleBooking={handleBooking}
        />
      )}
      {step === 2 && (
        <CarBooking
          translation={translation}
          handleBack={handlePrev}
          typeBooking={bookingType}
          city={customCity}
          setStep={setStep}
          // bookingType={bookingType}
          // handleChooseBooking={handleChooseBooking}
        />
      )}
    </div>
  );
};

export default ContainerContractVehicleDesktop;
