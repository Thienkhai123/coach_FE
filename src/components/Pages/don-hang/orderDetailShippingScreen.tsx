import SquareIcon from "@/components/icons/square";
import NavbarBasic from "@/components/navbar/basic";
import { ITranslation } from "@/interfaces/ITranslation";
import React, { Fragment } from "react";

interface IOrderDetailShippingProps {
  translation: ITranslation;
  orderId: string;
  prevScreen: () => void;
}

const FAKE_DATAS = [
  {
    date: "21/02/2024",
    time: "12:58",
    status: "Đã được chuyển đến kho XT1",
  },
  {
    date: "21/02/2024",
    time: "12:58",
    status: "Đã được chuyển đến kho XT1",
  },
  {
    date: "21/02/2024",
    time: "12:58",
    status: "Đã được chuyển đến kho XT1",
  },
  {
    date: "21/02/2024",
    time: "12:58",
    status: "Đơn hàng rời kho phân loại",
  },
  {
    date: "21/02/2024",
    time: "12:58",
    status: "Đơn hàng được phân loại",
  },
  {
    date: "21/02/2024",
    time: "12:58",
    status: "Đơn hàng đã được đặt",
  },
];

const OrderDetailShipping = (props: IOrderDetailShippingProps) => {
  const { translation, prevScreen, orderId } = props;
  const { ORDER, TRANSPORT, BOOKING, PAYMENT } = translation;

  return (
    <Fragment>
      <NavbarBasic title={ORDER.shippingDetail} handleClick={prevScreen} />

      <div className="flex flex-col gap-2 bg-common">
        <div className="bg-white p-4">
          <div className="flex gap-3 items-center">
            <SquareIcon width="40" height="40" />
            <div>
              <p className="text-black font-medium  text-xs">
                {ORDER.transporting}
              </p>
              <p className="text-black font-normal  text-xs">
                {ORDER.expected}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4">
          <div className="py-2 border-b border-b-[#AFB1B6]">
            <p className="font-medium text-black text-base">
              {TRANSPORT.productionCode}: #{orderId}
            </p>
          </div>

          <div className="mt-2">
            {FAKE_DATAS?.map((data, ind) => (
              <div key={`ship-${ind}`} className="flex gap-6">
                <div className="pb-4">
                  <p className="text-[#61646B] font-medium text-sm">
                    {data?.date}
                  </p>
                  <p className="text-[#61646B] font-medium text-sm">
                    {data?.time}
                  </p>
                </div>

                <div className="flex flex-col items-center">
                  <div className="rounded-full w-6 h-6 bg-[#D9D9D9]" />
                  {ind !== FAKE_DATAS?.length - 1 && (
                    <div className="flex-1 border border-[#D9D9D9]" />
                  )}
                </div>

                <div>
                  <p className="text-[#19191B] font-medium text-sm">
                    {data?.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default OrderDetailShipping;
