import OrderDetailShipping from "@/components/Pages/don-hang/orderDetailShippingScreen";
import OrderInformationScreen from "@/components/Pages/don-hang/orderInfomationScreen";
import { ITranslation } from "@/interfaces/ITranslation";
import React, { Fragment, useState } from "react";

interface IContainerOrderMobileProps {
  translation: ITranslation;
  orderId: string;
}

const ContainerOrderMobile = (props: IContainerOrderMobileProps) => {
  const { translation, orderId } = props;
  const [screen, setScreen] = useState(1);

  const nextScreen = () => {
    setScreen(screen + 1);
  };

  const prevScreen = () => {
    setScreen(screen - 1);
  };

  return (
    <Fragment>
      {screen === 1 && (
        <OrderInformationScreen
          translation={translation}
          nextScreen={nextScreen}
          orderId={orderId}
        />
      )}
      {screen === 2 && (
        <OrderDetailShipping
          translation={translation}
          prevScreen={prevScreen}
          orderId={orderId}
        />
      )}
    </Fragment>
  );
};

export default ContainerOrderMobile;
