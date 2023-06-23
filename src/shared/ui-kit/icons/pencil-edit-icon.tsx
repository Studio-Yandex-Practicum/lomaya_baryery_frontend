import { getColor, IIconProps } from './utils';

export const PencilEditIcon = ({ color, ...props }: IIconProps) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M13.4195 3.89032C13.5961 3.7137 13.8058 3.57361 14.0366 3.47803C14.2673 3.38245 14.5146 3.33325 14.7644 3.33325C15.0142 3.33325 15.2615 3.38245 15.4922 3.47803C15.723 3.57361 15.9327 3.7137 16.1093 3.89032C16.2859 4.06693 16.426 4.27659 16.5216 4.50735C16.6171 4.7381 16.6663 4.98542 16.6663 5.23519C16.6663 5.48495 16.6171 5.73227 16.5216 5.96302C16.426 6.19378 16.2859 6.40345 16.1093 6.58006L7.0314 15.6579L3.33301 16.6666L4.34166 12.9682L13.4195 3.89032Z"
      stroke={getColor(color)}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
