import PropTypes from 'prop-types';

interface IPreviousArrow {
  nextRef?: any;
  className?: any;
  hasShadow?: any;
  action?: any;
  stylePrev?: any;
}

export const PreviousArrow = (props: any) => {
  const {
    prevRef = null,
    className = 'absolute z-50 -left-[50px] top-1/2 -translate-y-1/2',
    hasShadow = true,
    action = () => {},
    stylePrev = 'bg-white p-2',
  } = props;
  return (
    <div ref={prevRef} className={className}>
      <button
        aria-label='prev-button'
        className={`rounded-full ${hasShadow && 'shadow-md'}  ${stylePrev}`}
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
            d='M7.35938 13.7808L1.2048 7.62619L7.37428 1.45671'
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
