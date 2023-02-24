import { useSearchParams } from 'react-router-dom';
import { ImagePopup } from 'shared/ui-kit/image-popup';
import { deserializeSearchParams, findIndexById } from 'shared/lib';

interface ViewReportPhotoProps {
  data: Array<{
    report_id: string;
    photo_url: string;
  }>;
}

export function ViewReportPhoto({ data }: ViewReportPhotoProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const { reportId } = deserializeSearchParams<{ reportId: string }>(
    searchParams.toString()
  );

  const reportIndex = findIndexById(data, 'report_id', reportId);

  const popupImage =
    reportIndex !== null ? data[reportIndex].photo_url : undefined;

  const opened = Boolean(popupImage);

  const handleClosePopup = () => {
    setSearchParams('');
  };

  return (
    <ImagePopup
      opened={opened}
      imgSrc={popupImage}
      onClose={handleClosePopup}
    />
  );
}
