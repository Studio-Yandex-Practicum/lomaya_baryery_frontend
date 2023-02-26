import { useEffect } from 'react';
import { Alert } from 'shared/ui-kit/alert';
import { ContentContainer } from 'shared/ui-kit/content-container';
import { ContentHeading } from 'shared/ui-kit/content-heading';
import { Loader } from 'shared/ui-kit/loader';
import { AdminListTable } from 'widgets/admin-list-table';
import { useStore } from 'effector-react';
import { adminModel } from 'entities/admin';
import { mount } from './model';
import styles from './styles.module.css';

interface GuardProps {
  isLoading: boolean;
  data: adminModel.TAdmin[];
  error: string | null;
}

function Guard({ data, isLoading, error }: GuardProps) {
  if (isLoading && data.length === 0) {
    return <Loader extClassName={styles.loader} />;
  }

  if (error) {
    return <Alert extClassName={styles.alert} title={error} />;
  }

  return null;
}

export function PageAdminList() {
  const { data, isLoading, error } = useStore(adminModel.$adminsState);

  useEffect(() => {
    mount();
  }, []);

  return (
    <ContentContainer extClassName={styles.container}>
      <ContentHeading title="Cписок" extClassName={styles.heading}>
        <div>invite button</div>
      </ContentHeading>
      <Guard data={data} error={error} isLoading={isLoading} />
      <AdminListTable extClassName={styles.table} />
    </ContentContainer>
  );
}
