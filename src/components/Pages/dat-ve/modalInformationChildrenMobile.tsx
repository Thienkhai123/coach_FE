import { IBookingTranslate } from "@/interfaces/IBookingTranslate";
import { IErrorTranslate } from "@/interfaces/IErrorTranslate";
import React, { useEffect, useState } from "react";
import NavbarTrip from "./navbarTrip";
import NotificationIcon from "@/components/icons/notification";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "@/components/button";
import InputText from "@/components/input/text";
import moment from "moment";
import useModal from "@/hook/useModal";
import DrawerBottom2 from "@/components/drawer-bottom2";
import ModalPickBirthday from "../trang-chu/modalPickBirthday";

interface IModalInformationChildrenMobileProps {
  BOOKING: IBookingTranslate;
  ERROR: IErrorTranslate;
  seats: string[];
  handleBack: () => void;
  setTempInformationChildren: (arg: any) => void;
  tempInformationChildren: any;
}

type RenderItemType = {
  seat: string;
  BOOKING: IBookingTranslate;
  handleAddValidateForm: (arg: string, arg2: boolean) => void;
  errors: any;
  register: any;
  defaultOpen?: boolean;
  setValue: any;
  defaultBornYear: string;
};

const RenderItem = (props: RenderItemType) => {
  const {
    BOOKING,
    seat,
    handleAddValidateForm,
    errors,
    register,
    defaultOpen = false,
    setValue,
    defaultBornYear,
  } = props;
  const [startDate, setStartDate] = useState<Date | null>(
    defaultBornYear
      ? new Date(moment(defaultBornYear, "DD-MM-YYYY")?.toLocaleString())
      : null
  );
  const [openModalBirthday, toggleModalBirthDay] = useModal();

  const [open, setOpen] = useState(defaultOpen);
  const toggle = () => {
    handleAddValidateForm(seat, !open);
    setOpen(!open);
  };

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
      <div className="bg-white p-4">
        <div className="flex items-center justify-between gap-2">
          <div className="bg-semantic-green-light py-1 px-2 rounded-full w-fit">
            <p className="text-neutral-grey-600 font-extrabold text-xs">
              {BOOKING.childrenSitSameChair2} {seat}
            </p>
          </div>

          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              defaultChecked={open}
              value=""
              className="sr-only peer"
            />
            <div
              className="relative w-11 h-6 bg-[#BFBFBF] peer-focus:outline-none peer-checked:bg-[#1890FF] peer-focus:ring-4 peer-focus:ring-transparent dark:peer-focus:ring-transparent rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
              onClick={toggle}
            ></div>
          </label>
        </div>

        {open && (
          <div className="mt-2">
            <label>
              <div className="flex gap-3 mb-1">
                <input
                  type="radio"
                  className="w-5 h-5 accent-[#228AD1] peer"
                  {...register("option" + seat)}
                  value="option1"
                />
                <div className="peer-checked:block hidden">
                  <p className="text-neutral-grey-700 font-bold text-sm">
                    {BOOKING.childrenBelowWeightAndHeight}
                  </p>
                  <p className="text-semantic-green font-bold text-sm">
                    {BOOKING.freeForChildrenWithAdult}
                  </p>
                </div>
                <div className="peer-checked:hidden block mb-1">
                  <p className="text-neutral-grey-700 font-bold text-sm">
                    {BOOKING.childrenBelowWeightAndHeight}
                  </p>
                </div>
              </div>
            </label>

            <label>
              <div className="flex gap-3">
                <input
                  type="radio"
                  className="w-5 h-5 accent-[#228AD1] peer"
                  {...register("option" + seat)}
                  value="option2"
                />
                <div className="peer-checked:block hidden">
                  <p className="text-neutral-grey-700 font-bold text-sm">
                    {BOOKING.childrenBelowWeightAndHeight2}
                  </p>
                  <p className="text-semantic-red font-bold text-sm">
                    {BOOKING.extraFeesChildrenSitWithAdult}
                  </p>
                </div>

                <div className="peer-checked:hidden block mb-1">
                  <p className="text-neutral-grey-700 font-bold text-sm">
                    {BOOKING.childrenBelowWeightAndHeight2}
                  </p>
                </div>
              </div>
            </label>

            <div className="flex flex-col mt-5 gap-3">
              <InputText
                name={"name" + seat}
                title={BOOKING.fullName}
                errors={errors}
                register={register}
                placeholder={BOOKING.fullName}
              />

              <div className="w-full">
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
          </div>
        )}
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

const ModalInformationChildrenMobile = (
  props: IModalInformationChildrenMobileProps
) => {
  const {
    BOOKING,
    ERROR,
    handleBack,
    seats,
    setTempInformationChildren,
    tempInformationChildren,
  } = props;

  const schema = yup.object().shape({});

  const {
    register,
    handleSubmit,
    setValue,
    unregister,
    watch: watchInForm,
    formState: { errors, isValid },
  } = useForm<any>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const handleAddValidateForm = (seat: string, status: boolean) => {
    if (status) {
      setValue("option" + seat, "option1");
    } else {
      unregister("name" + seat);
      unregister("bornYear" + seat);
      unregister("option" + seat);
    }
  };

  const onSubmit = async (data: any) => {
    if (Object.keys(data)?.length > 0) {
      const tmp: any = [];
      seats?.forEach((seat) => {
        if (data["option" + seat]) {
          tmp.push({
            name: data["name" + seat],
            bornYear: data["bornYear" + seat],
            option: data["option" + seat],
            seat: seat,
          });
        }
      });
      setTempInformationChildren(tmp);
    } else {
      setTempInformationChildren([]);
    }
    handleBack();
  };

  useEffect(() => {
    if (tempInformationChildren?.length > 0) {
      tempInformationChildren?.forEach((info: any) => {
        const { seat, name, bornYear, option } = info || {};
        setValue("name" + seat, name);
        setValue("bornYear" + seat, bornYear);
        setValue("option" + seat, option);
      });
    }
  }, []);

  return (
    <div className="relative pb-24">
      <NavbarTrip
        title={BOOKING.informationCustomerChildren}
        time=""
        textAction=""
        handleChange={() => {}}
        handleChangePrevStep={handleBack}
        classNameFlex="flex gap-10 items-center"
      />
      <div className="bg-white py-3 px-4 mb-2">
        <div className="bg-primary-900 flex items-center gap-2 py-2 px-3 rounded-lg">
          <div className="w-8 h-8 rounded-full p-2 bg-primary-800">
            <NotificationIcon />
          </div>
          <p className="text-neutral-grey-700 font-semibold text-sm">
            {BOOKING.noteHeighWeightForChildren}
          </p>
        </div>
      </div>

      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        {seats?.map((seat, ind) => {
          const existItem = tempInformationChildren?.filter(
            (info: any) => info?.seat === seat
          );

          return (
            <RenderItem
              key={`child-seat-${ind}`}
              seat={seat}
              BOOKING={BOOKING}
              handleAddValidateForm={handleAddValidateForm}
              errors={errors}
              register={register}
              defaultOpen={existItem?.length > 0}
              setValue={setValue}
              defaultBornYear={watchInForm("bornYear" + seat)}
            />
          );
        })}

        <div className="px-4 py-2 fixed bottom-0 z-10 bg-white w-full border border-neutral-grey-100 shadow-[gba(0,0,0,0.06),rgba(0,0,0,0.03)]">
          <Button actionType="submit">{BOOKING.saveInformation}</Button>
        </div>
      </form>
    </div>
  );
};

export default ModalInformationChildrenMobile;
