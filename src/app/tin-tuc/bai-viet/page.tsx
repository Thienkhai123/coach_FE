"use client";
import { fetchLatestNews, fetchNewDetail } from "@/apis/news";
import LoadingView from "@/components/LoadingView";
import ContainerNewsDetailDesktop from "@/container/tin-tuc-chi-tiet/desktop";
import ContainerNewsDetailMobile from "@/container/tin-tuc-chi-tiet/mobile";

import useTrans from "@/hook/useTrans";
import { ITranslation } from "@/interfaces/ITranslation";
import { useEffect, useState } from "react";
import "../../globals.css";
import withCommon from "@/layout/withCommon";
import { IUserProfile } from "@/interfaces/httpRequest/IUser";

const NewsDetailPage = ({ userProfile }: { userProfile: IUserProfile }) => {
  const translation: ITranslation = useTrans();

  const [new_Detail, setNew_Detai] = useState<any>({});
  const [latest_New, setLatest_New] = useState<any>([]);
  const [isLoading, setLoading] = useState(true);

  const getNewDetail = async () => {
    setLoading(true);
    const { pathname, search } = window.location;
    let params = new URLSearchParams(search);
    let id: any = params?.get("slug");
    if (id?.length > 0) {
      const isParamsStatus = parseInt(id.toString());
      if (Number.isNaN(isParamsStatus)) {
        const res = await fetchNewDetail({ url: id.toString() });
        if (res?.isSuccess) {
          const res_later = await fetchLatestNews({ id: res?.data?.blogId });
          setLatest_New(res_later.data);
          setNew_Detai(res.data);
        }
      } else {
        const res = await fetchNewDetail({ id: id.toString() });
        if (res?.isSuccess) {
          const res_later = await fetchLatestNews({ id: res?.data?.blogId });
          setLatest_New(res_later.data);
          setNew_Detai(res.data);
        }
      }
    } else {
      window.location.assign("/404");
    }
    setLoading(false);
  };

  useEffect(() => {
    getNewDetail();
  }, []);

  return (
    <main className="min-h-[100vh] relative flex flex-col">
      <div className="flex-1">
        <div className="lg:block hidden">
          {isLoading && <LoadingView />}
          {!isLoading && (
            <ContainerNewsDetailDesktop
              new_Detail={new_Detail}
              latest_New={latest_New}
              translation={translation}
              userProfile={userProfile}
            />
          )}
        </div>

        <div className="lg:hidden bg-neutral-grey-100">
          {isLoading && <LoadingView />}
          {!isLoading && (
            <ContainerNewsDetailMobile
              translation={translation}
              new_Detail={new_Detail}
              latest_New={latest_New}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default withCommon(NewsDetailPage);
