import { useEffect } from 'react';
import { Alert } from 'shared/ui-kit/alert';
import { ContentContainer } from 'shared/ui-kit/content-container';
import { ContentHeading } from 'shared/ui-kit/content-heading';
import { Loader } from 'shared/ui-kit/loader';
import { useStore } from 'effector-react';
import { InviteAdminButton } from 'features/invite-admin';
import { invitationModel } from 'entities/invitation';
import { InvitationsTable } from 'widgets/invitations-table';
import { mount } from './model';
import styles from './styles.module.css';

interface GuardProps {
  isLoading: boolean;
  data: invitationModel.Invitation[];
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
      <Alert extClassName={styles.alert} title="Направленных приглашений нет" />
    );
  }

  return null;
}

export function PageInvitationList() {
  const { data, isLoading, error } = useStore(
    invitationModel.$invitationsState
  );

  useEffect(() => {
    mount();
  }, []);

  return (
    <ContentContainer extClassName={styles.container}>
      <ContentHeading title="Приглашения" extClassName={styles.heading}>
        <InviteAdminButton></InviteAdminButton>
      </ContentHeading>
      <Guard data={data} error={error} isLoading={isLoading} />
      <InvitationsTable extClassName={styles.table} />
    </ContentContainer>
  );
}
