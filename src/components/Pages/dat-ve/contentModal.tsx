import NavbarTrip from "./navbarTrip";

type InfoLocationT = {
  id: number;
  title: string;
  description: string;
  time: string;
};

interface IContentModalProps {
  selectedPicking: InfoLocationT;
  list: InfoLocationT[];
  title: string;
  placeholder: string;
  seeLocationText: string;
  handleSelect: (arg: InfoLocationT) => void;
  toggleModal: () => void;
}

type RenderItemT = {
  title: string;
  id: number;
  onClick: () => void;
  selectedPicking: InfoLocationT;
  time: string;
  description: string;
  seeLocationText: string;
};

const RenderItem = (props: RenderItemT) => {
  const {
    description,
    id,
    onClick,
    seeLocationText,
    selectedPicking,
    time,
    title,
  } = props;
  return (
    <li className="py-3 px-4 flex items-center gap-6 justify-between [&:not(:last-child)]:border-b [&:not(:last-child)]:border-b-neutral-grey-100">
      <div className="flex-1 flex items-center gap-3" onClick={onClick}>
        <div className="w-5">
          <input
            className="accent-secondary-300 w-5 h-5"
            value={id}
            type="radio"
            checked={selectedPicking?.id === id}
          />
        </div>
        <div>
          <p className="text-neutral-grey-700 font-semibold text-sm">
            {time ? `${time} - ${title}` : title}
          </p>
          <p className="text-[#61646B] font-normal text-xs">{description}</p>
        </div>
      </div>
      <div className="w-[62px]">
        <p className="text-secondary-300 font-semibold text-sm underline">
          {seeLocationText}
        </p>
      </div>
    </li>
  );
};

const ContentModal = (props: IContentModalProps) => {
  const {
    selectedPicking,
    list,
    title,
    placeholder,
    seeLocationText,
    handleSelect,
    toggleModal,
  } = props;

  return (
    <div className="bg-white">
      <NavbarTrip
        title={title}
        time=""
        textAction=""
        handleChange={() => {}}
        handleChangePrevStep={toggleModal}
        classNameFlex="flex gap-[90px] items-center"
      />

      <ul className="group">
        {list?.map((location) => {
          const { id } = location;
          const handleClick = () => {
            handleSelect(location);
          };
          return (
            <RenderItem
              key={`location-${id}`}
              {...location}
              onClick={handleClick}
              seeLocationText={seeLocationText}
              selectedPicking={selectedPicking}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default ContentModal;
