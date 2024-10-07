import { changePassword } from "@/apis/authentication";
import { deleteAccount, fetchUserProfile, updateProfile } from "@/apis/user";
import LoadingView from "@/components/LoadingView";
import ChangePasswordModal from "@/components/Pages/thong-tin-ca-nhan/changePasswordModal";
import EditProfileModal from "@/components/Pages/thong-tin-ca-nhan/editProfileModal";
import Button from "@/components/button";
import Footer from "@/components/footer";
import ArrowRightIcon from "@/components/icons/arrowRight";
import HistoryIcon from "@/components/icons/history";
import LockClosedIcon from "@/components/icons/lock-closed";
import LogOutIcon from "@/components/icons/log-out";
import PencilSquareIcon from "@/components/icons/pencil-square";
import StarIcon from "@/components/icons/star";
import UserCircleIcon from "@/components/icons/user-circle";
import UserTimeBottomIcon from "@/components/icons/user-time-bottom";
import Modal from "@/components/modal/Modal";
import { formatNumber } from "@/helpers/functionHelper";
import useModal from "@/hook/useModal";
import { useCustomToast } from "@/hook/useToast";
import { ITranslation } from "@/interfaces/ITranslation";
import {
  IUpdateProfileResponse,
  IUserProfile,
} from "@/interfaces/httpRequest/IUser";
import moment from "moment";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface IContainerPersonalInformationDesktop {
  userProfile?: IUserProfile;
  translation: ITranslation;
}
const ContainerPersonalInformationDesktop = (
  props: IContainerPersonalInformationDesktop
) => {
  const { userProfile, translation } = props;
  const { HEADER, ACCOUNT, SIGNIN, ERROR } = translation;
  const pathname = usePathname();
  const [profile, setProfile] = useState(userProfile);
  const [isLoading, setLoading] = useState(false);
  const { toastSuccess, toastError } = useCustomToast();
  const listIcon = [
    <UserCircleIcon />,
    <HistoryIcon />,
    <StarIcon />,
    <LogOutIcon />,
  ];
  const [editProfile, toggleEditProfile] = useModal();
  const [changePasswordModal, toggleChangePasswordModal] = useModal();
  const [confirmDeleteModal, toggleConfirmDeleteModal] = useModal();

  const handleCloseEditProfile = () => {
    toggleEditProfile();
  };

  const handleSubmitInfomation = async (data?: any) => {
    setLoading(true);
    const {
      name_desktop,
      phone_desktop,
      birthday_desktop,
      address_desktop,
      gender_desktop,
      email_desktop,
    } = data;
    if (data) {
      const res: IUpdateProfileResponse = await updateProfile({
        address: address_desktop,
        birthday: birthday_desktop,
        gender: gender_desktop,
        email: email_desktop,
        phone: phone_desktop,
        name: name_desktop,
      });
      if (res?.isSuccess) {
        const resProfile = await fetchUserProfile();
        if (resProfile?.isSuccess) {
          setProfile(resProfile.data);
          toggleEditProfile();
          setLoading(false);
          toastSuccess({
            message: ACCOUNT.updateSuccess,
            toastId: "update-profile-success",
          });
        }
      } else {
        setLoading(false);
        toastError({
          message: res?.errorMessage,
          toastId: "update-profile-error",
        });
      }
    }
  };
  const handleCloseChangePassword = () => {
    toggleChangePasswordModal();
  };

  const handleSubmitChangePassword = async (data?: any) => {
    setLoading(true);
    const { oldPassword_desktop, password_desktop, rePassword_desktop } = data;
    if (data && userProfile?.userId) {
      const res = await changePassword({
        userId: userProfile.userId,
        oldPassword: oldPassword_desktop,
        password: password_desktop,
        rePassword: rePassword_desktop,
      });
      if (res?.isSuccess) {
        const resProfile = await fetchUserProfile();
        if (resProfile?.isSuccess) {
          setProfile(resProfile.data);
          toggleChangePasswordModal();
          setLoading(false);
          toastSuccess({
            message: res?.successMessage,
            toastId: "change-password-success",
          });
        }
      } else {
        setLoading(false);
        toastError({
          message: res?.errorMessage,
          toastId: "change-password-error",
        });
      }
    } else {
      setLoading(false);
      toastError({
        message: "Có lỗi xảy ra",
        toastId: "change-password-error",
      });
    }
  };
  const handleClickDelete = async () => {
    setLoading(true);
    const res = await deleteAccount();
    if (res?.isSuccess) {
      window.location.assign("/dang-xuat");
      // setLoading(false);
    } else {
      setLoading(false);
    }
  };
  useEffect(() => {
    setProfile(userProfile);
  }, [userProfile]);

  return (
    <div className="flex flex-col ">
      {isLoading && <LoadingView />}
      <div className="w-[1120px] mx-auto h-full flex-1   mt-10 mb-[60px] ">
        <div className="grid grid-cols-[30.62%_67.95%] gap-4">
          <div className=" h-fit py-4 w-full bg-white rounded-lg">
            {HEADER.accountSettings && (
              <div className=" cursor-pointer">
                {HEADER.accountSettings?.map(
                  (
                    item: {
                      title: string;
                      ref: string;

                      extraComponent?: boolean;
                    },
                    ind: number
                  ) => {
                    const {
                      title,
                      ref,

                      extraComponent,
                    } = item;
                    return (
                      <a
                        key={ind}
                        href={ref}
                        className="py-2 px-4 hover:bg-primary-1000 flex items-center justify-start gap-4 "
                      >
                        {listIcon[ind]}
                        <div className="flex items-center gap-1">
                          <p
                            className={`text-base font-semibold  ${
                              pathname === ref
                                ? "text-primary-500"
                                : "text-neutral-grey-600"
                            }`}
                          >
                            {title}
                          </p>
                          {extraComponent && (
                            <div className="rounded-full px-2 py-1 bg-semantic-green-light">
                              <p className="text-xs font-extrabold text-semantic-green leading-[18px]">
                                {userProfile?.point
                                  ? userProfile?.point >= 1000
                                    ? "999+"
                                    : formatNumber(userProfile?.point)
                                  : 0}{" "}
                                {HEADER.point}
                              </p>
                            </div>
                          )}
                        </div>
                      </a>
                    );
                  }
                )}
              </div>
            )}
          </div>
          <div className="w-full h-full">
            <div className="rounded-xl bg-white p-4">
              <div className="px-2 py-1 rounded-full bg-semantic-green-light w-fit">
                <p className="font-extrabold text-neutral-grey-600 text-xs leading-[18px] uppercase">
                  {ACCOUNT.personalInfo}
                </p>
              </div>
              <div className="mt-4 grid-cols-[100px_1fr] grid gap-4 py-1">
                <p className="text-sm text-neutral-grey-600 font-medium leading-[21px]">
                  {ACCOUNT.fullname}
                </p>
                <p className="text-neutral-grey-700 font-semibold text-sm leading-[21px]">
                  {profile?.name || ACCOUNT.none}
                </p>
              </div>
              <div className="grid-cols-[100px_1fr] grid gap-4 py-1">
                <p className="text-sm text-neutral-grey-600 font-medium leading-[21px]">
                  {ACCOUNT.gender}
                </p>
                <p className="text-neutral-grey-700 font-semibold text-sm leading-[21px]">
                  {profile?.gender === 1
                    ? "Nam"
                    : profile?.gender === 2
                    ? "Nữ"
                    : ACCOUNT.none}
                </p>
              </div>
              <div className="grid-cols-[100px_1fr] grid gap-4 py-1">
                <p className="text-sm text-neutral-grey-600 font-medium leading-[21px]">
                  {ACCOUNT.yearOfBirth}
                </p>
                <p className="text-neutral-grey-700 font-semibold text-sm leading-[21px]">
                  {profile?.birthday
                    ? moment(profile?.birthday).format("YYYY")
                    : ACCOUNT.none}
                </p>
              </div>
              <div className="grid-cols-[100px_1fr] grid gap-4 py-1">
                <p className="text-sm text-neutral-grey-600 font-medium leading-[21px]">
                  {ACCOUNT.phone}
                </p>
                <p className="text-neutral-grey-700 font-semibold text-sm leading-[21px]">
                  {profile?.phone}
                </p>
              </div>
              <div className="grid-cols-[100px_1fr] grid gap-4 py-1">
                <p className="text-sm text-neutral-grey-600 font-medium leading-[21px]">{`Email`}</p>
                <p className="text-neutral-grey-700 font-semibold text-sm leading-[21px]">
                  {profile?.email ? profile.email : ACCOUNT.none}
                </p>
              </div>
              <div className="grid-cols-[100px_1fr] grid gap-4 py-1">
                <p className="text-sm text-neutral-grey-600 font-medium leading-[21px]">
                  {ACCOUNT.address}
                </p>
                <p className="text-neutral-grey-700 font-semibold text-sm leading-[21px]">
                  {profile?.address ? profile.address : ACCOUNT.none}
                </p>
              </div>

              <div
                onClick={() => toggleEditProfile()}
                className="rounded-full bg-primary-900 py-[6px] px-4 w-fit mt-4 flex items-center gap-2 cursor-pointer"
              >
                <PencilSquareIcon />
                <p className="text-primary-200 font-semibold text-sm leading-[21px]">
                  {ACCOUNT.edit}
                </p>
              </div>
            </div>
            <div className="rounded-xl  bg-white py-4 px-2 mt-2">
              <div
                onClick={() => toggleChangePasswordModal()}
                className="py-2 px-2 flex items-center justify-between border-b border-neutral-grey-100 hover:bg-primary-1000  cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <LockClosedIcon />
                  <p className="text-sm leading-[21px] font-semibold text-neutral-grey-700">
                    {ACCOUNT.changePassword}
                  </p>
                </div>
                <ArrowRightIcon fill="#000" />
              </div>
              <div
                onClick={() => toggleConfirmDeleteModal()}
                className="py-2 px-2 hover:bg-primary-1000  flex items-center gap-3 cursor-pointer"
              >
                <UserTimeBottomIcon />
                <p className="text-sm leading-[21px] font-semibold text-neutral-grey-700">
                  {ACCOUNT.deleteAccount}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={confirmDeleteModal}
        toggleModal={toggleConfirmDeleteModal}
        wrapChildStyle="p-0"
        modalStyle="w-[100vw] h-[100vh] flex justify-center items-center fixed bg-black/30 z-[100] left-[calc(0%)] top-[calc(0%)]"
        childStyle="w-[600px] bg-white md:rounded-xl md:min-h-fit min-h-full mx-0  overflow-hidden duration-200 animate-fade-in "
      >
        <div className={``}>
          <div className="p-4 flex items-center justify-center border-b border-neutral-grey-200">
            <p className="text-base font-semibold">{ACCOUNT.deleteAccount}</p>
          </div>
          <div className="max-h-[600px] my-4 overflow-auto  flex flex-col items-center justify-center">
            <p className="text-base text-neutral-grey-700 leading-[24px] font-medium">
              {ACCOUNT.deleteContent}
            </p>
          </div>

          <div className="flex items-center gap-3 p-4 pb-6">
            <Button
              btnColor="bg-neutral-grey-100 group"
              height="h-11"
              borderRadius="rounded-full"
              borderColor="border-none"
              color="text-black "
              // disabled={seatSelected.length === 0}
              // actionType='submit'
              onClick={() => toggleConfirmDeleteModal()}
            >
              {ACCOUNT.back}
            </Button>
            <Button
              btnColor="disabled:bg-primary-600 bg-primary-500 disabled:opacity-100 group"
              height="h-11"
              borderRadius="rounded-full"
              borderColor="border-none"
              color="group-disabled:text-opacity-60 text-white "
              // actionType='submit'
              onClick={() => handleClickDelete()}
            >
              {ACCOUNT.confirm}
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        toggleModal={handleCloseEditProfile}
        open={editProfile}
        wrapChildStyle="p-0"
        modalStyle="w-[100vw] h-[100vh] flex justify-center items-center fixed bg-black/30 z-[60] left-[calc(0%)] top-[calc(0%)]"
        childStyle="animation-height w-[600px] bg-white md:rounded-xl md:min-h-fit min-h-full mx-0  overflow-hidden duration-200 animate-fade-in "
      >
        {profile && (
          <EditProfileModal
            SIGNIN={SIGNIN}
            ERROR={ERROR}
            ACCOUNT={ACCOUNT}
            handleCloseModal={handleCloseEditProfile}
            handleSubmitModal={handleSubmitInfomation}
            userProfile={profile}
          />
        )}
      </Modal>
      <Modal
        toggleModal={handleCloseChangePassword}
        open={changePasswordModal}
        wrapChildStyle="p-0"
        modalStyle="w-[100vw] h-[100vh] flex justify-center items-center fixed bg-black/30 z-[60] left-[calc(0%)] top-[calc(0%)]"
        childStyle="animation-height w-[600px] bg-white md:rounded-xl md:min-h-fit min-h-full mx-0  overflow-hidden duration-200 animate-fade-in "
      >
        {profile && (
          <ChangePasswordModal
            SIGNIN={SIGNIN}
            ERROR={ERROR}
            ACCOUNT={ACCOUNT}
            handleCloseModal={handleCloseChangePassword}
            handleSubmitModal={handleSubmitChangePassword}
            userProfile={profile}
          />
        )}
      </Modal>
    </div>
  );
};

export default ContainerPersonalInformationDesktop;
