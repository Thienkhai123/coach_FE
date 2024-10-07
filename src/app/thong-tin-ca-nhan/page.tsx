"use client";
import Header from "@/components/header";
import ContainerPersonalInformationDesktop from "@/container/thong-tin-ca-nhan/desktop";
import ContainerPersonalInformationMobile from "@/container/thong-tin-ca-nhan/mobile";
import useTrans from "@/hook/useTrans";
import { ITranslation } from "@/interfaces/ITranslation";
import { IUserProfile } from "@/interfaces/httpRequest/IUser";
import withAuth from "@/layout/withAuth";
import "../globals.css";
import Footer from "@/components/footer";

interface IPersonalInformation {
  userProfile: IUserProfile;
}
const PersonalInformationPage = (props: IPersonalInformation) => {
  const { userProfile } = props;
  const translation: ITranslation = useTrans();
  return (
    <main className="min-h-[100vh] relative flex flex-col ">
      <Header
        userProfile={userProfile}
        backgroundColorMobile="linear-gradient(90.4deg, #DF5030 -0.55%, #BE3C2A 72.71%)"
      />
      <div className="flex-1 bg-neutral-grey-100">
        <div className="lg:block hidden ">
          <ContainerPersonalInformationDesktop
            userProfile={userProfile}
            translation={translation}
          />
        </div>

        <div className="lg:hidden">
          <ContainerPersonalInformationMobile
            translation={translation}
            userProfile={userProfile}
          />
        </div>
      </div>
      <Footer />
    </main>
  );
};
export default withAuth(PersonalInformationPage);
