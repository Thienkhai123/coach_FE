import useOnClickOutside from "@/hook/useClickOutside";
import React, { ReactNode, useRef } from "react";

interface IDrawerBottomProps {
  children: ReactNode;
  toggleDrawer?: () => void;
  open: boolean;
  drawerStyle?: string;
  childStyle?: string;
  wrapChildStyle?: string;
  useClickOutside?: boolean;
}
const DrawerBottom = (props: IDrawerBottomProps) => {
  const {
    children,
    toggleDrawer = () => {},
    open = false,
    drawerStyle = "w-[100vw] h-[100vh] flex flex-col justify-end items-center fixed bg-black/60 z-[60] left-[calc(0%)] top-[calc(0%)]",
    childStyle = "w-screen bg-white rounded-tl-lg rounded-tr-lg animation-height",
    wrapChildStyle = "p-6",
    useClickOutside = true,
  } = props;

  const wrapperRef = useRef(null);
  const wrapperDisableRef = useRef(null);

  useOnClickOutside(wrapperRef, toggleDrawer);

  if (!open) {
    return <React.Fragment></React.Fragment>;
  }

  return (
    <div className={drawerStyle}>
      <div
        ref={useClickOutside ? wrapperRef : wrapperDisableRef}
        className={childStyle}
      >
        <div className={wrapChildStyle}>{children}</div>
      </div>
    </div>
  );
};

export default DrawerBottom;
