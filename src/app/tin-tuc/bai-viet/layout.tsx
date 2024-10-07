import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import "../../globals.css";
import "react-toastify/dist/ReactToastify.css";
// import "react-datepicker/dist/react-datepicker.css";
import { headers } from "next/headers";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  let id = "";
  const headersList = headers();
  const referer = headersList.get("x-url2") || "";
  const splitRef = referer?.split("=");
  if (splitRef?.length === 2 && !isNaN(parseInt(splitRef[1]))) {
    id = splitRef[1];
  }
  // fetch data
  const newsDetail = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/Blog/GetBlogDetail/${id}`
  )
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log("error: ", err));

  return {
    title: newsDetail?.data?.title || "Bài viết",
    description: newsDetail?.data?.shortDescription || "Bài viết",
    openGraph: {
      images: newsDetail?.data?.imageUrl || "/images/banner_hunglong.jpg",
    },
  };
}

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
