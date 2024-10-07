import { ACCESS_TOKEN } from "@/constant/app";
import { useEffect, useState } from "react";
import { fetchUserProfile } from "@/apis/user";
import axios from "axios";
import isEmpty from "lodash/isEmpty";
import { IUserProfileResponse } from "@/interfaces/httpRequest/IUser";

axios.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  if (!isEmpty(accessToken)) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

const withGuest = (Component: any) => {
  return function withGuest(props: any) {
    const [validateAuthen, setValidateAuthen] = useState(false);

    useEffect(() => {
      const handleValidateAuthen = async () => {
        const accessToken = localStorage.getItem(ACCESS_TOKEN);
        if (accessToken) {
          window.location.replace("/");
        } else {
          setValidateAuthen(true);
        }
      };
      handleValidateAuthen();
    }, []);

    if (!validateAuthen) {
      return <></>;
    }

    return <Component />;
  };
};

export default withGuest;
