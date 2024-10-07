import Button from "@/components/button";
import PencilSquareIcon from "@/components/icons/pencil-square";
import FullScreenModal from "@/components/modal/FullScreenModal";
import { ITranslation } from "@/interfaces/ITranslation";
import UpdateInformationScreen from "./updateInfomationScreen";
import useModal from "@/hook/useModal";
import { IUserProfile } from "@/interfaces/httpRequest/IUser";
import { useState } from "react";
import LockClosedIcon from "@/components/icons/lock-closed";
import UserTimeBottomIcon from "@/components/icons/user-time-bottom";
import ArrowRightIcon from "@/components/icons/arrowRight";
import ChangePasswordMobileScreen from "./changePasswordMobileScreen";
import { deleteAccount } from "@/apis/user";
import { useCustomToast } from "@/hook/useToast";
import Modal from "@/components/modal/Modal";

interface IInformationScreenProps {
  translation: ITranslation;
  data: IUserProfile;
}

const RenderInfoItem = ({ title, val }: { title: string; val: string }) => {
  return (
    <div className="flex gap-4">
      <div className="w-[100px]">
        <p className="text-neutral-grey-600 font-medium text-sm">{title}</p>
      </div>
      <div className="flex-1">
        <p className="text-neutral-grey-700 font-semibold text-sm">{val}</p>
      </div>
    </div>
  );
};

const InformationScreen = (props: IInformationScreenProps) => {
  const { translation, data } = props;
  const { ACCOUNT, BOOKING } = translation;
  const [open, toggle] = useModal();
  const [changePasswordModal, toggleChangePasswordModal] = useModal();
  const [openModalDeleteAccount, toggleModalDeleteAccount] = useModal();

  const [profile, setProfile] = useState(data);
  const { toastError } = useCustomToast();

  const handleDeleteAccount = async () => {
    const res = await deleteAccount();
    if (res?.isSuccess) {
      window.location.replace("/dang-xuat");
    } else {
      toastError({
        message: res?.errorMessage,
        toastId: "delete-account-failed",
      });
    }
  };

  return (
    <>
      <div className="py-4 px-3 bg-white rounded-xl">
        <div className="bg-semantic-green-light py-1 px-2 rounded-full w-fit mb-4">
          <p className="text-neutral-grey-600 font-extrabold text-xs">
            {ACCOUNT.personalInfo}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <RenderInfoItem
            title={BOOKING.fullName}
            val={profile?.name || ACCOUNT.none}
          />
          <RenderInfoItem
            title={ACCOUNT.gender}
            val={
              profile?.gender === 1
                ? ACCOUNT.male
                : profile?.gender === 2
                ? ACCOUNT.female
                : ACCOUNT.none
            }
          />
          <RenderInfoItem
            title={ACCOUNT.birthDay}
            val={profile?.birthday || ACCOUNT.none}
          />
          <RenderInfoItem
            title={BOOKING.phone}
            val={profile?.phone || ACCOUNT.none}
          />
          <RenderInfoItem
            title={BOOKING.email}
            val={profile?.email || ACCOUNT.none}
          />
          <RenderInfoItem
            title={ACCOUNT.address}
            val={profile?.address || ACCOUNT.none}
          />

          <div className="mt-4">
            <Button
              onClick={toggle}
              Icon={<PencilSquareIcon />}
              iconPosition="start"
              btnColor="bg-primary-900"
              borderColor="border-0"
              color="text-primary-200"
            >
              {ACCOUNT.edit}
            </Button>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-white p-3 mt-2">
        <div
          onClick={() => toggleChangePasswordModal()}
          className=" flex gap-2 items-center justify-between pb-2 border-b border-b-neutral-grey-100"
        >
          <div className="flex items-center gap-3">
            <LockClosedIcon />

            <p className="text-neutral-grey-700 font-semibold text-sm">
              {ACCOUNT.changePassword}
            </p>
          </div>

          <ArrowRightIcon fill="#000" />
        </div>

        <div
          className=" flex gap-2 items-center pt-2 justify-between"
          onClick={toggleModalDeleteAccount}
        >
          <div className="flex items-center gap-3">
            <UserTimeBottomIcon />
            <p className="text-neutral-grey-700 font-semibold text-sm ">
              {ACCOUNT.deleteAccount}
            </p>
          </div>
        </div>
      </div>

      <FullScreenModal open={open}>
        <UpdateInformationScreen
          translation={translation}
          handlePrevScreen={toggle}
          defaultValues={profile}
          setProfile={setProfile}
        />
      </FullScreenModal>
      <FullScreenModal open={changePasswordModal}>
        <ChangePasswordMobileScreen
          translation={translation}
          handlePrevScreen={toggleChangePasswordModal}
          defaultValues={profile}
          setProfile={setProfile}
        />
      </FullScreenModal>

      <Modal
        open={openModalDeleteAccount}
        toggleModal={toggleModalDeleteAccount}
        wrapChildStyle="p-4"
      >
        <div>
          <div className="p-4 flex items-center justify-center border-b border-neutral-grey-200">
            <p className="text-base font-semibold">{ACCOUNT.deleteAccount}</p>
          </div>
          <div className="max-h-[600px] my-4 overflow-auto  flex flex-col items-center justify-center">
            <p className="text-base text-neutral-grey-700 leading-[24px] font-medium">
              {ACCOUNT.deleteContent}
            </p>
          </div>

          <div className="flex items-center gap-3 ">
            <Button
              btnColor="bg-neutral-grey-100 group"
              height="h-11"
              borderRadius="rounded-full"
              borderColor="border-none"
              color="text-black "
              fontSize="text-sm"
              onClick={toggleModalDeleteAccount}
            >
              {BOOKING.cancelApply}
            </Button>
            <Button
              btnColor="disabled:bg-primary-600 bg-primary-500 disabled:opacity-100 group"
              height="h-11"
              borderRadius="rounded-full"
              borderColor="border-none"
              color="group-disabled:text-opacity-60 text-white "
              fontSize="text-sm"
              onClick={handleDeleteAccount}
            >
              {BOOKING.confirm}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default InformationScreen;
