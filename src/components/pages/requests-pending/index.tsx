import { useMemo } from 'react';
import cn from 'classnames';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { ContentContainer } from '../../../ui/content-container';
import { ContentHeading } from '../../../ui/content-heading';
import { Table } from '../../../ui/table-native';
import {
  useApproveRequestMutation,
  useDeclineRequestMutation,
  useGetPendingRequestsQuery,
} from '../../../redux-store/api';
import { useAppSelector } from '../../../redux-store/hooks';
import { selectRootShifts } from '../../../redux-store/root-shifts';
import { RequestRow } from '../../request-row';
import { Loader } from '../../../ui/loader';
import { Alert } from '../../../ui/alert';
import { Button, TButtonProps } from '../../../ui/button';
import { RefreshIcon } from '../../../ui/icons';
import { withTooltip } from '../../../ui/tooltip';
import { Modal } from '../../../ui/modal';
import { MessageForm } from '../../message-form';
import { deserializeQuery } from '../../../utils';
import styles from './styles.module.css';

const ButtonWithTooltip = withTooltip<TButtonProps>(Button);

export const PageRequestsPending = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { preparing } = useAppSelector(selectRootShifts);

  const { data, isLoading, isFetching, refetch } = useGetPendingRequestsQuery(
    preparing?.id ?? skipToken,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const [approveRequest] = useApproveRequestMutation();
  const [declineRequest] = useDeclineRequestMutation();

  const { rqstId: decliningRqstId } = deserializeQuery<{ rqstId: string }>(location.search);

  const content = useMemo(() => {
    if (!preparing || !data) {
      return;
    }

    if ((!data || data.length === 0) && (isLoading || isFetching)) {
      return <Loader extClassName={styles.requests__contentLoader} />;
    }
    if (data?.length === 0) {
      return <Alert extClassName={styles.requests__contentAlert} title="Новых заявок нет" />;
    }

    return (
      <Table
        header={['Имя и фамилия', 'Город', 'Телефон', 'Дата рождения', '']}
        extClassName={styles.requests__table}
        gridClassName={styles.requests__tableColumns}
        renderRows={(rowStyles) =>
          isLoading || isFetching ? (
            <Loader extClassName={styles.requests__tableLoader} />
          ) : (
            <div className={cn(styles.requests__tableRows, 'custom-scroll')}>
              {data.map((request) => (
                <RequestRow
                  key={request.request_id}
                  extClassName={rowStyles}
                  requestData={request}
                  approve={() =>
                    approveRequest({ requestId: request.request_id, shiftId: preparing.id })
                  }
                  decline={() =>
                    navigate({ pathname: 'decline', search: `rqstId=${request.request_id}` })
                  }
                />
              ))}
            </div>
          )
        }
      />
    );
  }, [preparing, data, isLoading, isFetching, navigate, approveRequest]);

  if (!preparing) {
    return (
      <ContentContainer extClassName={styles.requests__alert}>
        <Alert
          extClassName={styles.requests__tableAlert}
          title="Заявки не принимаются, пока нет новой смены"
        />
      </ContentContainer>
    );
  }

  return (
    <>
      <ContentContainer extClassName={styles.requests}>
        <ContentHeading extClassName={styles.requests__heading} title="Заявки на участие">
          <ButtonWithTooltip
            tooltipEnabled
            tooltipText="Проверить, есть ли новые заявки"
            size="micro"
            htmlType="button"
            type="secondary"
            extClassName={styles.requests__refreshButton}
            onClick={refetch}
          >
            <RefreshIcon type="link-active" />
          </ButtonWithTooltip>
        </ContentHeading>
        {content}
      </ContentContainer>
      <Routes>
        <Route
          path="decline"
          element={
            <Modal title="Отклонить заявку" close={() => navigate(-1)}>
              <MessageForm
                btnText="Отклонить"
                onSubmit={(message) =>
                  declineRequest({ requestId: decliningRqstId, shiftId: preparing.id, message })
                    .unwrap()
                    .then(() => navigate('/requests/pending', { replace: true }))
                }
              />
            </Modal>
          }
        />
      </Routes>
    </>
  );
};
