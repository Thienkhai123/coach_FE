import React from "react";
import NavbarTrip from "../dat-ve/navbarTrip";

type InfoLocationT = {
  id: number;
  title: string;
};

interface IModalPickTransportLocationProps {
  selectedPicking?: string;
  list: InfoLocationT[];
  title: string;
  seeLocationText: string;
  handleSelect: (arg: InfoLocationT) => void;
  toggleModal: () => void;
}

type RenderItemT = {
  title: string;
  id: number;
  onClick: () => void;
  selectedPicking: string;
  seeLocationText: string;
};

const RenderItem = (props: RenderItemT) => {
  const { id, onClick, seeLocationText, selectedPicking, title } = props;
  return (
    <li className="py-3 px-4 flex items-center gap-6 justify-between [&:not(:last-child)]:border-b [&:not(:last-child)]:border-b-neutral-grey-100">
      <div className="flex-1 flex items-center gap-3" onClick={onClick}>
        <input
          className="accent-secondary-300 w-5 h-5"
          value={id}
          type="radio"
          checked={parseInt(selectedPicking) === id}
          readOnly
        />
        <div>
          <p className="text-neutral-grey-700 font-semibold text-sm">{title}</p>
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

const ModalPickTransportLocation = (
  props: IModalPickTransportLocationProps
) => {
  const {
    selectedPicking = "0",
    list,
    title,
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

export default ModalPickTransportLocation;
