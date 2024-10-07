"use client";
import Header from "@/components/header";
import ContainerTourDesktop from "@/container/tour-du-lich/desktop";
import ContainerTourMobile from "@/container/tour-du-lich/mobile";
import useTrans from "@/hook/useTrans";
import { ITranslation } from "@/interfaces/ITranslation";
import "../globals.css";

export default function TourTravelPage() {
  const translation: ITranslation = useTrans();
  return (
    <main className="min-h-[100vh] relative flex flex-col">
      <div className="flex-1">
        <Header />
        <div className="lg:block hidden">
          <ContainerTourDesktop translation={translation} />
        </div>

        <div className="lg:hidden">
          <ContainerTourMobile translation={translation} />
        </div>
      </div>
    </main>
  );
}
