import HistoryIcon from "@/components/icons/history";
import { ICityResponse } from "@/interfaces/httpRequest/ICity";
import { Iplaces } from "@/interfaces/httpRequest/IPlaces";
import { IHomeTranslate } from "@/interfaces/IHomeTranslate";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

type searchRecentT = {
  from: string;
  to: string;
  date: string;
};

interface ISearchRecentListProps {
  listSearchRecent: searchRecentT[];
  city?: ICityResponse;
  HOME: IHomeTranslate;
  places?: Iplaces;
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

const SearchRecentList = (props: ISearchRecentListProps) => {
  const { listSearchRecent, city, HOME, places } = props;
  const [searchHistory, setSearchHistory] = useState<
    Array<{
      startPlaceId: string;
      endPlaceId: string;
      startDate: string;
      endDate: string;
      amountTicket: string;
      type: string;
      startCityId: string;
      endCityId: string;
    }>
  >([]);
  const [placesStorage, setPlacesStorage] = useState<PlacesStorageT>({
    startPlace: [],
    endPlace: [],
  });

  const getSearchHistory = (): Array<{
    startPlaceId: string;
    endPlaceId: string;
    startDate: string;
    endDate: string;
    amountTicket: string;
    type: string;
    startCityId: string;
    endCityId: string;
  }> => {
    const history = localStorage.getItem("searchHistory");
    return history ? JSON.parse(history) : [];
  };

  const handleClickRecentSearch = ({
    startPlaceId,
    endPlaceId,
    startDate,
    endDate,
    amountTicket,
    endCityId,
    startCityId,
  }: {
    startPlaceId: string;
    endPlaceId: string;
    startDate: string;
    endDate: string;
    amountTicket: string;
    startCityId: string;
    endCityId: string;
  }) => {
    window.location.assign(
      `/dat-ve?startPlace_id=${startPlaceId}&endPlace_id=${endPlaceId}&startCityId=${startCityId}&endCityId=${endCityId}&startDate=${moment(
        startDate,
        "DD-MM-YYYY"
      ).format("DD-MM-YYYY")}${
        endDate
          ? "&endDate=" + moment(endDate, "DD-MM-YYYY").format("DD-MM-YYYY")
          : ""
      }&amountTicket=${amountTicket}`
    );
  };

  useEffect(() => {
    const history = getSearchHistory();
    const startPlaceHistories: PlaceStoreT =
      JSON.parse(localStorage?.getItem("startPlace") || `{}`) || [];
    const endPlaceHistories: PlaceStoreT =
      JSON.parse(localStorage?.getItem("endPlace") || `{}`) || [];

    setPlacesStorage({
      startPlace: startPlaceHistories || [],
      endPlace: endPlaceHistories || [],
    });

    setSearchHistory(history);
  }, []);

  return (
    <Swiper
      speed={1500}
      slidesPerView={1.7}
      slidesPerGroup={1}
      spaceBetween={8}
      className="mySwiper"
    >
      {city &&
        searchHistory?.map((searchRecent, ind) => {
          const {
            startDate,
            startPlaceId,
            endPlaceId,
            type,
            startCityId,
            endCityId,
          } = searchRecent || {};
          let startPlaceName = "";
          let endPlaceName = "";

          if (startCityId) {
            startPlaceName =
              city?.result.find((e) => e.id === startCityId.toString())?.text ||
              "";
          }
          if (endCityId) {
            endPlaceName =
              city?.result.find((e) => e.id === endCityId.toString())?.text ||
              "";
          }

          if (startPlaceId) {
            startPlaceName =
              placesStorage?.startPlace?.find(
                (e) => e.id == parseInt(startPlaceId)
              )?.value || "";
          }

          if (endPlaceId) {
            endPlaceName =
              placesStorage?.endPlace?.find(
                (e) => e.id === parseInt(endPlaceId)
              )?.value || "";
          }

          const thisStartDate = moment(startDate, "DD-MM-YYYY").format(
            "DD/MM/YYYY"
          );
          return (
            <SwiperSlide key={`search-recent-${ind}`}>
              <div
                className="w-full flex gap-2 rounded-lg overflow-hidden p-3 border border-neutral-grey-200 bg-white drop-shadow-[0px_1px_2px_0px_rgba(0,0,0,0.04),0px_2px_8px_0px_rgba(0,0,0,0.1)]"
                onClick={() => handleClickRecentSearch(searchRecent)}
              >
                <div>
                  <div className="rounded-full bg-secondary-200 p-1">
                    <HistoryIcon />
                  </div>
                </div>

                <div>
                  <p className="text-neutral-grey-700 text-sm font-semibold">
                    {startPlaceName} - {endPlaceName}
                  </p>
                  <p className="text-neutral-grey-500 text-sm font-medium">
                    {thisStartDate}
                  </p>

                  <div className="mt-2 rounded-full bg-secondary-600 py-1 px-2 w-fit">
                    <p className="text-xs font-bold text-secondary-300">
                      {parseInt(type) === 1 ? HOME.oneWay : HOME.roundTrip}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
};

export default SearchRecentList;
