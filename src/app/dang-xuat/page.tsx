"use client";
import { useEffect } from "react";

export default function SignOutPage() {
  useEffect(() => {
    localStorage.clear();
    window.location.replace("/dang-nhap");
  }, []);
  return <div></div>;
}
