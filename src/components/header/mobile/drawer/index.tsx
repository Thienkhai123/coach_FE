import CancelIcon from "@/components/icons/cancel";
import useOnClickOutside from "@/hook/useClickOutside";
import Image from "next/legacy/image";
import { useEffect, useRef, useState } from "react";

export const DrawerHeader = ({
  handleCloseMenu = () => {},
  authen = false,
  open = false,
  navbars = [],
  langText = "",
}: {
  handleCloseMenu: () => void;
  authen?: boolean;
  open?: boolean;
  navbars: { title: string; ref: string }[];
  langText: string;
}) => {
  const ref = useRef(null);
  const [pathName, setPathName] = useState("");
  const [language, setLanguage] = useState("vi");

  const handleChangeLocale = () => {
    if (language === "vi") {
      localStorage.setItem("locale", "en");
      window.location.reload();
    } else {
      localStorage.setItem("locale", "vi");
      window.location.reload();
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const pathName = window?.location?.pathname;
      const tmplocale: string = localStorage.getItem("locale") || "vi";
      setPathName(pathName);
      setLanguage(tmplocale);
    }
  }, []);

  useOnClickOutside(ref, handleCloseMenu);

  return (
    <div
      ref={ref}
      className={`fixed top-0 left-0 z-40 min-h-screen pb-8 flex flex-col text-white bg-white inset-0 transform overflow-hidden ${
        open
          ? "w-[80vw] transition-opacity opacity-100 duration-500 translate-x-0  "
          : "w-0 transition-all duration-500 opacity-0 -translate-x-full  "
      }`}
      style={{
        boxShadow: open
          ? "0px 0px 0px 0px rgba(0,0,0,0.3) inset, 0px 0px 0px 100px rgba(0,0,0,0.3)"
          : "",
      }}
    >
      <div className="p-5 flex gap-2 justify-between items-center">
        <Image
          alt="drawer-logo"
          src={"/images/logo-drawer.png"}
          width={60}
          height={46.25}
          quality={100}
        />
        <div>
          <div
            className="rounded-full p-2.5 bg-neutral-grey-100"
            onClick={handleCloseMenu}
          >
            <CancelIcon />
          </div>
        </div>
      </div>
      <div
        className={`flex-1 flex flex-col delay-400 duration-500 ease transition-all transform ${
          open ? " translate-x-0 " : "-translate-x-full "
        }`}
      >
        {navbars.map((item, index) => {
          const { title, ref } = item;
          const isActive = pathName === ref;
          return (
            <div key={index} className="py-3 px-5 border-b border-b-[#E3E3E3]">
              <a
                href={ref}
                className={`text-base ${
                  isActive
                    ? "text-primary-500 font-bold"
                    : "text-black font-medium"
                } `}
              >
                {title}
              </a>
            </div>
          );
        })}
        <div className="flex justify-center mt-14">
          <div className="flex items-center gap-3">
            <p className="text-neutral-grey-700 font-medium text-sm">
              {langText}
            </p>
            <label className="relative  items-center cursor-pointer">
              <input
                type="checkbox"
                checked={language === "en" ? true : false}
                className="sr-only peer"
                onChange={(e) => {
                  if (language === "vi") {
                    setLanguage("en");
                  } else {
                    setLanguage("vi");
                  }
                  handleChangeLocale();
                }}
              />
              <div
                after-dynamic-value={language.toUpperCase()}
                className={`w-[86px] h-7 pr-3 pl-4 flex items-center justify-between bg-primary-900 peer-focus:outline-none  peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-lg peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[attr(after-dynamic-value)] after:text-center after:text-sm after:font-medium after:absolute after:flex after:items-center after:justify-center after:top-[2px] after:left-[2px] peer-checked:after:left-[4px] after:bg-primary-500  after:rounded-md after:h-6 after:w-10 after:transition-all`}
              >
                <p className="text-sm font-medium text-black select-none">VI</p>
                <p className="text-sm font-medium text-black select-none">EN</p>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
