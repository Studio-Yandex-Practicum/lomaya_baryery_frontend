import cn from 'classnames';
import { useStore } from 'effector-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from 'widgets/header';
import { SideBar } from 'widgets/sidebar';
import { shiftModel } from 'entities/shift';
import { ChevronLeftIcon } from 'shared/ui-kit/icons';
import { mountLayout } from './model';
import styles from './styles.module.css';

export const Layout = () => {
  const { isSuccess, isError } = useStore(shiftModel.$shiftsLoading);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  const handleResize = useCallback(() => {
    setTimeout(() => {
      setWindowSize(window.innerWidth);
    }, 500);
  }, []);

  useEffect(() => {
    mountLayout();
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  useEffect(() => {
    if (windowSize >= 450) {
      setIsSideBarOpen(false);
    }
  }, [windowSize]);

  const handleOpenSideBar = () => {
    setIsSideBarOpen((prevValue) => !prevValue);
  };

  const content = useMemo(() => {
    if (isError) {
      return (
        <h1 className={cn('text', 'text_type_main-extra-large')}>
          Сервер не доступен
        </h1>
      );
    }
    if (isSuccess) {
      return (
        <>
          <nav
            className={cn({
              [styles.navigation]: !isSideBarOpen,
              [styles.navigation_open]: isSideBarOpen,
            })}
          >
            <SideBar />
          </nav>
          <div className={styles.aside} onClick={handleOpenSideBar}>
            <ChevronLeftIcon color="green" />
          </div>
          <section className={cn(styles.content, 'custom-scroll')}>
            <Outlet />
          </section>
        </>
      );
    }
  }, [isSuccess, isError, isSideBarOpen]);

  return (
    <>
      <Header />
      <main className={styles.main}>{content}</main>
    </>
  );
};
