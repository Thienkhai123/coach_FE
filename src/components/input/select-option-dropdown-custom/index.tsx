import useOnClickOutside from "@/hook/useClickOutside";
import { useRef, useState } from "react";

export type optionType = {
  id: number | string;
  value: string;
};

interface IInputSelectOption {
  className?: string;
  placeholder: string;
  listOpt?: optionType[];
  Icon?: any;
  handleClick?: (arg: any) => void;
}

const InputSelectOptionDropdownCustom = (props: IInputSelectOption) => {
  const {
    className = "bg-transparent w-full pl-4 outline-none cursor-pointer placeholder:text-gray-400 h-6",
    placeholder,
    listOpt = [],
    Icon,
    handleClick = () => {},
  } = props;
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState(placeholder);

  const handleClickOutside = () => {
    if (open) {
      setOpen(false);
    }
  };

  useOnClickOutside(ref, handleClickOutside);

  return (
    <div className="w-full">
      <div
        ref={ref}
        className="w-full relative flex rounded-[4px] border border-[#9095A1] py-2"
      >
        <div
          className="flex w-full cursor-pointer items-center justify-between"
          onClick={() => {
            setOpen(!open);
          }}
        >
          <input
            type="text"
            readOnly
            defaultValue={currentValue}
            className={`${className} ${!Icon && "px-4"}`}
            placeholder={placeholder}
          />
          {Icon && (
            <div className="px-4">
              <Icon />
            </div>
          )}
        </div>
        {open && (
          <div className="absolute top-11 w-full py-2 border border-[#9095A1] rounded-lg z-10 bg-white flex flex-col gap-2 max-h-[300px] shadow-sm overflow-y-auto">
            {listOpt && listOpt?.length > 0 ? (
              <div className="px-2 cursor-pointer">
                {listOpt?.map((opt, ind) => {
                  const { id, value } = opt;
                  return (
                    <div
                      key={ind}
                      onClick={() => {
                        handleClick(id);
                        setCurrentValue(value);
                        handleClickOutside();
                      }}
                      className="py-2 px-2 hover:bg-[#e4e8f2] rounded-lg"
                    >
                      <p>{value}</p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="px-4">
                <p className="text-p14">Chưa có dữ liệu</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default InputSelectOptionDropdownCustom;
