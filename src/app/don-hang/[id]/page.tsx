"use client";
import ContainerOrderDesktop from "@/container/don-hang/desktop";
import ContainerOrderMobile from "@/container/don-hang/mobile";
import useTrans from "@/hook/useTrans";
import { ITranslation } from "@/interfaces/ITranslation";
import { useEffect, useState } from "react";

export default function OrderPage() {
  const [orderId, setorderId] = useState("");
  const translation: ITranslation = useTrans();

  useEffect(() => {
    const pathNameSplit = window.location.pathname.split("/");
    if (pathNameSplit?.length > 0) {
      setorderId(pathNameSplit[pathNameSplit?.length - 1]);
    }
  }, []);

  return (
    <main className="min-h-[100vh] relative flex flex-col">
      <div className="flex-1">
        <div className="lg:block hidden">
          <ContainerOrderDesktop />
        </div>

        <div className="lg:hidden">
          <ContainerOrderMobile translation={translation} orderId={orderId} />
        </div>
      </div>
    </main>
  );
}
