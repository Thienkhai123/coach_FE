import React from "react";
import { ITranslation } from "@/interfaces/ITranslation";
import { IRental } from "@/interfaces/httpRequest/IRental";
import Button from "@/components/button";
import DrawerBottom2 from "@/components/drawer-bottom2";
import useModal from "@/hook/useModal";

interface IContainerRentalDetailMobileProps {
  translation: ITranslation;
  rentalDetail?: IRental;
}

const RenderRow = ({ title = "", value = "-" }) => {
  return (
    <div className="flex justify-between items-center gap-4 py-2 border-b border-b-neutral-grey-100">
      <p className="text-neutral-grey-600 font-medium text-sm">{title}</p>
      <p className="text-neutral-grey-700 font-semibold text-sm">{value}</p>
    </div>
  );
};

const ContainerRentalDetailMobile = (
  props: IContainerRentalDetailMobileProps
) => {
  const { translation, rentalDetail } = props;
  const { REQUESTPAYMENT, HOME } = translation;
  const [open, toggle] = useModal();

  const handleBackToHome = () => {
    window.location.assign("/");
  };

  return (
    <div className="relative">
      <div className="flex flex-col gap-2">
        <div className="bg-white p-4">
          <div className="bg-semantic-green-light py-1 px-2 rounded-full w-fit mb-2">
            <p className="text-neutral-grey-600 font-extrabold text-xs">
              {REQUESTPAYMENT.infoRentalCar}
            </p>
          </div>

          <RenderRow
            title={REQUESTPAYMENT.detailOrder.fullName}
            value={rentalDetail?.customerName}
          />
          <RenderRow
            title={REQUESTPAYMENT.detailOrder.numberPhone}
            value={rentalDetail?.customerPhone}
          />
          <RenderRow
            title={REQUESTPAYMENT.amount}
            value={rentalDetail?.vehicleCount?.toString() || ""}
          />
          <RenderRow
            title={REQUESTPAYMENT.detailOrder.type}
            value={rentalDetail?.vehicleRentalTypesDisplay?.join(", ") || ""}
          />
          <RenderRow
            title={HOME.startPlace}
            value={rentalDetail?.originCity?.name}
          />
          <RenderRow
            title={HOME.endPlace}
            value={rentalDetail?.destinationCity?.name}
          />
        </div>
      </div>

      <div className="flex justify-center my-3">
        <Button
          width="w-fit"
          btnColor="bg-transparent"
          color="text-black"
          borderColor="border-black"
          onClick={toggle}
        >
          {REQUESTPAYMENT.cancelRentalCar}
        </Button>
      </div>

      <div className="p-4 fixed bottom-0 z-10 bg-white w-full border border-neutral-grey-100 shadow-[gba(0,0,0,0.06),rgba(0,0,0,0.03)]">
        <Button onClick={handleBackToHome}>
          {REQUESTPAYMENT.button.homeButton}
        </Button>
      </div>

      <DrawerBottom2
        open={open}
        toggleDrawer={toggle}
        childStyle="w-screen bg-transparent rounded-tl-lg rounded-tr-lg"
        wrapChildStyle=""
        animationName="animation-open-drawer-bottom"
        closeStyle="animation-off-drawer-bottom"
      >
        <div className="px-3 flex flex-col gap-2">
          <div className="bg-white rounded-xl p-4 animate-fadeIn1">
            <a href="tel:0914077779">
              <p className="text-[#237EE9] text-xl font-medium text-center">
                0914.077.779
              </p>
            </a>
          </div>
          <div className="bg-white rounded-xl p-4 animate-fadeIn15">
            <a href="tel:0963388388">
              <p className="text-[#237EE9] text-xl font-medium text-center">
                0963.388.388
              </p>
            </a>
          </div>
          <div
            className="bg-white rounded-xl p-4 animate-fadeIn2"
            onClick={toggle}
          >
            <p className="text-[#237EE9] text-xl font-medium text-center">
              {REQUESTPAYMENT?.detailOrder?.cancel}
            </p>
          </div>
        </div>
      </DrawerBottom2>
    </div>
  );
};

export default ContainerRentalDetailMobile;
