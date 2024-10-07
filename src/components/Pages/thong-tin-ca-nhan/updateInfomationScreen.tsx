import NavbarBasic from "@/components/navbar/basic";
import { ITranslation } from "@/interfaces/ITranslation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputText from "@/components/input/text";
import useInputPhone from "@/hook/helper/useInputPhone";
import InputPhone from "@/components/input/phone";
import { useEffect, useState } from "react";
import InputDate from "@/components/input/date";
import Button from "@/components/button";
import {
  IUpdateProfileResponse,
  IUserProfile,
} from "@/interfaces/httpRequest/IUser";
import { fetchUserProfile, updateProfile } from "@/apis/user";
import { useCustomToast } from "@/hook/useToast";

interface IUpdateInformationScreenProps {
  translation: ITranslation;
  defaultValues: IUserProfile;
  handlePrevScreen: () => void;
  setProfile: (arg: any) => void;
}

interface IFormValues {
  name?: string;
  gender?: string;
  birthday?: string;
  email?: string;
  address?: string;
}

const UpdateInformationScreen = (props: IUpdateInformationScreenProps) => {
  const { translation, handlePrevScreen, defaultValues, setProfile } = props;
  const { ACCOUNT, BOOKING, ERROR } = translation;
  const { phone } = defaultValues;
  const phoneState = useInputPhone({ phone: phone, ERROR: ERROR });
  // const [startDate, setStartDate] = useState<Date | null>(new Date(birthDay));
  const currentYear = new Date().getFullYear();
  const [isLoading, setLoading] = useState(false);
  const { toastSuccess, toastError } = useCustomToast();

  const schema = yup.object().shape({
    name: yup.string().required(ERROR.errorRequired),
    gender: yup.string().required(ERROR.errorRequired),
    email: yup.string(),
    address: yup.string(),
    birthday: yup
      .string()
      .required(ERROR.errorRequired)
      .matches(/^\d{4}$/, "Năm sinh phải có 4 chữ số")
      .test("is-valid-year", "Năm sinh không hợp lệ", (value) => {
        const year = parseInt(value || "", 10);
        return year < currentYear && year >= currentYear - 120;
      }),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<IFormValues>({
    resolver: yupResolver<IFormValues>(schema),
    mode: "onChange",
    // defaultValues: defaultValues,
  });

  const onSubmit = async (data: IFormValues) => {
    setLoading(true);
    const payload = {
      name: data?.name || "",
      gender: parseInt(data?.gender || "0"),
      email: data?.email || "",
      address: data?.address || "",
      birthday: data?.birthday || "",
      phone: phoneState?.phoneNumber,
    };
    const res: IUpdateProfileResponse = await updateProfile(payload);
    if (res?.isSuccess) {
      const resProfile = await fetchUserProfile();
      if (resProfile?.isSuccess) {
        setProfile(resProfile.data);
        setLoading(false);
        toastSuccess({
          message: ACCOUNT.updateSuccess,
          toastId: "update-profile-mobile-success",
        });
        handlePrevScreen();
      }
    } else {
      setLoading(false);
      toastError({
        message: res?.errorMessage,
        toastId: "update-profile-mobile-error",
      });
    }
  };

  useEffect(() => {
    setValue("name", defaultValues?.name || "");
    setValue("email", defaultValues?.email || "");
    setValue("address", defaultValues?.address || "");
    setValue("gender", defaultValues?.gender?.toString() || "");
    setValue("birthday", defaultValues?.birthday || "");
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white relative">
      <div className="border-b border-b-[#EBEBEB]">
        <NavbarBasic
          title={ACCOUNT.editInformation}
          handleClick={handlePrevScreen}
        />
      </div>
      <div className="p-4">
        <div className="flex flex-col gap-3">
          <InputText
            name="name"
            register={register}
            errors={errors}
            title={BOOKING.fullName}
            required
            placeholder={BOOKING.fullName}
          />

          <div>
            <p className="text-sm  text-neutral-grey-700 font-semibold mb-2">
              {ACCOUNT.gender} <span className="text-semantic-red">*</span>
            </p>

            <div className="grid grid-cols-3">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  {...register("gender")}
                  value="1"
                  className="w-5 h-5 accent-[#228AD1]"
                />
                <p className="text-neutral-grey-700 font-bold text-sm">
                  {ACCOUNT.male}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  {...register("gender")}
                  value="2"
                  className="w-5 h-5 accent-[#228AD1]"
                />
                <p className="text-neutral-grey-700 font-bold text-sm">
                  {ACCOUNT.female}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  {...register("gender")}
                  value="3"
                  className="w-5 h-5 accent-[#228AD1]"
                />
                <p className="text-neutral-grey-700 font-bold text-sm">
                  {ACCOUNT.other}
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-2 justify-between items-center">
            <InputPhone {...phoneState} title={BOOKING.phone} required />
            <InputText
              name="birthday"
              register={register}
              errors={errors}
              title={ACCOUNT.birthDay}
              required
              placeholder={ACCOUNT.birthDay}
            />
          </div>

          <InputText
            name="email"
            register={register}
            errors={errors}
            title={BOOKING.email}
            placeholder={BOOKING.email}
          />

          <InputText
            name="address"
            register={register}
            errors={errors}
            title={ACCOUNT.address}
          />
        </div>
      </div>
      <div className="p-4 fixed bottom-0 z-10 bg-white w-full border border-neutral-grey-100 shadow-[gba(0,0,0,0.06),rgba(0,0,0,0.03)]">
        <Button
          actionType="submit"
          disabled={isLoading || phoneState?.errorPhone !== ""}
        >
          {ACCOUNT.save}
        </Button>
      </div>
    </form>
  );
};

export default UpdateInformationScreen;
