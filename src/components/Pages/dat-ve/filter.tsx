import { useState } from "react";

const FAKE_DATA = {
  TIMES: [
    {
      id: 1,
      value: "Sáng sớm 00:00 - 06:00 (0)",
    },
    {
      id: 2,
      value: "Buổi sáng 06:00 - 12:00 (0)",
    },
    {
      id: 3,
      value: "Buổi chiều 12:00 - 18:00 (11)",
    },
    {
      id: 4,
      value: "Buổi tối 18:00 - 24:00 (18)",
    },
  ],
  TYPES: [
    {
      id: 1,
      value: "Loai 1",
    },
    {
      id: 2,
      value: "Loai 2",
    },
    {
      id: 3,
      value: "Loai 3",
    },
  ],
  POSITIONS: [
    {
      id: 1,
      value: "Hang dau",
    },
    {
      id: 2,
      value: "Hang giua",
    },
    {
      id: 3,
      value: "Hang cuoi",
    },
  ],
  FLOORS: [
    {
      id: 1,
      value: "Tang tren",
    },
    {
      id: 2,
      value: "Tang duoi",
    },
  ],
};

type TimeT = {
  status: "on" | "off";
  id: number;
};

type FilterStateT = {
  duration: number[];
  type: number;
  position: number;
  floor: number;
};

const FilterBookingSeat = () => {
  const [filterState, setFilterState] = useState<FilterStateT>({
    duration: [],
    type: 0,
    position: 0,
    floor: 0,
  });

  const handleSetFilterTimeTrip = ({ status, id }: TimeT) => {
    if (status === "on" && !filterState.duration.includes(id)) {
      const tmpDuration = [...filterState.duration, id];
      setFilterState({ ...filterState, duration: tmpDuration });
    } else {
      const tmpDuration = [...filterState.duration];
      const index = tmpDuration.findIndex((el) => el === id);
      tmpDuration.splice(index, 1);
      setFilterState({ ...filterState, duration: tmpDuration });
    }
  };

  console.log("filterState: ", filterState);

  return (
    <div className="w-full bg-white rounded-lg p-4 sticky top-2">
      {FAKE_DATA.TIMES.map((t, ind) => {
        const { value, id } = t;
        return (
          <div key={`time-select-${ind}`} className="flex items-center gap-2">
            <input
              type="checkbox"
              onChange={(e: any) =>
                handleSetFilterTimeTrip({ status: e.target.value, id: id })
              }
            />
            <p>{value}</p>
          </div>
        );
      })}
    </div>
  );
};
export default FilterBookingSeat;
