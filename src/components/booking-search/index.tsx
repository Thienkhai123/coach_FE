import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SelectOptionSearch from "@/components/input/select-option-search";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import InputSelectOptionDropdown from "@/components/input/select-option-drowdown";
import { IHomeTranslate } from "@/interfaces/IHomeTranslate";
import CalendarIcon from "@/components/icons/calendar";
import Button from "@/components/button";
import Image from "next/image";
import MapPinIcon from "../icons/map-pin";
import CalendarDaysIcon from "../icons/calendarDays";
import UserGroupIcon from "../icons/user-group";
import SwitchSorizontalIcon from "../icons/switch-horizontal";
import RecentIcon from "../icons/recent";
import RecentSearchCard from "../recent-search-card";

import StartPlaceSelectOption from "../start-place-select-option";
import DatePickerSelectOption from "../date-picker-select-option";
import AmountTicketSelectOption from "../amount-ticket-select-option";
import Footer from "../footer";
import moment from "moment";
import { ICityResponse } from "@/interfaces/httpRequest/ICity";
import { Iplaces } from "@/interfaces/httpRequest/IPlaces";

interface IFormValues {
  // from?: string;
  // to?: string;
  // ticket?: number;
  startPlace?: string;
  startPlace_id?: number;
  endPlace?: string;
  endPlace_id?: number;
  startCity?: string;
  startCity_id?: number;
  endCity?: string;
  endCity_id?: number;
  startDate: string;
  endDate?: string | null;
  amountTicket: string;
  startDate_datetime?: Date;
  endDate_datetime?: Date;
}

export type OptionT = {
  id: number;
  value: string;
  description?: string;
  other?: any;
};

interface IFormBookingSearchProps {
  HOME: IHomeTranslate;
  city?: ICityResponse;
  places?: Iplaces;
  handleActionOnSubmit?: () => void;
}

type PlaceStoreT = Array<{
  id: number;
  isPlace: boolean;
  value: string;
}>;

type PlacesStorageT = {
  startPlace: PlaceStoreT;
  endPlace: PlaceStoreT;
};

const FAKE_TICKETS = [
  {
    id: 1,
    value: "1",
  },
  {
    id: 2,
    value: "2",
  },
  {
    id: 3,
    value: "3",
  },
  {
    id: 4,
    value: "4",
  },
  {
    id: 5,
    value: "5",
  },
  {
    id: 6,
    value: "6",
  },
  {
    id: 7,
    value: "7",
  },
];

const FormBookingSearch = ({
  HOME,
  city,
  places = [],
  handleActionOnSubmit = () => {},
}: IFormBookingSearchProps) => {
  const [typeTrip, setTypeTrip] = useState(1);
  const [defaultValues, setDefaultValues] = useState<any>();
  const [searchHistory, setSearchHistory] = useState<
    Array<{
      startPlaceId: string;
      endPlaceId: string;
      startCityId: string;
      endCityId: string;
      startPlaceType: number;
      endPlaceType: number;
      startDate: string;
      endDate?: string;
      amountTicket: string;
      type: number;
    }>
  >([]);
  // const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [placesStorage, setPlacesStorage] = useState<PlacesStorageT>({
    startPlace: [],
    endPlace: [],
  });

  const schema = yup.object().shape({
    // startPlace_id: yup.number().nullable(),
    // endPlace_id: yup.number().required(),
    // startCity_id: yup.number().required(),
    // endCity_id: yup.number().required(),
    startDate: yup.string().required(),
    endDate: typeTrip === 2 ? yup.string().required() : yup.string().nullable(),
    amountTicket: yup.string().required(),
  });

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    setError,
    getValues,
    formState: { errors, isValid, isDirty },
  } = useForm<IFormValues>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: defaultValues,
  });

  // const watchFrom = watch("from");

  const onSubmit = async (data: IFormValues) => {
    // console.log({ ...data });
    handleActionOnSubmit();
  };

  const validatePlacesLocalStorage = ({
    startCityId,
    endCityId,
    startPlaceId,
    endPlaceId,
  }: {
    startPlaceId: number;
    endPlaceId: number;
    endCityId: number;
    startCityId: number;
  }) => {
    const startLocal =
      JSON.parse(localStorage.getItem("startPlace") || "[]") || [];
    const endLocal = JSON.parse(localStorage.getItem("endPlace") || "[]") || [];
    if (startCityId) {
      const existStart = endLocal?.find((el: any) => el?.id == startCityId);
      if (existStart) {
        localStorage.setItem(
          "startPlace",
          JSON.stringify([...startLocal, existStart])
        );
      }
    }
    if (endCityId) {
      const existEnd = startLocal?.find((el: any) => el?.id == endCityId);
      if (existEnd) {
        localStorage.setItem(
          "endPlace",
          JSON.stringify([...endLocal, existEnd])
        );
      }
    }
    if (startPlaceId) {
      const existStart = endLocal?.find((el: any) => el?.id == startPlaceId);
      if (existStart) {
        const exitLocalStart = startLocal?.find(
          (el: any) => el?.id == startPlaceId
        );
        if (!exitLocalStart) {
          localStorage.setItem(
            "startPlace",
            JSON.stringify([...startLocal, existStart])
          );
        }
      }
    }
    if (endPlaceId) {
      const existEnd = startLocal?.find((el: any) => el?.id == endPlaceId);
      if (existEnd) {
        const exitLocalEnd = endLocal?.find((el: any) => el?.id == endPlaceId);
        if (!exitLocalEnd) {
          localStorage.setItem(
            "endPlace",
            JSON.stringify([...endLocal, existEnd])
          );
        }
      }
    }
  };

  const handleSwitchPlace = () => {
    const tmpPlace = getValues("startPlace");
    const tmpPlaceId = getValues("startPlace_id");
    const tmpCity = getValues("startCity");
    const tmpCityId = getValues("startCity_id");

    const tmpEndCityId = getValues("endCity_id") || 0;
    const tmpEndPlaceId = getValues("endPlace_id") || 0;

    setValue(
      "startPlace",
      getValues("endPlace") && getValues("endPlace") !== ""
        ? getValues("endPlace")
        : ""
    );
    setValue(
      "startPlace_id",
      getValues("endPlace_id") && getValues("endPlace_id") !== 0
        ? getValues("endPlace_id")
        : 0
    );
    setValue(
      "startCity",
      getValues("endCity") && getValues("endCity") !== ""
        ? getValues("endCity")
        : ""
    );
    setValue(
      "startCity_id",
      getValues("endCity_id") && getValues("endCity_id") !== 0
        ? getValues("endCity_id")
        : 0
    );

    setValue("endPlace", tmpPlace);
    setValue("endPlace_id", tmpPlaceId);
    setValue("endCity", tmpCity);
    setValue("endCity_id", tmpCityId);

    validatePlacesLocalStorage({
      startCityId: tmpEndCityId,
      endCityId: tmpCityId || 0,
      endPlaceId: tmpPlaceId || 0,
      startPlaceId: tmpEndPlaceId,
    });
  };

  const handleSubmitSearch = () => {
    const startPlaceId = getValues("startPlace_id");
    const endPlaceId = getValues("endPlace_id");
    const startCityId = getValues("startCity_id");
    const endCityId = getValues("endCity_id");

    const startDate = moment(getValues("startDate_datetime")).format(
      "DD-MM-YYYY"
    );
    const endDate = moment(getValues("endDate_datetime")).format("DD-MM-YYYY");
    const amountTicket = getValues("amountTicket");
    const type = typeTrip;

    const newSearchHistory = {
      startPlaceId,
      endPlaceId,
      startCityId,
      endCityId,
      startDate,
      ...(typeTrip === 2 && { endDate }),
      amountTicket,
      type,
    };

    const existingHistory = JSON.parse(
      localStorage.getItem("searchHistory") || "[]"
    );

    const existingIndex = existingHistory.findIndex(
      (history: any) =>
        history.startPlaceId == newSearchHistory.startPlaceId &&
        history.endPlaceId == newSearchHistory.endPlaceId &&
        history.startCityId == newSearchHistory.startCityId &&
        history.endCityId == newSearchHistory.endCityId &&
        history.startDate === newSearchHistory.startDate &&
        history.endDate === newSearchHistory.endDate &&
        history.amountTicket === newSearchHistory.amountTicket &&
        history.type === newSearchHistory.type
    );

    if (existingIndex !== -1) {
      existingHistory.splice(existingIndex, 1);
    }

    existingHistory.unshift(newSearchHistory);

    if (existingHistory.length > 4) {
      existingHistory.pop();
    }

    localStorage.setItem("searchHistory", JSON.stringify(existingHistory));
    if (typeTrip === 2) {
      window.location.assign(
        `/dat-ve?startPlace_id=${startPlaceId || ""}&endPlace_id=${
          endPlaceId || ""
        }&startCityId=${startCityId || ""}&endCityId=${
          endCityId || ""
        }&startDate=${moment(getValues("startDate_datetime")).format(
          "DD-MM-YYYY"
        )}&endDate=${moment(getValues("endDate_datetime"), "DD-MM-YYYY").format(
          "DD-MM-YYYY"
        )}
				&amountTicket=${getValues("amountTicket")}&type=${typeTrip}`
      );
    } else {
      window.location.assign(
        `/dat-ve?startPlace_id=${startPlaceId || ""}&endPlace_id=${
          endPlaceId || ""
        }&startCityId=${startCityId || ""}&endCityId=${
          endCityId || ""
        }&startDate=${moment(getValues("startDate_datetime")).format(
          "DD-MM-YYYY"
        )}&amountTicket=${getValues("amountTicket")}&type=${typeTrip}`
      );
    }
  };

  const handleClickRecentSearch = ({
    startPlaceId,
    endPlaceId,
    startCityId,
    endCityId,

    startDate,
    endDate,
    amountTicket,
    type,
  }: {
    startPlaceId: string;
    endPlaceId: string;
    startCityId: string;
    endCityId: string;

    startDate: string;
    endDate?: string;
    amountTicket: string;
    type: number;
  }) => {
    const newSearchHistory = {
      startPlaceId,
      endPlaceId,
      startCityId,
      endCityId,
      startDate,

      ...(endDate && { endDate }),
      amountTicket,
      type,
    };

    const existingHistory = JSON.parse(
      localStorage.getItem("searchHistory") || "[]"
    );

    const existingIndex = existingHistory.findIndex(
      (history: any) =>
        history.startPlaceId == newSearchHistory.startPlaceId &&
        history.endPlaceId == newSearchHistory.endPlaceId &&
        history.startCityId == newSearchHistory.startCityId &&
        history.endCityId == newSearchHistory.endCityId &&
        history.startDate === newSearchHistory.startDate &&
        history.endDate == newSearchHistory.endDate &&
        history.amountTicket == newSearchHistory.amountTicket &&
        history.type == newSearchHistory.type
    );

    if (existingIndex !== -1) {
      existingHistory.splice(existingIndex, 1);
    }

    existingHistory.unshift(newSearchHistory);

    if (existingHistory.length > 4) {
      existingHistory.pop();
    }

    localStorage.setItem("searchHistory", JSON.stringify(existingHistory));
    if (type === 2) {
      window.location.assign(
        `/dat-ve?startPlace_id=${startPlaceId || ""}&endPlace_id=${
          endPlaceId || ""
        }&startCityId=${startCityId || ""}&endCityId=${
          endCityId || ""
        }&startDate=${moment(startDate, "DD-MM-YYYY").format(
          "DD-MM-YYYY"
        )}&endDate=${moment(endDate, "DD-MM-YYYY").format("DD-MM-YYYY")}
				&amountTicket=${amountTicket}&type=${type}`
      );
    } else {
      window.location.assign(
        `/dat-ve?startPlace_id=${startPlaceId || ""}&endPlace_id=${
          endPlaceId || ""
        }&startCityId=${startCityId || ""}&endCityId=${
          endCityId || ""
        }&startDate=${moment(startDate, "DD-MM-YYYY").format(
          "DD-MM-YYYY"
        )}&amountTicket=${amountTicket}&type=${type}`
      );
    }
  };
  const convertCityTOptionType = (data?: ICityResponse) => {
    const tmpCity: OptionT[] = [];
    data?.result?.forEach((el) => {
      tmpCity.push({
        value: el.text,
        id: parseInt(el.id),
      });
    });
    return tmpCity;
  };
  const convertPlaceTOptionType = (data?: Iplaces) => {
    const tmpPlace: OptionT[] = [];
    data?.forEach((el) => {
      tmpPlace.push({
        value: el.name,
        id: el.placeId,
        description: el.addressDisplay,
        other: el,
      });
    });
    return tmpPlace;
  };
  const getSearchHistory = (): Array<{
    startPlaceId: string;
    endPlaceId: string;
    startCityId: string;
    endCityId: string;
    startPlaceType: number;
    endPlaceType: number;
    startDate: string;
    amountTicket: string;
    type: number;
  }> => {
    const history = localStorage.getItem("searchHistory");
    return history ? JSON.parse(history) : [];
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams?.size > 0) {
      const startPlacesLocal: PlaceStoreT = JSON.parse(
        localStorage.getItem("startPlace") || `[]`
      );
      const endPlacesLocal: PlaceStoreT = JSON.parse(
        localStorage.getItem("endPlace") || `[]`
      );
      const startPlace_id = searchParams.get("startPlace_id");
      const endPlace_id = searchParams.get("endPlace_id");
      const startCity = searchParams.get("startCityId");
      const endCity = searchParams.get("endCityId");
      const startDateUrl = searchParams.get("startDate");
      const endDateUrl = searchParams.get("endDate");
      const amountTicketUrl = searchParams.get("amountTicket");
      const typeUrl = searchParams.get("type");
      const tmpDef = {
        startPlace_id:
          startCity && startCity !== "" ? 0 : parseInt(startPlace_id || "0"),
        endPlace_id:
          endCity && endCity !== "" ? 0 : parseInt(endPlace_id || "0"),
        startCity_id:
          startPlace_id && startPlace_id !== ""
            ? 0
            : parseInt(startCity || "0"),
        endCity_id:
          endPlace_id && endPlace_id !== "" ? 0 : parseInt(endCity || "0"),
        startPlace:
          startPlace_id && startPlace_id
            ? startPlacesLocal?.find(
                (e) => startPlace_id && e.id === parseInt(startPlace_id)
              )?.value || "" // Convert null to empty string
            : "",
        endPlace: endPlace_id
          ? endPlacesLocal?.find(
              (e) => endPlace_id && e.id === parseInt(endPlace_id)
            )?.value || "" // Convert null to empty string
          : "",
        startCity:
          startCity && startCity !== ""
            ? city?.result.find((e) => e.id === startCity)?.text || ""
            : startPlace_id && startPlace_id !== ""
            ? places?.find(
                (e) => startPlace_id && e.placeId === parseInt(startPlace_id)
              )?.address
            : "",
        endCity:
          endCity && endCity !== ""
            ? city?.result.find((e) => e.id === endCity)?.text || ""
            : endPlace_id && endPlace_id !== ""
            ? places?.find(
                (e) => endPlace_id && e.placeId === parseInt(endPlace_id)
              )?.address
            : "",

        startDate_datetime: moment(startDateUrl, "DD-MM-YYYY").toDate(),
        endDate_datetime: moment(endDateUrl, "DD-MM-YYYY").toDate(),
        startDate: startDateUrl
          ? moment(startDateUrl, "DD-MM-YYYY").format("DD/MM/YYYY")
          : "",
        endDate: endDateUrl
          ? moment(endDateUrl, "DD-MM-YYYY").format("DD/MM/YYYY")
          : "",
        amountTicket: amountTicketUrl || "",
      };
      setDefaultValues(tmpDef);
      reset(tmpDef);
      if (endDateUrl) {
        if (typeUrl && parseInt(typeUrl) === 2) {
          setTypeTrip(2);
        }
      } else {
        setTypeTrip(1);
      }
    } else {
      setDefaultValues({
        startPlace_id: "",
        endPlace_id: "",
        startCity_id: "",
        endCity_id: "",
        startPlace: "",
        endPlace: "",
        startCity: "",
        endCity: "",
        startDate_datetime: "",
        endDate_datetime: "",
        startDate: "",
        endDate: "",
        amountTicket: "",
      });
    }
  }, [city, reset]);
  useEffect(() => {
    const history = getSearchHistory();
    const startPlaceHistories: PlaceStoreT =
      JSON.parse(localStorage?.getItem("startPlace") || `[]`) || [];
    const endPlaceHistories: PlaceStoreT =
      JSON.parse(localStorage?.getItem("endPlace") || `[]`) || [];

    setPlacesStorage({
      startPlace: startPlaceHistories || [],
      endPlace: endPlaceHistories || [],
    });
    setSearchHistory(history);
  }, []);

  return (
    <form onSubmit={handleSubmit(handleSubmitSearch)}>
      <div className="w-full absolute -top-20 h-fit pb-6 bg-white border border-neutral-grey-100 rounded-2xl shadow-[0px_5px_8px_-2px_rgba(0,0,0,0.05),0px_2px_4px_-2px_rgba(0,0,0,0.06)]">
        <div className="flex items-center justify-between px-4 py-4 bg-neutral-grey-100 rounded-t-2xl">
          <div className="flex items-center gap-10">
            <label>
              <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => setTypeTrip(1)}
              >
                <input
                  type="radio"
                  className="accent-[#228AD1] w-5 h-5"
                  readOnly
                  checked={typeTrip === 1}
                />
                <p
                  className={`text-sm  text-black ${
                    typeTrip === 1 ? "font-semibold" : "font-medium"
                  }`}
                >
                  {HOME.oneWay}
                </p>
              </div>
            </label>
            <label>
              <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => setTypeTrip(2)}
              >
                <input
                  type="radio"
                  className="accent-[#228AD1] w-5 h-5"
                  readOnly
                  checked={typeTrip === 2}
                />
                <p
                  className={`text-sm  text-black ${
                    typeTrip === 2 ? "font-semibold" : "font-medium"
                  }`}
                >
                  {HOME.roundTrip}
                </p>
              </div>
            </label>
          </div>
          <div className="flex items-center gap-4">
            <a href="/tin-tuc/bai-viet?slug=huong-dan-mua-ve">
              <p className="text-sm font-semibold text-neutral-grey-700 underline">
                {HOME.howToBuyTicket}
              </p>
            </a>
            <div className="w-[1px] h-5 bg-neutral-grey-200"></div>
            <a href="/tin-tuc/bai-viet?slug=quy-dinh-chung">
              <p className="text-sm font-semibold text-neutral-grey-700 underline">
                {HOME.rules}
              </p>
            </a>
          </div>
        </div>

        <div className="w-full  px-4 mt-4">
          <div
            className={`grid transition-all ${
              typeTrip === 2
                ? "grid-cols-[19.73%_19.73%_27.95%_19.73%_12.87%]"
                : "grid-cols-[21.8%_21.8%_21.8%_21.8%_12.8%]"
            }  `}
          >
            <div className="group h-[68px] relative bg-neutral-grey-000 flex items-center gap-2 px-4 py-[18px] border border-neutral-grey-100 rounded-l-lg cursor-pointer">
              <StartPlaceSelectOption
                register={register}
                name={"startCity"}
                placeName="startPlace"
                watch={watch}
                placeholder={HOME.startPlace}
                errors={errors}
                setValue={setValue}
                Icon={MapPinIcon}
                searchPlaceholder={HOME.placeholderSearchCity}
                listOpt={convertCityTOptionType(city)}
                listPlaces={convertPlaceTOptionType(places)}
                HOME={HOME}
                getValues={getValues}
                className="bg-transparent pl-0 w-full font-bold outline-none cursor-pointer transition-all placeholder:group-hover:text-primary-400 placeholder:text-neutral-grey-500 placeholder:text-base"
              />
              <div
                onClick={handleSwitchPlace}
                className="absolute -right-4 w-8 h-8 flex items-center justify-center bg-neutral-grey-100 hover:bg-neutral-grey-200 transition-all cursor-pointer rounded-full"
              >
                <SwitchSorizontalIcon />
              </div>
            </div>
            <div className="group h-[68px] bg-neutral-grey-000 flex items-center gap-2 px-6 py-[18px] border-t border-r border-b cursor-pointer">
              <StartPlaceSelectOption
                register={register}
                name={"endCity"}
                placeName={"endPlace"}
                watch={watch}
                placeholder={HOME.endPlace}
                errors={errors}
                setValue={setValue}
                Icon={MapPinIcon}
                listOpt={convertCityTOptionType(city)}
                listPlaces={convertPlaceTOptionType(places)}
                getValues={getValues}
                searchPlaceholder={HOME.placeholderSearchCity}
                HOME={HOME}
                className="bg-transparent pl-0 w-full font-bold outline-none cursor-pointer transition-all placeholder:group-hover:text-primary-400 placeholder:text-neutral-grey-500 placeholder:text-base"
              />
            </div>
            <div className="group h-[68px] bg-neutral-grey-000 flex items-center   px-4 py-[18px] border-t border-r border-b cursor-pointer">
              <DatePickerSelectOption
                register={register}
                name={"startDate"}
                Icon={CalendarDaysIcon}
                errors={errors}
                getValues={getValues}
                placeholder={HOME.startDate}
                setValue={setValue}
                className="bg-transparent pl-0 w-full font-bold outline-none cursor-pointer transition-all placeholder:hover:text-primary-400 placeholder:text-neutral-grey-500 placeholder:text-base"
              />
              {typeTrip === 2 && (
                <div className="ml-8">
                  <DatePickerSelectOption
                    register={register}
                    name={"endDate"}
                    showIcon={false}
                    // Icon={CalendarDaysIcon}
                    errors={errors}
                    getValues={getValues}
                    placeholder={HOME.endDate}
                    setValue={setValue}
                    className="bg-transparent pl-0 w-full font-bold outline-none cursor-pointer transition-all placeholder:hover:text-primary-400 placeholder:text-neutral-grey-500 placeholder:text-base"
                  />
                </div>
              )}
            </div>
            <div className="group h-[68px] bg-neutral-grey-000 flex items-center gap-2 px-4 py-[18px] border-t border-r border-b cursor-pointer">
              <AmountTicketSelectOption
                register={register}
                Icon={UserGroupIcon}
                name={"amountTicket"}
                errors={errors}
                placeholder={HOME.amountTickets}
                setValue={setValue}
                getValues={getValues}
                listOpt={FAKE_TICKETS}
                className="bg-transparent pl-0 w-full font-bold outline-none cursor-pointer transition-all placeholder:hover:text-primary-400 placeholder:text-neutral-grey-500 placeholder:text-base"
              />
            </div>
            <button
              disabled={
                watch("amountTicket") === "" ||
                watch("startDate") === "" ||
                (watch("endPlace_id") === 0 && watch("endCity_id") === 0) ||
                (watch("startPlace_id") === 0 && watch("startCity_id") === 0) ||
                (typeTrip === 2 && watch("endDate") === "")
              }
              key={typeTrip}
              className={`h-[68px] group disabled:bg-primary-600 bg-primary-500 flex items-center justify-center px-4 py-[18px] border-t border-r border-b rounded-r-xl cursor-pointer`}
            >
              <p className="text-sm text-white group-disabled:text-opacity-60 font-semibold">
                {HOME.findTrip}
              </p>
            </button>
          </div>
        </div>

        <div className="mt-6 px-4">
          <p className="text-sm text-black font-medium">{HOME.searchRecent}</p>

          <div className="mt-2 grid grid-cols-4 items-center gap-2">
            {searchHistory?.length > 0 &&
              searchHistory?.map((search, index) => {
                const {
                  startDate,
                  startPlaceId,
                  startCityId,
                  endDate,
                  endPlaceId,
                  endCityId,
                  amountTicket,
                  type,
                } = search || {};
                const startPlaceName =
                  startCityId && startCityId !== ""
                    ? city?.result.find((e) => e.id === startCityId.toString())
                        ?.text
                    : placesStorage?.startPlace?.find(
                        (e) => startPlaceId && e.id === parseInt(startPlaceId)
                      )?.value;

                const endPlaceName =
                  endCityId && endCityId !== ""
                    ? city?.result.find((e) => e.id === endCityId.toString())
                        ?.text
                    : placesStorage?.endPlace?.find(
                        (e) => endPlaceId && e.id === parseInt(endPlaceId)
                      )?.value;
                return (
                  <div
                    key={index}
                    onClick={() => {
                      handleClickRecentSearch({
                        ...search,
                      });
                    }}
                  >
                    <RecentSearchCard
                      title={`${startPlaceName || ""} - ${endPlaceName || ""}`}
                      date={moment(startDate, "DD-MM-YYYY").format(
                        "DD/MM/YYYY"
                      )}
                      endDate={moment(endDate, "DD-MM-YYYY").format(
                        "DD/MM/YYYY"
                      )}
                      type={type ? type : 1}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </form>
  );
};

export default FormBookingSearch;
