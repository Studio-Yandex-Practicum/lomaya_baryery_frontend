import { ContentHeading } from '../../../ui/content-heading';
import { ContentContainer } from '../../../ui/content-container';
import { ShiftsTable } from '../../shifts-table';
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
