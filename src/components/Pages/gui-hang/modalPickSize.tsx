import { DimensionProps } from "@/interfaces/httpRequest/IOrder";
import { ITranslation } from "@/interfaces/ITranslation";
import React from "react";

interface IModalPickTypeProps {
  translation: ITranslation;
  listDimensions?: DimensionProps[];
  selectedType: number;
  handleSelectedType: (arg: DimensionProps) => void;
}

const ModalPickSize = (props: IModalPickTypeProps) => {
  const { translation, listDimensions, selectedType, handleSelectedType } =
    props;
  const { TRANSPORT } = translation;

  return (
    <div>
      <div className="bg-neutral-grey-100 py-3 px-4 rounded-t-lg">
        <p className="text-neutral-grey-700 text-base font-semibold">
          {TRANSPORT.pickSizeProduct}
        </p>
      </div>
      <div className="py-4 h-[42vh] overflow-y-auto">
        {listDimensions?.map((itemDimension) => {
          const { packageDimensionId, dimensionDisplay } = itemDimension;
          return (
            <div
              key={`product-type-${packageDimensionId}`}
              className={`flex items-center py-1.5 gap-3 px-4 border-b border-b-neutral-grey-100 ${
                selectedType === packageDimensionId ? "bg-secondary-600" : ""
              }`}
              onClick={() => handleSelectedType(itemDimension)}
            >
              <input
                type="radio"
                readOnly
                className="w-5 h-5 accent-secondary-300"
                checked={selectedType === packageDimensionId}
              />
              <div className="flex-1">
                <p
                  className={`text-center ${
                    selectedType === packageDimensionId
                      ? "text-secondary-300 font-bold"
                      : "text-neutral-700 font-medium"
                  } text-sm `}
                >
                  {dimensionDisplay}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ModalPickSize;
