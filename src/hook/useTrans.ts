"use client";
import en from "@/lang/en";
import vi from "@/lang/vi";
import { useEffect, useState } from "react";

interface ILANGS {
  [key: string]: string;
}

const LANGS: ILANGS = {
  en: "en",
  vi: "vi",
};

const useTrans = () => {
  const [locale, setLocale] = useState("vi");
  useEffect(() => {
    let tmplocale: string = localStorage.getItem("locale") || "";
    if (LANGS[tmplocale]) {
      setLocale(tmplocale);
    }
  }, []);
  // return vi;
  return locale === "en" ? en : vi;
};

export default useTrans;
