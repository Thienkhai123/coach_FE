import ArrowLeftIcon from "@/components/icons/arrowLeft";

interface INavbarTripProps {
  title: string;
  time: string;
  textAction: string;
  handleChange: () => void;
  handleChangePrevStep: () => void;
  classNameFlex?: string;
}

const NavbarTrip = ({
  title,
  time,
  textAction,
  handleChange = () => {},
  handleChangePrevStep = () => {},
  classNameFlex = "flex gap-2 items-center",
}: INavbarTripProps) => {
  return (
    <div className="flex items-center justify-between gap-4 p-4 bg-gradient-to-r from-[#DF5030] to-[#BE3C2A]">
      <div className={classNameFlex}>
        <div onClick={handleChangePrevStep}>
          <ArrowLeftIcon stroke="white" />
        </div>
        <div>
          <p className="font-semibold text-sm text-white">{title}</p>
          <p className="text-primary-900 font-medium text-xs">{time}</p>
        </div>
      </div>
      <div onClick={handleChange}>
        <p className="underline">{textAction}</p>
      </div>
    </div>
  );
};

export default NavbarTrip;
