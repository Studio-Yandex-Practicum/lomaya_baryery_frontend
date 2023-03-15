import { Button, TButtonProps } from 'shared/ui-kit/button';
import { RefreshIcon } from 'shared/ui-kit/icons';
import { withTooltip } from 'shared/ui-kit/tooltip';

const ButtonWithTooltip = withTooltip<TButtonProps>(Button);

interface RefetchRequestsProps {
  getRequests: () => void;
  extClassName?: string;
}

export function RefetchRequests({
  getRequests,
  extClassName,
}: RefetchRequestsProps) {
  const handleGetRequests = () => {
    getRequests();
  };

  return (
    <ButtonWithTooltip
      tooltipEnabled
      tooltipText="Проверить, есть ли новые заявки"
      size="micro"
      htmlType="button"
      type="secondary"
      extClassName={extClassName}
      onClick={handleGetRequests}
    >
      <RefreshIcon color="blue-dark" />
    </ButtonWithTooltip>
  );
}
