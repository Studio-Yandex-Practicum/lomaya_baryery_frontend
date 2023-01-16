import cn from 'classnames';
import { useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import { useGetAllShiftsQuery } from '../../redux-store/api';
import { Loader } from '../../ui/loader';
import { Header } from '../header';
import { SideBar } from '../sidebar';
import styles from './layout.module.css';

export const Layout = () => {
  const { isLoading, isError } = useGetAllShiftsQuery();

  const content = useMemo(() => {
    if (isLoading) {
      return <Loader fullScreen />;
    }
    if (isError) {
      return <h1 className={cn('text', 'text_type_main-extra-large')}>Сервер не доступен</h1>;
    }

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
  }, [isError, isLoading]);

  return (
    <>
      <Header />
      <main className={styles.main}>{content}</main>
    </>
  );
};
