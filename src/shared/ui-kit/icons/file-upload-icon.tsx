import { IIconProps, getColor } from './utils';

export const FileUploadIcon = ({ color, ...props }: IIconProps) => {
  const hexColor = getColor(color);

  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="40" height="40" rx="10" fill={hexColor} />
      <path
        d="M12 28L28 28C28.5523 28 29 27.5523 29 27L29 15C29 14.4477 28.5523 14 28 14L11 14L11 27C11 27.5523 11.4477 28 12 28Z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 14L18.2929 12.2929C18.1054 12.1054 17.851 12 17.5858 12H12C11.4477 12 11 12.4477 11 13V14"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23 20L20 18M20 18L17 20M20 18L20 24"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
