import { PlacesType, Tooltip } from 'react-tooltip';

interface TooltipProps {
  children: React.ReactNode;
  anchorSelect: string;
  placement?: PlacesType;
}

const ToolTip: React.FC<TooltipProps> = ({
  children,
  anchorSelect,
  placement = 'top',
}) => {
  return (
    <Tooltip
      anchorSelect={anchorSelect}
      place={placement}
      className='bg-dark-background text-dark-text dark:bg-light-background dark:text-light-text'
    >
      {children}
    </Tooltip>
  );
};

export default ToolTip;
