import type { Metadata } from "next";
import "../globals.css";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "Tin tức",
  description: "Nhà xe",
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: any };
}) {
  return (
    <html lang="vi">
      <body>
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}
