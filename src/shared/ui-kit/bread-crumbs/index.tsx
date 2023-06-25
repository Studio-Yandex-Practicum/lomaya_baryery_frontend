import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import styles from './styles.module.css';

export interface IBreadCrumb {
  title: string;
  url: string;
}

interface IBreadCrumbs {
  crumbs: IBreadCrumb[];
  extClassName?: string;
}

export const BreadCrumbs = ({ crumbs = [], extClassName }: IBreadCrumbs) => {
  if (!Array.isArray(crumbs)) {
    return <></>;
  }

  return (
    <nav className={extClassName}>
      {crumbs.map(({ title, url }) => (
        <NavLink
          key={title}
          to={url}
          className={cn(styles.crumb, 'link', 'text_color_accent')}
        >
          {title}
        </NavLink>
      ))}
    </nav>
  );
};
