"use client";
import ContainerMyPointDesktop from "@/components/Pages/diem-thuong-cua-toi/desktop";
import ContainerMyPointMobile from "@/components/Pages/diem-thuong-cua-toi/mobile";
import useTrans from "@/hook/useTrans";
import { ITranslation } from "@/interfaces/ITranslation";
import { IUserProfile } from "@/interfaces/httpRequest/IUser";
import withAuth from "@/layout/withAuth";
import "../globals.css";
import useVoucher from "@/hook/account/useVoucher";
import { useEffect } from "react";
import LoadingView from "@/components/LoadingView";
import usePoints from "@/hook/account/usePoints";
import useHistoriesPoints from "@/hook/account/usePointHistory";
import Header from "@/components/header";
import Footer from "@/components/footer";

interface IMyPointPage {
  userProfile: IUserProfile;
}
const MyPointPage = (props: IMyPointPage) => {
  const { userProfile } = props;
  const translation: ITranslation = useTrans();
  const { vouchers, handleGetAllVouchers, loading } = useVoucher();
  const {
    handleGetUserPoints,
    loading: loadingPoints,
    processPoints,
  } = usePoints();
  const {
    historiesPoint,
    loading: loadingHistories,
    handleGetHistoriesPoints,
  } = useHistoriesPoints();

  useEffect(() => {
    handleGetAllVouchers({});
    handleGetUserPoints();
    handleGetHistoriesPoints();
  }, []);

  return (
    <main className="min-h-[100vh] relative flex flex-col">
      {(loading || loadingPoints || loadingHistories) && <LoadingView />}
      <Header
        userProfile={userProfile}
        backgroundColorMobile="linear-gradient(90.4deg, #DF5030 -0.55%, #BE3C2A 72.71%)"
      />
      {!loading && (
        <div className="flex-1 bg-[#ececec]">
          <div className="lg:block hidden">
            <ContainerMyPointDesktop
              userProfile={userProfile}
              translation={translation}
              vouchers={vouchers}
              processPoints={processPoints}
              historiesPoint={historiesPoint}
            />
          </div>

          <div className="lg:hidden">
            <ContainerMyPointMobile
              translation={translation}
              userProfile={userProfile}
              vouchers={vouchers}
              processPoints={processPoints}
              historiesPoint={historiesPoint}
            />
          </div>
        </div>
      )}
      <Footer />
    </main>
  );
};
export default withAuth(MyPointPage);
