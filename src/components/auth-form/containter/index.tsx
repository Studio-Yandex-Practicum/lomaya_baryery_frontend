import cn from 'classnames';
import { Logo } from '../../../ui/logo/logo';
import styles from './styles.module.css';

interface IAuthContainer {
  title: string;
  form: JSX.Element;
}

export function AuthContainer({ title, form }: IAuthContainer) {
  return (
    <section className={styles.surface}>
      <div className={styles.container}>
        <Logo />
        <h1 className={cn(styles.title, 'text text_type_main-extra-large')}>{title}</h1>
        {form}
      </div>
    </section>
  );
}
