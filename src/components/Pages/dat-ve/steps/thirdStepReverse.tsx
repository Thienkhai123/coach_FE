import { IBookingTranslate } from "@/interfaces/IBookingTranslate";
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IErrorTranslate } from "@/interfaces/IErrorTranslate";
import { IPlaceholderTranslate } from "@/interfaces/IPlaceholderTranslate";
import InputText from "@/components/input/text";
import CountDown from "@/components/count-down";
import Button from "@/components/button";
import { ISignInTranslate } from "@/interfaces/ISignInTranslate";
import PersonIcon from "@/components/icons/person";
import ArrowRightIcon from "@/components/icons/arrowRight";
import FullScreenModal from "@/components/modal/FullScreenModal";
import useModal from "@/hook/useModal";
import ModalInformationCustomer from "../modalInformationCustomer";
import InputPhone from "@/components/input/phone";
import useInputPhone from "@/hook/helper/useInputPhone";
import ModalInformationChildrenMobile from "../modalInformationChildrenMobile";
import { IUserProfile } from "@/interfaces/httpRequest/IUser";
import Modal from "@/components/modal/Modal";
import SignInModalContent from "../signInModalContent";
import moment from "moment";
import DrawerBottom2 from "@/components/drawer-bottom2";
import ModalPickBirthday from "../../trang-chu/modalPickBirthday";

type User = {
  name: string;
  phone: string;
  bornYear: string;
  email: string;
};

type BookingSeatT = {
  seats: string[];
  customersInfo: any;
  userInfo: any;
  childrenInfo: any;
};

interface IThirdStepReverseProps {
  BOOKING: IBookingTranslate;
  ERROR: IErrorTranslate;
  PLACEHOLDER: IPlaceholderTranslate;
  SIGNIN: ISignInTranslate;
  bookingInformation: BookingSeatT;
  bookingInformationReverse: BookingSeatT;
  userProfile: IUserProfile;
  countdownTime: number;
  isRevert?: boolean;
  handleUpdateCustomerInformation: (arg: any) => void;
  handleUpdateChildrenInfo: (arg: any) => void;
  handleUpdateUserInfo: (arg: any) => void;
  handleUpdateCustomerInformationReverse: (arg: any) => void;
  handleUpdateChildrenInfoReverse: (arg: any) => void;
}

interface IFormValues {
  fullName?: string;
  email?: string;
  bornYear?: string;
}

const FAKE_FEE = "50%";

const RenderOptional = ({ title = "", subtitle = "", onClick = () => {} }) => {
  return (
    <div
      className="flex items-center gap-2 bg-secondary-600 px-2 py-2.5 rounded-lg"
      onClick={onClick}
    >
      <PersonIcon />
      <p className="text-neutral-grey-600 text-sm font-semibold flex-1">
        {title}
        <br />
        <span className="text-xs">{subtitle}</span>
      </p>
      <ArrowRightIcon />
    </div>
  );
};

const RenderItem = ({
  name = "",
  phone = "",
  bornYear = "",
  titlePhone = "",
  titleBornYear = "",
  textEmpty = "",
  titleName = "",
}) => {
  return (
    <li className="py-2 border-b [&:not(:last-child)]:border-b [&:not(:last-child)]:border-b-neutral-grey-100 flex flex-col gap-0.5">
      <p className="text-neutral-grey-600 font-semibold text-sm">
        {name || `${titleName}: ${textEmpty}`}
      </p>
      <div className="grid grid-cols-2 gap-2">
        <p className="text-neutral-grey-600 text-xs font-medium">
          {titlePhone}: {phone || textEmpty}
        </p>
        <p className="text-neutral-grey-600 text-xs font-medium">
          {titleBornYear}: {bornYear || textEmpty}
        </p>
      </div>
    </li>
  );
};

const RenderItemChildren = ({
  name = "",
  bornYear = "-",
  titleBornYear = "",
  status = "",
  fee = "",
  textEmpty = "",
  titleName = "",
}) => {
  return (
    <li className="py-2 border-b [&:not(:last-child)]:border-b [&:not(:last-child)]:border-b-neutral-grey-100 flex flex-col gap-0.5">
      <div className="flex gap-2 justify-between">
        <div>
          <p className="text-neutral-grey-600 font-semibold text-sm">
            {name || `${titleName}: ${textEmpty}`}
          </p>
          <p className="text-neutral-grey-600 text-xs font-medium">{status}</p>
          <p className="text-neutral-grey-600 text-xs font-medium">
            {titleBornYear}: {bornYear || textEmpty}
          </p>
        </div>

        <div>
          <div className="text-white font-bold text-xs bg-secondary-300 rounded-full py-1 px-2">
            {fee}
          </div>
        </div>
      </div>
    </li>
  );
};

const ThirdStepReverse = ({
  BOOKING,
  ERROR,
  PLACEHOLDER,
  SIGNIN,
  bookingInformation,
  bookingInformationReverse,
  handleUpdateCustomerInformation,
  handleUpdateCustomerInformationReverse,
  handleUpdateChildrenInfo,
  handleUpdateChildrenInfoReverse,
  handleUpdateUserInfo,
  userProfile,
  countdownTime,
  isRevert = false,
}: IThirdStepReverseProps) => {
  const [openModalSignIn, toggleModalSignIn] = useModal();
  const [modalInforCustomer, toggleModalInforCustomer] = useModal();

  const [modalInforCustomerReverse, toggleModalInforCustomerReverse] =
    useModal();
  const [modalInforChildren, toggleModalInforChildren] = useModal();
  const [modalInforChildrenReverse, toggleModalInforChildrenReverse] =
    useModal();
  const [openModalBirthday, toggleModalBirthDay] = useModal();

  const [tempInformationCustomer, setTempInformationCustomer] = useState([]);
  const [tempInformationCustomerReverse, setTempInformationCustomerReverse] =
    useState([]);

  const [tempInformationChildren, setTempInformationChildren] = useState([]);
  const [tempInformationChildrenReverse, setTempInformationChildrenReverse] =
    useState([]);

  const [startDate, setStartDate] = useState<Date | null>(
    bookingInformation?.userInfo?.bornYear
      ? new Date(
          moment(
            bookingInformation?.userInfo?.bornYear,
            "DD-MM-YYYY"
          )?.toLocaleString()
        )
      : null
  );

  const phoneState = useInputPhone({ phone: "", ERROR: ERROR });

  const OPTION = {
    option1: {
      status: BOOKING.childrenBelowWeightAndHeight,
      fee: BOOKING.free,
    },
    option2: {
      status: BOOKING.childrenBelowWeightAndHeight2,
      fee: `${BOOKING.extraFee} ${FAKE_FEE}`,
    },
  };

  const schema = yup.object().shape({
    fullName: yup.string().required(ERROR.errorRequired),
    email: yup.string().email(ERROR.errorEmail),
    bornYear: yup
      .string()
      .required(ERROR.errorRequired)
      .test("is-valid-year", ERROR.bornYearInvalid, (value) => {
        if (!value) return true;
        return (
          /^\d{4}$/.test(value) &&
          parseInt(value, 10) < new Date().getFullYear() &&
          parseInt(value, 10) >= new Date().getFullYear() - 120
        );
      }),
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<IFormValues>({
    resolver: yupResolver<IFormValues>(schema),
    mode: "onChange",
    defaultValues: bookingInformation?.userInfo || {},
  });

  const handlePickDate = (val: Date | null) => {
    setStartDate(val);
    setValue("bornYear", moment(val).format("DD/MM/YYYY").toString());
    toggleModalBirthDay();
  };

  const hanldeSubmitCustomerInfo = (arg: any) => {
    handleUpdateCustomerInformation(arg);
    setTempInformationCustomer(arg);
  };

  const handleSubmitCustomerInfoReverse = (arg: any) => {
    handleUpdateCustomerInformationReverse(arg);
    setTempInformationCustomerReverse(arg);
  };

  const handleSubtmitChildrenInfo = (arg: any) => {
    setTempInformationChildren(arg);
    handleUpdateChildrenInfo(arg);
  };

  const handleSubmitChildrenInfoReverse = (arg: any) => {
    setTempInformationChildrenReverse(arg);
    handleUpdateChildrenInfoReverse(arg);
  };

  const onSubmit = async () => {
    const tmpUserInfo = {
      fullName: watch("fullName"),
      phone: phoneState?.phoneNumber,
      email: watch("email"),
      bornYear: watch("bornYear"),
    };
    handleUpdateUserInfo(tmpUserInfo);
  };

  useEffect(() => {
    const {
      customersInfo = [],
      userInfo,
      childrenInfo,
    } = bookingInformation || {};
    if (customersInfo?.length > 0) {
      setTempInformationCustomer(customersInfo);
    }
    if (Object.keys(userInfo)?.length > 0) {
      phoneState?.handleChangePhone(userInfo?.phone);
    }
    if (childrenInfo?.length > 0) {
      setTempInformationChildren(childrenInfo);
    }
  }, []);

  return (
    <Fragment>
      <div className="flex flex-col gap-2 bg-neutral-grey-100 relative pb-40">
        {userProfile === null && (
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
                onClick={toggleModalSignIn}
              >
                {SIGNIN.signIn}
              </Button>
            </div>
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 p-4 bg-white"
        >
          <InputText
            name="fullName"
            register={register}
            errors={errors}
            title={BOOKING.fullNameBookingPerson}
            required
            placeholder={BOOKING.fullName + " *"}
          />

          <div className="flex gap-3">
            <div className="flex-1">
              <InputPhone {...phoneState} title={BOOKING.phone} required />
            </div>

            <div className="w-[140px]">
              <p className="text-sm font-medium text-neutral-grey-600 mb-1">
                {BOOKING.bornYear} <span className="text-semantic-red">*</span>
              </p>
              <div
                onClick={toggleModalBirthDay}
                className="border border-[#AFB1B6] py-2 px-4 rounded-lg w-full"
              >
                <p className="text-base ">
                  {startDate
                    ? moment(startDate)?.format("DD/MM/YYYY")
                    : "dd/mm/yyyy"}
                </p>
              </div>{" "}
            </div>
          </div>

          <InputText
            name="email"
            register={register}
            errors={errors}
            title={BOOKING.email}
            placeholder={BOOKING.email}
          />

          <div className="flex items-center gap-2 my-5">
            <div>
              <input type="checkbox" className="w-5 h-5 accent-[#228AD1]" />
            </div>
            <p className="text-[#19191B] text-sm font-medium">
              {BOOKING.privacyContent}
            </p>
          </div>

          {tempInformationCustomer?.length === 0 && (
            <RenderOptional
              title={BOOKING.informationCustomerReverse}
              subtitle={BOOKING.optionnal}
              onClick={toggleModalInforCustomer}
            />
          )}

          {tempInformationCustomer?.length > 0 && (
            <div className="border border-secondary-500 rounded-lg overflow-hidden">
              <RenderOptional
                title={BOOKING.informationCustomerReverse}
                subtitle={BOOKING.optionnal}
                onClick={toggleModalInforCustomer}
              />
              <ul className="bg-white flex flex-col group px-2">
                {tempInformationCustomer?.map((info, ind) => {
                  const { name, bornYear, phone } = info || {};
                  return (
                    <RenderItem
                      key={`customer-optional-${ind}`}
                      name={name}
                      bornYear={bornYear}
                      phone={phone}
                      titlePhone={BOOKING.phoneTitle}
                      titleBornYear={BOOKING.bornYear}
                      textEmpty={BOOKING.empty2}
                      titleName={BOOKING.fullName}
                    />
                  );
                })}
              </ul>
            </div>
          )}

          {tempInformationCustomerReverse?.length === 0 && (
            <RenderOptional
              title={BOOKING.informationCustomerReverse2}
              subtitle={BOOKING.optionnal}
              onClick={toggleModalInforCustomerReverse}
            />
          )}

          {tempInformationCustomerReverse?.length > 0 && (
            <div className="border border-secondary-500 rounded-lg overflow-hidden">
              <RenderOptional
                title={BOOKING.informationCustomerReverse2}
                subtitle={BOOKING.optionnal}
                onClick={toggleModalInforCustomerReverse}
              />
              <ul className="bg-white flex flex-col group px-2">
                {tempInformationCustomerReverse?.map((info, ind) => {
                  const { name, bornYear, phone } = info || {};
                  return (
                    <RenderItem
                      key={`customer-optional-${ind}`}
                      name={name}
                      bornYear={bornYear}
                      phone={phone}
                      titlePhone={BOOKING.phoneTitle}
                      titleBornYear={BOOKING.bornYear}
                      textEmpty={BOOKING.empty2}
                      titleName={BOOKING.fullName}
                    />
                  );
                })}
              </ul>
            </div>
          )}
        </form>

        <div className="bg-white p-4">
          <p className="text-neutral-grey-700 font-bold text-base">
            {BOOKING.childrenSitSameChair}
          </p>
          <p className="text-neutral-grey-500 font-semibold text-sm mb-3">
            {BOOKING.noteWeightForChildren}
          </p>
          {tempInformationChildren?.length === 0 && (
            <RenderOptional
              title={BOOKING.informationChildrenReverse}
              subtitle={BOOKING.optionnal}
              onClick={toggleModalInforChildren}
            />
          )}

          {tempInformationChildren?.length > 0 && (
            <div className="border border-secondary-500 rounded-lg overflow-hidden">
              <RenderOptional
                title={BOOKING.informationChildrenReverse}
                subtitle={BOOKING.optionnal}
                onClick={toggleModalInforChildren}
              />

              <ul className="bg-white flex flex-col group px-2">
                {tempInformationChildren?.map((info, ind) => {
                  const { name, bornYear, option } = info || {};
                  const { status, fee } = OPTION[option];
                  return (
                    <RenderItemChildren
                      key={`customer-optional-children-${ind}`}
                      name={name}
                      bornYear={bornYear}
                      titleBornYear={BOOKING.bornYear}
                      status={status}
                      fee={fee}
                      textEmpty={BOOKING.empty2}
                      titleName={BOOKING.fullName}
                    />
                  );
                })}
              </ul>
            </div>
          )}

          {tempInformationChildrenReverse?.length === 0 && (
            <div className="mt-2">
              <RenderOptional
                title={BOOKING.informationChildrenReverse2}
                subtitle={BOOKING.optionnal}
                onClick={toggleModalInforChildrenReverse}
              />
            </div>
          )}

          {tempInformationChildrenReverse?.length > 0 && (
            <div className="border border-secondary-500 rounded-lg overflow-hidden mt-2">
              <RenderOptional
                title={BOOKING.informationChildrenReverse2}
                subtitle={BOOKING.optionnal}
                onClick={toggleModalInforChildrenReverse}
              />

              <ul className="bg-white flex flex-col group px-2">
                {tempInformationChildrenReverse?.map((info, ind) => {
                  const { name, bornYear, option } = info || {};
                  const { status, fee } = OPTION[option];
                  return (
                    <RenderItemChildren
                      key={`customer-optional-children-${ind}`}
                      name={name}
                      bornYear={bornYear}
                      titleBornYear={BOOKING.bornYear}
                      status={status}
                      fee={fee}
                      textEmpty={BOOKING.empty2}
                      titleName={BOOKING.fullName}
                    />
                  );
                })}
              </ul>
            </div>
          )}
        </div>

        <div className="p-4 fixed bottom-0 z-10 bg-white w-full border border-neutral-grey-100 shadow-[gba(0,0,0,0.06),rgba(0,0,0,0.03)]">
          <p className="text-black text-sm font-semibold text-center mb-3">
            {BOOKING.expiredBookingDuration}{" "}
            {countdownTime && <CountDown inputTimer={countdownTime} />}
            {!countdownTime && "--:--"}
          </p>

          <Button
            onClick={onSubmit}
            disabled={
              !(watch("bornYear") && watch("fullName")) ||
              phoneState?.errorPhone !== ""
            }
            borderRadius="rounded-full"
            btnColor={
              watch("bornYear") && watch("fullName") && !phoneState?.errorPhone
                ? "bg-primary-500"
                : "bg-primary-600"
            }
            fontSize={
              watch("bornYear") && watch("fullName") && !phoneState?.errorPhone
                ? "text-base"
                : "text-base opacity-50"
            }
          >
            {BOOKING.continue}
          </Button>
        </div>
      </div>
      <FullScreenModal
        open={modalInforCustomer}
        childStyle="animate-fade-in w-screen bg-neutral-grey-100 overflow-y-auto h-[100vh]"
      >
        <ModalInformationCustomer
          BOOKING={BOOKING}
          handleBack={toggleModalInforCustomer}
          seats={bookingInformation?.seats}
          ERROR={ERROR}
          setTempInformationCustomer={hanldeSubmitCustomerInfo}
          tempInformationCustomer={tempInformationCustomer}
          watch={watch}
          phoneNumber={phoneState?.phoneNumber}
        />
      </FullScreenModal>

      <FullScreenModal
        open={modalInforCustomerReverse}
        childStyle="animate-fade-in w-screen bg-neutral-grey-100 overflow-y-auto h-[100vh]"
      >
        <ModalInformationCustomer
          BOOKING={BOOKING}
          handleBack={toggleModalInforCustomerReverse}
          seats={bookingInformationReverse?.seats}
          ERROR={ERROR}
          setTempInformationCustomer={handleSubmitCustomerInfoReverse}
          tempInformationCustomer={tempInformationCustomerReverse}
          watch={watch}
          phoneNumber={phoneState?.phoneNumber}
        />
      </FullScreenModal>

      <FullScreenModal
        open={modalInforChildren}
        childStyle="animate-fade-in w-screen bg-neutral-grey-100 overflow-y-auto h-[100vh]"
      >
        <ModalInformationChildrenMobile
          BOOKING={BOOKING}
          ERROR={ERROR}
          seats={bookingInformation?.seats}
          handleBack={toggleModalInforChildren}
          setTempInformationChildren={handleSubtmitChildrenInfo}
          tempInformationChildren={tempInformationChildren}
        />
      </FullScreenModal>

      <FullScreenModal
        open={modalInforChildrenReverse}
        childStyle="animate-fade-in w-screen bg-neutral-grey-100 overflow-y-auto h-[100vh]"
      >
        <ModalInformationChildrenMobile
          BOOKING={BOOKING}
          ERROR={ERROR}
          seats={bookingInformationReverse?.seats}
          handleBack={toggleModalInforChildrenReverse}
          setTempInformationChildren={handleSubmitChildrenInfoReverse}
          tempInformationChildren={tempInformationChildrenReverse}
        />
      </FullScreenModal>

      <Modal
        open={openModalSignIn}
        toggleModal={toggleModalSignIn}
        wrapChildStyle=""
        childStyle="animate-fade-in w-screen sm:w-[800px] xl:mx-0 mx-3 bg-white rounded-2xl overflow-y-auto xl:h-fit max-h-[80vh]"
      >
        <SignInModalContent />
      </Modal>

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
    </Fragment>
  );
};

export default ThirdStepReverse;
