import { useEffect } from 'react';
import cn from 'classnames';
import { useStore } from 'effector-react';
import { Navigate, useParams } from 'react-router-dom';
import { ContentContainer } from 'shared/ui-kit/content-container';
import { ContentHeading } from 'shared/ui-kit/content-heading';
import { CellDate, CellText } from 'shared/ui-kit/table';
import { Loader } from 'shared/ui-kit/loader';
import { Alert } from 'shared/ui-kit/alert';
import { MemberById } from 'shared/api';
import { memberModel } from 'entities/member';
import { mount, unmount } from './model';
import styles from './styles.module.css';

interface MemberProps {
  shifts: {
    birth_date: string;
    phone_number: string;
    city: string;
  };
}

const Shifts = ({ shifts }: MemberProps) => {
  return (
    <>
      <h2 className={cn(styles.title, 'text')}>Смены</h2>
    </>
  );
};

interface GuardProps {
  isLoading: boolean;
  data: MemberById | null;
  error: string | null;
}

function Guard({ data, isLoading, error }: GuardProps) {
  if (isLoading && !data) {
    return <Loader extClassName={styles.loader} />;
  }

  if (error) {
    return <Alert extClassName={styles.alert} title={error} />;
  }

  if (data) {
    return (
      <Alert extClassName={styles.alert} title="Пока нет ни одного участника" />
    );
  }

  return null;
}

export function PageMember() {
  const { memberId } = useParams();

  useEffect(() => {
    if (memberId) {
      mount(memberId);
    }
    return () => {
      unmount();
    };
  }, [memberId]);

  const { data, isLoading, error } = useStore(memberModel.store.$memberState);
  console.log(data);

  if (!data) {
    return <Navigate to="/members/all" replace />;
  }

  return (
    <>
      <ContentContainer extClassName={styles.headingContainer}>
        <ContentHeading
          title={`Участники проекта / ${data?.name} ${data?.surname}`}
          extClassName={styles.heading}
        />
        <div className={styles.container}>
          <div className={styles.items}>
            <p className={styles.text}>Дата рождения</p>
            <CellDate date={data.date_of_birth} />
          </div>
          <div className={styles.items}>
            <p className={styles.text}>Телефон</p>
            <CellText text={data.phone_number} />
          </div>
          <div className={styles.items}>
            <p className={styles.text}>Город</p>
            <CellText text={data.city} />
          </div>
        </div>
      </ContentContainer>
      <Guard data={data} error={error} isLoading={isLoading} />
      <ContentContainer extClassName={styles.participantsContainer}>
        <Shifts shifts={data.shifts} />
      </ContentContainer>
    </>
  );
}
