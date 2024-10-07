import EyeOffIcon from "@/components/icons/eyeOff";
import EyeOnIcon from "@/components/icons/eyeOn";
import { useState } from "react";

interface IInputTextFloatProps {
  name: string;
  title?: string;
  register?: any;
  errors?: any;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  type?: string;
  showError?: boolean;
}

const InputTextFloat = (props: IInputTextFloatProps) => {
  const {
    errors,
    name,
    title,
    register,
    required = false,
    disabled = false,
    type = "text",
    showError = true,
    placeholder = "Placeholder/Input text",
  } = props;
  const [visible, setVisible] = useState(false);

  if (type === "password") {
    return (
      <div className="w-full">
        <div className="relative w-full ">
          <input
            className="border border-neutral-grey-300 py-2 px-3 rounded-lg w-full peer"
            placeholder={" "}
            id={name}
            type={visible ? "text" : "password"}
            disabled={disabled}
            {...register(name)}
          />
          <div
            className="cursor-pointer absolute top-1/2 -translate-y-1/2 right-3"
            onClick={() => setVisible(!visible)}
          >
            {visible ? (
              <EyeOffIcon fill="#646769" />
            ) : (
              <EyeOnIcon fill="#646769" />
            )}
          </div>
          {/* text-xs font-normal leading-[18px] */}
          <label
            htmlFor={name}
            className="absolute pointer-events-none text-sm font-medium leading-[21px] text-neutral-grey-500  duration-300 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] bg-white px-2 peer-focus:px-2  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
          >
            {title}
            {required && <span className="text-semantic-red ml-1">*</span>}
          </label>
        </div>
        {showError && errors[name]?.message && (
          <p className="sm:text-sm text-xs leading-5 text-red-500">
            {errors[name]?.message}
          </p>
        )}
      </div>
    );
  }
  return (
    <div className="w-full">
      <div className="relative w-full">
        <input
          className="border border-neutral-grey-300 py-2 px-3 rounded-lg w-full peer"
          placeholder={" "}
          id={name}
          type={type}
          disabled={disabled}
          {...register(name)}
          autoComplete="off"
        />
        {/* text-xs font-normal leading-[18px] */}
        <label
          htmlFor={name}
          className="absolute pointer-events-none text-sm font-medium leading-[21px] text-neutral-grey-500  duration-300 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] bg-white px-2 peer-focus:px-2  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
        >
          {title}
          {required && <span className="text-semantic-red ml-1">*</span>}
        </label>
      </div>
      {showError && errors[name]?.message && (
        <p className="sm:text-sm text-xs leading-5 text-red-500">
          {errors[name]?.message}
        </p>
      )}
    </div>
  );
};

export default InputTextFloat;
