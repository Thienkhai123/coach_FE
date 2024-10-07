import { ITranslation } from "@/interfaces/ITranslation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputText from "@/components/input/text";
import Button from "@/components/button";
import useInputPhone from "@/hook/helper/useInputPhone";
import InputPhone from "@/components/input/phone";
import { REGEX_CCCD } from "@/constant/app";
import { useState } from "react";

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

interface IFirstStepProps {
  translation: ITranslation;
  transportState: ITransportState;
  changeNextStep: () => void;
  handleUpdateSenderInformation: (arg: InforSenderT) => void;
}

interface IFormValues {
  fullName: string;
  email?: string;
  indentify: string;
  address: string;
}

const FirstStep = (props: IFirstStepProps) => {
  const {
    translation,
    changeNextStep,
    handleUpdateSenderInformation,
    transportState,
  } = props;
  const { BOOKING, SIGNIN, ERROR, ACCOUNT, CREATEORDER } = translation;
  const phoneState = useInputPhone({ phone: "", ERROR: ERROR });
  const [agree, setAgree] = useState(false);

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
    defaultValues: { ...transportState?.sender },
  });

  const handleAgree = (status: boolean) => {
    setAgree(status);
  };

  const onSubmit = async (data: IFormValues) => {
    handleUpdateSenderInformation({
      ...data,
      email: data?.email || "",
      phone: phoneState?.phoneNumber,
    });
    changeNextStep();
  };

  return (
    <div className="w-full relative pb-[88px] flex flex-col gap-2">
      <div className="bg-white py-3 px-4">
        <div className="py-2 px-3 bg-primary-900 rounded-lg flex gap-6 items-center">
          <p className="text-neutral-grey-700 font-medium text-sm flex-1">
            {BOOKING.suggestLogin}
          </p>
          <Button
            width="[120px]"
            btnColor="bg-primary-500"
            color="text-sm text-white"
            borderType="border-none"
            padding="px-6"
          >
            {SIGNIN.signIn}
          </Button>
        </div>
      </div>

      <div className="w-full bg-white pt-4">
        <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
          <div className="flex flex-col gap-2 px-4">
            <InputText
              name="fullName"
              register={register}
              errors={errors}
              title={BOOKING.fullName}
              required
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

            <div className="flex items-center gap-2 my-5">
              <div>
                <input
                  type="checkbox"
                  className="w-5 h-5 accent-[#228AD1]"
                  onClick={(e: any) => handleAgree(e.target.checked)}
                />
              </div>
              <p className="text-[#19191B] text-sm font-medium">
                {BOOKING.privacyContent}
              </p>
            </div>
          </div>

          <div className="p-4 bg-white fixed z-0 bottom-0 w-full drop-shadow-xl border">
            <Button
              actionType="submit"
              disabled={!isValid || !phoneState?.phoneNumber || !agree}
              btnColor={
                isValid && !!phoneState?.phoneNumber && agree
                  ? "bg-primary-500"
                  : "bg-primary-600"
              }
              borderRadius="rounded-full"
              fontSize={
                isValid && !!phoneState?.phoneNumber && agree
                  ? "text-base"
                  : "text-base opacity-50"
              }
            >
              {BOOKING.continue}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FirstStep;
