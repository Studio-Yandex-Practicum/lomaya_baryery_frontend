import { getColor, IIconProps } from './utils';

export const EnterIcon = ({ type }: IIconProps) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={getColor(type)}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9 3C8.44772 3 8 3.44772 8 4C8 4.55228 8.44772 5 9 5H17C17.5523 5 18 5.44772 18 6V18C18 18.5523 17.5523 19 17 19H9C8.44772 19 8 19.4477 8 20C8 20.5523 8.44772 21 9 21H17C18.6569 21 20 19.6569 20 18V6C20 4.34315 18.6569 3 17 3H9ZM12.7071 8.29289C12.3166 7.90237 11.6834 7.90237 11.2929 8.29289C10.9024 8.68342 10.9024 9.31658 11.2929 9.70711L12.5858 11H5C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13H12.5858L11.2929 14.2929C10.9024 14.6834 10.9024 15.3166 11.2929 15.7071C11.6834 16.0976 12.3166 16.0976 12.7071 15.7071L15.7071 12.7071C16.0976 12.3166 16.0976 11.6834 15.7071 11.2929L12.7071 8.29289Z"
    />
  </svg>
);
