import { MemberStatus } from 'shared/api';
import { StatusLabel } from 'shared/ui-kit/status-label';

interface MemberLabelProps {
  memberStatus: MemberStatus | null | undefined;
}

export function MemberLabel({ memberStatus }: MemberLabelProps) {
  if (memberStatus === null || memberStatus === undefined) {
    return null;
  }

  interface LabelProps {
    statusText: string;
    type: 'current' | 'new' | 'past' | 'rejected' | 'review';
  }

  const labelProps: LabelProps = (() => {
    // eslint-disable-next-line default-case
    switch (memberStatus) {
      case 'verified':
        return { statusText: 'Участник одобрен', type: 'current' };
      case 'pending':
        return { statusText: 'Участник на проверке', type: 'new' };
      case 'declined':
        return { statusText: 'Участник отклонен', type: 'rejected' };
    }
  })();

  return <StatusLabel {...labelProps} />;
}
