import { useStore } from 'effector-react';
import {
  ReportDetails,
  ReportLabel,
  reportModel,
  SliderControls,
} from 'entities/report';
import { SideControls } from 'features/report-reviewing';
import { useSearchParams } from 'react-router-dom';
import { findIndexById } from 'shared/lib';
import styles from './styles.module.css';

interface ReportsSliderProps {
  reportId: string | undefined;
  extClassName?: string;
}

export function ReportsSlider({ reportId, extClassName }: ReportsSliderProps) {
  const { data: list } = useStore(reportModel.store.$reportsState);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setSearchParams] = useSearchParams();

  const start = 0;
  const end = list.length - 1;
  const cur = findIndexById(list, 'report_id', reportId);

  if (cur === null) {
    return null;
  }

  const data = list[cur];

  const handlePrev = () => {
    if (cur > start) {
      setSearchParams({ reportId: list[cur - 1].report_id });
    }
  };

  const handleNext = () => {
    if (cur < end) {
      setSearchParams({ reportId: list[cur + 1].report_id });
    }
  };

  return (
    <>
      <ReportDetails
        extClassName={extClassName}
        data={data}
        feature={
          <>
            <SideControls
              extClassName={styles.controls}
              reportId={data.report_id}
              reportStatus={data.report_status}
            />
            {data.report_status !== 'reviewing' && (
              <ReportLabel
                extClassName={styles.label}
                status={data.report_status}
              />
            )}
          </>
        }
      />
      <SliderControls
        extClassName={styles.nav}
        totalSlides={list.length}
        currentSlide={cur + 1}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </>
  );
}
