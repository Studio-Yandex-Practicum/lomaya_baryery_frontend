import { getColor, IIconProps } from './utils';

export const ChevronDownIcon = ({ type, ...props }: IIconProps) => (
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
      d="M6.3081 8.66937C6.70684 8.28724 7.33986 8.30071 7.72199 8.69945L12 13.1635L16.278 8.69945C16.6601 8.30071 17.2932 8.28724 17.6919 8.66937C18.0906 9.0515 18.1041 9.68452 17.722 10.0833L12.722 15.3007C12.5334 15.4975 12.2726 15.6087 12 15.6087C11.7274 15.6087 11.4666 15.4975 11.278 15.3007L6.27801 10.0833C5.89588 9.68452 5.90935 9.0515 6.3081 8.66937Z"
    />
  </svg>
);
