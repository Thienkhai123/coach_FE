import ArrowLeftIcon from '@/components/icons/arrowLeft';
interface INavbarActionProps {
  title: string;
  ActionElement: any;
  subTitle?: string;
  handleClick?: () => void;
}

const NavbarAction = ({
  title,
  subTitle = '',
  ActionElement,
  handleClick = () => {},
}: INavbarActionProps) => {
  return (
    <div
      className='flex gap-2 p-4 items-center justify-between'
      style={{
        background: 'linear-gradient(90deg, #DF5030 0%, #BE3C2A 100%)',
      }}
    >
      <div className='flex gap-2 items-center'>
        <div onClick={handleClick}>
          <ArrowLeftIcon stroke='#fff' />
        </div>
        <div>
          <p className='text-white font-semibold text-base'>{title}</p>
          {subTitle && (
            <p className='text-[#61646B] font-normal text-xs'>{subTitle}</p>
          )}
        </div>
      </div>
      <div>
        <ActionElement />
      </div>
    </div>
  );
};

export default NavbarAction;
