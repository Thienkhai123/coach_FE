import { DataWeightPackage } from "@/interfaces/httpRequest/IOrder";
import { ITranslation } from "@/interfaces/ITranslation";
import React from "react";

interface IModalPickTypeProps {
  translation: ITranslation;
  listWeight: DataWeightPackage[];
  selectedType: number;
  handleSelectedType: (arg: DataWeightPackage) => void;
}

const ModalPickWeight = (props: IModalPickTypeProps) => {
  const { translation, listWeight, selectedType, handleSelectedType } = props;
  const { TRANSPORT } = translation;

  return (
    <div>
      <div className="bg-neutral-grey-100 py-3 px-4 rounded-t-lg">
        <p className="text-neutral-grey-700 text-base font-semibold">
          {TRANSPORT.pickWeightProduct}
        </p>
      </div>
      <div className="py-4 h-[42vh] overflow-y-auto">
        {listWeight?.map((weightItem) => {
          const { packageWeightId, weightDisplay } = weightItem;
          return (
            <div
              key={`product-type-${packageWeightId}`}
              className={`flex items-center py-1.5 gap-3 px-4 border-b border-b-neutral-grey-100 ${
                selectedType === packageWeightId ? "bg-secondary-600" : ""
              }`}
              onClick={() => handleSelectedType(weightItem)}
            >
              <input
                type="radio"
                readOnly
                className="w-5 h-5 accent-secondary-300"
                checked={selectedType === packageWeightId}
              />
              <div className="flex-1">
                <p
                  className={`text-center ${
                    selectedType === packageWeightId
                      ? "text-secondary-300 font-bold"
                      : "text-neutral-700 font-medium"
                  } text-sm `}
                >
                  {weightDisplay}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ModalPickWeight;
