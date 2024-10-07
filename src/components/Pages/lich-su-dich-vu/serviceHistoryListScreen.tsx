import { ITranslation } from "@/interfaces/ITranslation";
import React from "react";

interface IServiceHistoryListScreenProps {
  translation: ITranslation;
  nextScreen: () => void;
}

type ObjectT = {
  1: string;
  2: string;
  3: string;
  4: string;
};

type StatusT = {
  1: string;
  2: string;
  3: string;
};

const FAKE_DATAS = [
  {
    type: 1,
    status: 1,
    message: "Bạn đã tạo thành công đơn hàng #1002345 từ... đến...",
    createAt: new Date(),
  },
  {
    type: 2,
    status: 1,
    message: "Bạn đã tạo thành công đơn hàng #1002345 từ... đến...",
    createAt: new Date(),
  },
  {
    type: 3,
    status: 2,
    message: "Bạn đã tạo thành công đơn hàng #1002345 từ... đến...",
    createAt: new Date(),
  },
  {
    type: 4,
    status: 3,
    message: "Bạn đã tạo thành công đơn hàng #1002345 từ... đến...",
    createAt: new Date(),
  },
];

const ServiceHistoryListScreen = (props: IServiceHistoryListScreenProps) => {
  const { translation, nextScreen } = props;
  const { HISTORY } = translation;

  const TYPES = {
    1: HISTORY.sendProduct,
    2: HISTORY.busTicket,
    3: HISTORY.travelTour,
    4: HISTORY.contractVehicle,
  };

  const STATUS = {
    1: HISTORY.success,
    2: HISTORY.proccessing,
    3: HISTORY.running,
  };

  return (
    <div className="bg-neutral-grey-100 pb-10">
      <div className="bg-white">
        <div className="p-4">
          <p className="text-black font-bold text-base">
            {HISTORY.serviceHistory}
          </p>
        </div>

        <div>
          {FAKE_DATAS?.map((data, index) => {
            const { type, status, createAt, message } = data;
            const thisType = TYPES[type as keyof ObjectT];
            const thisStatus = STATUS[status as keyof StatusT];
            const thisTime =
              new Date(createAt).getHours() +
              ":" +
              new Date(createAt).getMinutes();
            const thisDate = new Date(createAt).toLocaleDateString();
            return (
              <div
                key={`history-${index}`}
                className="py-2 px-4 border-t border-t-[#EBEBEB] flex flex-col gap-0.5"
                onClick={nextScreen}
              >
                <div className="flex justify-between gap-2 items-center">
                  <p className="bg-[#EBEBEB] px-2 py-0.5 rounded-full text-[neutral-grey-500] font-semibold text-sm">
                    {thisType}
                  </p>
                  <div className="flex items-center gap-1 bg-black px-2 py-1 rounded-full">
                    <div className="rounded-full w-1 h-1 bg-white" />
                    <p className="text-white font-semibold text-xs">
                      {thisStatus}
                    </p>
                  </div>
                </div>
                <p className="text-[#19191B] font-medium text-sm">{message}</p>
                <div className="flex items-center gap-1">
                  <p className="text-neutral-grey-400 font-normal text-sm">
                    {thisTime}
                  </p>
                  <div className="rounded-full w-1 h-1 bg-neutral-grey-200" />
                  <p className="text-neutral-grey-400 font-normal text-sm">
                    {thisDate}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ServiceHistoryListScreen;
