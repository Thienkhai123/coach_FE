import useOnClickOutside from "@/hook/useClickOutside";
import React, { FC, Fragment, ReactNode, useEffect, useRef } from "react";

interface ModalProps {
  title?: string;
  hideTitle?: boolean;
  children: ReactNode;
  toggleModal: () => void;
  open: boolean;
  modalStyle?: string;
  childStyle?: string;
  wrapChildStyle?: string;
  useClickOutside?: boolean;
  styleTitle?: string;
}

const Modal: FC<ModalProps> = (props) => {
  const {
    title = "Modal title",
    hideTitle = false,
    children,
    toggleModal = () => {},
    open = false,
    modalStyle = "w-[100vw] h-[100vh] flex justify-center items-center fixed bg-black/60 z-[60] left-[calc(0%)] top-[calc(0%)]",
    childStyle = "animate-fade-in w-screen sm:w-[800px] xl:mx-0 mx-3 bg-white rounded overflow-y-auto xl:h-fit max-h-[80vh]",
    wrapChildStyle = "p-6",
    useClickOutside = true,
    styleTitle = "text-p20 p-6 font-medium",
  } = props;

  const wrapperRef = useRef(null);
  const wrapperDisableRef = useRef(null);

  // useEffect(() => {
  // 	if (!open) {
  // 		if (typeof window !== "undefined")
  // 			document.body.style.overflow = "auto";

  // 		// return <React.Fragment></React.Fragment>;
  // 	} else {
  // 		if (typeof window !== "undefined")
  // 			document.body.style.overflow = "hidden";
  // 	}
  // }, [open]);
  useOnClickOutside(wrapperRef, toggleModal);

  if (!open) {
    return <Fragment></Fragment>;
  }

  return (
    <div className={modalStyle}>
      <div
        ref={useClickOutside ? wrapperRef : wrapperDisableRef}
        className={childStyle}
      >
        <div className={wrapChildStyle}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
