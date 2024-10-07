import { fetchReadNotifications } from "@/apis/user";
import LogoDesktopIcon from "@/components/icons/logo-desktop";
import PhoneIcon from "@/components/icons/phone";
import NotificationModal from "@/components/notification-modal";
import ProfileModal from "@/components/profile-modal";
import { IHeaderTranslate } from "@/interfaces/IHeaderTranslate";
import { ISignInTranslate } from "@/interfaces/ISignInTranslate";
import { INotification, IUserProfile } from "@/interfaces/httpRequest/IUser";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface IHeaderDesktopprops {
  HEADER: IHeaderTranslate;
  SIGNIN: ISignInTranslate;
  notificatons?: INotification;
  userProfile?: IUserProfile;
  fetchNotification: () => void;
}
type LanguageType = "vi" | "en";

const HeaderDesktop = ({
  HEADER,
  SIGNIN,
  userProfile,
  notificatons,
  fetchNotification,
}: IHeaderDesktopprops) => {
  const { navbar } = HEADER;
  const pathname = usePathname();
  const [lang, setLang] = useState<LanguageType>("vi");
  const [customNoti, setCustomNoti] = useState([]);

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
      const code = notiFind?.metadata?.code?.replace("#", "");
      const phone = notiFind?.metadata?.phone;
      window.location.assign(
        `/xac-nhan-thong-tin-thanh-toan?phone=${phone}&code=${code}`
      );
      handleReadNoti(idNoti);
    } else if (type === 3) {
      handleReadNoti(idNoti);
      if (notiFind) {
        const { recordId } = notiFind || {};
        window.location.assign(`/chi-tiet-thue-xe?rent=${recordId}`);
      }
    } else if (type === 4) {
      const code = notiFind?.metadata?.code?.replace("#", "");
      const phone = notiFind?.metadata?.phone;
      window.location.assign(
        `/cho-xac-nhan-thanh-toan?phone=${phone}&code=${code}`
      );
      handleReadNoti(idNoti);
    } else {
      handleReadNoti(idNoti);
      fetchNotification();
    }
  };

  const handleChangeLocale = () => {
    if (lang === "vi") {
      localStorage.setItem("locale", "en");
      window.location.reload();
    } else {
      localStorage.setItem("locale", "vi");
      window.location.reload();
    }
  };

  useEffect(() => {
    const notificationList: any = [];
    const tmplocale: any = localStorage.getItem("locale") || "vi";
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
    if (tmplocale) {
      setLang(tmplocale);
    }
  }, [notificatons]);

  return (
    <div className="px-6 py-[11px] bg-[linear-gradient(90.4deg,_#DF5030_-0.55%,_#BE3C2A_72.71%)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6 py-[5px]">
          <LogoDesktopIcon />
          <div className="flex items-center gap-4">
            {navbar?.map((item, ind) => {
              const { ref, title } = item;
              return (
                <a
                  key={`nav-li-${ind}`}
                  href={ref}
                  className={`p-1 border-b-[1.5px]  hover:border-primary-800 transition-all  ${
                    ref === pathname
                      ? "border-primary-800"
                      : "border-transparent"
                  }`}
                >
                  <p
                    className={`text-white text-base transition-all ${
                      ref === pathname && "font-bold"
                    }`}
                  >
                    {title}
                  </p>
                </a>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
              <PhoneIcon />
            </div>
            <p className="text-sm font-medium text-white">0914.077.779</p>
          </div>
          <div className="flex items-center gap-6">
            <label className="relative  items-center cursor-pointer">
              <input
                type="checkbox"
                checked={lang === "en" ? true : false}
                className="sr-only peer"
                onChange={(e) => {
                  if (lang === "vi") {
                    setLang("en");
                  } else {
                    setLang("vi");
                  }
                }}
              />
              <div
                after-dynamic-value={lang.toUpperCase()}
                className={`w-[86px] h-7 pr-3 pl-4 flex items-center justify-between bg-primary-300 peer-focus:outline-none  peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-lg peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[attr(after-dynamic-value)] after:text-center after:text-sm after:font-medium after:absolute after:flex after:items-center after:justify-center after:top-[2px] after:left-[2px] peer-checked:after:left-[4px] after:bg-primary-900  after:rounded-md after:h-6 after:w-10 after:transition-all`}
                onClick={() => handleChangeLocale()}
              >
                <p className="text-sm font-medium text-white select-none">VI</p>
                <p className="text-sm font-medium text-white select-none">EN</p>
              </div>
            </label>
            {!userProfile ? (
              <div className="flex items-center  px-1  py-1  rounded-full bg-white">
                <a
                  href="/dang-nhap"
                  className="text-sm px-3 py-1 rounded-full font-semibold transition-all hover:bg-primary-900 text-primary-300 select-none"
                >
                  {SIGNIN.signIn}
                </a>

                <p className="text-xs font-semibold text-primary-300 select-none">
                  /
                </p>

                <a
                  href="/dang-ky"
                  className="text-sm px-3 py-1 rounded-full font-semibold transition-all hover:bg-primary-900 text-primary-300 select-none"
                >
                  {SIGNIN.signUp}
                </a>
              </div>
            ) : (
              <div className="flex items-center gap-5">
                <NotificationModal
                  userProfile={userProfile}
                  notifications={customNoti}
                  handleNoti={handleNoti}
                />
                <ProfileModal userProfile={userProfile} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderDesktop;
