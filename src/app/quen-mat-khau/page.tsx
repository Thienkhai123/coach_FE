"use client";
import ContainerForgotPasswordDesktop from "@/container/quen-mat-khau/desktop";
import ContainerForgotPasswordMobile from "@/container/quen-mat-khau/mobile";
import "../globals.css";

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-[100vh] relative flex flex-col">
      <div className="flex-1 lg:bg-neutral-grey-100 bg-white">
        <div className="lg:block hidden">
          <ContainerForgotPasswordDesktop />
        </div>

        <div className="lg:hidden block">
          <ContainerForgotPasswordMobile />
        </div>
      </div>
    </main>
  );
}
