import cn from 'classnames';
import { useEffect, useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import { useShiftsStore } from '../../services/store';
import { Loader } from '../../ui/loader';
import { Header } from '../header';
import { SideBar } from '../sidebar';
import styles from './layout.module.css';

export const Layout = () => {
  const { isFetching, isSuccess, isFetchError, fetch } = useShiftsStore();

  useEffect(() => {
    if (!isSuccess) {
      fetch();
    }
  }, [fetch, isSuccess]);

  const content = useMemo(() => {
    if (isFetching) {
      return <Loader fullScreen />;
    }
    if (isFetchError && !isSuccess) {
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
  }, [isFetchError, isFetching, isSuccess]);

  return (
    <>
      <Header />
      <main className={styles.main}>{content}</main>
    </>
  );
};
