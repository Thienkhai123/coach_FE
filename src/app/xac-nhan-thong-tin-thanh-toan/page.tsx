"use client";
import LoadingView from "@/components/LoadingView";
import useTrans from "@/hook/useTrans";
import { IUserProfile } from "@/interfaces/httpRequest/IUser";
import withCommon from "@/layout/withCommon";
import { useEffect, useState } from "react";
import "../globals.css";
import { fetchShippingOrder } from "@/apis/searchOrder";
import { IGetShippingOrderDetail } from "@/interfaces/httpRequest/IShipment";
import ContainerRequestInforPaymentDesktop from "@/container/xac-nhan-thong-tin-thanh-toan/desktop";
import ContainerRequestInforPaymentMobile from "@/container/xac-nhan-thong-tin-thanh-toan/mobile";

const RequestInformationPaymentPage = ({
  userProfile,
}: {
  userProfile: IUserProfile;
}) => {
  const translation = useTrans();

  const [phone, setPhone] = useState<string | null>(null);
  const [code, setCode] = useState<string | null>(null);
  const [paymentInfor, setPaymentInfor] = useState<IGetShippingOrderDetail>();
  const [isLoading, setLoading] = useState(false);

  const getShippingInfor = async ({
    phone,
    code,
  }: {
    phone: string;
    code: string;
  }) => {
    setLoading(true);
    const params = {
      phoneNumber: phone,
      shippingOrderCode: code,
    };
    const res: IGetShippingOrderDetail = await fetchShippingOrder(params);
    if (res.isSuccess) {
      setPaymentInfor(res);
    }
    setLoading(false);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const phoneParam = params.get("phone");
    const codeParam = params.get("code");
    if (phoneParam && codeParam) {
      setPhone(phoneParam);
      setCode(codeParam);
      getShippingInfor({ code: codeParam, phone: phoneParam });
    }
  }, []);

  if (!paymentInfor) {
    return <div>{isLoading && <LoadingView />}</div>;
  }
  return (
    <main className="min-h-[100vh] relative flex flex-col">
      {isLoading && <LoadingView />}
      {!isLoading && (
        <div className="flex-1 bg-neutral-grey-100">
          <div className="lg:block hidden">
            <ContainerRequestInforPaymentDesktop
              translation={translation}
              paymentInfor={paymentInfor}
              userProfile={userProfile}
            />
          </div>

          <div className="lg:hidden block">
            {Object?.keys(paymentInfor)?.length > 0 && (
              <ContainerRequestInforPaymentMobile
                paymentInfor={paymentInfor}
                userProfile={userProfile}
                translation={translation}
              />
            )}
          </div>
        </div>
      )}
    </main>
  );
};
export default withCommon(RequestInformationPaymentPage);
