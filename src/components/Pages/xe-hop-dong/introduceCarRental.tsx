import { IContractVehicleTranslate } from '@/interfaces/IContractVehicleTranslate';
import Image from 'next/legacy/image';
import React from 'react';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

interface IIntroduceCarRental {
  translation: IContractVehicleTranslate;
  intro?: string;
  content?: string;
  images?: any[];
}

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

const IntroduceCarRental = (props: IIntroduceCarRental) => {
  const {
    translation,
    intro = defaultData.intro,
    content = defaultData.content,
    images = defaultData.images,
  } = props;
  return (
    <div>
      <div className='max-w-[1120px]'>
        <Swiper
          speed={1200}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            1100: {
              slidesPerView: 2.6,
              slidesPerGroup: 1,
              spaceBetween: 16,
            },
          }}
          modules={[Autoplay]}
        >
          {images?.map((image: any, ind) => {
            const { src } = image;
            return (
              <SwiperSlide key={`booking-car-${ind}`}>
                <div className='w-full h-[200px] rounded-lg relative'>
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
      <div className='w-[640px] mx-auto mt-10'>
        <div className='w-fit py-[3.5px] px-3 text-sm text-neutral-600 font-extrabold bg-[#DEF5E0] rounded-full uppercase'>
          {translation.contractBooking}
        </div>
        <div className='mt-2 pb-4 border-b border-neutral-200'>
          <p
            className='text-sm text-neutral-600 font-normal'
            style={{ wordBreak: 'break-word' }}
          >
            {intro}
          </p>
        </div>
        <div className='mt-4 text-base text-neutral-700 font-bold'>
          {translation.contentBooking}
        </div>
        <div className='mt-2 pb-4 border-b border-neutral-200'>
          <p
            className='text-sm text-neutral-600 font-normal'
            style={{ wordBreak: 'break-word' }}
          >
            {content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default IntroduceCarRental;
