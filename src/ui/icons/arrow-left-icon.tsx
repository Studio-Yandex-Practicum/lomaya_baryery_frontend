import { getColor, IIconProps } from './utils';

export const ArrowLeftIcon = ({ type, ...props }: IIconProps) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={getColor(type)}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M11.2003 18.4006L5 12.2003L11.2003 6L12.517 7.30398L8.57315 11.2479H18.1548V13.1527H8.57315L12.517 17.0902L11.2003 18.4006Z" />
  </svg>
);
