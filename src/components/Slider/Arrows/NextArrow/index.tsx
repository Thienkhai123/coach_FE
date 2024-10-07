interface INextArrow {
  nextRef?: any;
  className?: any;
  hasShadow?: any;
  action?: any;
  stylePrev?: any;
}

export const NextArrow = (props: INextArrow) => {
  const {
    nextRef = null,
    className = 'absolute z-50 -right-[50px] top-1/2 -translate-y-1/2',
    hasShadow = true,
    action = () => {},
    stylePrev = 'bg-white p-2',
  } = props;
  return (
    <div ref={nextRef} className={className}>
      <button
        aria-label='next-button'
        className={`rounded-full ${hasShadow && 'shadow-md'}   ${stylePrev}`}
        onClick={action}
      >
        <svg
          width='9'
          height='15'
          viewBox='0 0 9 15'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M1.3125 1.45654L7.46707 7.61111L1.2976 13.7806'
            stroke='white'
            strokeWidth='1.6'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </button>
    </div>
  );
};
