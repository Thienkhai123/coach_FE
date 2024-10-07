import type { Metadata } from "next";
import "../globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";

export const metadata: Metadata = {
  title: "Tạo đơn gửi hàng",
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
    <html lang="vi" className="">
      <body>
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}