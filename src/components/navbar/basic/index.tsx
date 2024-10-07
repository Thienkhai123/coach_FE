import ArrowLeftIcon from "@/components/icons/arrowLeft";

const NavbarBasic = ({ title = "", handleClick = () => {} }) => {
  return (
    <div className="flex gap-2 p-4 items-center bg-gradient-to-r from-[#DF5030] to-[#BE3C2A]">
      <div onClick={handleClick}>
        <ArrowLeftIcon stroke="white" />
      </div>
      <p className="font-semibold text-sm text-white">{title}</p>
    </div>
  );
};

export default NavbarBasic;
