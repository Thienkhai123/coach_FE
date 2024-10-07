import ArrowDownIcon from "@/components/icons/arrowDown";
import ArrowLeftIcon from "@/components/icons/arrowLeft";
import SearchIcon from "@/components/icons/search";
import { LG_SCREEN } from "@/constant/app";
import { toLowerCaseNonAccentVietnamese } from "@/helpers/functionHelper";
import useOnClickOutside from "@/hook/useClickOutside";
import useModal from "@/hook/useModal";
import { IHomeTranslate } from "@/interfaces/IHomeTranslate";
import { useRef, useState } from "react";

const FAKE_DATA = [
  { id: 0, value: "An Giang " },
  { id: 1, value: "Bà Rịa - Vũng Tàu " },
  { id: 2, value: "Bạc Liêu " },
  { id: 3, value: "Bắc Kạn " },
  { id: 4, value: "Bắc Giang " },
  { id: 5, value: "Bắc Ninh " },
  { id: 6, value: "Bến Tre " },
  { id: 7, value: "Bình Dương " },
  { id: 8, value: "Bình Định " },
  { id: 9, value: "Bình Phước " },
  { id: 10, value: "Bình Thuận " },
  { id: 11, value: "Cà Mau " },
  { id: 12, value: "Cao Bằng " },
  { id: 13, value: "Cần Thơ " },
  { id: 14, value: "Đà Nẵng " },
  { id: 15, value: "Đắk Lắk " },
  { id: 16, value: "Đắk Nông " },
  { id: 17, value: "Đồng Nai " },
  { id: 18, value: "Đồng Tháp " },
  { id: 19, value: "Điện Biên " },
  { id: 20, value: "Gia Lai " },
  { id: 21, value: "Hà Giang " },
  { id: 22, value: "Hà Nam " },
  { id: 23, value: "Hà Nội " },
  { id: 24, value: "Hà Tĩnh " },
  { id: 25, value: "Hải Dương " },
  { id: 26, value: "Hải Phòng " },
  { id: 27, value: "Hòa Bình " },
  { id: 28, value: "Hậu Giang " },
  { id: 29, value: "Hưng Yên " },
  { id: 30, value: "TP. Hồ Chí Minh " },
  { id: 31, value: "Khánh Hòa " },
  { id: 32, value: "Kiên Giang " },
  { id: 33, value: "Kon Tum " },
  { id: 34, value: "Lai Châu " },
  { id: 35, value: "Lào Cai " },
  { id: 36, value: "Lạng Sơn " },
  { id: 37, value: "Lâm Đồng " },
  { id: 38, value: "Long An " },
  { id: 39, value: "Nam Định " },
  { id: 40, value: "Nghệ An " },
  { id: 41, value: "Ninh Bình " },
  { id: 42, value: "Ninh Thuận " },
  { id: 43, value: "Phú Thọ " },
  { id: 44, value: "Phú Yên " },
  { id: 45, value: "Quảng Bình " },
  { id: 46, value: "Quảng Nam " },
  { id: 47, value: "Quảng Ngãi " },
  { id: 48, value: "Quảng Ninh " },
  { id: 49, value: "Quảng Trị " },
  { id: 50, value: "Sóc Trăng " },
  { id: 51, value: "Sơn La " },
  { id: 52, value: "Tây Ninh " },
  { id: 53, value: "Thái Bình " },
  { id: 54, value: "Thái Nguyên " },
  { id: 55, value: "Thanh Hóa " },
  { id: 56, value: "Thừa Thiên - Huế " },
  { id: 57, value: "Tiền Giang " },
  { id: 58, value: "Trà Vinh " },
  { id: 59, value: "Tuyên Quang " },
  { id: 60, value: "Vĩnh Long " },
  { id: 61, value: "Vĩnh Phúc " },
  { id: 62, value: "Yên Bái " },
  { id: 63, value: "Long Xuyên (LONGXUYEN)" },
  { id: 64, value: "Châu Đốc (CHAUDOC)" },
  { id: 65, value: "Tịnh Biên " },
  { id: 66, value: "Tri Tôn " },
  { id: 67, value: "Quy Nhơn " },
  { id: 68, value: "An Nhơn " },
  { id: 69, value: "Phan Thiết " },
  { id: 70, value: "Năm Căn " },
  { id: 71, value: "Thốt Nốt " },
  { id: 72, value: "Buôn Ma Thuột " },
  { id: 73, value: "Cư Jút " },
  { id: 74, value: "Cao Lãnh " },
  { id: 75, value: "Sa Đéc " },
  { id: 76, value: "Hồng Ngự " },
  { id: 77, value: "Vị Thanh " },
  { id: 78, value: "Nha Trang " },
  { id: 79, value: "Cam Ranh " },
  { id: 80, value: "Ninh Hòa " },
  { id: 81, value: "Rạch Giá " },
  { id: 82, value: "Hà Tiên " },
  { id: 83, value: "Vĩnh Thuận " },
  { id: 84, value: "Đà Lạt " },
  { id: 85, value: "Bảo Lộc " },
  { id: 86, value: "Đơn Dương " },
  { id: 87, value: "Phan Rang-Tháp Chàm " },
  { id: 88, value: "Tuy Hoà " },
  { id: 89, value: "Đại Lộc " },
  { id: 90, value: "Vĩnh Châu  " },
  { id: 91, value: "Ngã Năm " },
  { id: 92, value: "Bình Minh " },
  { id: 93, value: "Trà Ôn " },
  { id: 94, value: "Phường Hộ Phòng " },
  { id: 95, value: "Phường Mũi Né " },
  { id: 96, value: "Thị Trấn Đại Ngãi " },
];

type OptionT = {
  id: number;
  value: string;
};

interface ISelectOptionSearchDynamicProps {
  register: any;
  name: string;
  setValue: any;
  listOpt: OptionT[];
  placeHolder: string;
  value: string;
  placeholderPopup?: string;
  title: string;
  ExtraComponent?: any;
}

interface IOptionProps {
  open: boolean;
  title?: string;
  placeholderText?: string;
  listSearch?: any[];
  ExtraComponent?: any;
  handleCloseOption: () => void;
  handleSelect: (arg: string) => void;
}

const SelectOptionSearchDynamic = ({
  register,
  name,
  setValue,
  placeHolder,
  value,
  placeholderPopup = "",
  title,
  ExtraComponent = () => <></>,
}: ISelectOptionSearchDynamicProps) => {
  const [open, toggle] = useModal();

  const handleCloseOption = () => {
    if (open) {
      toggle();
    }
  };

  const handleSelect = (value: string) => {
    setValue(name, value);
  };

  return (
    <div className="relative">
      <div className=" flex gap-2 items-center border-2 border-[#dde2e8] rounded-lg py-2 px-4 mx-4">
        <input
          defaultValue={value}
          {...register(name)}
          onClick={toggle}
          placeholder={placeHolder}
          className=" outline-0 w-full"
        />

        <div>
          <ArrowDownIcon />
        </div>
      </div>
      <div className="lg:block hidden">
        <DesktopOption
          open={open}
          handleCloseOption={handleCloseOption}
          handleSelect={handleSelect}
        />
      </div>

      <div className="lg:hidden fixed top-0 z-10 bg-white">
        <MobileOption
          open={open}
          handleCloseOption={handleCloseOption}
          handleSelect={handleSelect}
          placeholderText={placeholderPopup}
          title={title}
          ExtraComponent={ExtraComponent}
        />
      </div>
    </div>
  );
};

const DesktopOption = ({
  open,
  handleCloseOption,
  handleSelect,
}: IOptionProps) => {
  const ref = useRef(null);
  const [searchText, setSearchText] = useState("");

  const handleClose = () => {
    if (window.innerWidth >= LG_SCREEN) {
      handleCloseOption();
    }
  };

  const handleChoose = (val: string) => {
    handleSelect(val);
    handleClose();
  };

  useOnClickOutside(ref, handleClose);
  return (
    <div
      ref={ref}
      className={`absolute top-0 z-10 transition-all duration-500 max-h-[400px] overflow-y-scroll ${
        open ? "select-option-search-wrapper " : "w-0 h-0 overflow-hidden"
      }`}
    >
      <p>Điểm đi</p>
      <input
        placeholder="Chọn điểm đi"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <p>TỈNH/THÀNH PHỐ</p>
      {FAKE_DATA?.map((el, ind) => {
        const formatVal = toLowerCaseNonAccentVietnamese(el?.value);
        const formatSearchText = toLowerCaseNonAccentVietnamese(searchText);
        if (formatVal.includes(formatSearchText)) {
          return (
            <div key={ind} onClick={() => handleChoose(el?.value)}>
              <p>{el?.value}</p>
            </div>
          );
        }
      })}
    </div>
  );
};

const MobileOption = ({
  open,
  handleSelect,
  title = "",
  placeholderText = "",
  handleCloseOption,
  ExtraComponent = () => <></>,
}: IOptionProps) => {
  const [searchText, setSearchText] = useState("");

  return (
    <div
      className={` ${
        open
          ? "bg-white min-h-screen w-screen transition-opacity duration-500"
          : "w-0 h-0 overflow-hidden"
      }`}
    >
      <div className="flex gap-2 justify-between items-center px-4 my-2">
        <div onClick={handleCloseOption}>
          <ArrowLeftIcon />
        </div>
        <div className="flex-1">
          <p className="text-center text-black text-base font-medium">
            {title}
          </p>
        </div>
      </div>
      <div className="flex p-4 gap-3 items-center bg-[#EFEFF0]">
        <SearchIcon />
        <input
          placeholder={placeholderText}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full outline-0 bg-transparent"
          autoComplete="off"
        />
      </div>
      <div className="flex flex-col h-[390px] overflow-y-auto custom-scrollbar mt-2 mr-2">
        {FAKE_DATA?.map((el, ind) => {
          const formatVal = toLowerCaseNonAccentVietnamese(el?.value);
          const formatSearchText = toLowerCaseNonAccentVietnamese(searchText);
          if (formatVal.includes(formatSearchText)) {
            return (
              <p
                key={ind}
                className="p-4 text-black text-sm border-b border-b-[#EFEFF0]"
              >
                {el?.value}
              </p>
            );
          }
        })}
      </div>

      <ExtraComponent />
    </div>
  );
};

export default SelectOptionSearchDynamic;
