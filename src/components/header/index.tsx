import { Fragment, useEffect, useState } from "react";
import HeaderDesktop from "./desktop";
import HeaderMobile from "./mobile";
import useTrans from "@/hook/useTrans";
import { INotification, IUserProfile } from "@/interfaces/httpRequest/IUser";
import { ITranslation } from "@/interfaces/ITranslation";
import { fetchUserNotifications } from "@/apis/user";
import { ACCESS_TOKEN } from "@/constant/app";

const Header = ({
  authen = false,
  userProfile,
  backgroundColorMobile = "transparent",
  hasBackground = false,
}: {
  authen?: boolean;
  userProfile?: IUserProfile;
  backgroundColorMobile?: string;
  hasBackground?: boolean;
}) => {
  const translation: ITranslation = useTrans();
  const { HEADER, SIGNIN } = translation;

  const [noti, setNoti] = useState<INotification>();

  const fetchNotification = async () => {
    const payload = {
      page: 1,
      pageSize: 100,
    };
    const res = await fetchUserNotifications(payload);
    if (res?.statusCode) {
      setNoti(res);
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (accessToken) {
      fetchNotification();
    }
  }, []);

  return (
    <Fragment>
      <div className="lg:block hidden">
        <HeaderDesktop
          HEADER={HEADER}
          SIGNIN={SIGNIN}
          userProfile={userProfile}
          notificatons={noti}
          fetchNotification={fetchNotification}
        />
      </div>

      <div className="lg:hidden block">
        <HeaderMobile
          HEADER={HEADER}
          SIGNIN={SIGNIN}
          authen={authen}
          backgroundColorMobile={backgroundColorMobile}
          userProfile={userProfile}
          hasBackground={hasBackground}
          translation={translation}
          notificatons={noti}
          fetchNotification={fetchNotification}
        />
      </div>
    </Fragment>
  );
};

export default Header;
