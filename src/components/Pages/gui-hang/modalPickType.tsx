import { DataPackage } from "@/interfaces/httpRequest/IOrder";
import { ITranslation } from "@/interfaces/ITranslation";
import React from "react";

interface IModalPickTypeProps {
  translation: ITranslation;
  listTypes?: DataPackage[];
  selectedType: number;
  handleSelectedType: (arg: DataPackage) => void;
}

const ModalPickType = (props: IModalPickTypeProps) => {
  const { translation, listTypes, selectedType, handleSelectedType } = props;
  const { TRANSPORT } = translation;

  return (
    <div>
      <div className="bg-neutral-grey-100 py-3 px-4 rounded-t-lg">
        <p className="text-neutral-grey-700 text-base font-semibold">
          {TRANSPORT.pickTypeProduct}
        </p>
      </div>
      <div className="py-4 h-[42vh] overflow-y-auto">
        {listTypes?.map((type) => {
          const { packageTypeId, name } = type;
          return (
            <div
              key={`product-type-${packageTypeId}`}
              className={`flex items-center py-1.5 gap-3 px-4 border-b border-b-neutral-grey-100 ${
                selectedType === packageTypeId ? "bg-secondary-600" : ""
              }`}
              onClick={() => handleSelectedType(type)}
            >
              <input
                type="radio"
                readOnly
                className="w-5 h-5 accent-secondary-300"
                checked={selectedType === packageTypeId}
              />
              <div className="flex-1">
                <p
                  className={`text-center ${
                    selectedType === packageTypeId
                      ? "text-secondary-300 font-bold"
                      : "text-neutral-700 font-medium"
                  } text-sm `}
                >
                  {name}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ModalPickType;
