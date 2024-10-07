import useOnClickOutside from "@/hook/useClickOutside";
import { Fragment, useEffect, useRef, useState } from "react";

export type optionType = {
  id: number | string;
  value: string;
};

interface IInputSelectOption {
  register: any;
  className?: string;
  name: string;
  placeholder: string;
  errors: any;
  listOpt?: optionType[];
  setValue: any;
  Icon?: any;
}

const InputSelectOptionDropdown = (props: IInputSelectOption) => {
  const {
    register,
    className = "bg-transparent pl-4 w-full outline-none cursor-pointer placeholder:text-gray-400 h-6",
    name,
    placeholder,
    errors,
    listOpt = [],
    setValue,
    Icon,
  } = props;
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState("1");

  const handleClickOutside = () => {
    if (open) {
      setOpen(false);
    }
  };

  useOnClickOutside(ref, handleClickOutside);

  return (
    <div className="w-full px-4">
      <div
        ref={ref}
        className="w-full relative flex rounded-[4px] border border-[#9095A1] py-2"
      >
        <div
          className="flex w-full cursor-pointer items-start justify-between"
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
            <div className="px-4 lg:block hidden">
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
                        setValue(name, id);
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
      {errors[name] && (
        <p className="text-red-500 text-p12">{errors[name]?.message}</p>
      )}
    </div>
  );
};

export default InputSelectOptionDropdown;
