"use client";
import withCommon from "@/layout/withCommon";
import Header from "@/components/header";
import { IUserProfile } from "@/interfaces/httpRequest/IUser";
import { useEffect, useState } from "react";
import "../globals.css";
import { getVehicleRentalDetail } from "@/apis/bookingVehicel";
import LoadingView from "@/components/LoadingView";
import { IRental, IRentalResponse } from "@/interfaces/httpRequest/IRental";
import ContainerRentalDetailDesktop from "@/container/chi-tiet-thue-xe/desktop";
import ContainerRentalDetailMobile from "@/container/chi-tiet-thue-xe/mobile";
import useTrans from "@/hook/useTrans";
import { ITranslation } from "@/interfaces/ITranslation";

const RentalCarDetailPage = ({
  userProfile,
}: {
  userProfile: IUserProfile;
}) => {
  const translation: ITranslation = useTrans();
  const [rentalDetail, setRentalDetail] = useState<IRental>();

  useEffect(() => {
    const fetchVehicleRentalDetail = async () => {
      let params = new URLSearchParams(window.location.search);
      let id: string = params?.get("rent") || "";
      const { data, isSuccess }: IRentalResponse = await getVehicleRentalDetail(
        {
          id: id,
        }
      );
      if (isSuccess) {
        setRentalDetail(data);
      }
    };
    fetchVehicleRentalDetail();
  }, []);

  if (!rentalDetail) {
    return <LoadingView />;
  }
  return (
    <main className="min-h-[100vh] relative flex flex-col">
      <Header
        userProfile={userProfile}
        backgroundColorMobile="linear-gradient(90.4deg, #DF5030 -0.55%, #BE3C2A 72.71%)"
      />
      <div className="flex-1 bg-neutral-grey-100">
        <div className="lg:block hidden lg:h-screen">
          <ContainerRentalDetailDesktop
            translation={translation}
            rentalDetail={rentalDetail}
          />
        </div>

        <div className="lg:hidden block">
          <ContainerRentalDetailMobile
            translation={translation}
            rentalDetail={rentalDetail}
          />
        </div>
      </div>
    </main>
  );
};

export default withCommon(RentalCarDetailPage);
