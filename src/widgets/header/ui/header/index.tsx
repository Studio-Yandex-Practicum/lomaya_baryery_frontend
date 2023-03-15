import cn from 'classnames';
import { Link, NavLink } from 'react-router-dom';
import { EnterIcon } from 'shared/ui-kit/icons';
import { Logo } from 'shared/ui-kit/logo';
import { ProfileLink, viewerModel } from 'entities/viewer';
import { useStore } from 'effector-react';
import styles from './styles.module.css';

export function Header() {
  const viewer = useStore(viewerModel.$viewer);

  const handleLogout = () => {
    viewerModel.logout();
  };

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
          <ProfileLink viewerName={viewer?.name} />
        </NavLink>
        <button
          onClick={handleLogout}
          className={cn(
            'text text_type_main-medium link',
            styles.header__link,
            styles.header__button
          )}
        >
          <EnterIcon className={styles.header__linkIcon} color="gray-dark" />
          Выйти
        </button>
      </nav>
    </header>
  );
}
