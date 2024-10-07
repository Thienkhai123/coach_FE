import { IBookingTranslate } from "@/interfaces/IBookingTranslate";
import React, { useEffect, useState } from "react";
import NavbarTrip from "./navbarTrip";
import Button from "@/components/button";
import { IErrorTranslate } from "@/interfaces/IErrorTranslate";
import InputText from "@/components/input/text";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DrawerBottom2 from "@/components/drawer-bottom2";
import useModal from "@/hook/useModal";
import ModalPickBirthday from "../trang-chu/modalPickBirthday";
import moment from "moment";

interface IModalInformationCustomerProps {
  BOOKING: IBookingTranslate;
  handleBack: () => void;
  seats: string[];
  ERROR: IErrorTranslate;
  setTempInformationCustomer: (arg: any) => void;
  tempInformationCustomer: any[];
  watch: any;
  phoneNumber: string;
}

const InformationCustomer = ({
  seat,
  BOOKING,
  errors,
  register,
  showInformationOwner = false,
  handleApplyUserInformation = () => {},
  setValue,
  defaultBornYear,
}: {
  seat: string;
  BOOKING: IBookingTranslate;
  errors: any;
  register: any;
  showInformationOwner?: boolean;
  handleApplyUserInformation?: (arg: boolean) => void;
  setValue: any;
  defaultBornYear: string;
}) => {
  const [startDate, setStartDate] = useState<Date | null>(
    defaultBornYear
      ? new Date(moment(defaultBornYear, "DD-MM-YYYY")?.toLocaleString())
      : null
  );
  const [openModalBirthday, toggleModalBirthDay] = useModal();

  const handlePickDate = (val: Date | null) => {
    setStartDate(val);
    setValue("bornYear" + seat, moment(val).format("DD/MM/YYYY").toString());
    toggleModalBirthDay();
  };

  useEffect(() => {
    setStartDate(
      defaultBornYear
        ? new Date(moment(defaultBornYear, "DD-MM-YYYY")?.toLocaleString())
        : null
    );
  }, [defaultBornYear]);

  return (
    <>
      <div className="bg-white p-4 flex flex-col gap-4">
        <div className="bg-semantic-green-light py-1 px-2 rounded-full w-fit">
          <p className="text-neutral-grey-600 font-extrabold text-xs">
            {BOOKING.customerSitOn} {seat}
          </p>
        </div>

        {showInformationOwner && (
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              className="w-5 h-5 accent-[#228AD1]"
              onClick={(e: any) =>
                handleApplyUserInformation(e.target?.checked)
              }
            />
            <p className="text-neutral-grey-700 font-medium text-sm">
              {BOOKING.useCustomerInformation}
            </p>
          </div>
        )}

        <div className="w-full border border-[#EFEFF0]" />

        <div className="flex flex-col gap-3">
          <InputText
            name={"name" + seat}
            title={BOOKING.fullName}
            errors={errors}
            register={register}
            placeholder={BOOKING.fullName}
          />

          <div className="flex gap-3">
            <div className="flex-1">
              <InputText
                name={"phone" + seat}
                title={BOOKING.phone}
                errors={errors}
                register={register}
                placeholder={BOOKING.phone}
              />
            </div>

            <div className="w-[140px]">
              <p className="text-sm font-medium text-neutral-grey-600 mb-1">
                {BOOKING.bornYear}
              </p>
              <div
                onClick={toggleModalBirthDay}
                className="border border-[#AFB1B6] py-2 px-4 rounded-lg w-full"
              >
                <p className="text-base ">
                  {startDate
                    ? moment(startDate)?.format("DD/MM/YYYY")
                    : "dd/mm/yy"}
                </p>
              </div>
            </div>
          </div>

          <InputText
            name={"email" + seat}
            title={BOOKING.email}
            errors={errors}
            register={register}
            placeholder={BOOKING.email}
          />
        </div>
      </div>
      <DrawerBottom2
        open={openModalBirthday}
        toggleDrawer={toggleModalBirthDay}
        wrapChildStyle=""
        childStyle="w-screen bg-white rounded-tl-2xl rounded-tr-xl"
        animationName="animation-open-date-picker"
        closeStyle="animation-off-date-picker"
      >
        <ModalPickBirthday
          title={BOOKING.bornYear}
          btnTitle={BOOKING.continue}
          dateSelected={startDate}
          onSubmit={handlePickDate}
        />
      </DrawerBottom2>
    </>
  );
};

const ModalInformationCustomer = (props: IModalInformationCustomerProps) => {
  const {
    BOOKING,
    handleBack,
    seats,
    ERROR,
    setTempInformationCustomer,
    tempInformationCustomer,
    watch,
    phoneNumber,
  } = props;

  const schema = yup.object().shape({});

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch: watchInForm,
    formState: { errors, isValid },
  } = useForm<any>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const handleApplyUserInformation = (checked?: boolean) => {
    if (checked) {
      setValue("name" + seats[0], watch("fullName") || "");
      setValue("phone" + seats[0], phoneNumber || "");
      setValue("email" + seats[0], watch("email") || "");
      setValue("bornYear" + seats[0], watch("bornYear") || "");
    } else {
      setValue("name" + seats[0], "");
      setValue("phone" + seats[0], "");
      setValue("email" + seats[0], "");
      setValue("bornYear" + seats[0], "");
    }
  };

  const onSubmit = async (data: any) => {
    const tmp: any = [];
    seats?.forEach((seat) => {
      if (
        data["name" + seat] ||
        data["email" + seat] ||
        data["bornYear" + seat] ||
        data["phone" + seat]
      ) {
        tmp.push({
          name: data["name" + seat],
          email: data["email" + seat],
          bornYear: data["bornYear" + seat],
          phone: data["phone" + seat],
          seat: seat,
        });
      }
    });
    setTempInformationCustomer(tmp);
    handleBack();
  };

  useEffect(() => {
    const handleUpdateDefaultValues = () => {
      if (tempInformationCustomer?.length > 0) {
        tempInformationCustomer?.forEach((info) => {
          setValue("name" + info?.seat, info?.name);
          setValue("phone" + info?.seat, info?.phone);
          setValue("email" + info?.seat, info?.email);
          setValue("bornYear" + info?.seat, info?.bornYear);
        });
      }
    };

    handleUpdateDefaultValues();
  }, []);

  return (
    <div className="relative pb-24">
      <NavbarTrip
        title={BOOKING.informationCustomer}
        time=""
        textAction=""
        handleChange={() => {}}
        handleChangePrevStep={handleBack}
        classNameFlex="flex gap-10 items-center"
      />
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        {seats?.map((seat, ind) => (
          <InformationCustomer
            key={`info-seat-${ind}`}
            seat={seat}
            BOOKING={BOOKING}
            errors={errors}
            register={register}
            showInformationOwner={ind === 0}
            handleApplyUserInformation={handleApplyUserInformation}
            setValue={setValue}
            defaultBornYear={watchInForm("bornYear" + seat)}
          />
        ))}
        <div className="px-4 py-2 fixed bottom-0 z-10 bg-white w-full border border-neutral-grey-100 shadow-[gba(0,0,0,0.06),rgba(0,0,0,0.03)]">
          <Button actionType="submit">{BOOKING.saveInformation}</Button>
        </div>
      </form>
    </div>
  );
};

export default ModalInformationCustomer;
