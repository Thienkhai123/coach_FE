import { ITranslation } from "@/interfaces/ITranslation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "@/components/button";
import FullScreenModal from "@/components/modal/FullScreenModal";
import useModal from "@/hook/useModal";
import SearchTripContent from "../trang-chu/searchTripContent";
import LocationNonFillIcon from "@/components/icons/location-none-fill";
import ArrowDownIcon from "@/components/icons/arrowDown";
import ModalPickTransportLocation from "./modalPickTransportLocation";
import { ICityResponse } from "@/interfaces/httpRequest/ICity";
import { fetchShipmentLocation } from "@/apis/order";
import { IShipmentLocationResponse } from "@/interfaces/httpRequest/IOrder";
import LoadingView from "@/components/LoadingView";

type LocationsT = {
  from: string;
  fromId: number;
  to: string;
  toId: number;
  startPlace: number;
  endPlace: number;
  fromPlace: string;
  toPlace: string;
};

type PayerInforT = {
  payer: number;
  collection: boolean;
  values: number;
  totalCost: number;
};

type PayloadT = {
  locations: LocationsT;
  payerInfor: PayerInforT;
};

interface IThirdStepProps {
  translation: ITranslation;
  changeNextStep: () => void;
  city?: ICityResponse;
  handleUpdateLocationAndPayerInfor: (args: PayloadT) => void;
}

interface IFormValues {
  from?: string;
  to?: string;
  sendLocation?: string;
  receivedLocation?: string;
  freightPayer?: string;
  startPlace?: string;
  endPlace?: string;
}

interface IListLocactionState {
  send: { id: number; title: string }[];
  receive: { id: number; title: string }[];
}

const FAKE_LIST_SEARCH = [
  "An Giang",
  "Cà Mau",
  "Hà Nội",
  "Hải Phòng",
  "TPHCM",
  "Vũng Tàu",
];

const ThirdStep = (props: IThirdStepProps) => {
  const {
    translation,
    changeNextStep,
    city,
    handleUpdateLocationAndPayerInfor,
  } = props;
  const { BOOKING, ERROR, TRANSPORT, HOME } = translation;
  const [collectionState, setCollectionState] = useState("");
  const [openModalFrom, toggleModalFrom] = useModal();
  const [openModalLocation, toggleModalLocation] = useModal();
  const [openModalReceiveLocation, toggleModalReceiveLocation] = useModal();
  const [openModalTo, toggleModalTo] = useModal();
  const [titleSendLocation, setTitleSendLocation] = useState("");
  const [titleReceiveLocation, setTitleReceiveLocation] = useState("");
  const [listLocation, setListLocation] = useState<IListLocactionState>({
    send: [],
    receive: [],
  });
  const [loading, setLoading] = useState(false);
  const [hasCollection, setHasCollection] = useState(false);

  const schema = yup.object().shape({
    from: yup.string().required(ERROR.errorRequired),
    to: yup.string().required(ERROR.errorRequired),
    sendLocation: yup.string().required(ERROR.errorRequired),
    receivedLocation: yup.string().required(ERROR.errorRequired),
    freightPayer: yup.string(),
    startPlace: yup.string(),
    endPlace: yup.string(),
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<IFormValues>({
    resolver: yupResolver<IFormValues>(schema),
    mode: "onChange",
    defaultValues: {},
  });

  const watchFrom = watch("from");
  const watchTo = watch("to");
  const watchSendLocation = watch("sendLocation");
  const watchReceiveLocation = watch("receivedLocation");

  const handleChangeCollection = (val = "") => {
    if (val === "") {
      setCollectionState(val);
      return;
    }
    let intVal = val.replace(/\D/g, "");
    if (!isNaN(parseFloat(intVal))) {
      setCollectionState(parseFloat(intVal)?.toLocaleString());
      return;
    }
  };

  const handleUpdateValueFrom = async (obj: { id: string; text: string }) => {
    setLoading(true);
    const tmpSendList: { id: number; title: string }[] = [];
    const res: IShipmentLocationResponse = await fetchShipmentLocation({
      locationType: 1,
      cityId: parseInt(obj?.id),
    });
    if (res?.data) {
      res?.data?.forEach((el) => {
        tmpSendList.push({
          id: el.shipmentLocationId,
          title: el?.fullAddress,
        });
      });
      setListLocation({
        ...listLocation,
        send: tmpSendList,
      });
      setValue("from", obj?.text);
      setValue("startPlace", obj?.id);
      setValue("sendLocation", undefined);
      setTitleSendLocation("");
      toggleModalFrom();
    }
    setLoading(false);
  };

  const handleUpdateValueLocation = (obj: { id: number; title: string }) => {
    setValue("sendLocation", obj?.id?.toString());
    setTitleSendLocation(obj?.title);
    toggleModalLocation();
  };

  const handleUpdateValueTo = async (obj: { id: string; text: string }) => {
    setLoading(true);
    const tmpReceiveList: { id: number; title: string }[] = [];
    const res: IShipmentLocationResponse = await fetchShipmentLocation({
      locationType: 2,
      cityId: parseInt(obj?.id),
    });
    if (res?.data) {
      res?.data?.forEach((el) => {
        tmpReceiveList.push({
          id: el.shipmentLocationId,
          title: el?.fullAddress,
        });
      });
      setListLocation({
        ...listLocation,
        receive: tmpReceiveList,
      });
      setValue("to", obj?.text);
      setValue("endPlace", obj?.id);
      setValue("receivedLocation", undefined);
      setTitleReceiveLocation("");
      toggleModalTo();
    }

    setLoading(false);
  };

  const handleUpdateValueReceiveLocation = (obj: {
    id: number;
    title: string;
  }) => {
    setValue("receivedLocation", obj?.id?.toString());
    setTitleReceiveLocation(obj?.title);
    toggleModalReceiveLocation();
  };

  const onSubmit = async (data: IFormValues) => {
    let tmpValues = 0;
    if (
      collectionState !== "" &&
      !isNaN(parseFloat(collectionState.replace(/\D/g, "")))
    ) {
      tmpValues = parseFloat(collectionState.replace(/\D/g, ""));
    }
    handleUpdateLocationAndPayerInfor({
      locations: {
        from: titleSendLocation,
        fromId: parseInt(data?.sendLocation || "0"),
        to: titleReceiveLocation,
        toId: parseInt(data?.receivedLocation || "0"),
        startPlace: parseInt(data?.startPlace || "0"),
        endPlace: parseInt(data?.endPlace || "0"),
        fromPlace: data?.from || "",
        toPlace: data?.to || "",
      },
      payerInfor: {
        collection: true,
        payer: parseInt(data?.freightPayer || "0"),
        values: tmpValues,
        totalCost: 0,
      },
    });
    changeNextStep();
  };

  return (
    <>
      {loading && <LoadingView />}
      <div className="relative pb-24">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <div className="bg-white pb-4">
            <div className="flex flex-col gap-2 pt-4">
              <div className="px-4">
                <p className="text-neutral-grey-700 font-semibold text-sm mb-1">
                  {TRANSPORT.sendProductFrom}{" "}
                  <span className="text-semantic-red">*</span>
                </p>
                <div
                  className="flex items-center py-2 px-3 gap-2 justify-between border border-neutral-grey-300 rounded-lg"
                  onClick={toggleModalFrom}
                >
                  <div className="flex items-center gap-2">
                    <LocationNonFillIcon stroke="#646769" />
                    <p className="text-neutral-grey-500 font-medium text-sm">
                      {watchFrom || HOME.placeholderSearchCity}
                    </p>
                  </div>

                  <div>
                    <ArrowDownIcon fill="#101F24" />
                  </div>
                </div>
              </div>

              <div className="px-4">
                <p className="text-neutral-grey-700 font-semibold text-sm mb-1">
                  {TRANSPORT.locationSendDetail}{" "}
                  <span className="text-semantic-red">*</span>
                </p>
                <div
                  className="flex items-center py-2 px-3 gap-2 justify-between border border-neutral-grey-300 rounded-lg"
                  onClick={toggleModalLocation}
                >
                  <div className="flex items-center gap-2">
                    <div>
                      <LocationNonFillIcon stroke="#646769" />
                    </div>
                    <p className="text-neutral-grey-500 font-medium text-sm">
                      {titleSendLocation || TRANSPORT.pickSendLocation}
                    </p>
                  </div>

                  <div>
                    <ArrowDownIcon fill="#101F24" />
                  </div>
                </div>
              </div>

              <div className="px-4">
                <p className="text-neutral-grey-700 font-semibold text-sm mb-1">
                  {TRANSPORT.sendProductTo}{" "}
                  <span className="text-semantic-red">*</span>
                </p>
                <div
                  className="flex items-center py-2 px-3 gap-2 justify-between border border-neutral-grey-300 rounded-lg"
                  onClick={toggleModalTo}
                >
                  <div className="flex items-center gap-2">
                    <LocationNonFillIcon stroke="#646769" />
                    <p className="text-neutral-grey-500 font-medium text-sm">
                      {watchTo || HOME.placeholderSearchCity}
                    </p>
                  </div>

                  <div>
                    <ArrowDownIcon fill="#101F24" />
                  </div>
                </div>
              </div>

              <div className="px-4">
                <p className="text-neutral-grey-700 font-semibold text-sm mb-1">
                  {TRANSPORT.locationReceivedDetail}{" "}
                  <span className="text-semantic-red">*</span>
                </p>
                <div
                  className="flex items-center py-2 px-3 gap-2 justify-between border border-neutral-grey-300 rounded-lg"
                  onClick={toggleModalReceiveLocation}
                >
                  <div className="flex items-center gap-2">
                    <div>
                      <LocationNonFillIcon stroke="#646769" />
                    </div>
                    <p className="text-neutral-grey-500 font-medium text-sm">
                      {titleReceiveLocation || TRANSPORT.pickReceiveLocation}
                    </p>
                  </div>

                  <div>
                    <ArrowDownIcon fill="#101F24" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-4">
            <label>
              <div className="flex items-center gap-2 py-1">
                <div className="w-5 h-5">
                  <input
                    type="checkbox"
                    className="w-5 h-5 accent-[#228AD1] rounded"
                    onChange={(e) => setHasCollection(e.target.checked)}
                  />
                </div>
                <p className="text-neutral-grey-700 font-semibold text-sm">
                  {TRANSPORT.hasCollection}
                </p>
              </div>
            </label>

            <div
              className={`flex items-center ${
                hasCollection ? "bg-white" : "bg-neutral-grey-100"
              } rounded-lg px-3 py-2 gap-4 mt-2 border border-neutral-grey-100`}
            >
              <input
                className="flex-1 outline-0 bg-white disabled:bg-neutral-grey-100"
                maxLength={15}
                value={collectionState}
                onChange={(e) => handleChangeCollection(e.target.value)}
                disabled={!hasCollection}
                placeholder={TRANSPORT.moneyCollection}
              />
              <p className="text-[#61646B] font-medium text-sm">
                {TRANSPORT.vnd}
              </p>
            </div>
          </div>

          <div className="bg-white p-4">
            <p className="text-neutral-grey-700 font-semibold text-sm mb-1">
              {TRANSPORT.freightPayer}{" "}
              <span className="text-semantic-red">*</span>
            </p>
            <div className="grid grid-cols-2 mt-2">
              <label>
                <div className="flex gap-2 items-center">
                  <div className="w-5 h-5">
                    <input
                      type="radio"
                      className="accent-[#228AD1] w-5 h-5"
                      {...register("freightPayer")}
                      value="1"
                    />
                  </div>
                  <p className="text-neutral-grey-700 font-medium text-sm">
                    {TRANSPORT.sender}
                  </p>
                </div>
              </label>
              <label>
                <div className="flex gap-2 items-center">
                  <div className="w-5 h-5">
                    <input
                      type="radio"
                      className="accent-[#228AD1] w-5 h-5"
                      {...register("freightPayer")}
                      value="2"
                    />
                  </div>
                  <p className="text-neutral-grey-700 font-medium text-sm">
                    {TRANSPORT.receiver}
                  </p>
                </div>
              </label>
            </div>
          </div>

          <div className="p-4 bg-white fixed z-0 bottom-0 w-full drop-shadow-xl border">
            <Button
              actionType="submit"
              disabled={!isValid}
              btnColor={isValid ? "bg-primary-500" : "bg-primary-600"}
              borderRadius="rounded-full"
              fontSize={isValid ? "text-base" : "text-base opacity-50"}
            >
              {BOOKING.continue}
            </Button>
          </div>
        </form>

        <FullScreenModal open={openModalFrom}>
          <SearchTripContent
            open={openModalFrom}
            title={TRANSPORT.sendProductFrom}
            placeholder={HOME.placeholderSearchCity}
            searchRecentTitle={HOME.searchRecent}
            listLocation={city?.result}
            listSearch={FAKE_LIST_SEARCH}
            onSelect={handleUpdateValueFrom}
            onCancel={toggleModalFrom}
            searchLocationTitle={HOME.cityDistrict}
            notFoundText={HOME.locationNotFound}
          />
        </FullScreenModal>

        <FullScreenModal open={openModalLocation}>
          <ModalPickTransportLocation
            handleSelect={handleUpdateValueLocation}
            list={listLocation.send}
            title={TRANSPORT.pickSendLocation}
            seeLocationText={BOOKING.seeLocation}
            toggleModal={toggleModalLocation}
            selectedPicking={watchSendLocation}
          />
        </FullScreenModal>

        <FullScreenModal open={openModalTo}>
          <SearchTripContent
            open={openModalTo}
            title={TRANSPORT.sendProductTo}
            placeholder={HOME.placeholderSearchCity}
            searchRecentTitle={HOME.searchRecent}
            listLocation={city?.result}
            listSearch={FAKE_LIST_SEARCH}
            onSelect={handleUpdateValueTo}
            onCancel={toggleModalTo}
            searchLocationTitle={HOME.cityDistrict}
            notFoundText={HOME.locationNotFound}
          />
        </FullScreenModal>

        <FullScreenModal open={openModalReceiveLocation}>
          <ModalPickTransportLocation
            handleSelect={handleUpdateValueReceiveLocation}
            list={listLocation.receive}
            title={TRANSPORT.pickReceiveLocation}
            seeLocationText={BOOKING.seeLocation}
            toggleModal={toggleModalReceiveLocation}
            selectedPicking={watchReceiveLocation}
          />
        </FullScreenModal>
      </div>
    </>
  );
};

export default ThirdStep;
