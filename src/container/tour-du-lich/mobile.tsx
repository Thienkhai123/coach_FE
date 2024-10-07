import React, { Fragment } from "react";
import { ITranslation } from "@/interfaces/ITranslation";
import TourTravel from "@/components/Pages/tour-du-lich/tourTravel";
import useModal from "@/hook/useModal";
import FullScreenModal from "@/components/modal/FullScreenModal";
import Modal from "@/components/modal/Modal";
import NavbarAction from "@/components/navbar/action";
import FullModalTourBookingContent from "@/components/Pages/tour-du-lich/fullModalTourBookingContent";
import CancelIcon from "@/components/icons/cancel";

interface IContainerTourMobileProps {
  translation: ITranslation;
}

const ContainerTourMobile = (props: IContainerTourMobileProps) => {
  const { translation } = props;
  const { TOUR, BOOKING } = translation;
  const [openFullScreen, toggleFullScreen] = useModal();
  const [openModal, toggleModal] = useModal();

  const handleBookTour = (id: number) => {
    console.log(id);
    toggleFullScreen();
  };

  const handleSubmit = () => {
    toggleModal();
    toggleFullScreen();
  };

  return (
    <Fragment>
      <div className="bg-white p-4">
        <p className="text-black font-semibold text-lg text-center mb-4">
          {TOUR.tourTravel}
        </p>
        <TourTravel
          id={1}
          image=""
          description="Lorem ipsum dolor sit amet consectetur. Porttitor auctor eu sagittis consequat eros dictum. Mattis netus posuere odio faucibus laoreet placerat. Proin sit at nisl volutpat. Elementum arcu varius nunc risus sit eu aliquam."
          btnTitle={TOUR.bookTourNow}
          handleBookTour={handleBookTour}
        />
      </div>

      <FullScreenModal open={openFullScreen}>
        <NavbarAction
          title={TOUR.bookingTour}
          ActionElement={() => (
            <button>
              <p className="text-black font-medium text-base underline">
                {TOUR.tourDetail}
              </p>
            </button>
          )}
          handleClick={toggleFullScreen}
        />
        <FullModalTourBookingContent
          translation={translation}
          handleAction={handleSubmit}
          onSubmit={() => {}}
        />
      </FullScreenModal>

      <Modal open={openModal} toggleModal={toggleModal}>
        <div>
          <div className="flex justify-end">
            <div>
              <CancelIcon />
            </div>
          </div>
          <div className="rounded-full bg-[#D9D9D9] w-[100px] h-[100px] mx-auto mb-2"></div>
          <p className="mb-2 text-black text-base font-semibold text-center">
            {TOUR.titleRegisterAdviceSuccess}
          </p>
          <p className="text-black font-medium text-xs text-center mb-3">
            {TOUR.waitingForFeedbackAdvice}
          </p>
          <div className="p-4">
            <button
              className="h-[44px] py-3 border border-[#EFEFF0] rounded-xl px-4 w-full flex justify-center items-center"
              onClick={toggleModal}
            >
              <p className="text-[#19191B] font-medium text-sm">
                {BOOKING.close}
              </p>
            </button>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};

export default ContainerTourMobile;
