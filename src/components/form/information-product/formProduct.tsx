import {
  getPackageCost,
  getPackageDemensions,
  getPackageWeights,
} from '@/apis/order';
import CameraIcon from '@/components/icons/camera';
import CancelImageIcon from '@/components/icons/cancelImg';
import CheckIcon from '@/components/icons/check';
import SelectOptionCity from '@/components/select-option-city';
import useTrans from '@/hook/useTrans';
import {
  CostPackages,
  DemensionOutSide,
  WeightOutside,
} from '@/interfaces/httpRequest/IOrder';
import {
  ICreateOrderTranslate,
  ISpecialProductList,
} from '@/interfaces/ICreateOrderTranslate';
import { ITranslation } from '@/interfaces/ITranslation';
import { isEmpty } from 'lodash';
import Image from 'next/legacy/image';
import React, { useEffect, useState, useTransition } from 'react';

interface IFormProduct {
  CREATEORDER: ICreateOrderTranslate;
  ind: number;
  register?: any;
  errors?: any;
  handleAddImage: (data: number, e: any) => void;
  handleRemoveImage: (ind: number, indImg: number, status: boolean) => void;
  packageTypes: any;
  watch: any;
  setCostPackages: any;
  setPackageWeight: any;
  setPackageSize: any;
  handleSelectWeight: (ind: any, weightObj: any) => void;
  handleSelectDemensions: (ind: any, demensionObj: any) => void;
  setValue: any;
  costPackages: any;
}

const FAKE_LIST_WEIGHT = [
  { id: 0, value: 'Chọn khối lượng' },
  { id: 1, value: '14' },
  { id: 2, value: '6' },
  { id: 3, value: '5' },
];

const FAKE_LIST_SIZE = [
  { id: 0, value: 'Chọn kích thước' },
  { id: 1, value: '210 x 25 x 20' },
  { id: 2, value: '33 x 30 x 25' },
  { id: 3, value: '35 x 32 x 22' },
];

const FAKE_LIST_TYPE_PACKAGES = [
  { id: 0, value: 'Chọn loại hàng hóa' },
  { id: 1, value: 'Hàng lạnh' },
  { id: 2, value: 'Giá trị cao' },
  { id: 3, value: 'Dễ vỡ' },
  { id: 4, value: 'Nguyên khối' },
  { id: 5, value: 'Chất lỏng' },
  { id: 6, value: 'Từ tính, Pin' },
];

const FormProduct = (props: IFormProduct) => {
  const {
    CREATEORDER,
    ind,
    register,
    errors,
    handleAddImage,
    handleRemoveImage,
    packageTypes = FAKE_LIST_TYPE_PACKAGES,
    watch,
    setCostPackages,
    costPackages,
    setPackageWeight,
    setPackageSize,
    handleSelectWeight,
    handleSelectDemensions,
    setValue,
  } = props;

  const [image, setImage] = useState<any>(null);
  const [weightes, setWeightes] = useState<any>([]);
  const [demension, setDemensions] = useState<any>([]);
  const translation: ITranslation = useTrans();

  const handleChooseImg = (ind: number, event: any) => {
    const file = event.target.files[0];
    if (file !== undefined) {
      const imgURL = URL?.createObjectURL(file);
      setImage(imgURL);
      handleAddImage(ind, event);
    } else {
      setImage(null);
    }
    event.target.value = '';
  };

  const handleRemoveImg = (ind: number) => {
    setImage(null);
    handleRemoveImage(ind, 0, true);
  };

  const fetchWeights = async (type?: string) => {
    const packageTypeId = packageTypes?.find((elm: any) => elm?.value === type);
    const payload = { packageTypeId: packageTypeId?.id };
    const res: WeightOutside = await getPackageWeights(payload);
    if (res.data?.length > 0) {
      const weightArray: any = [];
      res?.data?.forEach((elm: any, index: number) => {
        const weight = {
          id: elm.packageWeightId,
          value: elm.weightDisplay,
        };
        weightArray?.push(weight);
      });
      setWeightes([
        { id: 0, value: translation.TRANSPORT.pickWeightProduct },
        ...weightArray,
      ]);
    }
  };

  const fetchDemensions = async (type?: string, weightString?: string) => {
    const packageTypeId = packageTypes?.find((elm: any) => elm?.value === type);
    const weightId = weightes?.find((elm: any) => elm?.value === weightString);
    handleSelectWeight(ind, weightId);
    const payload = {
      packageTypeId: packageTypeId?.id,
      packageWeightId: weightId?.id,
      page: 1,
    };
    const res: DemensionOutSide = await getPackageDemensions(payload);
    if (res.data?.length > 0) {
      const demensionArray: any = [];
      res?.data?.forEach((elm: any, index: number) => {
        const demension = {
          id: elm.packageDimensionId,
          value: elm.dimensionDisplay,
        };
        demensionArray?.push(demension);
      });
      setDemensions([
        { id: 0, value: translation.TRANSPORT.pickSizeProduct },
        ...demensionArray,
      ]);
    }
  };

  const fetchCostPackages = async (
    type?: string,
    weightString?: string,
    demensionString?: string,
  ) => {
    const packageTypeId = packageTypes?.find((elm: any) => elm?.value === type);
    const weightId = weightes?.find((elm: any) => elm?.value === weightString);
    const demesionId = demension?.find(
      (elm: any) => elm?.value === demensionString,
    );
    handleSelectDemensions(ind, demesionId);
    const payload = {
      packageTypeId: packageTypeId?.id,
      packageWeightId: weightId?.id,
      packageDimentionId: demesionId?.id,
    };
    const res: CostPackages = await getPackageCost(payload);
    if (res.isSuccess) {
      if (costPackages.length === 0) {
        setCostPackages([res.data]);
      } else {
        const costPackagesOld = [...costPackages];
        costPackagesOld[ind] = res.data;
        setCostPackages(costPackagesOld);
      }
    }
  };

  useEffect(() => {
    const types = watch(`product[${ind}].specialProductList`);
    setWeightes([{ id: 0, value: translation.TRANSPORT.pickWeightProduct }]);
    setDemensions([{ id: 0, value: translation.TRANSPORT.pickSizeProduct }]);
    setValue(`product[${ind}].weightProduct`, '');
    setValue(`product[${ind}].sizeProduct`, '');
    if (costPackages.length === 0) {
      setCostPackages([]);
    } else {
      setCostPackages([...costPackages]);
    }
    if (types.length > 0) {
      fetchWeights(types);
    }
  }, [watch(`product[${ind}].specialProductList`), setValue]);

  useEffect(() => {
    const types = watch(`product[${ind}].specialProductList`);
    const weight = watch(`product[${ind}].weightProduct`);
    setDemensions([{ id: 0, value: translation.TRANSPORT.pickSizeProduct }]);
    setValue(`product[${ind}].sizeProduct`, '');
    if (costPackages.length === 0) {
      setCostPackages([]);
    } else {
      setCostPackages([...costPackages]);
    }
    if (weight.length > 0) fetchDemensions(types, weight);
  }, [
    watch(`product[${ind}].weightProduct`),
    watch(`product[${ind}].specialProductList`),
    setValue,
  ]);

  useEffect(() => {
    const types = watch(`product[${ind}].specialProductList`);
    const weight = watch(`product[${ind}].weightProduct`);
    const demension = watch(`product[${ind}].sizeProduct`);
    if (demension?.length > 0) fetchCostPackages(types, weight, demension);
  }, [watch(`product[${ind}].sizeProduct`)]);

  return (
    <>
      <div className='px-2 py-1 w-fit mb-2 rounded-full uppercase bg-semantic-green-light text-xs font-extrabold text-neutral-600'>
        {CREATEORDER.detailProductSendReceive.package} {ind + 1}
      </div>
      <div className=' flex flex-col gap-3'>
        <div>
          <p className=' text-sm font-semibold text-neutral-grey-700'>
            {CREATEORDER.detailProductSendReceive.contentProduct}{' '}
            <span className='text-red-600'>*</span>
          </p>
          <div className='mt-1'>
            <input
              {...register(`product[${ind}].contentProduct`)}
              autoFocus
              className='rounded-lg border border-neutral-grey-300 py-2 px-3 outline-none text-sm font-medium w-full'
              placeholder={
                CREATEORDER.detailProductSendReceive.placeholderContent
              }
            />
            {errors?.product?.[ind]?.contentProduct && (
              <p className='text-[14px] leading-5 text-red-500'>
                {errors?.product?.[ind]?.contentProduct?.message}
              </p>
            )}
          </div>
        </div>
        <div>
          <p className=' text-sm font-semibold text-neutral-grey-700'>
            {CREATEORDER.detailProductSendReceive.typeProduct}{' '}
            <span className='text-red-600'>*</span>
          </p>
          <div className='mt-1 '>
            <SelectOptionCity
              register={register}
              FAKE_LIST_SEARCH_OPTION={packageTypes}
              name={`product[${ind}].specialProductList`}
              activeIcon={false}
            />
            {errors?.product?.[ind]?.specialProductList && (
              <p className='text-[14px] leading-5 text-red-500'>
                {errors?.product?.[ind]?.specialProductList?.message}
              </p>
            )}
          </div>
        </div>
        <div className='grid grid-cols-2 gap-3'>
          <div>
            <p className=' text-sm font-semibold text-neutral-grey-700'>
              {CREATEORDER.detailProductSendReceive.weight}{' '}
              <span className='text-red-600'>*</span>
            </p>
            <div className='mt-1'>
              <SelectOptionCity
                register={register}
                FAKE_LIST_SEARCH_OPTION={weightes}
                name={`product[${ind}].weightProduct`}
                activeIcon={false}
                styleStatus='noArrow'
                selectSettingType={1}
                placeholderUnit='Kg'
              />
              {errors?.product?.[ind]?.weightProduct && (
                <p className='text-[14px] leading-5 text-red-500'>
                  {errors?.product?.[ind]?.weightProduct.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <p className=' text-sm font-semibold text-neutral-grey-700'>
              {CREATEORDER.detailProductSendReceive.size}{' '}
              <span className='text-neutral-500 text-xs'>
                {CREATEORDER.detailProductSendReceive.descriptionSize}
              </span>
              <span className='text-red-600'>*</span>
            </p>
            <div className='mt-1'>
              <SelectOptionCity
                register={register}
                FAKE_LIST_SEARCH_OPTION={demension}
                name={`product[${ind}].sizeProduct`}
                activeIcon={false}
                styleStatus='noArrow'
                selectSettingType={1}
                placeholderUnit={
                  CREATEORDER.detailProductSendReceive.placeholderUnitSize
                }
              />
              {errors?.product?.[ind]?.sizeProduct && (
                <p className='text-[14px] leading-5 text-red-500'>
                  {errors?.product?.[ind]?.sizeProduct.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div>
          <p className=' text-sm font-semibold text-neutral-grey-700'>
            {CREATEORDER.detailProductSendReceive.imageProduct}{' '}
          </p>
          <div className='mt-2 flex gap-2'>
            <div>
              <input
                onChange={(e) => {
                  handleChooseImg(ind, e);
                }}
                id={`imageProduct_${ind}`}
                accept='image/*'
                type='file'
                className='hidden'
                disabled={!isEmpty(image)}
              />
              <label
                htmlFor={`imageProduct_${ind}`}
                className={`  flex justify-center items-center w-[100px] h-[70px] rounded-lg border border-neutral-300 ${
                  !isEmpty(image) ? 'bg-neutral-100' : 'cursor-pointer'
                }`}
              >
                <CameraIcon />
              </label>
            </div>
            {/* <ImageProductList/> */}
            {!isEmpty(image) && (
              <div key={ind} className='relative'>
                <div className='w-[100px] h-[70px] rounded-lg relative'>
                  <Image
                    src={image}
                    alt={`imageProduct_${ind}`}
                    layout='fill'
                    objectFit='cover'
                    className='rounded-lg border border-neutral-300'
                  />
                </div>
                <div
                  className='absolute right-1 top-1 cursor-pointer'
                  onClick={() => handleRemoveImg(ind)}
                >
                  <CancelImageIcon />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FormProduct;
