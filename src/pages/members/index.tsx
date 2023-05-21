import { useEffect, ChangeEvent, useState, useMemo } from 'react';
import { Alert } from 'shared/ui-kit/alert';
import { MembersTable } from 'widgets/members-table';
import { membersModel, searchChanged } from 'entities/members';
import { useStore, useEvent } from 'effector-react';
import { Loader } from 'shared/ui-kit/loader';
import { SearchIcon } from 'shared/ui-kit/icons';
import { ContentHeading } from 'shared/ui-kit/content-heading';
import { ContentContainer } from 'shared/ui-kit/content-container';
import { Pagination } from 'shared/ui-kit/pagination';
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
  const filteredMembers = useStore(membersModel.store.$membersStore);
  // quantityPages количество страниц зависят от высоты экрана
  // quantityRows количество строк которые поместятся на экране
  // tableElements[первый_элемент_тыблицы, последний_элемент_тыблицы, №_страницы]
  const quantityRows = useMemo(() =>
    Math.trunc((window.innerHeight - 175 - 100) / 60),
    [window.innerHeight]);
  const quantityPages = useMemo(() => {
    if (!filteredMembers) {
      return 1
    }
    return Math.ceil(filteredMembers.length / quantityRows)
  }, [filteredMembers, quantityRows]);
  const [tableElements, setTableElements] = useState([0, quantityRows, 1]);

  useEffect(() => {
    mount();
  }, []);

  return (
    <>
      {filteredMembers && filteredMembers.length > 7 && <Pagination
        extClassName={styles.pangination}
        page={tableElements[2]} total={quantityPages}
        next={() => {
          setTableElements([tableElements[1], tableElements[1] + quantityRows, tableElements[2] + 1]);
        }}
        prev={() => {
          setTableElements([tableElements[0] - quantityRows, tableElements[0], tableElements[2] - 1]);
        }} />}
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
        <MembersTable extClassName={styles.membersTable} counterMembers={tableElements} />
      </ContentContainer>
    </>
  );
}
