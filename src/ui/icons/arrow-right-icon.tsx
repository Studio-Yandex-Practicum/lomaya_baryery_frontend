import { getColor, IIconProps } from './utils';

export const ArrowRightIcon = ({ type, ...props }: IIconProps) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={getColor(type)}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M11.9545 6.00007L18.1548 12.2004L11.9545 18.4006L10.6377 17.0967L14.5816 13.1528L4.99996 13.1528L4.99996 11.2479L14.5816 11.2479L10.6377 7.31043L11.9545 6.00007Z" />
  </svg>
);
