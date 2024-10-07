import { fetchPlaces } from "@/apis/trip";
import ArrowLeftIcon from "@/components/icons/arrowLeft";
import CancelIcon from "@/components/icons/cancel";
import HistoryIcon from "@/components/icons/history";
import LocationNonFillIcon from "@/components/icons/location-none-fill";
import SearchIcon from "@/components/icons/search";
import { toLowerCaseNonAccentVietnamese } from "@/helpers/functionHelper";
import useDebounce from "@/hook/useDebounce";
import { Iplaces } from "@/interfaces/httpRequest/IPlaces";
import React, { useEffect, useState } from "react";

type LocationT = {
  id: string;
  text: string;
  image: string;
  other?: null;
};

type SearchT = {
  id: number;
  value: string;
  isPlace?: boolean;
};

interface ISearchTripContentProps {
  open?: boolean;
  title: string;
  placeholder?: string;
  searchRecentTitle: string;
  searchLocationTitle: string;
  listLocation?: LocationT[];
  listSearch?: string[];
  exceptWords?: string;
  notFoundText?: string;
  onSelect?: (arg: any, arg2: any) => void;
  onCancel?: () => void;
  showRecentSearch?: boolean;
  searchType?: number;
  locations?: any[];
  isSearchPlace?: boolean;
}

type SearchStateT = {
  cities: LocationT[];
  places: Iplaces;
  keyword: string;
  histories: SearchT[];
};

const SearchTripContent = (props: ISearchTripContentProps) => {
  const {
    open = false,
    title,
    placeholder = "",
    listLocation = [],
    listSearch = [],
    searchRecentTitle,
    searchLocationTitle,
    exceptWords = "",
    notFoundText = "",
    onSelect = () => {},
    onCancel = () => {},
    showRecentSearch = false,
    searchType = 0,
    locations = [],
    isSearchPlace = false,
  } = props;

  const [searchState, setSearchState] = useState<SearchStateT>({
    cities: listLocation,
    places: [],
    keyword: "",
    histories: [],
  });

  const debounceSearch = useDebounce(searchState.keyword, 1000);

  const resetTripState = () => {
    setSearchState({
      ...searchState,
      cities: listLocation,
      places: [],
      keyword: "",
    });
  };

  const handleSearchLocation = async (val: string) => {
    if (val) {
      const tmpList = listLocation?.filter((thisLocation) => {
        const formatVal = toLowerCaseNonAccentVietnamese(
          thisLocation?.text || ""
        );
        const formatSearchText = toLowerCaseNonAccentVietnamese(val);
        if (formatVal.includes(formatSearchText)) {
          return thisLocation;
        }
      });

      setSearchState({
        ...searchState,
        cities: tmpList,
        keyword: val,
      });
    } else {
      resetTripState();
    }
  };

  const getSearchHistory = (): SearchT[] => {
    if (searchType === 1) {
      const history = localStorage.getItem("startPlace");
      return history ? JSON.parse(history) : [];
    }
    if (searchType === 2) {
      const history = localStorage.getItem("endPlace");
      return history ? JSON.parse(history) : [];
    }

    return [];
  };

  const handleGetPlaces = async (text = "") => {
    const res: Iplaces = await fetchPlaces({ keyword: text });
    if (res?.length > 0) {
      setSearchState({
        ...searchState,
        places: res,
      });
    }
  };

  useEffect(() => {
    const history = getSearchHistory();
    setSearchState({
      ...searchState,
      histories: history,
    });
  }, []);

  useEffect(() => {
    if (isSearchPlace && searchState.keyword) {
      handleGetPlaces(searchState.keyword);
    }
  }, [debounceSearch]);

  return (
    <div
      className={` ${
        open ? "bg-white min-h-screen w-screen" : "w-0 h-0 overflow-hidden"
      }`}
    >
      <div className="relative px-4 py-2 bg-gradient-to-r from-[#DF5030] to-[#BE3C2A]">
        <div className="absolute left-4" onClick={onCancel}>
          <ArrowLeftIcon stroke="white" />
        </div>

        <p className="text-center text-white text-base font-semibold">
          {title}
        </p>
      </div>
      <div className="flex p-4 gap-3 items-center bg-white border-b border-b-neutral-grey-200">
        <SearchIcon />
        <input
          placeholder={placeholder}
          value={searchState.keyword}
          onChange={(e) => handleSearchLocation(e.target.value)}
          className="flex-1 outline-0 bg-transparent"
          autoComplete="off"
        />
        {searchState.keyword && (
          <div
            className="rounded-full bg-neutral-grey-100 p-2"
            onClick={resetTripState}
          >
            <CancelIcon />
          </div>
        )}
      </div>

      {showRecentSearch && searchState?.histories?.length > 0 && (
        <div className="py-5 px-4">
          <div className="flex gap-1 items-center">
            <HistoryIcon fill="black" />
            <p className="text-black text-sm font-semibold">
              {searchRecentTitle}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 mt-4">
            {searchState?.histories?.map((search, index) => {
              return (
                <div
                  key={index}
                  className="bg-neutral-grey-100 py-1 px-3 rounded-xl"
                  onClick={() =>
                    onSelect(
                      {
                        id: search?.id,
                        text: search?.value || "",
                      },
                      search?.isPlace
                    )
                  }
                >
                  <p className="text-black text-sm">{search?.value}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex gap-1 items-center px-4 mt-2">
        <LocationNonFillIcon />
        <p className="text-black text-sm font-semibold">
          {searchLocationTitle}
        </p>
      </div>

      {searchState?.cities?.length > 0 && (
        <div className="flex flex-col max-h-[40vh] overflow-y-auto custom-scrollbar mt-2 mr-2">
          {searchState?.cities.map((location, ind) => {
            if (location?.text !== exceptWords) {
              return (
                <div
                  key={`location-${ind}`}
                  onClick={() => onSelect(location, false)}
                >
                  <p className="p-4 text-black text-sm border-b border-b-[#EFEFF0]">
                    {location?.text}
                  </p>
                </div>
              );
            }
          })}
        </div>
      )}

      {searchState?.cities?.length === 0 &&
        searchState?.places?.length === 0 && (
          <div className="p-4">
            <p className="text-semantic-red font-medium text-sm">
              {notFoundText}
            </p>
          </div>
        )}

      <div className="border-t border-t-neutral-grey-100 h-[1px] mt-2" />

      {searchState?.keyword !== "" &&
        searchState?.places?.map((locationDetail: any, ind: number) => {
          return (
            <div
              key={`location-detail-${ind}`}
              onClick={() =>
                onSelect(
                  {
                    id: locationDetail?.placeId,
                    text: locationDetail?.name,
                  },
                  true
                )
              }
            >
              <p className="px-4 pt-4 text-black text-sm font-semibold">
                {locationDetail?.name}
              </p>
              <p className="px-4 pt-1 pb-4 text-neutral-grey-500 text-sm border-b border-b-[#EFEFF0]">
                {locationDetail?.addressDisplay}
              </p>
            </div>
          );
        })}
    </div>
  );
};

export default SearchTripContent;
