import React, { FC } from 'react';
import { ICreateOrderTranslate } from '@/interfaces/ICreateOrderTranslate';
import AddIcon from '@/components/icons/add';
import FormProduct from './formProduct';

interface IInformationProductForm {
  CREATEORDER: ICreateOrderTranslate;
  register?: any;
  errors?: any;
  handleAddProduct: (status: boolean) => void;
  validateForm: any;
  control: any;
  handleAddImage: (data: number, e: any) => void;
  handleRemoveImage: (ind: number, indImg: number, status: boolean) => void;
  imageList: any;
  checkListProduct?: any;
  packageTypes?: any;
  watch: any;
  packageWeight?: any;
  packageSize?: any;
  setCostPackages: any;
  handleSelectWeight: (ind: any, weightObj: any) => void;
  handleSelectDemensions: (ind: any, demensionObj: any) => void;
  setValue: any;
  costPackages: any;
}

const InformationProductForm: FC<IInformationProductForm> = (props) => {
  const {
    CREATEORDER,
    register,
    errors,
    handleAddProduct,
    validateForm,
    handleAddImage,
    handleRemoveImage,
    checkListProduct = true,
    packageTypes,
    watch,
    packageWeight,
    packageSize,
    setCostPackages,
    handleSelectWeight,
    handleSelectDemensions,
    costPackages,
    setValue,
  } = props;

  return (
    <div className='bg-white p-6 rounded-xl'>
      <div className='font-bold text-base text-neutral-grey-700 '>
        {CREATEORDER.detailProductSendReceive.detailProduct}
      </div>
      <div className='mt-4'>
        {validateForm?.map((elm: any, ind: number) => {
          return (
            <div
              key={ind}
              className='first:border-t-0 border-t border-common pb-4 first:pt-0 pt-4'
            >
              <FormProduct
                CREATEORDER={CREATEORDER}
                register={register}
                errors={errors}
                ind={ind}
                handleAddImage={handleAddImage}
                handleRemoveImage={handleRemoveImage}
                packageTypes={packageTypes}
                setPackageWeight={packageWeight}
                setPackageSize={packageSize}
                watch={watch}
                setCostPackages={setCostPackages}
                handleSelectWeight={handleSelectWeight}
                handleSelectDemensions={handleSelectDemensions}
                setValue={setValue}
                costPackages={costPackages}
              />
            </div>
          );
        })}
        <div className='mt-4'>
          <button
            disabled={!checkListProduct}
            type='button'
            onClick={() => {
              handleAddProduct(true);
            }}
            className={`flex justify-center gap-3 text-base font-semibold items-center rounded-full py-[10px] bg-neutral-100 w-full ${
              checkListProduct ? '' : ' opacity-50 bg-neutral-300'
            }`}
          >
            <AddIcon /> {CREATEORDER.button.addProduct}{' '}
            {validateForm.length + 1}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InformationProductForm;
