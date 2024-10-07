import Footer from "@/components/footer";
import Modal from "@/components/modal/Modal";
import CancelTicketModal from "@/components/Pages/dat-ve/cancelTicketModal";
import DetailPayment from "@/components/requestPayment/detailPayment";
import useModal from "@/hook/useModal";
import { IRental } from "@/interfaces/httpRequest/IRental";
import { ITranslation } from "@/interfaces/ITranslation";
import React, { useEffect, useState } from "react";

interface IContainerRentalDetailDesktopProps {
  translation: ITranslation;
  rentalDetail?: IRental;
}

type ElementTypes = {
  typeComponent: number;
  name: string;
  content: string;
  colorText: string;
};

interface IInformation {
  titleContent: string;
  paymentInfor: ElementTypes[];
}

const ContainerRentalDetailDesktop = (
  props: IContainerRentalDetailDesktopProps
) => {
  const [information, setInformation] = useState<IInformation>({
    titleContent: "",
    paymentInfor: [],
  });
  const { translation, rentalDetail } = props;
  const { REQUESTPAYMENT, HOME } = translation;
  const [cancelModal, toggleCancelModal] = useModal();

  useEffect(() => {
    setInformation({
      titleContent: REQUESTPAYMENT.infoRentalCar,
      paymentInfor: [
        {
          typeComponent: 1,
          name: REQUESTPAYMENT.detailOrder.fullName,
          content: rentalDetail?.customerName || "",
          colorText: "#19191B",
        },
        {
          typeComponent: 1,
          name: REQUESTPAYMENT.detailOrder.numberPhone,
          content: rentalDetail?.customerPhone || "",
          colorText: "#19191B",
        },

        {
          typeComponent: 1,
          name: REQUESTPAYMENT.amount,
          content: rentalDetail?.vehicleCount?.toString() || "",
          colorText: "#19191B",
        },
        {
          typeComponent: 1,
          name: REQUESTPAYMENT.detailOrder.type,
          content: rentalDetail?.vehicleRentalTypesDisplay?.join(", ") || "",
          colorText: "#19191B",
        },
        {
          typeComponent: 1,
          name: HOME.startPlace,
          content: rentalDetail?.originCity?.name || "",
          colorText: "#19191B",
        },
        {
          typeComponent: 1,
          name: HOME.endPlace,
          content: rentalDetail?.destinationCity?.name || "",
          colorText: "#19191B",
        },
      ],
    });
  }, []);
  return (
    <>
      <div className="pt-10 pb-[60px] bg-[#ECECEC]">
        <div className="mx-auto w-fit">
          <div className="py-6 px-6 bg-white rounded-lg flex flex-col gap-4 xl:w-[640px] w-full mt-2">
            {rentalDetail && (
              <DetailPayment
                convertPriceData={information}
                REQUESTPAYMENT={REQUESTPAYMENT}
              />
            )}
          </div>

          <div className={`mt-5 flex gap-2  items-center `}>
            <div className="">
              <button
                onClick={() => toggleCancelModal()}
                className="w-full px-14 font-semibold text-center my-auto bg-inherit rounded-full h-10 border border-black"
              >
                {REQUESTPAYMENT.cancelRental}
              </button>
            </div>
            <div className="flex-grow justify-center flex">
              <button
                onClick={() => {
                  window.location.assign("/");
                }}
                className="w-full max-w-[432px] text-white font-semibold text-center my-auto bg-primary-500 rounded-full h-10"
              >
                {REQUESTPAYMENT.button.homeButton}
              </button>
            </div>
          </div>
        </div>

        <Modal
          toggleModal={toggleCancelModal}
          open={cancelModal}
          wrapChildStyle="p-0"
          modalStyle="w-[100vw] h-[100vh] flex justify-center items-center fixed bg-black/30 z-[60] left-[calc(0%)] top-[calc(0%)]"
          childStyle="w-[600px] bg-white md:rounded-xl md:min-h-fit min-h-full mx-0  overflow-hidden duration-200 animate-fade-in "
        >
          <CancelTicketModal
            REQUESTPAYMENT={REQUESTPAYMENT}
            handleCloseModal={toggleCancelModal}
          />
        </Modal>
      </div>
      <Footer />
    </>
  );
};

export default ContainerRentalDetailDesktop;
