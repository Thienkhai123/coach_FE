import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { IHomeTranslate } from "@/interfaces/IHomeTranslate";
import Button from "@/components/button";
import LocationIcon from "@/components/icons/location";
import SwapIcon from "@/components/icons/swap";
import FullScreenModal from "@/components/modal/FullScreenModal";
import useModal from "@/hook/useModal";
import SearchTripContent from "@/components/Pages/trang-chu/searchTripContent";
import SelectDropdownIcon from "@/components/icons/select-dropdown";
import ModalTicketContent from "@/components/Pages/trang-chu/modalTicketsContent";
import ModalPickDateContent from "@/components/Pages/trang-chu/modalPickDateContent";
import { IBookingTranslate } from "@/interfaces/IBookingTranslate";
import moment from "moment";
import { ICityResponse } from "@/interfaces/httpRequest/ICity";
import DrawerBottom2 from "@/components/drawer-bottom2";
import { Iplaces } from "@/interfaces/httpRequest/IPlaces";

interface IFormValues {
  from?: string;
  to?: string;
  startPlace?: string;
  endPlace?: string;
}

type OptionT = {
  id: number;
  value: string;
};

interface IFormBookingSeatProps {
  defaultValues?: IFormValues;
  listOpt?: OptionT[];
  HOME: IHomeTranslate;
  BOOKING: IBookingTranslate;
  city?: ICityResponse;
  places?: Iplaces;
  handleActionOnSubmit?: (arg: string) => void;
}

const FAKE_TICKETS = [1, 2, 3, 4, 5, 6, 7];

const FAKE_LIST_SEARCH = [
  "An Giang",
  "Cà Mau",
  "Hà Nội",
  "Hải Phòng",
  "TPHCM",
  "Vũng Tàu",
];

type LocationBoolType = {
  from: boolean | null;
  to: boolean | null;
};

type HistoryItemT = {
  id: number;
  value: string;
  isPlace: boolean;
};

type SearchStorage = {
  start: HistoryItemT | null;
  end: HistoryItemT | null;
};

const FormBookingSeat = ({
  listOpt = [],
  defaultValues = {},
  HOME,
  BOOKING,
  city,
  places = [],
  handleActionOnSubmit = () => {},
}: IFormBookingSeatProps) => {
  const [typeTrip, setTypeTrip] = useState(1);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [tickets, setTickets] = useState(1);
  const [openModalStartLocation, toggleModalStartLocation] = useModal();
  const [openModalEndLocation, toggleModalEndLocation] = useModal();
  const [openModalTickets, toggleModalTickets] = useModal();
  const [openModalPickStartDate, toggleModalPickStartDate] = useModal();
  const [openModalPickEndDate, toggleModalPickEndDate] = useModal();
  const [isPlaceState, setIsPlaceState] = useState<LocationBoolType>({
    from: null,
    to: null,
  });
  const [searchHistories, setSearchHistories] = useState<SearchStorage>({
    start: null,
    end: null,
  });

  const schema = yup.object().shape({
    startPlace: yup.string(),
    endPlace: yup.string(),
    from: yup.string().required("a"),
    to: yup.string().required("b"),
  });

  const { handleSubmit, watch, setValue } = useForm<IFormValues>({
    resolver: yupResolver<IFormValues>(schema),
    mode: "onChange",
    defaultValues: defaultValues,
  });

  const watchFrom = watch("from");
  const watchTo = watch("to");
  const watchStartPlace = watch("startPlace");
  const watchEndPlace = watch("endPlace");

  const handleUpdateValueFrom = (
    obj: { id: string; text: string },
    isPlace = false
  ) => {
    setValue("from", obj?.text);
    setValue("startPlace", obj?.id);
    const newSearchHistory = {
      id: parseInt(obj?.id),
      value: obj?.text,
      isPlace: isPlace,
    };
    const existingHistory = JSON.parse(
      localStorage.getItem("startPlace") || "[]"
    );
    const existingIndex = existingHistory.findIndex(
      (history: any) =>
        history.id == newSearchHistory.id &&
        history.value == newSearchHistory.value
    );

    if (existingIndex !== -1) {
      existingHistory.splice(existingIndex, 1);
    }

    existingHistory.unshift(newSearchHistory);

    if (existingHistory.length > 6) {
      existingHistory.pop();
    }

    // localStorage.setItem("startPlace", JSON.stringify(existingHistory));
    setSearchHistories({
      ...searchHistories,
      start: existingHistory || null,
    });
    setIsPlaceState({
      ...isPlaceState,
      from: isPlace,
    });
    toggleModalStartLocation();
    toggleModalEndLocation();
  };

  const handleUpdateValueTo = (
    obj: { id: string; text: string },
    isPlace = false
  ) => {
    setValue("to", obj?.text);
    setValue("endPlace", obj?.id);
    const newSearchHistory = {
      id: parseInt(obj?.id),
      value: obj?.text,
      isPlace: isPlace,
    };
    const existingHistory = JSON.parse(
      localStorage.getItem("endPlace") || "[]"
    );
    const existingIndex = existingHistory.findIndex(
      (history: any) =>
        history.id === newSearchHistory.id &&
        history.value === newSearchHistory.value
    );

    if (existingIndex !== -1) {
      existingHistory.splice(existingIndex, 1);
    }

    existingHistory.unshift(newSearchHistory);

    if (existingHistory.length > 6) {
      existingHistory.pop();
    }

    // localStorage.setItem("endPlace", JSON.stringify(existingHistory));
    setSearchHistories({
      ...searchHistories,
      end: existingHistory || null,
    });
    setIsPlaceState({
      ...isPlaceState,
      to: isPlace,
    });

    toggleModalEndLocation();
  };

  const handleSwapTrip = () => {
    setValue("from", watchTo);
    setValue("to", watchFrom);
    setValue("startPlace", watchEndPlace);
    setValue("endPlace", watchStartPlace);
    setIsPlaceState({
      from: isPlaceState.to,
      to: isPlaceState.from,
    });
    setSearchHistories({
      ...searchHistories,
      start: searchHistories.end,
      end: searchHistories.start,
    });
  };

  const handleChoostTicket = (num: number) => {
    setTickets(num);
    toggleModalTickets();
  };

  const handlePickDate = (val: Date | null) => {
    setStartDate(val);
    setEndDate(null);
    toggleModalPickStartDate();
  };

  const handlePickEndDate = (val: Date | null) => {
    setEndDate(val);
    toggleModalPickEndDate();
  };

  const onSubmit = async (data: IFormValues) => {
    const payload = {
      startDate: moment(startDate).format("DD-MM-YYYY") || "",
      endDate: moment(endDate).isValid()
        ? moment(endDate).format("DD-MM-YYYY")
        : "",
      amountTicket: tickets?.toString(),
      type: endDate && moment(endDate).isValid() ? "2" : "1",
      startCityId: !isPlaceState?.from ? data?.startPlace || "" : "",
      endCityId: !isPlaceState?.to ? data?.endPlace || "" : "",
      startPlace_id: isPlaceState?.from ? data?.startPlace || "" : "",
      endPlace_id: isPlaceState?.to ? data?.endPlace || "" : "",
    };

    const newSearchHistory = {
      startPlaceId: payload?.startPlace_id,
      endPlaceId: payload?.endPlace_id,
      startDate: payload?.startDate,
      endDate: payload?.endDate || undefined,
      amountTicket: payload?.amountTicket,
      type: parseInt(payload?.type),
      startCityId: payload?.startCityId,
      endCityId: payload?.endCityId,
    };

    const existingHistory = JSON.parse(
      localStorage.getItem("searchHistory") || "[]"
    );

    const existingIndex = existingHistory.findIndex(
      (history: any) =>
        history.startPlaceId == newSearchHistory.startPlaceId &&
        history.endPlaceId == newSearchHistory.endPlaceId &&
        history.startDate === newSearchHistory.startDate &&
        history.endDate === newSearchHistory.endDate &&
        history.amountTicket === newSearchHistory.amountTicket &&
        history.type === newSearchHistory.type &&
        history.startCityId == newSearchHistory.startCityId &&
        history.endCityId == newSearchHistory.endCityId
    );

    if (existingIndex !== -1) {
      existingHistory.splice(existingIndex, 1);
    }

    existingHistory.unshift(newSearchHistory);

    if (existingHistory.length > 4) {
      existingHistory.pop();
    }

    localStorage.setItem("searchHistory", JSON.stringify(existingHistory));
    localStorage.setItem("startPlace", JSON.stringify(searchHistories.start));
    localStorage.setItem("endPlace", JSON.stringify(searchHistories.end));

    let params = new URLSearchParams(payload);
    handleActionOnSubmit(params?.toString());
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-xl pb-5"
    >
      <div className="grid grid-cols-2 gap-2 items-center px-4 bg-neutral-grey-100 py-3 rounded-tl-xl rounded-tr-xl">
        <label>
          <div
            className="flex items-center gap-2"
            onClick={() => setTypeTrip(1)}
          >
            <input
              type="radio"
              className="accent-[#228AD1] w-5 h-5"
              readOnly
              checked={typeTrip === 1}
            />
            <p className="text-sm text-black">{HOME.oneWay}</p>
          </div>
        </label>
        <label>
          <div
            className="flex items-center gap-2"
            onClick={() => setTypeTrip(2)}
          >
            <input
              type="radio"
              className="accent-[#228AD1] w-5 h-5"
              readOnly
              checked={typeTrip === 2}
            />
            <p className="text-sm text-black">{HOME.roundTrip}</p>
          </div>
        </label>
      </div>

      <div className="flex px-4 py-1 gap-3 items-center">
        <div className="flex flex-col items-center gap-0.5">
          <div className="rounded-full bg-primary-900 p-1.5">
            <LocationIcon fill="#DF5030" />
          </div>
          <div className="h-5  border border-neutral-grey-400 border-dashed" />
          <div className="rounded-full bg-primary-900 p-1.5">
            <LocationIcon fill="#DF5030" />
          </div>
        </div>
        <div className="relative flex-1">
          <div
            className="px-2 py-4 border-b border-b-neutral-grey-200 w-full"
            onClick={toggleModalStartLocation}
          >
            <p className="font-bold text-base text-neutral-500">
              {watchFrom || HOME.startPlace}
            </p>
          </div>

          <div
            className="px-2 py-4 border-b border-b-neutral-grey-200 w-full"
            onClick={toggleModalEndLocation}
          >
            <p className="font-bold text-base text-neutral-500">
              {watchTo || HOME.endPlace}
            </p>
          </div>
          {watchFrom && watchTo && (
            <div
              className="absolute right-0 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full p-2 bg-neutral-grey-100"
              onClick={handleSwapTrip}
            >
              <SwapIcon />
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 p-4">
        <div className="pr-2">
          <p className="text-sm font-medium text-neutral-grey-600 mb-1">
            {HOME.startDate}
          </p>
          <div onClick={toggleModalPickStartDate}>
            <p className="text-base font-semibold text-neutral-grey-700">
              {moment(startDate)?.format("DD/MM/YYYY")}
            </p>
          </div>
        </div>
        {typeTrip === 2 && (
          <div className="mb-2">
            <p className="text-sm font-medium text-neutral-grey-600 mb-1">
              {HOME.endDate}
            </p>
            <div onClick={toggleModalPickEndDate}>
              <p className="text-base font-semibold text-neutral-grey-700">
                {endDate
                  ? moment(endDate)?.format("DD/MM/YYYY")
                  : HOME.pickingDay}
              </p>
            </div>
          </div>
        )}
        <div>
          <p className="text-sm font-medium text-neutral-grey-600 mb-1">
            {HOME.amountTickets}
          </p>
          <div className="flex gap-2 items-center">
            <p className="text-base font-semibold text-neutral-grey-700">
              {tickets}
            </p>
            <div onClick={toggleModalTickets}>
              <SelectDropdownIcon />
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 mb-2">
        <Button
          actionType="submit"
          disabled={!(watchEndPlace && watchStartPlace)}
          borderRadius="rounded-full"
          btnColor={
            watchEndPlace && watchStartPlace
              ? "bg-primary-500"
              : "bg-primary-600"
          }
          fontSize={
            watchEndPlace && watchStartPlace
              ? "text-base"
              : "text-base opacity-50"
          }
        >
          {HOME.findTrip}
        </Button>
      </div>

      <div className="grid grid-cols-2 items-center px-4 mt-2">
        <div className="flex justify-center items-center border-r border-r-[#D9D9D9]">
          <a
            className="text-[#313131] text-xs font-medium"
            href="/tin-tuc/bai-viet?slug=huong-dan-mua-ve"
          >
            {HOME.howToBuyTicket}
          </a>
        </div>

        <div className="flex justify-center items-center">
          <a
            href="/tin-tuc/bai-viet?slug=quy-dinh-chung"
            className="text-[#313131] text-xs font-medium"
          >
            {HOME.rules}
          </a>
        </div>
      </div>

      <FullScreenModal open={openModalStartLocation}>
        <SearchTripContent
          open={openModalStartLocation}
          title={HOME.startPlace}
          placeholder={HOME.placeholderSearchCity}
          searchRecentTitle={HOME.searchRecent}
          listLocation={city?.result}
          listSearch={FAKE_LIST_SEARCH}
          onSelect={handleUpdateValueFrom}
          onCancel={toggleModalStartLocation}
          // exceptWords={watchTo}
          searchLocationTitle={HOME.cityDistrict}
          notFoundText={HOME.locationNotFound}
          showRecentSearch
          searchType={1}
          locations={places}
          isSearchPlace
        />
      </FullScreenModal>

      <FullScreenModal open={openModalEndLocation}>
        <SearchTripContent
          open={openModalEndLocation}
          title={HOME.endPlace}
          placeholder={HOME.placeholderSearchCity}
          searchRecentTitle={HOME.searchRecent}
          listLocation={city?.result}
          listSearch={FAKE_LIST_SEARCH}
          onSelect={handleUpdateValueTo}
          onCancel={toggleModalEndLocation}
          // exceptWords={watchFrom}
          searchLocationTitle={HOME.cityDistrict}
          notFoundText={HOME.locationNotFound}
          showRecentSearch
          searchType={2}
          locations={places}
          isSearchPlace
        />
      </FullScreenModal>

      <DrawerBottom2
        open={openModalTickets}
        toggleDrawer={toggleModalTickets}
        wrapChildStyle=""
        childStyle="w-screen bg-white rounded-tl-2xl rounded-tr-xl"
        animationName="animation-open-tickets"
        closeStyle="animation-off-tickets"
      >
        <ModalTicketContent
          title={HOME.chooseTicket}
          listTickets={FAKE_TICKETS}
          selectedTicket={tickets}
          onChoose={handleChoostTicket}
        />
      </DrawerBottom2>
      <DrawerBottom2
        open={openModalPickStartDate}
        toggleDrawer={toggleModalPickStartDate}
        wrapChildStyle=""
        childStyle="w-screen bg-white rounded-tl-2xl rounded-tr-xl"
        animationName="animation-open-date-picker"
        closeStyle="animation-off-date-picker"
      >
        <ModalPickDateContent
          title={HOME.pickStartDate}
          btnTitle={BOOKING.continue}
          dateSelected={startDate}
          onSubmit={handlePickDate}
        />
      </DrawerBottom2>

      <DrawerBottom2
        open={openModalPickEndDate}
        toggleDrawer={toggleModalPickEndDate}
        wrapChildStyle=""
        childStyle="w-screen bg-white rounded-tl-2xl rounded-tr-xl"
        animationName="animation-open-date-picker"
        closeStyle="animation-off-date-picker"
      >
        <ModalPickDateContent
          title={HOME.pickEndDate}
          btnTitle={BOOKING.continue}
          onSubmit={handlePickEndDate}
          minDate={startDate}
          dateSelected={endDate}
        />
      </DrawerBottom2>
    </form>
  );
};

export default FormBookingSeat;
