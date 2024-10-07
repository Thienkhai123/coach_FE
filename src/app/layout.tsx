import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import { Manrope } from "next/font/google";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || "http://localhost:3000"),
  title: "Xe Quảng Bình - Công ty TNHH du lịch 338",
  description:
    "Cho thuê xe du lịch | Vận tải khách ghép đoàn | Vận tải hàng hóa Hà Nội - Quảng Bình và ngược lại",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#ce462d" },
    { media: "(prefers-color-scheme: light)", color: "#ce462d" },
  ],

  abstract: "QuangBinh",
  appleWebApp: true,
  authors: [
    {
      name: "Xe Quảng Bình",
      url: "https://client.xequangbinh.vn",
    },
  ],
  openGraph: {
    images: "/images/banner_hunglong.jpg",
    locale: "vi_VN",
    type: "website",
    title: "Xe Quảng Bình - Công ty TNHH du lịch 338",
    description:
      "Cho thuê xe du lịch | Vận tải khách ghép đoàn | Vận tải hàng hóa Hà Nội - Quảng Bình và ngược lại",
    url: "https://client.xequangbinh.vn",
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// If loading a variable font, you don't need to specify the font weight
const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: any };
}) {
  return (
    <html lang="vi" className={manrope.className} suppressHydrationWarning>
      <body>
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}
