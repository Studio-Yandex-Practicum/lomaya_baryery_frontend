import { ShiftsTable } from 'widgets/shifts-table';
import { ContentHeading } from '../../shared/ui-kit/content-heading';
import { ContentContainer } from '../../shared/ui-kit/content-container';
import { CreateNewShift } from '../../features/create-shift';
import styles from './styles.module.css';

export function PageShiftsAll() {
  return (
    <>
      <ContentContainer extClassName={styles.content}>
        <ContentHeading title="Смены">
          <CreateNewShift />
        </ContentHeading>
        <ShiftsTable extClassName={styles.shiftsTable} />
      </ContentContainer>
    </>
  );
}
