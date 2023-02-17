import cn from 'classnames';
import { useStore } from 'effector-react';
import { useEffect, useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import { shiftsModel } from '../../../services/models';
import { Loader } from '../../../ui/loader';
import { Header } from '../../header';
import { SideBar } from '../../sidebar';
import { layoutMounted } from './model';
import styles from './styles.module.css';

export const Layout = () => {
  const { isLoading, isSuccess, isError } = useStore(
    shiftsModel.store.$shiftsLoading
  );

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
