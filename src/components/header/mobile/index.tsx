import { Fragment, useEffect, useState } from "react";
import { DrawerHeader } from "./drawer";
import LogoIcon from "@/components/icons/logo";
import { ISignInTranslate } from "@/interfaces/ISignInTranslate";
import { IHeaderTranslate } from "@/interfaces/IHeaderTranslate";
import BellIcon from "@/components/icons/bell";
import useModal from "@/hook/useModal";
import FullScreenModal from "@/components/modal/FullScreenModal";
import NavbarBasic from "@/components/navbar/basic";
import NotificationPanelMobile from "@/components/notification-panel/mobile";
import { INotification, IUserProfile } from "@/interfaces/httpRequest/IUser";
import ArrowDownIcon from "@/components/icons/arrowDown";
import UserCircleIcon from "@/components/icons/user-circle";
import HistoryIcon from "@/components/icons/history";
import StarIcon from "@/components/icons/star";
import LogOutIcon from "@/components/icons/log-out";
import DrawerBottom2 from "@/components/drawer-bottom2";
import { ITranslation } from "@/interfaces/ITranslation";
import MenuIcon from "@/components/icons/menu";
import { fetchReadNotifications } from "@/apis/user";

interface IHeaderMobileProps {
  SIGNIN: ISignInTranslate;
  HEADER: IHeaderTranslate;
  authen?: boolean;
  backgroundColorMobile?: string;
  userProfile?: IUserProfile;
  hasBackground?: boolean;
  translation: ITranslation;
  notificatons?: INotification;
  fetchNotification: () => void;
}

const HeaderMobile = ({
  HEADER,
  SIGNIN,
  authen = false,
  backgroundColorMobile = "transparent",
  userProfile,
  hasBackground = false,
  translation,
  notificatons,
  fetchNotification,
}: IHeaderMobileProps) => {
  const [open, setOpen] = useState(false);
  const [openModal, toggleModal] = useModal();
  const [openModalInfo, toggleModalInfo] = useModal();
  const [firstRotate, setFirstRotate] = useState(false);
  const [customNoti, setCustomNoti] = useState([]);

  const { name, phone, point } = userProfile || {};

  const listIcon = [
    <UserCircleIcon />,
    <HistoryIcon />,
    <StarIcon />,
    <LogOutIcon />,
  ];

  const handleOpenMenu = () => {
    setOpen(true);
    // document.body.classList.add("overflow-hidden");
  };

  const handleCloseMenu = () => {
    setOpen(false);
    // document.body.classList.remove("overflow-hidden");
    // document.body.classList.add("overflow-auto");
  };

  const handleOpenUserNav = () => {
    toggleModalInfo();
    if (!firstRotate) {
      setFirstRotate(true);
    }
  };

  const handleToggleNotification = () => {
    if (!openModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    toggleModal();
  };

  const handleReadNoti = async (idNoti: number) => {
    const payload = [idNoti];
    const _ = await fetchReadNotifications(payload);
  };

  const handleNoti = (idNoti?: any, type?: number) => {
    const notiFind: any = notificatons?.data?.find(
      (elm) => elm.userNotificationId === idNoti
    );
    if (type === 1 || notiFind.url !== null) {
      handleReadNoti(idNoti);
      window.location.assign(notiFind.url);
    } else if (type === 2) {
      handleReadNoti(idNoti);
      const code = notiFind?.metadata?.code?.replace("#", "");
      const phone = notiFind?.metadata?.phone;
      window.location.assign(
        `/xac-nhan-thong-tin-thanh-toan?phone=${phone}&code=${code}`
      );
    } else if (type === 3) {
      handleReadNoti(idNoti);
      if (notiFind) {
        const { recordId } = notiFind || {};
        window.location.assign(`/chi-tiet-thue-xe?rent=${recordId}`);
      }
    } else if (type === 4) {
      handleReadNoti(idNoti);
      const code = notiFind?.metadata?.code?.replace("#", "");
      const phone = notiFind?.metadata?.phone;
      window.location.assign(
        `/cho-xac-nhan-thanh-toan?phone=${phone}&code=${code}`
      );
    } else {
      handleReadNoti(idNoti);
      fetchNotification();
    }
  };

  useEffect(() => {
    const notificationList: any = [];
    notificatons?.data?.map((elm, ind) => {
      const notiItem = {
        idNoti: elm?.userNotificationId,
        isTypeOfNoti: !elm?.isRead,
        isTypeOfNotiDisplay: elm?.title,
        // isTypeOfProduct: elm?.status === 0 ? true : false, // ẩn hiện trạng thái
        isTypeOfProduct: true, // ẩn hiện trạng thái
        colorStatus: elm?.statusColor, // Cập nhật mã màu
        notiName: elm?.content,
        TypeOfProductDisplay: elm?.statusDisplay,
        bookingType: elm?.notifyType,
        createdAt: elm?.createdAt,
        url: elm?.url,
      };
      notificationList.push(notiItem);
    });
    setCustomNoti(notificationList);
  }, [notificatons]);

  return (
    <Fragment>
      <div
        className={`flex justify-between items-center p-6 relative`}
        style={{
          background: backgroundColorMobile,
        }}
      >
        <div className="flex gap-3 items-center">
          <div
            className={`${open ? "pointer-events-none" : ""}`}
            onClick={handleOpenMenu}
          >
            <MenuIcon stroke="white" />
          </div>

          <div>
            <LogoIcon />
          </div>
        </div>

        {userProfile && (
          <div className="flex items-center gap-5">
            {!hasBackground && (
              <div
                onClick={handleToggleNotification}
                className="relative w-6 h-6"
              >
                <BellIcon stroke="#fff" width="24" height="24" />
                <div className="rounded-full w-[18px] h-[18px] bg-primary-500 flex justify-center items-center absolute -top-1 -right-2 z-10">
                  <p className="text-white font-semibold text-xs ">
                    {notificatons?.data?.filter(
                      (elm: any) => !elm?.isRead === true
                    )?.length || 0}
                  </p>
                </div>
              </div>
            )}

            {hasBackground && (
              <div
                onClick={handleToggleNotification}
                className="relative w-6 h-6 cursor-pointer"
              >
                <BellIcon stroke="#fff" width="24" height="24" />
                <div className="rounded-full w-[18px] h-[18px] bg-white  flex justify-center items-center absolute -top-1 -right-2 z-10">
                  <p className="text-primary-400 font-semibold text-xs ">
                    {notificatons?.data?.filter(
                      (elm: any) => !elm?.isRead === true
                    )?.length || 0}
                  </p>
                </div>
              </div>
            )}

            <div
              className="flex items-center gap-2"
              onClick={handleOpenUserNav}
            >
              <p className="text-white font-semibold text-sm w-[80px] line-clamp-1 overflow-hidden">
                {name || phone}
              </p>
              <div>
                {!openModalInfo && (
                  <div
                    className={`${firstRotate ? "animate-rotateUpToDown" : ""}`}
                  >
                    <ArrowDownIcon fill="white" />
                  </div>
                )}

                {openModalInfo && (
                  <div className="animate-rotateDownToUp">
                    <ArrowDownIcon fill="white" />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {!userProfile && (
          <div className="flex items-center gap-2">
            <a href="/dang-nhap">
              <p className="text-sm font-semibold text-white underline">
                {SIGNIN.signIn}
              </p>
            </a>
            <p className="text-xs font-medium text-white">|</p>
            <a href="/dang-ky">
              <p className="text-sm font-semibold text-white underline">
                {SIGNIN.signUp}
              </p>
            </a>
          </div>
        )}

        <DrawerHeader
          handleCloseMenu={handleCloseMenu}
          open={open}
          navbars={HEADER.navbar}
          langText={HEADER.language}
        />
      </div>

      <FullScreenModal open={openModal}>
        <NavbarBasic
          title={HEADER.notification}
          handleClick={handleToggleNotification}
        />
        <NotificationPanelMobile
          translation={translation}
          notifications={customNoti}
          handleNoti={handleNoti}
        />
      </FullScreenModal>

      <DrawerBottom2
        open={openModalInfo}
        toggleDrawer={toggleModalInfo}
        wrapChildStyle="py-6"
        animationName="animation-open-user-nav"
      >
        <div className="">
          {HEADER.accountSettings && HEADER.accountSettings?.length > 0 ? (
            <div className=" cursor-pointer">
              {HEADER.accountSettings?.map((item, ind: number) => {
                const { title, ref, extraComponent } = item;
                return (
                  <a
                    key={ind}
                    href={ref}
                    className="py-[6px] px-4 hover:bg-primary-1000 flex items-center justify-start gap-4 "
                  >
                    {listIcon[ind]}
                    <div className="flex items-center gap-1">
                      <p className="text-base font-semibold text-neutral-grey-600">
                        {title}
                      </p>
                      {extraComponent && (
                        <div className="rounded-full px-2 py-1 bg-semantic-green-light">
                          <p className="text-xs font-extrabold text-semantic-green leading-[18px]">
                            {point} {HEADER.point}
                          </p>
                        </div>
                      )}
                    </div>
                  </a>
                );
              })}
            </div>
          ) : (
            <div className="px-4">
              <p className="text-p14">Chưa có dữ liệu</p>
            </div>
          )}
        </div>
      </DrawerBottom2>
    </Fragment>
  );
};

export default HeaderMobile;
