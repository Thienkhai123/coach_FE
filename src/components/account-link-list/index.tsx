import React, { useRef, useState } from "react";
import AccountIcon from "../icons/account";
import { IHeaderTranslate, Setting } from "@/interfaces/IHeaderTranslate";
import SquareIcon from "../icons/square";
import useOnClickOutside from "@/hook/useClickOutside";

interface IAccountLinkListProps {
  linkList: Setting[];
  HEADER: IHeaderTranslate;
}

type ExtraT = {
  point: (point?: number) => React.JSX.Element;
};

const AccountLinkList = (props: IAccountLinkListProps) => {
  const { linkList, HEADER } = props;
  const ref = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const RenderPoint = (point = 0) => {
    return (
      <p className="text-[#61646B] font-medium text-sm">
        {point} {HEADER.point}
      </p>
    );
  };

  const EXTRA_COMPONENTS = {
    point: RenderPoint,
  };

  useOnClickOutside(ref, handleClose);

  return (
    <div ref={ref}>
      <div onClick={handleOpen}>
        <AccountIcon />
      </div>
      {open && (
        <div className="border border-[#EBEBEB] bg-white z-20 rounded-lg py-2 shadow-[rgba(0,0,0,0.18)] absolute -bottom-48 w-[200px] right-4">
          {linkList?.map((link, ind) => (
            <div
              key={`account-link-${ind}`}
              className="flex py-2 px-3 gap-2 items-center"
            >
              <SquareIcon />
              <div>
                <a href={link?.ref}>
                  <p>{link?.title}</p>
                </a>
                {link?.extraComponent && (
                  <div>{EXTRA_COMPONENTS[link?.key as keyof ExtraT](50)}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AccountLinkList;
