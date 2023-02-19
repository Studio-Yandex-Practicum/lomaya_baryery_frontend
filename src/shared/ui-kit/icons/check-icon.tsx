import { getColor, IIconProps } from './utils';

export const CheckIcon = ({ type, ...props }: IIconProps) => (
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
      d="M19.435 7.05022C19.8256 7.44074 19.8256 8.07391 19.435 8.46443L10.9497 16.9497C10.5592 17.3402 9.92606 17.3402 9.53553 16.9497L5.29289 12.7071C4.90237 12.3165 4.90237 11.6834 5.29289 11.2929C5.68342 10.9023 6.31658 10.9023 6.70711 11.2929L10.2426 14.8284L18.0208 7.05022C18.4113 6.65969 19.0445 6.65969 19.435 7.05022Z"
    />
  </svg>
);
