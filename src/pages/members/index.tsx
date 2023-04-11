import { useEffect } from 'react';
import { Alert } from 'shared/ui-kit/alert';
import { MembersTable } from 'widgets/members-table';
import { membersModel } from 'entities/members';
import { useStore } from 'effector-react';
import { Loader } from 'shared/ui-kit/loader';
import { ContentHeading } from 'shared/ui-kit/content-heading';
import { ContentContainer } from 'shared/ui-kit/content-container';
import { mount } from './model';
import styles from './styles.module.css';

interface GuardProps {
  isLoading: boolean;
  data: unknown[];
  error: string | null;
}

function Guard({ data, isLoading, error }: GuardProps) {
  if (isLoading && data.length === 0) {
    return <Loader extClassName={styles.loader} />;
  }

  if (error) {
    return <Alert extClassName={styles.alert} title={error} />;
  }

  if (data.length === 0) {
    return (
      <Alert extClassName={styles.alert} title="Пока нет ни одного участника" />
    );
  }

  return null;
}

export function PageMembersAll() {
  const { data, isLoading, error } = useStore(membersModel.store.$membersState);

  useEffect(() => {
    mount();
  }, []);

  return (
    <>
      <ContentContainer extClassName={styles.container}>
        <ContentHeading title="Участники проекта" />
        <Guard data={data} error={error} isLoading={isLoading} />
        <MembersTable extClassName={styles.membersTable} />
      </ContentContainer>
    </>
  );
}
