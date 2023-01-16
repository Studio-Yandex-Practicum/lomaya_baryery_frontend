import cn from 'classnames';
import { Link, NavLink } from 'react-router-dom';
import { EnterIcon, UserIcon } from '../../ui/icons';
import { Logo } from '../../ui/logo/logo';
import styles from './styles.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <Link to={{ pathname: '/' }}>
        <Logo className={styles.header__logo} />
      </Link>
      <nav className={styles.header__nav}>
        <NavLink
          to={{ pathname: '/profile' }}
          className={cn('text', 'text_type_main-medium', 'm-1', 'link', styles.header__link)}
        >
          <UserIcon className={styles.header__linkIcon} type="link" />
          Аккаунт
        </NavLink>
        <NavLink
          to={{ pathname: '/logout' }}
          className={cn('text', 'text_type_main-medium', 'link', styles.header__link)}
        >
          <EnterIcon className={styles.header__linkIcon} type="link" />
          Выйти
        </NavLink>
      </nav>
    </header>
  );
}
