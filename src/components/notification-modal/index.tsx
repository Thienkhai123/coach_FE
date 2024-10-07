import useOnClickOutside from '@/hook/useClickOutside';
import useTrans from '@/hook/useTrans';
import { IBookingTranslate } from '@/interfaces/IBookingTranslate';
import { IUserProfile } from '@/interfaces/httpRequest/IUser';

import { Fragment, useEffect, useRef, useState } from 'react';

import BellIcon from '../icons/bell';
import NotificationItem from './notificationItem';

interface INotificationModal {
  userProfile: IUserProfile;
  notifications?: any[];
  handleNoti: (idNoti?: any, type?: number) => void;
}

const defaultData = {
  notifications: [
    {
      idNoti: 0,
      isTypeOfNoti: true,
      isTypeOfNotiDisplay: 'Voucher',
      isTypeOfProduct: true, //  {0: không có trạng thái, 1: đã hủy, 2: Chờ xác nhận, 3 Đang vận chuyển, 4: thành công}
      colorStatus: '#00993D', //  {0: không có trạng thái, 1: đã hủy, 2: Chờ xác nhận, 3 Đang vận chuyển, 4: thành công}
      TypeOfProductDisplay: 'Đang vận chuyển',
      notiName:
        'Đã nhận 20 điểm từ giao dịch đặt vé xe Đà Nẵng - Nha Trang chuyến 17:00 21/12/2024',
      bookingType: 0, // {0: trạng thái đặt vé xe, 1: trạng thái ký gửi hàng hóa}
      createAt: new Date(),
    },
    {
      idNoti: 1,
      isTypeOfNoti: true,
      isTypeOfNotiDisplay: 'Voucher',
      isTypeOfProduct: true, //  {0: không có trạng thái, 1: đã hủy, 2: Chờ xác nhận, 3 Đang vận chuyển, 4: thành công}
      colorStatus: '#00993D', //  {0: không có trạng thái, 1: đã hủy, 2: Chờ xác nhận, 3 Đang vận chuyển, 4: thành công}
      TypeOfProductDisplay: 'Đang vận chuyển',
      notiName:
        'Đã nhận 20 điểm từ giao dịch đặt vé xe Đà Nẵng - Nha Trang chuyến 17:00 21/12/2024',
      bookingType: 0, // {0: trạng thái đặt vé xe, 1: trạng thái ký gửi hàng hóa}
      createAt: new Date(),
    },
  ],
};

const NotificationModal = (props: INotificationModal) => {
  const {
    userProfile,
    notifications = defaultData.notifications,
    handleNoti,
  } = props;
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  const trans = useTrans();
  const { HEADER } = trans;

  const handleClickOutside = () => {
    if (open) {
      setOpen(false);
    }
  };

  useOnClickOutside(ref, handleClickOutside);

  return (
    <div className='w-full'>
      <div ref={ref} className={` w-full  relative flex transition-all`}>
        <div
          className='flex w-full cursor-pointer items-center justify-between'
          onClick={() => {
            setOpen(!open);
          }}
        >
          <div className='relative'>
            <BellIcon stroke='#fff' />
            <div className='absolute -top-1.5 -right-2 w-[18px] h-[18px] rounded-full bg-white flex items-center justify-center select-none'>
              <p className='text-xs font-semibold text-primary-400'>
                {notifications?.filter((elm) => elm?.isTypeOfNoti === true)
                  ?.length || 0}
              </p>
            </div>
          </div>
        </div>
        {open && (
          <div className='absolute right-0 top-10 w-[440px] py-4 px-4 border border-l-neutral-grey-200 rounded-xl z-10 bg-white flex flex-col gap-2 max-h-[640px] shadow-sm overflow-y-auto custom-scrollbar-none-border'>
            {notifications?.length > 0 ? (
              notifications?.map((elm: any, ind: number) => {
                return (
                  <div key={ind}>
                    <NotificationItem
                      {...elm}
                      trans={trans}
                      handleNoti={handleNoti}
                    />
                  </div>
                );
              })
            ) : (
              <div className='px-4'>
                <p className='text-p14'>Chưa có dữ liệu</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationModal;
