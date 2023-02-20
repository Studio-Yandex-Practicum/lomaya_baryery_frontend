import cn from 'classnames';
import { useStore } from 'effector-react';
import { useEffect, useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import { Loader } from 'shared/ui-kit/loader';
import { Header } from 'widgets/header';
import { SideBar } from 'widgets/sidebar';
import { shiftModel } from 'entities/shift';
import { layoutMounted } from './model';
import styles from './styles.module.css';

export const Layout = () => {
  const { isLoading, isSuccess, isError } = useStore(shiftModel.$shiftsLoading);

  useEffect(() => {
    layoutMounted();
  }, []);

  const content = useMemo(() => {
    if (isLoading) {
      return <Loader fullScreen />;
    }
    if (isError && !isSuccess) {
      return (
        <h1 className={cn('text', 'text_type_main-extra-large')}>
          Сервер не доступен
        </h1>
      );
    }
    if (isSuccess) {
      return (
        <>
          <nav className={styles.navigation}>
            <SideBar />
          </nav>
          <section className={cn(styles.content, 'custom-scroll')}>
            <Outlet />
          </section>
        </>
      );
    }
  }, [isLoading, isSuccess, isError]);

  return (
    <>
      <Header />
      <main className={styles.main}>{content}</main>
    </>
  );
};
