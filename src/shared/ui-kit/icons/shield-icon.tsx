import { getColor, IIconProps } from './utils';

export const ShieldIcon = ({ type, ...props }: IIconProps) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={getColor(type)}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3 4C3 2.89543 3.89543 2 5 2H19C20.1046 2 21 2.89543 21 4V10.1649C21 18.2341 14.1289 21.2682 12.6452 21.8317L12.2902 20.8968L12.6452 21.8317C12.2263 21.9908 11.7737 21.9908 11.3548 21.8317L11.7098 20.8968L11.3548 21.8317C9.87108 21.2682 3 18.2341 3 10.1649V4ZM19 4L5 4V10.1649C5 16.7589 10.5093 19.3573 12 19.9371C13.4907 19.3573 19 16.7589 19 10.1649V4Z"
    />
  </svg>
);
