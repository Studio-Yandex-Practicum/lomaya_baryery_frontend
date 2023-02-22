import cn from 'classnames';
import { Link, NavLink } from 'react-router-dom';
import { EnterIcon, UserIcon } from 'shared/ui-kit/icons';
import { Logo } from 'shared/ui-kit/logo';
import { viewerModel } from 'entities/viewer';
import styles from './styles.module.css';

export function Header() {
  function handleSingOut() {
    viewerModel.clear();
    localStorage.clear();
  }

  return (
    <header className={styles.header}>
      <Link to={{ pathname: '/' }}>
        <Logo className={styles.header__logo} />
      </Link>
      <nav className={styles.header__nav}>
        <NavLink
          to={{ pathname: '/profile' }}
          className={cn(
            'text',
            'text_type_main-medium',
            'm-1',
            'link',
            styles.header__link
          )}
        >
          <UserIcon className={styles.header__linkIcon} type="link" />
          Аккаунт
        </NavLink>
        <button
          onClick={handleSingOut}
          className={cn(
            'text text_type_main-medium link',
            styles.header__link,
            styles.header__button
          )}
        >
          <EnterIcon className={styles.header__linkIcon} type="link" />
          Выйти
        </button>
      </nav>
    </header>
  );
}
