import { ITranslation } from "@/interfaces/ITranslation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputText from "@/components/input/text";
import Button from "@/components/button";
import useInputPhone from "@/hook/helper/useInputPhone";
import InputPhone from "@/components/input/phone";
import { REGEX_CCCD } from "@/constant/app";

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

interface ISecondStepProps {
  translation: ITranslation;
  transportState: ITransportState;
  changeNextStep: () => void;
  handleUpdateReceiverInformation: (arg: InforSenderT) => void;
}

interface IFormValues {
  fullName: string;
  email?: string;
  indentify: string;
  address: string;
}

const SecondStep = (props: ISecondStepProps) => {
  const {
    translation,
    transportState,
    changeNextStep,
    handleUpdateReceiverInformation,
  } = props;
  const { BOOKING, ERROR, ACCOUNT, CREATEORDER } = translation;
  const phoneState = useInputPhone({ phone: "", ERROR: ERROR });

  const schema = yup.object().shape({
    fullName: yup.string().required(ERROR.errorRequired),
    email: yup.string().email(ERROR.errorEmail),
    indentify: yup
      .string()
      .required(ERROR.errorRequired)
      .matches(REGEX_CCCD, CREATEORDER.errors.warningType),
    address: yup.string().required(ERROR.errorRequired),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormValues>({
    resolver: yupResolver<IFormValues>(schema),
    mode: "onChange",
    defaultValues: { ...transportState?.receiver },
  });

  const onSubmit = async (data: IFormValues) => {
    handleUpdateReceiverInformation({
      ...data,
      email: data?.email || "",
      phone: phoneState?.phoneNumber,
    });

    changeNextStep();
  };

  useEffect(() => {
    if (transportState?.receiver?.phone !== "") {
      phoneState.handleChangePhone(transportState?.receiver?.phone);
    }
  }, []);

  return (
    <div className="relative bg-white">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2 px-4 py-3">
          <InputText
            name="fullName"
            register={register}
            errors={errors}
            title={BOOKING.fullName}
            placeholder={BOOKING.fullName}
          />

          <InputPhone
            {...phoneState}
            title={BOOKING.phone}
            required
            placeholder={BOOKING.phone}
          />

          <InputText
            name="indentify"
            register={register}
            errors={errors}
            title={BOOKING.indentify}
            required
            placeholder={BOOKING.indentify}
          />

          <InputText
            name="address"
            register={register}
            errors={errors}
            title={ACCOUNT.address}
            required
            placeholder={ACCOUNT.address}
          />

          <InputText
            name="email"
            register={register}
            errors={errors}
            title={BOOKING.email}
            placeholder={BOOKING.email}
          />
        </div>
        <div className="p-4 bg-white fixed z-0 bottom-0 w-full drop-shadow-xl border">
          <Button
            actionType="submit"
            disabled={!isValid || !phoneState?.phoneNumber}
            btnColor={
              isValid && !!phoneState?.phoneNumber
                ? "bg-primary-500"
                : "bg-primary-600"
            }
            borderRadius="rounded-full"
            fontSize={
              isValid && !!phoneState?.phoneNumber
                ? "text-base"
                : "text-base opacity-50"
            }
          >
            {BOOKING.continue}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SecondStep;
