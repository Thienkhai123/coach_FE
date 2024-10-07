"use client";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import * as Icons from "@/components/icons";
import IconRenderer from "@/components/IconRenderer";
import { toast } from "react-toastify";
import ToastCopy from "@/components/toasts/copy";
import "../globals.css";

const AllIconsPage: React.FC = () => {
  const iconNames = Object.keys(Icons);
  const copyText = (text = "") => {
    navigator.clipboard.writeText(`<${text} />`);

    toast(
      ToastCopy({
        message: "Copied",
      }),
      {
        toastId: "alert-copy-text",
        className: "bg-toast-custom",
        closeButton: false,
        position: "top-center",
        hideProgressBar: true,
        autoClose: 3000,
      }
    );
  };

  return (
    <div>
      {/* <h1>All Icons</h1> */}
      <div className="grid grid-cols-7 gap-1 grid-auto-rows">
        {iconNames.map((iconName, index) => (
          <div
            onClick={() => {
              copyText(iconName);
            }}
            key={iconName}
            className="flex flex-col items-center justify-center min-h-[130px] gap-3 border bg-neutral-grey-200 rounded-lg cursor-pointer hover:border-2 hover:border-primary-600 transition-all"
          >
            <IconRenderer iconName={iconName} />
            <p>{iconName}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllIconsPage;
