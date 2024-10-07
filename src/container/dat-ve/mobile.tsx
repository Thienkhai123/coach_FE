import { OptionT } from "@/components/booking-search";
import { ICityResponse } from "@/interfaces/httpRequest/ICity";
import { IUserProfile } from "@/interfaces/httpRequest/IUser";
import { IBookingTranslate } from "@/interfaces/IBookingTranslate";
import { IErrorTranslate } from "@/interfaces/IErrorTranslate";
import { IHomeTranslate } from "@/interfaces/IHomeTranslate";
import { IMyPointTranslate } from "@/interfaces/IMyPointTranslate";
import { IPaymentTranslate } from "@/interfaces/IPaymentTranslate";
import { IPlaceholderTranslate } from "@/interfaces/IPlaceholderTranslate";
import { ISignInTranslate } from "@/interfaces/ISignInTranslate";
import OneWaysMobileTrips from "@/components/Pages/dat-ve/1-ways-mobile";
import { useEffect, useState } from "react";
import moment from "moment";
import LoadingView from "@/components/LoadingView";
import TwoWaysMobileTrips from "@/components/Pages/dat-ve/2-ways-mobile";

const ContainerBookingPageMobile = (props: {
  HOME: IHomeTranslate;
  BOOKING: IBookingTranslate;
  ERROR: IErrorTranslate;
  PLACEHOLDER: IPlaceholderTranslate;
  SIGNIN: ISignInTranslate;
  PAYMENT: IPaymentTranslate;
  POINT: IMyPointTranslate;
  city?: ICityResponse;
  vehicleTypesList?: OptionT[];
  userProfile: IUserProfile;
  tripTitle?: string;
}) => {
  const [typeTrips, setTypeTrips] = useState<number | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    if (moment(searchParams.get("endDate"), "DD-MM-YYYY")?.isValid()) {
      setTypeTrips(2);
    } else {
      setTypeTrips(1);
    }
  }, []);

  if (typeTrips === null) {
    return <LoadingView />;
  }

  if (typeTrips === 2) {
    return <TwoWaysMobileTrips {...props} />;
  }

  return <OneWaysMobileTrips {...props} />;
};

export default ContainerBookingPageMobile;
