import { getColor, IIconProps } from './utils';

export const ChevronLeftIcon = ({ type, ...props }: IIconProps) => (
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
      d="M13.7071 7.29289C13.3166 6.90237 12.6834 6.90237 12.2929 7.29289L8.29289 11.2929C7.90237 11.6834 7.90237 12.3166 8.29289 12.7071L12.2929 16.7071C12.6834 17.0976 13.3166 17.0976 13.7071 16.7071C14.0976 16.3166 14.0976 15.6834 13.7071 15.2929L10.4142 12L13.7071 8.70711C14.0976 8.31658 14.0976 7.68342 13.7071 7.29289Z"
    />
  </svg>
);
