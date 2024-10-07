import ConfirmPaymentScreen from "@/components/Pages/thanh-toan/confirmPaymentScreen";
import WaitingForConfirmScreen from "@/components/Pages/thanh-toan/waitingForConfirmScreen";
import { ITranslation } from "@/interfaces/ITranslation";
import { useState } from "react";

interface IContainerPaymentMobileProps {
  translation: ITranslation;
}

const ContainerPaymentMobile = ({
  translation,
}: IContainerPaymentMobileProps) => {
  const [screen, setScreen] = useState(1);

  const changeNextStep = () => {
    setScreen(screen + 1);
  };

  return (
    <div className="w-full">
      {screen === 1 && (
        <ConfirmPaymentScreen
          translation={translation}
          changeNextStep={changeNextStep}
        />
      )}
      {screen === 2 && <WaitingForConfirmScreen translation={translation} />}
    </div>
  );
};

export default ContainerPaymentMobile;
