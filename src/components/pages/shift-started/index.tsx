import cn from 'classnames';
import { useStore } from 'effector-react';
import { ContentContainer } from '../../../ui/content-container';
import { ContentHeading } from '../../../ui/content-heading';
import { StartedShift } from '../../entities/started-shift';
import { UpdateStartedShift } from '../../features/update-started-shift';
import { ShiftParticipantsWithStat } from '../../entities/participants';
import * as startedShiftModel from '../../entities/started-shift/model';
import styles from './styles.module.css';
import { ChangeFinalMessage } from '../../features/change-final-message';

export function PageStartedShift() {
  const startedShift = useStore(startedShiftModel.store.startedShiftStore);

  // const handleFinishShift = () => {
  //   if (startedShift) {
  //     setFinishShift(startedShift.id);
  //   }
  // };
  if (startedShift) {
    return (
      <>
        <ContentContainer extClassName={styles.headingContainer}>
          <ContentHeading title="Текущая" extClassName={styles.heading}>
            <ChangeFinalMessage extClassName={styles.heading__msgButton} />
            {/* <Button
            htmlType="button"
            type="negative"
            size="small"
            onClick={finishShift}
            loading={isMutating}
            disabled={isMutating}
          >
            Завершить смену
          </Button> */}
          </ContentHeading>
          <StartedShift
            extClassName={styles.shiftTable}
            featureComponent={<UpdateStartedShift />}
          />
        </ContentContainer>
        <ContentContainer extClassName={styles.participantsContainer}>
          <h2 className={cn(styles.title, 'text')}>Участники</h2>
          <ShiftParticipantsWithStat shiftId={startedShift?.id} />
        </ContentContainer>

        {/* <Dialog
        opened={finishShiftDialog}
        title="Завершение смены"
        text={
          'Участинки смогут отправить отчёт до\u00A0конца следующего дня, не\u00A0забудьте их\u00A0проверить. Вы уверены, что хотите завершить смену?'
        }
        onClose={handleCloseModal}
        primaryButton={
          <Button
            htmlType="button"
            size="small"
            type="primary"
            onClick={handleCloseModal}
          >
            Отмена
          </Button>
        }
        secondaryButton={
          <Button
            htmlType="button"
            size="small"
            type="negative"
            onClick={handleFinishShift}
          >
            Завершить
          </Button>
        }
      /> */}
      </>
    );
  }
}
