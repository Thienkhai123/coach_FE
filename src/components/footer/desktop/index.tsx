import ArrowLeftFooter from "@/components/icons/arrowLeftFooter";
import GlobeIcon from "@/components/icons/globe";
import MapIcon from "@/components/icons/map";
import MSDNIcon from "@/components/icons/MSDN";
import PhoneIcon from "@/components/icons/phone";
import PhoneDarkIcon from "@/components/icons/phoneDark";
import UserIcon from "@/components/icons/user";
import {
  IDetailTranslate,
  IFooterTranslate,
} from "@/interfaces/IFooterTranslate";
import Image from "next/image";
import React from "react";

interface IFooterDesktopprops {
  FOOTER: IFooterTranslate;
}

const data = {
  companyName: "CÔNG TY TNHH DU LỊCH 338",
  content:
    "Lorem ipsum dolor sit amet consectetur. Ultricies porta at sed sagittis.",
  MSDN: "0106766690",
  responsible: "Nguyễn Thị Hằng",
  address: "338 - Trần Khát Chân, Hai Bà Trưng, Hà Nội",
  phone: "0914.077.779 - 0963.388.388",
  website: "http://xequangbinh.vn",
};

const FooterDesktop = (props: IFooterDesktopprops) => {
  const { FOOTER } = props;
  return (
    <div className="bg-white xl:pt-10 xl:pb-4 xl:px-0 pb-6 pt-6 px-6 flex flex-col items-center rounded-t-[20px] text-neutral-grey-600">
      <div className="flex xl:flex-row flex-col xl:gap-[80px] mx-auto xl:pb-[28px] xl:border-b xl:border-[#D9D9D9]">
        <div className="xl:w-[200px] lg:block hidden">
          <Image src="/images/logoFooter.png" alt="" width={60} height={60} />
          <p className="mt-2 text-[14px] font-bold">{FOOTER.content}</p>
        </div>
        <div className="xl:w-[380px] w-full xl:pb-0 pb-4 xl:border-b-0 border-b border-[#D9D9D9]">
          <div className="px-2 py-1 w-fit rounded-full bg-[#FCE6D5] text-[#DF5030] text-[14px] font-bold">
            {FOOTER.titleCompanyDetail}
          </div>
          <div className="xl:mt-4 mt-2">
            <p className="text-[14px] font-bold">{FOOTER.content}</p>
          </div>
          <div className="mt-2 flex flex-col gap-1">
            <div className=" text-[14px] font-medium flex gap-3 ">
              <div className="mt-[2px]">
                <MSDNIcon />
              </div>
              <div>
                {FOOTER.companyDetail.MSDN}: {data.MSDN}
              </div>
            </div>
            <div className=" text-[14px] font-medium flex gap-3 ">
              <div className="mt-[2px]">
                <UserIcon />
              </div>
              <div>
                {FOOTER.companyDetail.responsible}: {data.responsible}
              </div>
            </div>
            <div className=" text-[14px] font-medium flex gap-3 ">
              <div className="mt-[2px]">
                <MapIcon />
              </div>
              {FOOTER.companyDetail.address}: {data.address}
            </div>
            <div className=" text-[14px] font-medium flex gap-3 ">
              <div className="mt-[2px]">
                <PhoneDarkIcon />
              </div>
              <div>
                {FOOTER.companyDetail.phone}:
                <span className="font-bold">{data.phone}</span>
              </div>
            </div>
            <div className=" text-[14px] font-medium flex gap-3">
              <div className="mt-[2px]">
                <GlobeIcon />
              </div>
              <div>
                {FOOTER.companyDetail.website}:{data.website}
              </div>
            </div>
          </div>
        </div>
        <div className="xl:w-[380px] w-full xl:pt-0 pt-4 ">
          <div className="px-2 py-1 w-fit rounded-full bg-[#DFF0FB] text-[#0273BC] text-[14px] font-bold">
            {FOOTER.titleOverviewDetail}
          </div>
          <div className="xl:mt-4 mt-2 flex flex-col gap-1">
            {FOOTER.overviewDetail?.map((elm: IDetailTranslate, ind) => {
              return (
                <a
                  key={ind}
                  href={elm?.href || "#"}
                  className="flex gap-3 cursor-pointer"
                >
                  <div className="mt-1">
                    <ArrowLeftFooter />
                  </div>
                  <p className="text-[14px] font-medium text-[#373738]">
                    {elm?.title}
                  </p>
                </a>
              );
            })}
          </div>
        </div>
      </div>
      <div className="xl:flex hidden mt-2 h-[57px]  items-center justify-between xl:w-[1120px]">
        <div>
          <p className="text-[14px] font-medium">
            &copy; {FOOTER.copyright}{" "}
            <span className="font-bold">{data.companyName}</span>
          </p>
        </div>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://online.gov.vn/Home/WebDetails/52760"
        >
          <Image
            src="/images/temFooter.png"
            alt="tem"
            width={150}
            height={57}
          />
        </a>
      </div>
      <div className="xl:hidden block mt-4">
        <a
          className="pb-4"
          target="_blank"
          rel="noopener noreferrer"
          href="http://online.gov.vn/Home/WebDetails/52760"
        >
          <Image
            src="/images/temFooter.png"
            alt="tem"
            width={150}
            height={57}
          />
        </a>
        <div className="pt-3 border-t border-[#D9D9D9]">
          <p className="text-[14px] font-medium">
            &copy; {FOOTER.copyright}{" "}
            <span className="font-bold">{data.companyName}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FooterDesktop;
