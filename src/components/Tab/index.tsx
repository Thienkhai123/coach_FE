interface ITabsProps {
  list: { id: number; value: string }[];
  tab: number;
  // changeTab: (tabNumber: number) => void;
}

const STEP_STYLES = {
  wrapper: {
    default:
      "py-3 px-3  bg-inherit border-b-2 last:w-full last:cursor-text border-b-neutral-grey-200  ",
    active:
      "py-3 px-3 bg-secondary-200 duration-200 border-b-2 border-b-blue-300 ",
  },
  text: {
    default: "text-sm font-semibold text-neutral-grey-600",
    active: "text-sm font-bold duration-200 text-[#0867A5]",
  },
};

const Tabs = (props: ITabsProps) => {
  const { list, tab } = props;
  return (
    <div className="flex whitespace-nowrap cursor-text  border-b-[#AFB1B6] overflow-x-auto custom-scrollbar-none-border">
      {list?.map((stepObj, index) => {
        return (
          <div
            key={`step-${index}`}
            // onClick={() => {
            //   changeTab(stepObj.id);
            // }}
            className={
              stepObj?.id === tab
                ? STEP_STYLES.wrapper.active
                : STEP_STYLES.wrapper.default
            }
          >
            <p
              className={
                stepObj?.id === tab
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

export default Tabs;
