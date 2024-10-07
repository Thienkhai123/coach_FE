"use client";
import Footer from "@/components/footer";
import Header from "@/components/header";
import ContainerServiceHistoryDesktop from "@/container/lich-su-dich-vu/desktop";
import ContainerServiceHistoryMobile from "@/container/lich-su-dich-vu/mobile";
import useTrans from "@/hook/useTrans";
import { IUserProfile } from "@/interfaces/httpRequest/IUser";
import { ITranslation } from "@/interfaces/ITranslation";
import withAuth from "@/layout/withAuth";
import "../globals.css";
import useServiceHistory from "@/hook/account/useServiceHistory";
import LoadingView from "@/components/LoadingView";
import { useEffect } from "react";

interface IServiceHistoryPage {
  userProfile: IUserProfile;
}

const ServiceHistoryPage = (props: IServiceHistoryPage) => {
  const { userProfile } = props;
  const translation: ITranslation = useTrans();
  const { serviceHistories, loading, handleGetHistoriesPoints } =
    useServiceHistory();

  useEffect(() => {
    handleGetHistoriesPoints();
  }, []);

  return (
    <main className="min-h-[100vh] relative flex flex-col">
      {loading && <LoadingView />}
      <div className="flex-1">
        <Header
          userProfile={userProfile}
          backgroundColorMobile="linear-gradient(90.4deg, #DF5030 -0.55%, #BE3C2A 72.71%)"
        />
        <div className="lg:block hidden">
          <ContainerServiceHistoryDesktop
            translation={translation}
            serviceHistories={serviceHistories}
            userProfile={userProfile}
            handleGetHistoriesPoints={handleGetHistoriesPoints}
          />
        </div>

        <div className="lg:hidden">
          <ContainerServiceHistoryMobile
            translation={translation}
            serviceHistories={serviceHistories}
            handleGetHistoriesPoints={handleGetHistoriesPoints}
          />
        </div>
        <Footer />
      </div>
    </main>
  );
};

export default withAuth(ServiceHistoryPage);
