import { OptionT } from "@/components/booking-search";
import Button from "@/components/button";
import ArrowDownIcon from "@/components/icons/arrowDown";
import CheckIcon from "@/components/icons/check";
import DeleteIcon from "@/components/icons/delete";
import FilterIcon from "@/components/icons/filter";
import Modal from "@/components/modal/Modal";
import useModal from "@/hook/useModal";
import { IBookingTranslate } from "@/interfaces/IBookingTranslate";
import { useEffect, useState } from "react";

type FilterT = {
  times: number[];
  type: number[];
  floor: number;
  price: number[];
};

interface IFilterMobileProps {
  BOOKING: IBookingTranslate;
  onSubmit: (arg: FilterT) => void;
  filterPayload: FilterT;
  vehicleTypesList?: OptionT[];
}

interface IRenderFilterContentProps {
  BOOKING: IBookingTranslate;
  filterPayload: FilterT;
  vehicleTypesList?: OptionT[];
  onSubmit: (arg: FilterT) => void;
  toggle: () => void;
}

// const FLOORS = [
//   {
//     id: 1,
//     value: "Tầng trên",
//   },
//   {
//     id: 2,
//     value: "Tầng dưới",
//   },
// ];

const RenderFilterContent = ({
  BOOKING,
  vehicleTypesList,
  filterPayload,
  onSubmit,
  toggle,
}: IRenderFilterContentProps) => {
  const [filterState, setFilterState] = useState<FilterT>({
    times: [],
    type: [],
    floor: 0,
    price: [],
  });

  const TIMES = [
    {
      id: 1,
      value: `${BOOKING.earlyMorning} 00:00 - 06:00`,
    },
    {
      id: 2,
      value: `${BOOKING.morning} 06:00 - 12:00`,
    },
    {
      id: 3,
      value: `${BOOKING.afternoon} 12:00 - 18:00`,
    },
    {
      id: 4,
      value: `${BOOKING.evening} 18:00 - 24:00`,
    },
  ];

  const PRICES = [
    {
      id: 1,
      value: `${BOOKING.below} 300.000đ`,
    },
    {
      id: 2,
      value: "300.000đ-500.000đ",
    },
    {
      id: 3,
      value: `${BOOKING.above} 500.000đ`,
    },
  ];

  const handleChange = (typeFilter: number, value: number) => {
    if (typeFilter) {
      switch (typeFilter) {
        case 2:
          const cloneTypes: number[] = [...filterState.type];
          if (cloneTypes?.includes(value)) {
            const indexTime = cloneTypes?.findIndex((el) => el === value);
            cloneTypes?.splice(indexTime, 1);
          } else {
            cloneTypes.push(value);
          }
          setFilterState({ ...filterState, type: cloneTypes });
          break;
        case 3:
          setFilterState({ ...filterState, floor: value });
          break;
        case 4:
          const clonePrices: number[] = [...filterState.price];
          if (clonePrices?.includes(value)) {
            const indexTime = clonePrices?.findIndex((el) => el === value);
            clonePrices?.splice(indexTime, 1);
          } else {
            clonePrices.push(value);
          }
          setFilterState({ ...filterState, price: clonePrices });
          break;
        default:
          const cloneTimes: number[] = [...filterState.times];
          if (cloneTimes?.includes(value)) {
            const indexTime = cloneTimes?.findIndex((el) => el === value);
            cloneTimes?.splice(indexTime, 1);
          } else {
            cloneTimes.push(value);
          }
          setFilterState({ ...filterState, times: cloneTimes });
          break;
      }
    }
  };

  const handleSubmit = () => {
    onSubmit(filterState);
    toggle();
  };

  useEffect(() => {
    setFilterState({ ...filterPayload });
  }, []);
  return (
    <>
      <div className="flex items-center justify-between gap-4 bg-neutral-grey-100 px-4 py-2">
        <p className="text-[#19191B] font-medium text-base">{BOOKING.filter}</p>
        <div className="flex items-center gap-1">
          <DeleteIcon />
          <p className="text-[#313131] font-medium text-xs">
            {BOOKING.clearFilter}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-3 max-h-[82.5vh] overflow-y-auto pt-2 pb-4">
        <div className="px-4">
          <p className="text-[#19191B] font-semibold text-sm mb-2">
            {BOOKING.timeStart}
          </p>
          <div className="flex flex-col gap-1">
            {TIMES?.map((time, index) => {
              const { id, value } = time;
              return (
                <div
                  key={`time-${index}`}
                  className="flex items-center gap-2"
                  onClick={() => handleChange(1, id)}
                >
                  <input
                    type="checkbox"
                    checked={filterState?.times?.includes(id)}
                  />
                  <p className="text-[#19191B] font-medium text-sm">{value}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="px-4">
          <p className="text-[#19191B] font-semibold text-sm mb-2">
            {BOOKING.carType}
          </p>
          <div className="flex items-center gap-1 flex-wrap">
            {vehicleTypesList?.map((carT, index) => {
              if (!filterState?.type?.includes(carT?.id)) {
                return (
                  <div
                    key={`car-type-${index}`}
                    className="bg-neutral-grey-100 rounded-[20px] px-4 py-2"
                    onClick={() => handleChange(2, carT?.id)}
                  >
                    <p className="text-sm font-medium text-neutral-grey-700">
                      {carT?.value}
                    </p>
                  </div>
                );
              }
              return (
                <div
                  key={`car-type-${index}`}
                  className="bg-secondary-300 rounded-[20px] px-4 py-2 flex items-center gap-1"
                  onClick={() => handleChange(2, carT?.id)}
                >
                  <CheckIcon />
                  <p className="text-sm font-medium text-white">
                    {carT?.value}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* <div className="px-4">
          <p className="text-[#19191B] font-semibold text-sm mb-2">
            {BOOKING.floor}
          </p>

          <div className="flex items-center gap-1 flex-wrap">
            {FLOORS?.map((floor, index) => {
              if (floor?.id !== filterState?.floor) {
                return (
                  <div
                    key={`seat-place-${index}`}
                    className="bg-[#EFEFF0] rounded-[20px] px-4 py-2"
                    onClick={() => handleChange(3, floor?.id)}
                  >
                    <p className="text-sm font-medium text-neutral-grey-700">
                      {floor?.value}
                    </p>
                  </div>
                );
              }
              return (
                <div
                  key={`seat-place-${index}`}
                  className="bg-secondary-300 rounded-[20px] px-4 py-2 flex items-center gap-1"
                >
                  <CheckIcon />
                  <p className="text-sm font-medium text-white">
                    {floor?.value}
                  </p>
                </div>
              );
            })}
          </div>
        </div> */}

        <div className="px-4">
          <p className="text-[#19191B] font-semibold text-sm mb-2">
            {BOOKING.price}
          </p>

          <div className="flex items-center gap-1 flex-wrap">
            {PRICES?.map((price, index) => {
              if (!filterState?.price?.includes(price?.id)) {
                return (
                  <div
                    key={`seat-place-${index}`}
                    className="bg-[#EFEFF0] rounded-[20px] px-4 py-2"
                    onClick={() => handleChange(4, price?.id)}
                  >
                    <p className="text-sm font-medium text-neutral-grey-700">
                      {price?.value}
                    </p>
                  </div>
                );
              }
              return (
                <div
                  key={`seat-place-${index}`}
                  className="bg-secondary-300 rounded-[20px] px-4 py-2 flex items-center gap-1"
                  onClick={() => handleChange(4, price?.id)}
                >
                  <CheckIcon />
                  <p className="text-sm font-medium text-white">
                    {price?.value}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="h-20" />

      <div className="flex w-[80vw] items-center gap-3 p-4 border-t border-t-neutral-grey-200 fixed bottom-0 z-10 bg-white">
        <Button
          type="default"
          onClick={toggle}
          padding="px-7 py-2"
          borderRadius="rounded-full"
          actionType="button"
        >
          {BOOKING.cancel}
        </Button>
        <Button onClick={handleSubmit} padding="p-2">
          {BOOKING.apply}
        </Button>
      </div>
    </>
  );
};

const FilterItem = ({ title = "", handleClick = () => {} }) => {
  return (
    <div
      className="flex bg-white p-2 rounded-[4px] gap-2 justify-between items-center"
      onClick={handleClick}
    >
      <p className="text-[#101F24] text-xs font-medium">{title}</p>
      <ArrowDownIcon />
    </div>
  );
};

const FilterMobile = ({
  BOOKING,
  onSubmit,
  filterPayload,
  vehicleTypesList,
}: IFilterMobileProps) => {
  const [open, toggle] = useModal();

  return (
    <div className="pl-4 bg-[#EFEFF0] flex gap-2 items-center py-3 w-screen overflow-x-auto whitespace-nowrap custom-scrollbar-none-border">
      <div className="flex gap-2 items-center">
        <FilterIcon />
        <p className="text-sm font-medium text-neutral-grey-700">
          {BOOKING.filterText}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <FilterItem title={BOOKING.timeStart} handleClick={toggle} />
        <FilterItem title={BOOKING.carType} handleClick={toggle} />
        <FilterItem title={BOOKING.rowSeats} handleClick={toggle} />
        {/* <FilterItem title={BOOKING.floor} handleClick={toggle} /> */}
        <FilterItem title={BOOKING.price} handleClick={toggle} />
      </div>
      <Modal
        open={open}
        toggleModal={toggle}
        modalStyle="w-[100vw] h-[100vh] flex justify-end items-center fixed bg-black/60 z-[60] left-[calc(0%)] top-[calc(0%)]"
        childStyle="animate-fade-in w-[80vw] sm:w-[800px] xl:mx-0 bg-white h-screen relative"
        wrapChildStyle=""
      >
        <RenderFilterContent
          BOOKING={BOOKING}
          vehicleTypesList={vehicleTypesList}
          filterPayload={filterPayload}
          onSubmit={onSubmit}
          toggle={toggle}
        />
      </Modal>
    </div>
  );
};

export default FilterMobile;
