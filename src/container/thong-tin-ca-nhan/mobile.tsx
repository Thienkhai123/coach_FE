import InformationScreen from "@/components/Pages/thong-tin-ca-nhan/informationScreen";
import { IUserProfile } from "@/interfaces/httpRequest/IUser";
import { ITranslation } from "@/interfaces/ITranslation";
import React from "react";

interface IContainerPersonalInfo {
  translation: ITranslation;
  userProfile: IUserProfile;
}

const ContainerPersonalInformationMobile = (props: IContainerPersonalInfo) => {
  const { translation, userProfile } = props;

  return (
    <>
      <div className="py-4 px-3">
        <div className="">
          <InformationScreen translation={translation} data={userProfile} />
        </div>
      </div>
    </>
  );
};

export default ContainerPersonalInformationMobile;
