import React, { FC, ReactNode } from "react";

interface FullScreenModalProps {
  children: ReactNode;
  open: boolean;
  modalStyle?: string;
  childStyle?: string;
  wrapChildStyle?: string;
}

const FullScreenModal: FC<FullScreenModalProps> = (props) => {
  const {
    children,
    open = false,
    modalStyle = "w-[100vw] h-[100vh] flex justify-center items-center fixed bg-black/60 z-[60] left-[calc(0%)] top-[calc(0%)]",
    childStyle = "animate-slideInFromRight w-screen bg-white overflow-y-auto h-[100vh]",
    wrapChildStyle = "",
  } = props;

  if (!open) {
    return <React.Fragment></React.Fragment>;
  }

  return (
    <div className={modalStyle}>
      <div className={childStyle}>
        <div className={wrapChildStyle}>{children}</div>
      </div>
    </div>
  );
};

export default FullScreenModal;
