import { Button, TButtonProps } from 'shared/ui-kit/button';
import { RefreshIcon } from 'shared/ui-kit/icons';
import { withTooltip } from 'shared/ui-kit/tooltip';

const ButtonWithTooltip = withTooltip<TButtonProps>(Button);

interface RefetchRequestsProps {
  getReports: () => void;
  extClassName?: string;
}

export function RefetchReports({
  getReports,
  extClassName,
}: RefetchRequestsProps) {
  const handleGetReports = () => {
    getReports();
  };

  return (
    <ButtonWithTooltip
      tooltipEnabled
      tooltipText="Проверить, есть ли новые отчёты"
      size="micro"
      htmlType="button"
      type="secondary"
      extClassName={extClassName}
      onClick={handleGetReports}
    >
      <RefreshIcon color="blue-dark" />
    </ButtonWithTooltip>
  );
}
