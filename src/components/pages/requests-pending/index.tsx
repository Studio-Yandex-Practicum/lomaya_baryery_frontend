import { useCallback, useEffect, useMemo } from 'react';
import cn from 'classnames';
import { useLocation, useMatch, useNavigate } from 'react-router-dom';
import { ContentContainer } from '../../../ui/content-container';
import { ContentHeading } from '../../../ui/content-heading';
import { Table } from '../../../ui/table';
import { RequestRow } from '../../request-row';
import { Loader } from '../../../ui/loader';
import { Alert } from '../../../ui/alert';
import { Button, TButtonProps } from '../../../ui/button';
import { RefreshIcon } from '../../../ui/icons';
import { withTooltip } from '../../../ui/tooltip';
import { MessageForm } from '../../message-form';
import { deserializeQuery } from '../../../utils';
import { MainPopup } from '../../../ui/main-popup';
import { useRecruitmentState } from '../../../services/store';
import styles from './styles.module.css';
import { usePendingRequestsStore } from '../../../services/store';

const ButtonWithTooltip = withTooltip<TButtonProps>(Button);

export const PageRequestsPending = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const decline = Boolean(useMatch('/requests/pending/decline'));

  const { id: shiftId } = useRecruitmentState();

  const {
    requests: data,
    isLoading,
    fetch,
    approve: approveRequest,
    decline: declineRequest,
  } = usePendingRequestsStore();

  useEffect(() => {
    if (shiftId) {
      fetch(shiftId);
    }
  }, [shiftId, fetch]);

  const { rqstId: rejectingRqstId } = deserializeQuery<{ rqstId: string }>(
    location.search,
  );

  const handleDeclineRequest = async (message: string) => {
    await declineRequest({ requestId: rejectingRqstId, message });
    navigate('/requests/pending', { replace: true });
  };

  const handleCloseModal = useCallback(() => navigate(-1), [navigate]);

  const content = () => {
    if (isLoading) {
      return <Loader extClassName={styles.requests__contentLoader} />;
    }

    if (!data) {
      return null;
    }

    if (data.length === 0) {
      return (
        <Alert
          extClassName={styles.requests__contentAlert}
          title="Новых заявок нет"
        />
      );
    }

    if (shiftId) {
      return (
        <Table
          header={['Имя и фамилия', 'Город', 'Телефон', 'Дата рождения', '']}
          extClassName={styles.requests__table}
          gridClassName={styles.requests__tableColumns}
          renderRows={(rowStyles) =>
            isLoading ? (
              <Loader extClassName={styles.requests__tableLoader} />
            ) : (
              <div className={cn(styles.requests__tableRows, 'custom-scroll')}>
                {data.map((request) => (
                  <RequestRow
                    key={request.request_id}
                    extClassName={rowStyles}
                    requestData={request}
                    approve={() => approveRequest(request.request_id)}
                    decline={() =>
                      navigate({
                        pathname: 'decline',
                        search: `rqstId=${request.request_id}`,
                      })
                    }
                  />
                ))}
              </div>
            )
          }
        />
      );
    }
  };

  if (shiftId === null) {
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
        <ContentHeading
          extClassName={styles.requests__heading}
          title="Активные"
        >
          <ButtonWithTooltip
            tooltipEnabled
            tooltipText="Проверить, есть ли новые заявки"
            size="micro"
            htmlType="button"
            type="secondary"
            extClassName={styles.requests__refreshButton}
            onClick={() => fetch(shiftId)}
          >
            <RefreshIcon type="link-active" />
          </ButtonWithTooltip>
        </ContentHeading>
        {content()}
      </ContentContainer>

      <MainPopup
        title="Отклонить заявку"
        opened={decline}
        onClose={handleCloseModal}
      >
        <MessageForm btnText="Отклонить" onSubmit={handleDeclineRequest} />
      </MainPopup>
    </>
  );
};
