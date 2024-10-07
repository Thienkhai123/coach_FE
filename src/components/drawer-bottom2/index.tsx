import { delay } from "@/helpers/functionHelper";
import useOnClickOutside from "@/hook/useClickOutside";
import React, { ReactNode, useRef, useState } from "react";

interface IDrawerBottom2Props {
  children: ReactNode;
  toggleDrawer?: () => void;
  open: boolean;
  drawerStyle?: string;
  childStyle?: string;
  wrapChildStyle?: string;
  useClickOutside?: boolean;
  animationName?: string;
  closeStyle?: string;
}

const DrawerBottom2 = (props: IDrawerBottom2Props) => {
  const {
    children,
    toggleDrawer = () => {},
    open = false,
    drawerStyle = "w-[100vw] h-[100vh] flex flex-col justify-end items-center fixed bg-black/60 z-[60] left-[calc(0%)] top-[calc(0%)]",
    childStyle = "w-screen bg-white rounded-tl-lg rounded-tr-lg",
    wrapChildStyle = "p-6",
    useClickOutside = true,
    animationName = "animation-height",
    closeStyle = "animation-off-user-nav",
  } = props;

  const wrapperRef = useRef(null);
  const wrapperDisableRef = useRef(null);
  const [close, setClose] = useState(false);

  const handleClose = async () => {
    setClose(true);
    await delay(260);
    setClose(false);
    toggleDrawer();
  };

  useOnClickOutside(wrapperRef, handleClose);

  if (!open) {
    return <React.Fragment></React.Fragment>;
  }

  return (
    <div className={drawerStyle}>
      <div
        ref={useClickOutside ? wrapperRef : wrapperDisableRef}
        className={
          close
            ? childStyle + " " + closeStyle
            : childStyle + " " + animationName
        }
      >
        <div className={wrapChildStyle}>{children}</div>
      </div>
    </div>
  );
};

export default DrawerBottom2;
