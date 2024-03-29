import { getColor, IIconProps } from './utils';

export const CircleForwardIcon = ({ color, size, ...props }: IIconProps) => (
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
      d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.49882 9.86852C6.49882 8.27113 8.27911 7.31834 9.60822 8.20442L12.8054 10.3359C13.9929 11.1275 13.9929 12.8725 12.8054 13.6641L9.60822 15.7956C8.27911 16.6817 6.49882 15.7289 6.49882 14.1315L6.49882 9.86852ZM11.696 12L8.49882 9.86852L8.49882 14.1315L11.696 12Z"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.6934 9.86852C11.6934 8.27113 13.4737 7.31834 14.8028 8.20442L18 10.3359C19.1875 11.1275 19.1875 12.8725 18 13.6641L14.8028 15.7956C13.4737 16.6817 11.6934 15.7289 11.6934 14.1315V9.86852ZM16.8906 12L13.6934 9.86852V14.1315L16.8906 12Z"
    />
  </svg>
);
