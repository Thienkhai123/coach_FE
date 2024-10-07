import React from 'react';
import CancelImageIcon from '../icons/cancelImg';
// import Image from 'next/legacy/image';
const Image = React.lazy(() => import('next/legacy/image'));
interface ImageProductList {
  ind: number;
  imageList: any;
  handleRemoveImage: (ind: number, indImg: number, status: boolean) => void;
}

const ImageProductList = (props: ImageProductList) => {
  const { imageList, handleRemoveImage, ind } = props;
  return (
    <div className='grid grid-cols-5  gap-2  '>
      {imageList?.length > 0 &&
        imageList?.[ind]?.map((elm: any, indImg: number) => {
          let srcImg = URL?.createObjectURL(elm) || '';
          return (
            <div key={ind} className='relative'>
              <Image
                src={srcImg}
                alt={`imageProduct_${ind}_${indImg}`}
                width={100}
                height={70}
                objectFit='cover'
                className='rounded-lg border border-neutral-300'
              />{' '}
              <div
                className='absolute right-1 top-1 cursor-pointer'
                onClick={() => handleRemoveImage(ind, indImg, true)}
              >
                <CancelImageIcon />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default React.memo(ImageProductList);
