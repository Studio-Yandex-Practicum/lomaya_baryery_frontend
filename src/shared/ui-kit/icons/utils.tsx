type TIconColor =
  | 'black'
  | 'white'
  | 'gray-light'
  | 'gray'
  | 'gray-dark'
  | 'blue-dark'
  | 'green'
  | 'yellow'
  | 'orange'
  | 'red';

export const getColor = (type: TIconColor) => {
  switch (type) {
    case 'black':
      return '#212226';
    case 'white':
      return '#ffffff';
    case 'gray-light':
      return '#c8ced6';
    case 'gray':
      return '#929ead';
    case 'gray-dark':
      return '#606c78';
    case 'blue-dark':
      return '#4154a4';
    case 'green':
      return '#3ea745';
    case 'yellow':
      return '#fdbd02';
    case 'orange':
      return '#eb8f2d';
    case 'red':
      return '#c53637';
    default:
      // eslint-disable-next-line no-case-declarations, @typescript-eslint/no-unused-vars
      const exhaustiveCheck: never = type;
      return '#212226';
  }
};

export interface IIconProps {
  type: TIconColor;
  size?: '24' | '18';
  className?: string;
  onClick?:
    | (() => void)
    | ((e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void);
}
