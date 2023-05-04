import { ShiftsTable } from 'widgets/shifts-table';
import { ContentHeading } from 'shared/ui-kit/content-heading';
import { ContentContainer } from 'shared/ui-kit/content-container';
import { CreateNewShift } from 'features/create-shift';
import { Button } from 'shared/ui-kit/button';
import { api } from 'shared/api';
import styles from './styles.module.css';

export function PageShiftsAll() {
  // eslint-disable-next-line no-void
  const handleDownloadFile = () => void api.downloadFullReport();

  return (
    <>
      <ContentContainer extClassName={styles.content}>
        <ContentHeading title="Смены">
          <Button
            htmlType="button"
            type="secondary"
            extClassName={styles.downloadButton}
            onClick={handleDownloadFile}
          >
            Получить полный отчет
          </Button>
          <CreateNewShift />
        </ContentHeading>
        <ShiftsTable extClassName={styles.shiftsTable} />
      </ContentContainer>
    </>
  );
}
