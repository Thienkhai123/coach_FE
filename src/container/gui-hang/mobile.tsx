import FirstStep from "@/components/Pages/gui-hang/firstStep";
import FiveStep from "@/components/Pages/gui-hang/fiveStep";
import FourStep from "@/components/Pages/gui-hang/fourStep";
import SecondStep from "@/components/Pages/gui-hang/secondStep";
import ThirdStep from "@/components/Pages/gui-hang/thirdStep";
import NavbarBasic from "@/components/navbar/basic";
import Stepper from "@/components/stepper";
import useTransport from "@/hook/transport/useTransport";
import { ITranslation } from "@/interfaces/ITranslation";
import { ICityResponse } from "@/interfaces/httpRequest/ICity";
import { PackageOutside } from "@/interfaces/httpRequest/IOrder";
import { useState } from "react";

interface IContainerTransportMobileProps {
  translation: ITranslation;
  city?: ICityResponse;
  typePack?: PackageOutside;
}

const ContainerTransportMobile = (props: IContainerTransportMobileProps) => {
  const { translation, city, typePack } = props;
  const { TRANSPORT } = translation;
  const {
    transportState,
    handleUpdateSenderInformation,
    handleUpdateReceiverInformation,
    handleUpdateLocationAndPayerInfor,
    handleUpdateProductions,
  } = useTransport();
  const [step, setStep] = useState(1);

  const LIST_STEP = [
    {
      id: 1,
      value: TRANSPORT.step1,
    },
    {
      id: 2,
      value: TRANSPORT.step2,
    },
    {
      id: 3,
      value: TRANSPORT.step3,
    },
    {
      id: 4,
      value: TRANSPORT.step4,
    },
    {
      id: 5,
      value: TRANSPORT.step5,
    },
  ];

  const changeNextStep = () => {
    if (step < 5) {
      const thisStepper = document.getElementById("stepper-" + step);
      if (thisStepper) {
        thisStepper?.scrollIntoView({ behavior: "smooth", block: "end" });
      }
      setStep(step + 1);
    }
  };

  const changePrevStep = () => {
    if (step > 1) {
      const thisStepper = document.getElementById("stepper-" + (step - 2));
      if (thisStepper) {
        thisStepper?.scrollIntoView({ behavior: "smooth", block: "end" });
      }
      setStep(step - 1);
    } else {
      window.location.assign("/");
    }
  };

  return (
    <div className="w-full">
      <NavbarBasic
        title={TRANSPORT.createOrderTransport}
        handleClick={changePrevStep}
      />
      <Stepper list={LIST_STEP} step={step} />
      <div className={`${step === 1 ? "block" : "hidden"}`}>
        <FirstStep
          translation={translation}
          changeNextStep={changeNextStep}
          handleUpdateSenderInformation={handleUpdateSenderInformation}
          transportState={transportState}
        />
      </div>
      {step === 2 && (
        <SecondStep
          translation={translation}
          changeNextStep={changeNextStep}
          handleUpdateReceiverInformation={handleUpdateReceiverInformation}
          transportState={transportState}
        />
      )}
      <div className={`${step === 3 ? "block" : "hidden"}`}>
        <ThirdStep
          translation={translation}
          changeNextStep={changeNextStep}
          city={city}
          handleUpdateLocationAndPayerInfor={handleUpdateLocationAndPayerInfor}
        />
      </div>
      <div className={`${step === 4 ? "block" : "hidden"}`}>
        <FourStep
          translation={translation}
          changeNextStep={changeNextStep}
          handleUpdateProductions={handleUpdateProductions}
          typePack={typePack}
        />
      </div>

      {step === 5 && (
        <FiveStep
          translation={translation}
          changeNextStep={changeNextStep}
          transportState={transportState}
        />
      )}
    </div>
  );
};

export default ContainerTransportMobile;
