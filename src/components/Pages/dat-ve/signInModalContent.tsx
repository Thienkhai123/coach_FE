import useTrans from "@/hook/useTrans";
import { ITranslation } from "@/interfaces/ITranslation";
import React, { useState } from "react";
import SignInForm from "@/components/form/sign-in/mobile/form";
import SignUpForm from "@/components/form/sign-up/mobile/form";

interface ISignInModalContentProps {}

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

const SignInModalContent = (props: ISignInModalContentProps) => {
  const translation: ITranslation = useTrans();
  const { SIGNIN, ERROR, PLACEHOLDER } = translation || {};
  const [tab, setTab] = useState(1);

  const handleClickRegister = () => {
    window.location.assign("/dang-ky");
  };

  return (
    <div>
      <div className="bg-authen-mobile bg-contain bg-no-repeat w-full h-[182px]" />
      <div className="grid grid-cols-2 items-center bg-white overflow-hidden">
        <RenderTab
          setTab={handleClickRegister}
          tab={tab}
          text={SIGNIN.signUp}
          index={2}
        />
        <RenderTab setTab={setTab} tab={tab} text={SIGNIN.signIn} index={1} />
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

export default SignInModalContent;
