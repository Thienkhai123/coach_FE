import React, { useRef } from 'react';
import { Swiper } from 'swiper/react';
import PropTypes from 'prop-types';
import { Grid, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/grid';
import { NextArrow, PreviousArrow } from './Arrows';

interface ISlider {
  children?: any;
  loop?: any;
  breakpoints?: any;
  spaceBetween?: any;
  hasShadow?: any;
  initialIndex?: any;
  hidePrev?: any;
  hideNext?: any;
  arrowStyle?: any;
  rewind?: any;
  handleSlideChange?: any;
  maxBackfaceHiddenSlides?: any;
  classNameLeft?: any;
  classNameRight?: any;
  stylePrev?: any;
  stroke?: any;
  classNameSwiper?: any;
}

export const Slider = (props: ISlider) => {
  const {
    children,
    loop = false,
    breakpoints = {
      330: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        grid: { rows: 1, fill: 'row' },
      },
      1100: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        grid: { rows: 2, fill: 'row' },
      },
      1280: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        grid: { rows: 2, fill: 'row' },
      },
    },
    spaceBetween = 20,
    hasShadow = true,
    initialIndex = null,
    hidePrev = false,
    hideNext = false,
    arrowStyle = 'hidden xl:block',
    rewind = true,
    handleSlideChange,
    maxBackfaceHiddenSlides = 0,
    classNameLeft = 'absolute z-50 -left-[50px] top-1/2 -translate-y-1/2',
    classNameRight = 'absolute z-50 -right-[50px] top-1/2 -translate-y-1/2',
    stylePrev = 'bg-white p-2',
    classNameSwiper = 'slide-rounded',
  } = props;

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className='relative'>
      <div className={arrowStyle}>
        {!hidePrev && (
          <PreviousArrow
            className={classNameLeft}
            prevRef={prevRef}
            hasShadow={hasShadow}
            stylePrev={stylePrev}
          />
        )}
        {!hideNext && (
          <NextArrow
            className={classNameRight}
            nextRef={nextRef}
            hasShadow={hasShadow}
            stylePrev={stylePrev}
          />
        )}
      </div>
      <Swiper
        // key={initialIndex}
        className={classNameSwiper}
        slidesPerView='auto'
        spaceBetween={spaceBetween}
        loop={loop}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(Swiper) => {
          if (typeof Swiper.params.navigation !== 'boolean') {
            const navigation = Swiper.params.navigation;
            if (navigation) {
              navigation.prevEl = prevRef?.current;
              navigation.nextEl = nextRef?.current;
            }
          }
        }}
        initialSlide={initialIndex?.toString()}
        // observer={true}
        breakpoints={breakpoints}
        modules={[Grid, Navigation]}
        updateOnWindowResize={true}
        longSwipesRatio={0.3}
        longSwipesMs={50}
        shortSwipes={false}
        rewind={rewind}
        maxBackfaceHiddenSlides={maxBackfaceHiddenSlides}
        onSlideChange={handleSlideChange}
      >
        {children}
      </Swiper>
    </div>
  );
};
