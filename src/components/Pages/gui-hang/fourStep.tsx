import { ITranslation } from "@/interfaces/ITranslation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "@/components/button";
import ProductForm from "./productForm";
import { PackageOutside } from "@/interfaces/httpRequest/IOrder";

type ProductionT = {
  content: string;
  pickupImageFile: string;
  packageTypeId: number;
  packageWeightId: number;
  packageDimensionId: number;
  cost: number;
  typeName: string;
  weightName: string;
  sizeName: string;
};

interface IFourStepProps {
  translation: ITranslation;
  typePack?: PackageOutside;
  changeNextStep: () => void;
  handleUpdateProductions: (arg: ProductionT[]) => void;
}

type ProductFormT = {
  [key: number]: {
    image?: File;
  };
};

const FAKE_WEIGHTS = [
  {
    id: 1,
    name: "15kg",
    value: 15,
  },
  {
    id: 2,
    name: "30kg",
    value: 30,
  },
];

const FAKE_SIZES = [
  {
    id: 1,
    name: "15x20x25",
  },
  {
    id: 2,
    name: "20x25x30",
  },
];

const FourStep = (props: IFourStepProps) => {
  const { translation, typePack, changeNextStep, handleUpdateProductions } =
    props;
  const { BOOKING, TRANSPORT, ERROR } = translation;

  const [tempFee, setTempFee] = useState(0);
  const [products, setProducts] = useState<ProductFormT>({
    1: {},
  });
  const [validations, setValidations] = useState({
    name1: yup.string().required(ERROR.errorRequired),
    type1: yup.string().required(ERROR.errorRequired),
    weight1: yup.string().required(ERROR.errorRequired),
    size1: yup.string().required(ERROR.errorRequired),
  });

  const schema = yup.object().shape({
    ...validations,
  });

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {},
  });

  const handleAddTempFees = (val: number) => {
    if (val) {
      setTempFee(tempFee + val);
    }
  };

  const handleAddProduct = () => {
    let tmp = { ...products };
    let tmpValidation: any = { ...validations };
    const newIndex = Object.keys(products)?.length + 1;
    tmp[newIndex] = {};
    tmpValidation["name" + newIndex] = yup
      .string()
      .required(ERROR.errorRequired);
    tmpValidation["type" + newIndex] = yup
      .string()
      .required(ERROR.errorRequired);
    tmpValidation["weight" + newIndex] = yup
      .string()
      .required(ERROR.errorRequired);
    tmpValidation["size" + newIndex] = yup
      .string()
      .required(ERROR.errorRequired);
    setProducts(tmp);
    setValidations(tmpValidation);
  };

  const onSubmit = async (data: any) => {
    const tmpProds: ProductionT[] = [];
    Object.keys(products)?.forEach((elKey) => {
      tmpProds.push({
        content: data["name" + elKey],
        pickupImageFile: data["pickupImageFile" + elKey],
        packageTypeId: data["type" + elKey],
        packageDimensionId: data["size" + elKey],
        packageWeightId: data["weight" + elKey],
        cost: data["cost" + elKey],
        typeName: data["typeName" + elKey],
        weightName: data["weightName" + elKey],
        sizeName: data["sizeName" + elKey],
      });
    });
    handleUpdateProductions(tmpProds);
    changeNextStep();
  };

  return (
    <div className="relative pb-24">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        {Object?.keys(products)?.map((productKey, ind) => {
          return (
            <ProductForm
              key={`product-${ind}`}
              errors={errors}
              register={register}
              translation={translation}
              index={ind + 1}
              listWeight={FAKE_WEIGHTS}
              listSize={FAKE_SIZES}
              types={typePack?.data || []}
              setValue={setValue}
              setError={setError}
              handleAddTempFees={handleAddTempFees}
            />
          );
        })}

        <div className="bg-white">
          <div className="p-4 flex gap-4 justify-between">
            <p className="text-[#61646B] font-medium text-sm">
              {TRANSPORT.tempFee}
            </p>
            <p className="text-[#313131] font-medium text-base">
              {tempFee?.toLocaleString()}đ
            </p>
          </div>
        </div>
        <div className="p-4 bg-white fixed z-0 bottom-0 w-full drop-shadow-xl border">
          <div className="grid grid-cols-2 gap-1">
            <Button
              btnColor="bg-neutral-grey-100"
              color="text-black"
              borderColor="border-transparent"
              actionType="button"
              onClick={handleAddProduct}
            >
              {TRANSPORT.addProduct2}
            </Button>
            <Button actionType="submit">{BOOKING.continue}</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FourStep;
