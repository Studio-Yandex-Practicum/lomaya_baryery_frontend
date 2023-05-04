import { useEffect, ChangeEvent } from 'react';
import { Alert } from 'shared/ui-kit/alert';
import { MembersTable } from 'widgets/members-table';
import { membersModel, searchChanged } from 'entities/members';
import { useStore, useEvent } from 'effector-react';
import { Loader } from 'shared/ui-kit/loader';
import { SearchIcon } from 'shared/ui-kit/icons';
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
  const { data, isLoading, error, search } = useStore(
    membersModel.store.$membersState
  );
  const handleSearch = useEvent(searchChanged);
  const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleSearch(event.target.value);
  };

  useEffect(() => {
    mount();
  }, []);

  return (
    <>
      <ContentContainer extClassName={styles.container}>
        <div className={styles.header}>
          <ContentHeading title="Участники проекта" />
          <div className={styles.search}>
            <SearchIcon color="gray" />
            <input
              className={styles.text}
              type="text"
              value={search}
              placeholder="Поиск"
              onChange={onSearchChange}
            />
          </div>
        </div>
        <Guard data={data} error={error} isLoading={isLoading} />
        <MembersTable extClassName={styles.membersTable} />
      </ContentContainer>
    </>
  );
}
