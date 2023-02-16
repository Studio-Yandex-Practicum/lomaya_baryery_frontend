import { useMemo } from 'react';
import cn from 'classnames';
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { ContentContainer } from '../../../ui/content-container';
import { ReportDetails } from '../../report-detail';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
} from '../../../ui/icons';
import { Button } from '../../../ui/button';
import { Alert } from '../../../ui/alert';
import { Loader } from '../../../ui/loader';
import styles from './styles.module.css';
import {
  useReviewingReportsStore,
  useShiftsStoreQuery,
} from '../../../services/store';

export function PageReportsReviewingSlider() {
  const {
    rootShifts: { started },
  } = useShiftsStoreQuery();

  const {
    reports,
    isLoading,
    isError,
    approve: approveReport,
    decline: declineReport,
  } = useReviewingReportsStore();

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id } = useParams();
  const parentRoutePath = useMemo(
    () => pathname.slice(0, pathname.lastIndexOf('/')),
    [pathname],
  );
  const currentTaskIndex = reports?.findIndex(
    (report) => report.report_id === id,
  );

  const handlePrevTask = () => {
    if (reports && currentTaskIndex && currentTaskIndex > 0) {
      const prevTaskIndex = currentTaskIndex - 1;
      navigate(`${parentRoutePath}/${reports[prevTaskIndex].report_id}`);
    }
  };

  const handleNextTask = () => {
    if (reports) {
      const lastTaskIndex = reports.length - 1;
      if (currentTaskIndex && currentTaskIndex < lastTaskIndex) {
        const nextTaskIndex = currentTaskIndex + 1;
        navigate(`${parentRoutePath}/${reports[nextTaskIndex].report_id}`);
      }
    }
  };

  const content = useMemo(() => {
    if (!reports || !currentTaskIndex) {
      return null;
    }

    if (isError) {
      return (
        <h1 className="text text_type_main-large text_color_primary">
          Что-то пошло не так
        </h1>
      );
    }

    if (isLoading) {
      return <Loader extClassName={styles.slider__loader} />;
    }

    if (currentTaskIndex === -1) {
      return (
        <Alert extClassName={styles.slider__alert} title="Отчёт не найден" />
      );
    }

    const navigateAfterReview = () => {
      if (reports.length > 0) {
        if (currentTaskIndex === reports.length - 1) {
          navigate(
            `${parentRoutePath}/${reports[currentTaskIndex - 1].report_id}`,
          );
          return;
        }
        navigate(
          `${parentRoutePath}/${reports[currentTaskIndex + 1].report_id}`,
        );
        return;
      }

      navigate(parentRoutePath);
    };

    const handleApprove = async () => {
      try {
        approveReport(reports[currentTaskIndex].report_id);

        navigateAfterReview();
      } catch (error) {
        console.error(error);
      }
    };

    const handleDecline = async () => {
      try {
        declineReport(reports[currentTaskIndex].report_id);

        navigateAfterReview();
      } catch (error) {
        console.error(error);
      }
    };

    return (
      <ReportDetails
        extClassName={styles.slider__taskDetails}
        taskUrl={reports[currentTaskIndex].task_url}
        photoUrl={reports[currentTaskIndex].photo_url}
        userName={reports[currentTaskIndex].user_name}
        userSurname={reports[currentTaskIndex].user_surname}
        createdAt={reports[currentTaskIndex].report_created_at}
        accept={handleApprove}
        decline={handleDecline}
      />
    );
  }, [
    isError,
    isLoading,
    currentTaskIndex,
    reports,
    approveReport,
    declineReport,
    navigate,
    parentRoutePath,
  ]);

  if (!started || !reports || !currentTaskIndex) {
    return <Navigate to={parentRoutePath} />;
  }

  return (
    <>
      <ContentContainer>
        <Link
          to={parentRoutePath}
          className={cn(styles.slider__backLink, 'link')}
        >
          <ChevronLeftIcon type="interface-secondary" />
          <p
            className={cn(
              styles.slider__linkText,
              'text',
              'text_type_main-small',
              'text_color_secondary',
              'm-0',
            )}
          >
            Назад
          </p>
        </Link>
        {content}
      </ContentContainer>
      {!isLoading &&
        !isError &&
        reports.length > 0 &&
        currentTaskIndex !== -1 && (
          <nav className={styles.slider__nav}>
            <Button
              extClassName={styles.slider__navButton}
              htmlType="button"
              type="secondary"
              onClick={handlePrevTask}
            >
              <ArrowLeftIcon type="link-active" />
              Предыдущий отчёт
            </Button>
            <p className="text text_type_main-default text_color_secondary m-0">{`${
              currentTaskIndex + 1
            } из ${reports.length}`}</p>
            <Button
              extClassName={styles.slider__navButton}
              htmlType="button"
              type="secondary"
              onClick={handleNextTask}
            >
              Следующий отчёт
              <ArrowRightIcon type="link-active" />
            </Button>
          </nav>
        )}
    </>
  );
}
