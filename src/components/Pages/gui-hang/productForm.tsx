import DrawerBottom2 from "@/components/drawer-bottom2";
import { ArrowDownIcon } from "@/components/icons";
import UploadImageIcon from "@/components/icons/uploadImage";
import InputText from "@/components/input/text";
import useModal from "@/hook/useModal";
import { ITranslation } from "@/interfaces/ITranslation";
import Image from "next/legacy/image";
import React, { useState } from "react";
import ModalPickType from "./modalPickType";
import ModalPickWeight from "./modalPickWeight";
import ModalPickSize from "./modalPickSize";
import CancelImageIcon from "@/components/icons/cancelImg";
import {
  DataPackage,
  DataWeightPackage,
  DimensionProps,
} from "@/interfaces/httpRequest/IOrder";
import usePackages from "@/hook/transport/usePackages";

type ProductT = {
  id: number;
  name: string;
};

type WeightT = {
  id: number;
  name: string;
  value: number;
};

interface IProductFormProps {
  translation: ITranslation;
  errors: any;
  register: any;
  index: number;
  listWeight?: WeightT[];
  listSize?: ProductT[];
  types: DataPackage[];
  setValue: (arg1: any, arg2: any) => void;
  setError: (arg1: any, arg2: any) => void;
  handleAddTempFees: (arg: number) => void;
}

const ProductForm = (props: IProductFormProps) => {
  const {
    translation,
    errors,
    register,
    index,
    listWeight = [],
    listSize = [],
    types,
    setValue,
    setError,
    handleAddTempFees,
  } = props;
  const { TRANSPORT } = translation;
  const [listImage, setListImage] = useState<any>([]);
  const [openModalType, toggleModalType] = useModal();
  const [openModalWeight, toggleModalWeight] = useModal();
  const [openModalSize, toggleModalSize] = useModal();
  const [selectedType, setSelectedType] = useState<DataPackage>();
  const [selectedWeight, setSelectedWeight] =
    useState<DataWeightPackage | null>(null);
  const [selectedSize, setSelectedSize] = useState<DimensionProps | null>(null);
  const {
    packagesProps,
    handleGetWeights,
    handleGetDimensions,
    handleGetCost,
  } = usePackages();

  const handleUploadImage = (e: any) => {
    if (e.target?.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.addEventListener("load", () => {
        setListImage([...listImage, reader.result]);
      });
      setValue("pickupImageFile" + index, e.target.files[0]);
      e.currentTarget.value = null;
    }
  };

  const handleSelectedType = (type: DataPackage) => {
    if (type?.packageTypeId) {
      setSelectedType(type);
      setValue("type" + index, type.packageTypeId);
      setValue("typeName" + index, type.name);
      setError("type" + index, { message: "" });
      handleGetWeights({
        packageTypeId: type?.packageTypeId,
      });
      setValue("weight" + index, "");
      setValue("size" + index, "");
      setSelectedWeight(null);
      setSelectedSize(null);
      toggleModalType();
    }
  };

  const handleSelectedWeight = (type: DataWeightPackage) => {
    if (type?.packageWeightId) {
      setSelectedWeight(type);
      setValue("weight" + index, type.packageWeightId);
      setValue("weightName" + index, type.weightDisplay);

      setError("weight" + index, { message: "" });
      handleGetDimensions({
        packageTypeId: selectedType?.packageTypeId || 0,
        packageWeightId: type?.packageWeightId,
      });
      setValue("size" + index, "");
      setSelectedSize(null);
      toggleModalWeight();
    }
  };

  const handleSelectedSize = async (type: DimensionProps) => {
    if (type?.packageDimensionId) {
      setSelectedSize(type);
      setValue("size" + index, type.packageDimensionId);
      setValue("sizeName" + index, type.dimensionDisplay);
      setError("size" + index, { message: "" });
      const thisShipCost = await handleGetCost({
        packageTypeId: selectedType?.packageTypeId || 0,
        packageWeightId: selectedWeight?.packageWeightId || 0,
        packageDimentionId: type?.packageDimensionId || 0,
      });
      setValue("cost" + index, thisShipCost);
      handleAddTempFees(thisShipCost);
      toggleModalSize();
    }
  };

  const handleRemoveImage = () => {
    setListImage([]);
    setValue("pickupImageFile" + index, "");
  };

  return (
    <>
      <div className="flex flex-col gap-2 bg-white">
        <div className="flex flex-col gap-2 p-4 ">
          <div className="bg-semantic-green-light py-1 px-2 rounded-full w-fit mb-2 ">
            <p className="text-neutral-grey-600 font-extrabold text-xs">
              {TRANSPORT.product2} {index}
            </p>
          </div>

          <div>
            <InputText
              name={`name${index}`}
              register={register}
              errors={errors}
              required
              title={TRANSPORT.fillContent}
              placeholder={TRANSPORT.fillContent}
            />
          </div>

          <div>
            <p className="text-sm font-semibold text-neutral-grey-700 mb-1">
              {TRANSPORT.typeProduct}{" "}
              <span className="text-semantic-red">*</span>
            </p>

            <div
              className="rounded-lg p-3 border border-neutral-grey-300 flex gap-2 justify-between items-center"
              onClick={toggleModalType}
            >
              <p className="text-neutral-grey-500 text-sm font-medium">
                {selectedType?.name || TRANSPORT.typeProduct}
              </p>
              <div>
                <ArrowDownIcon />
              </div>
            </div>
            {errors["type" + index]?.message && (
              <p className="sm:text-sm text-xs leading-5 text-red-500">
                {errors["type" + index]?.message}
              </p>
            )}
          </div>

          <div>
            <p className="text-sm font-semibold text-neutral-grey-700 mb-1">
              {TRANSPORT.weightText}{" "}
              <span className="text-semantic-red">*</span>
            </p>

            <div
              className="rounded-lg p-3 border border-neutral-grey-300 flex gap-2 justify-between items-center"
              onClick={toggleModalWeight}
            >
              <p className="text-neutral-grey-500 text-sm font-medium">
                {selectedWeight?.weightDisplay || TRANSPORT.weightText}
              </p>
              <div>
                <ArrowDownIcon />
              </div>
            </div>
            {errors["weight" + index]?.message && (
              <p className="sm:text-sm text-xs leading-5 text-red-500">
                {errors["weight" + index]?.message}
              </p>
            )}
          </div>

          <div>
            <p className="text-sm font-semibold text-neutral-grey-700 mb-1">
              {TRANSPORT.size}{" "}
              <span className="text-xs">{`(${TRANSPORT.sizeUnit})`}</span>
            </p>

            <div
              className="rounded-lg p-3 border border-neutral-grey-300 flex gap-2 justify-between items-center"
              onClick={toggleModalSize}
            >
              <p className="text-neutral-grey-500 text-sm font-medium">
                {selectedSize?.dimensionDisplay || TRANSPORT.size}
              </p>
              <div>
                <ArrowDownIcon />
              </div>
            </div>
            {errors["size" + index]?.message && (
              <p className="sm:text-sm text-xs leading-5 text-red-500">
                {errors["size" + index]?.message}
              </p>
            )}
          </div>
        </div>

        <div className="px-4 py-2">
          <p className="text-neutral-grey-700 font-bold text-sm mb-2">
            {TRANSPORT.imageProduct}
          </p>

          <div className="flex flex-wrap gap-2">
            <div className="w-[100px] h-[70px]">
              <label>
                <UploadImageIcon />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  disabled={listImage?.length > 0}
                  onChange={(e) => handleUploadImage(e)}
                />
              </label>
            </div>

            {listImage?.map((img: any, ind: number) => (
              <div
                key={`img-${ind}`}
                className="w-[100px] h-[70px] rounded-lg overflow-hidden relative"
              >
                <Image
                  alt=""
                  width={100}
                  height={70}
                  src={img}
                  objectFit="cover"
                />
                <div
                  className="absolute right-1 top-1"
                  onClick={handleRemoveImage}
                >
                  <CancelImageIcon />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <DrawerBottom2
        open={openModalType}
        toggleDrawer={toggleModalType}
        wrapChildStyle=""
        animationName="animation-open-drawer-bottom"
        closeStyle="animation-off-drawer-bottom"
      >
        <ModalPickType
          translation={translation}
          listTypes={types}
          selectedType={selectedType?.packageTypeId || 0}
          handleSelectedType={handleSelectedType}
        />
      </DrawerBottom2>

      <DrawerBottom2
        open={openModalWeight}
        toggleDrawer={toggleModalWeight}
        wrapChildStyle=""
        animationName="animation-open-drawer-bottom"
        closeStyle="animation-off-drawer-bottom"
      >
        <ModalPickWeight
          translation={translation}
          listWeight={packagesProps?.weights || []}
          selectedType={selectedWeight?.packageWeightId || 0}
          handleSelectedType={handleSelectedWeight}
        />
      </DrawerBottom2>

      <DrawerBottom2
        open={openModalSize}
        toggleDrawer={toggleModalSize}
        wrapChildStyle=""
        animationName="animation-open-drawer-bottom"
        closeStyle="animation-off-drawer-bottom"
      >
        <ModalPickSize
          translation={translation}
          listDimensions={packagesProps?.dimensions || []}
          selectedType={selectedSize?.packageDimensionId || 0}
          handleSelectedType={handleSelectedSize}
        />
      </DrawerBottom2>
    </>
  );
};

export default ProductForm;
