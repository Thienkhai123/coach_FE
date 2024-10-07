import SignInForm from "@/components/form/sign-in/mobile/form";
import SignUpForm from "@/components/form/sign-up/mobile/form";
import ArrowLeftIcon from "@/components/icons/arrowLeft";
import useTrans from "@/hook/useTrans";
import { IErrorTranslate } from "@/interfaces/IErrorTranslate";
import { IPlaceholderTranslate } from "@/interfaces/IPlaceholderTranslate";
import { ISignInTranslate } from "@/interfaces/ISignInTranslate";
import Image from "next/legacy/image";
import { useState } from "react";

interface IRenderTabProps {
  tab: number;
  text: string;
  index: number;
  setTab: (arg: number) => void;
}

const RenderTab = ({ tab, setTab, text, index }: IRenderTabProps) => {
  return (
    <div
      className={`p-3 border-b-2 cursor-pointer px-9 ${
        tab === index
          ? " border-b-secondary-300 bg-secondary-600 text-secondary-300 font-bold"
          : "border-b-neutral-grey-200 text-neutral-grey-600 font-semibold"
      }`}
      onClick={() => setTab(index)}
    >
      <p className="text-sm text-center">{text}</p>
    </div>
  );
};

const ContainerSignInMobile = ({ defaultTab = 1 }) => {
  const {
    SIGNIN,
    ERROR,
    PLACEHOLDER,
  }: {
    SIGNIN: ISignInTranslate;
    ERROR: IErrorTranslate;
    PLACEHOLDER: IPlaceholderTranslate;
  } = useTrans();
  const [tab, setTab] = useState(defaultTab);
  const handleReturn = () => {
    window.location.assign("/");
  };
  return (
    <div className="bg-primary-900">
      <div className="bg-authen-mobile bg-contain bg-no-repeat w-full">
        <div className="w-full h-[200px] pt-4 px-4 flex gap-4 justify-between">
          <div onClick={handleReturn}>
            <ArrowLeftIcon />
          </div>
          <div>
            <Image
              alt=""
              width={40}
              height={31.21}
              src="/images/logo-drawer.png"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 items-center bg-white rounded-t-3xl overflow-hidden">
          <RenderTab setTab={setTab} tab={tab} text={SIGNIN.signUp} index={2} />
          <RenderTab setTab={setTab} tab={tab} text={SIGNIN.signIn} index={1} />
        </div>
      </div>

      {tab === 1 && (
        <SignInForm SIGNIN={SIGNIN} ERROR={ERROR} PLACEHOLDER={PLACEHOLDER} />
      )}
      {tab === 2 && (
        <SignUpForm SIGNIN={SIGNIN} ERROR={ERROR} setTab={setTab} />
      )}
    </div>
  );
};

export default ContainerSignInMobile;
