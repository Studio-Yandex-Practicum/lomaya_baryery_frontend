import { getColor, IIconProps } from './utils';

export const CircleMinusIcon = ({ color, size, ...props }: IIconProps) => (
  <svg
    width={size || '24'}
    height={size || '24'}
    viewBox="0 0 24 24"
    fill={getColor(color)}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.99998 12C6.99998 11.4477 7.4477 11 7.99998 11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H7.99998C7.4477 13 6.99998 12.5523 6.99998 12Z"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z"
    />
  </svg>
);
