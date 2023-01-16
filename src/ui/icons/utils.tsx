type IconType =
  | 'link'
  | 'link-active'
  | 'interface-primary'
  | 'interface-secondary'
  | 'interface-black'
  | 'interface-white'
  | 'success'
  | 'pending'
  | 'error'
  | 'interface-grey';

export const getColor = (type: IconType) => {
  switch (type) {
    case 'link':
      return '#606C78';
    case 'link-active':
      return '#4154A4';
    case 'interface-primary':
      return '#606C78';
    case 'interface-secondary':
      return '#929EAD';
    case 'interface-black':
      return '#000000';
    case 'interface-white':
      return '#FFFFFF';
    case 'success':
      return '#3EA745';
    case 'pending':
      return '#FDBD02';
    case 'error':
      return '#C53637';
    case 'interface-grey':
      return '#c8ced6';
    default:
      return undefined;
  }
};

export interface IIconProps {
  type: IconType;
  size?: '24' | '18';
  className?: string;
  onClick?: (() => void) | ((e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void);
}
