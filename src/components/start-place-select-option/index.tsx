import useOnClickOutside from "@/hook/useClickOutside";
import { Fragment, useEffect, useRef, useState } from "react";
import ArrowDownIcon from "../icons/arrowDown";
import MapPinIcon from "../icons/map-pin";
import SearchIcon from "../icons/search";
import MagnifyingGlassIcon from "../icons/magnifying-glass";
import RecentIcon from "../icons/recent";
import LocationIcon from "../icons/location";
import LocationNonFillIcon from "../icons/location-none-fill";
import { IHomeTranslate } from "@/interfaces/IHomeTranslate";
import { Iplace, Iplaces } from "@/interfaces/httpRequest/IPlaces";
import useDebounce from "@/hook/useDebounce";
import { fetchPlaces } from "@/apis/trip";

export type optionType = {
  id: number | string;
  value: string;
  description?: string;
  other?: any;
};
const FAKE_LIST_SEARCH_RECENT = [
  { id: 6, value: "An Giang" },
  { id: 1, value: "Cà Mau" },
  { id: 2, value: "Hà Nội" },
  { id: 3, value: "An Giang" },
  { id: 4, value: "An Giang" },
];

interface IStartPlaceSelectOption {
  register: any;
  className?: string;
  name: string;
  placeName: string;
  placeholder: string;
  errors: any;
  listOpt?: optionType[];
  setValue: any;
  getValues: any;
  watch: any;
  Icon?: any;
  index?: number;
  onChange?: Function;
  searchPlaceholder?: string;
  HOME?: IHomeTranslate;
  listPlaces?: optionType[];
}

const StartPlaceSelectOption = (props: IStartPlaceSelectOption) => {
  const {
    register,
    className = "bg-transparent pl-4 w-full outline-none cursor-pointer transition-all placeholder:hover:text-primary-400 placeholder:text-neutral-grey-500 placeholder:text-base h-6",
    name,
    placeName,
    placeholder,
    errors,
    watch,
    listOpt = [],
    setValue,
    getValues,
    Icon,
    index,
    onChange = () => {},
    HOME,
    searchPlaceholder = "Nhập tên thành phố",
    listPlaces = [],
  } = props;
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState<optionType>();
  const [tempOption, setTempOption] = useState<optionType[]>();
  const [tempOptionPlaces, setTempOptionPlaces] = useState<Iplaces>();
  const [searchHistory, setSearchHistory] = useState<any[]>([]);
  //   const [latestValue, setLatestValue] = useState<string | undefined>(undefined);
  const [keywords, setKeywords] = useState("");

  const debounceSearch = useDebounce(keywords, 1000);

  const queryOptionByName = (val: string) => {
    const normalizeString = (str: string) =>
      str
        ?.normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

    const tempArr = [...listOpt];
    const normalizedVal = normalizeString(val);
    const filterCities = tempArr?.filter((value) =>
      normalizeString(value?.value).includes(normalizedVal)
    );
    // const tempArrPlaces = [...listPlaces];
    // const normalizedValPlaces = normalizeString(val);

    // const filterPlaces =
    //   val?.length > 0 && val !== ""
    //     ? tempArrPlaces?.filter(
    //         (value) =>
    //           normalizeString(value.other.name || "")?.includes(
    //             normalizedValPlaces
    //           ) ||
    //           normalizeString(value.other.ward.name || "")?.includes(
    //             normalizedValPlaces
    //           ) ||
    //           normalizeString(value.other.ward.district.name || "")?.includes(
    //             normalizedValPlaces
    //           ) ||
    //           normalizeString(
    //             value.other.ward.district.city.name || ""
    //           )?.includes(normalizedValPlaces) ||
    //           normalizeString(value.other.addressDisplay || "")?.includes(
    //             normalizedValPlaces
    //           )
    //       )
    //     : [];

    // setTempOptionPlaces(filterPlaces);
    setTempOption(filterCities);
    setKeywords(val);
  };
  const handleClickOutside = () => {
    if (open) {
      setOpen(false);
    }
  };
  const handleClickRecentSearch = ({ id, value, type }: any) => {
    const newSearchHistory = {
      id,
      value,
      type,
    };

    // const existingHistory = JSON.parse(localStorage.getItem(name) || "[]");
    const existingHistory1 = JSON.parse(
      localStorage.getItem(placeName) || "[]"
    );
    const arr = [...existingHistory1];

    const existingIndex = arr.findIndex(
      (history: any) =>
        history.id == newSearchHistory.id &&
        history.value === newSearchHistory.value &&
        history.type === newSearchHistory.type
    );

    if (existingIndex !== -1) {
      arr.splice(existingIndex, 1);
    }

    arr.unshift(newSearchHistory);

    if (arr.length > 6) {
      arr.pop();
    }

    localStorage.setItem(placeName, JSON.stringify(arr));
  };
  //   const getSearchHistory = (): optionType[] => {
  //     const history = localStorage.getItem(name);
  //     return history ? JSON.parse(history) : [];
  //   };
  const getSearchHistoryPlace = (): optionType[] => {
    const history = localStorage.getItem(placeName);
    return history ? JSON.parse(history) : [];
  };

  const handleGetPlaces = async (text = "") => {
    const res: Iplaces = await fetchPlaces({ keyword: text });
    setTempOptionPlaces(res);
  };

  useOnClickOutside(ref, handleClickOutside);
  const valueName = watch(name);
  const valuePlaceName = watch(placeName);

  const displayValue =
    (valueName !== "" && valueName) ||
    (valuePlaceName !== "" && valuePlaceName);
  useEffect(() => {
    // const history = getSearchHistory();
    const historyPlace = getSearchHistoryPlace();
    setSearchHistory([...historyPlace]);
  }, []);

  useEffect(() => {
    if (keywords) {
      handleGetPlaces(keywords);
    }
  }, [debounceSearch]);

  return (
    <div className="w-full">
      <div ref={ref} className="w-full relative flex  transition-all">
        <div
          className="flex w-full cursor-pointer items-center gap-2"
          onClick={() => {
            setOpen(!open), setTempOption(listOpt);
          }}
        >
          <div className="w-8 h-8 rounded-full bg-primary-900 flex items-center justify-center shrink-0">
            {Icon ? <Icon /> : <MapPinIcon />}
          </div>
          <div className="flex flex-col">
            {(getValues(name) || getValues(placeName)) && (
              <p className="text-sm font-medium text-neutral-grey-500">
                {placeholder}
              </p>
            )}

            <input
              type="text"
              readOnly
              {...register(name)}
              // autoComplete='off'
              value={displayValue || ""}
              className={`${className} ${!Icon && "px-4"}`}
              placeholder={placeholder}

              // onChange={(e) => queryOptionByName(e.target.value)}
            />
          </div>
          {/* {Icon ? (
						<div className='px-4 lg:block hidden'>
							<Icon />
						</div>
					) : (
						<div className={`lg:block hidden pr-4`}>
							<div
								className={`transition-transform ${
									open ? "rotate-180 " : "rotate-0"
								}`}>
								<ArrowDownIcon />
							</div>
						</div>
					)} */}
        </div>
        {open && (
          <div className="absolute -left-4 top-12 w-[375px] pb-2 border border-neutral-grey-200 rounded-lg z-10 bg-white flex flex-col  max-h-[605px] shadow-[12px_12px_16px_-4px_rgba(0,0,0,0.08),0px_4px_6px_-2px_rgba(0,0,0,0.03)] ">
            <div className="flex items-center gap-4 px-4 py-3 h-12 border-b border-neutral-grey-200">
              <MagnifyingGlassIcon />
              <input
                type="text"
                className={
                  "bg-white w-full  flex-1  placeholder:text-neutral-grey-500  focus:outline-none"
                }
                placeholder={searchPlaceholder}
                onChange={(e) => queryOptionByName(e.target.value.trim())}
              />
            </div>
            <div className="overflow-y-auto custom-scrollbar-none-border">
              <div className="flex flex-col gap-2  items-start p-4 border-b border-l-neutral-grey-200">
                <div className="flex gap-2  items-center">
                  <RecentIcon fill="#000" />
                  <p className="text-sm font-semibold text-black">
                    {HOME?.searchRecent}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {searchHistory.map((recent, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        if (recent.type === 0) {
                          setValue(placeName, "");
                          setValue(`${placeName}_id`, "");
                          setValue(name, recent.value);
                          setValue(`${name}_id`, recent.id);
                        } else {
                          setValue(name, recent.value);
                          setValue(`${name}_id`, "");
                          setValue(placeName, recent.value);
                          setValue(`${placeName}_id`, recent.id);
                        }
                        handleClickRecentSearch({
                          id: recent.id,
                          value: recent.value,
                          type: recent.type,
                        });
                        handleClickOutside();
                        // setCurrentValue(opt);
                      }}
                      className="px-5 py-1 rounded-full bg-neutral-grey-100 hover:bg-secondary-600 transition-all"
                    >
                      <p className="text-sm font-semibold text-neutral-600">
                        {recent.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-2  items-center px-4 pt-4 pb-2">
                <LocationNonFillIcon />
                <p className="text-sm font-semibold text-black">
                  {HOME?.cityDistrict}
                </p>
              </div>
              {tempOption && tempOption?.length > 0 && (
                <div
                  className={`py-2 cursor-pointer ${
                    tempOptionPlaces &&
                    tempOptionPlaces?.length > 0 &&
                    "max-h-[180px] overflow-auto"
                  } `}
                >
                  {tempOption?.map((opt, ind) => {
                    const { id, value } = opt;
                    return (
                      <div
                        key={ind}
                        onClick={() => {
                          setValue(placeName, "");
                          setValue(`${placeName}_id`, "");
                          setValue(name, value);
                          setValue(`${name}_id`, id);

                          setCurrentValue(opt);
                          handleClickRecentSearch({
                            id: id,
                            value: value,
                            type: 0,
                          });
                          handleClickOutside();
                          onChange(index, id);
                        }}
                        className="py-[10px] px-4 hover:bg-secondary-600 border-b border-l-neutral-grey-100 transition-all"
                      >
                        <p>{value}</p>
                      </div>
                    );
                  })}
                </div>
              )}
              {tempOptionPlaces && tempOptionPlaces?.length > 0 && (
                <div
                  className={`py-2 cursor-pointer border-t-8 border-neutral-grey-200 ${
                    tempOptionPlaces &&
                    tempOptionPlaces?.length > 0 &&
                    "max-h-[200px] overflow-auto"
                  } `}
                >
                  {tempOptionPlaces?.map((opt, ind) => {
                    const { placeId, name, addressDisplay } = opt;
                    return (
                      <div
                        key={ind}
                        onClick={() => {
                          setValue(name, "");
                          setValue(`${name}_id`, "");
                          setValue(placeName, name);
                          setValue(`${placeName}_id`, placeId);
                          // setCurrentValue(opt);
                          handleClickRecentSearch({
                            id: placeId,
                            value: name,
                            type: 1,
                          });
                          handleClickOutside();
                          onChange(index, placeId);
                        }}
                        className="py-[10px] px-4 hover:bg-secondary-600 border-b border-l-neutral-grey-100 transition-all"
                      >
                        <p className="text-sm font-semibold">{name}</p>
                        <p className="text-xs mt-1">{addressDisplay}</p>
                      </div>
                    );
                  })}
                </div>
              )}
              {tempOption?.length === 0 && tempOptionPlaces?.length === 0 && (
                <div className="px-4 pt-2">
                  <p className="text-sm text-semantic-red">
                    {HOME?.locationNotFound}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {errors[name] && (
        <p className="text-red-500 text-p12">{errors[name]?.message}</p>
      )}
    </div>
  );
};

export default StartPlaceSelectOption;
