import ConfirmPaymentTransportScreen from "@/components/Pages/thanh-toan-gui-hang/confirmPaymentScreen";
import WaitingForConfirmTransportScreen from "@/components/Pages/thanh-toan-gui-hang/waitingForConfirmScreen";
import { ITranslation } from "@/interfaces/ITranslation";
import { useState } from "react";

interface IContainerPaymentMobileProps {
  translation: ITranslation;
}

const ContainerPaymentTransportMobile = ({
  translation,
}: IContainerPaymentMobileProps) => {
  const [screen, setScreen] = useState(1);

  const changeNextStep = () => {
    setScreen(screen + 1);
  };

  return (
    <div className="w-full">
      {screen === 1 && (
        <ConfirmPaymentTransportScreen
          translation={translation}
          changeNextStep={changeNextStep}
        />
      )}
      {screen === 2 && (
        <WaitingForConfirmTransportScreen translation={translation} />
      )}
    </div>
  );
};

export default ContainerPaymentTransportMobile;
