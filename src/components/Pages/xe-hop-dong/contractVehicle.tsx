import React from 'react';
import Button from '@/components/button';
import ArrowRightWhite from '@/components/icons/arrowRightWhite';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import Image from 'next/legacy/image';

const defaultData = {
  intro:
    'Sed iaculis sagittis vestibulum in nisl. Mauris turpis egestas odio nec lectus dapibus lectus tortor. Convallis sem scelerisque tincidunt sed eget malesuada lacus eu nulla. Et purus nibh elementum amet sit quisque sollicitudin. Id tellus magna sodales sed amet nunc purus et. Ut nunc est eget arcu. Id eget aliquet nunc erat viverra eget scelerisque viverra. Nulla id proin pellentesque nam.',
  content:
    'Lorem ipsum dolor sit amet consectetur. Mauris eget nibh neque purus mi. Bibendum risus laoreet phasellus ac cursus luctus malesuada venenatis. Sed turpis mattis urna malesuada ut maecenas tortor. Enim et tempus sit aliquet. Eget urna hendrerit amet sollicitudin risus amet. Facilisis bibendum commodo dui sed sapien vivamus id. Convallis in at massa tempus nunc. Purus convallis amet quis tempor tellus cursus mattis lectus elit. Orci dignissim morbi magna commodo tempus. Quam in aliquam vitae orci lacus sit pretium mus. Est in pharetra eu vel posuere urna purus. Ultrices pretium neque nisl nunc ut placerat urna nibh sagittis. Leo ut leo netus vestibulum sit scelerisque aenean leo. Augue elit maecenas porttitor fermentum nulla aliquet. Id quis in accumsan risus sem. Tempus mauris ornare tellus ut nisl libero. Blandit leo placerat sagittis sollicitudin vestibulum porta. Turpis fermentum lorem aliquam proin id a. Eu mauris odio velit magnis magna lobortis maecenas commodo. Felis tincidunt ultrices placerat habitasse pellentesque ac nulla eleifend. Ultricies cras euismod sed ultrices morbi sed proin ut. Sed justo aliquam id tincidunt sit vitae iaculis eget integer. Volutpat in sollicitudin tellus eget. Tempor nibh dolor scelerisque maecenas ornare id netus. Feugiat egestas viverra accumsan congue sed placerat enim placerat nec. Scelerisque tortor nec vulputate ac sed bibendum gravida tellus.',
  images: [
    {
      id: 1,
      src: '/images/tour_bus.png',
    },
    {
      id: 2,
      src: '/images/tour_car.png',
    },
    {
      id: 3,
      src: '/images/tour_event.png',
    },
    {
      id: 1,
      src: '/images/tour_bus.png',
    },
    {
      id: 2,
      src: '/images/tour_car.png',
    },
    {
      id: 3,
      src: '/images/tour_event.png',
    },
  ],
};
interface IContractVehicleProps {
  images?: IImage[];
  id: number;
  description: string;
  btnTitle: string;
  contractTitle: string;
  contentTitle: string;
  contentDes: string;
  handleBookVehicle: (arg: number) => void;
}

interface IImage {
  id: number;
  src: string;
}

const ContractVehicle = (props: IContractVehicleProps) => {
  const {
    id,
    images = defaultData.images,
    btnTitle,
    description,
    handleBookVehicle,
    contractTitle,
    contentTitle,
    contentDes,
  } = props;

  return (
    <div className='flex flex-col gap-4'>
      <div className='max-w-full'>
        <Swiper
          speed={1200}
          centeredSlides={true}
          loop={true}
          slidesPerView={'auto'}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            330: {
              slidesPerView: 1.15,
              slidesPerGroup: 1,
              spaceBetween: 12,
            },
          }}
          modules={[Autoplay]}
        >
          {images?.map((image: any, ind: number) => {
            const { src } = image;
            return (
              <SwiperSlide key={`booking-car-${ind}`}>
                <div className='sm:w-[320px] md:w-full h-[200px] rounded-lg relative'>
                  <Image
                    src={src}
                    alt=''
                    objectFit='cover'
                    className='rounded-lg'
                    layout='fill'
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      {/* <div className='bg-common w-full rounded-lg h-[175px]' /> */}
      <div className='px-4'>
        <div>
          <button
            onClick={() => handleBookVehicle(id)}
            type='submit'
            className='mx-auto w-full flex justify-center  gap-3 py-[10px]   hover:opacity-90 duration-100 disabled:opacity-60  my-auto bg-primary-500 rounded-full h-[44px]'
          >
            <div className='flex gap-3 '>
              <div className='text-white text-base font-semibold text-center'>
                {btnTitle}
              </div>
              <ArrowRightWhite />
            </div>
          </button>
        </div>
        <div className='mt-6'>
          <div className='w-fit  py-[3px] px-2 text-xs text-neutral-600 font-extrabold bg-[#DEF5E0] rounded-full'>
            {contractTitle}
          </div>
          <div className='mt-2 pb-4 border-b border-neutral-200'>
            <p
              className='text-black font-normal text-sm '
              style={{ wordBreak: 'break-word' }}
            >
              {description}
            </p>
          </div>
          <div className='mt-4 text-sm text-neutral-700 font-extrabold'>
            {contentTitle}
          </div>
          <div className='mt-2'>
            <p
              className='text-sm text-neutral-600 font-normal'
              style={{ wordBreak: 'break-word' }}
            >
              {contentDes}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractVehicle;
