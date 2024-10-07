import React from "react";
import HistoryItem from "../Pages/lich-su-dich-vu/historyItem";
import { ITranslation } from "@/interfaces/ITranslation";

interface INotificationPanelMobileProps {
  translation: ITranslation;
  notifications?: any;
  handleNoti: (idNoti?: any, type?: number) => void;
}

const NotificationPanelMobile = (props: INotificationPanelMobileProps) => {
  const { translation, notifications, handleNoti } = props;

  return (
    <ul className="group bg-white">
      {notifications?.length > 0 ? (
        notifications?.map((elm: any, ind: number) => {
          return (
            <div key={ind}>
              <HistoryItem
                {...elm}
                trans={translation}
                handleLinkHistory={handleNoti}
                spacingX="px-4"
              />
            </div>
          );
        })
      ) : (
        <div className="px-4">
          <p className="text-p14">Chưa có dữ liệu</p>
        </div>
      )}
    </ul>
  );
};

export default NotificationPanelMobile;
