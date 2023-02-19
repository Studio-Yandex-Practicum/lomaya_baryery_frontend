import cn from 'classnames';
import { Logo } from '../../ui-kit/logo';
import styles from './styles.module.css';

interface IAuthContainer {
  title: string;
  children?: React.ReactNode;
}

export function AuthContainer({ title, children }: IAuthContainer) {
  return (
    <section className={styles.surface}>
      <div className={styles.container}>
        <Logo />
        <h1 className={cn(styles.title, 'text text_type_main-extra-large')}>
          {title}
        </h1>
        {children}
      </div>
    </section>
  );
}
