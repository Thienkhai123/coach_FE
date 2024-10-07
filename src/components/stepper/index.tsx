interface IStepperProps {
  list: { id: number; value: string }[];
  step: number;
}

const STEP_STYLES = {
  wrapper: {
    default: "py-3 px-4 bg-white border-b-2 border-b-[#AFB1B6]",
    active: "py-3 px-4 bg-secondary-600 border-b-2 border-b-secondary-300",
  },
  text: {
    default: "text-xs font-medium text-neutral-grey-600",
    active: "text-xs font-bold text-[#0867A5]",
  },
};

const Stepper = (props: IStepperProps) => {
  const { list, step } = props;
  return (
    <div
      id="stepper-mobile"
      className="flex whitespace-nowrap overflow-x-auto custom-scrollbar-none-border"
    >
      {list?.map((stepObj, index) => {
        return (
          <div
            key={`step-${index}`}
            id={`stepper-${index}`}
            className={
              stepObj?.id === step
                ? STEP_STYLES.wrapper.active
                : STEP_STYLES.wrapper.default
            }
          >
            <p
              className={
                stepObj?.id === step
                  ? STEP_STYLES.text.active
                  : STEP_STYLES.text.default
              }
            >
              {stepObj?.value}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
