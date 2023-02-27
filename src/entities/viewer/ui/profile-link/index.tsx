import { UserIcon } from 'shared/ui-kit/icons';
import styles from './styles.module.css';

interface ProfileLinkProps {
  viewerName?: string;
}

export function ProfileLink({ viewerName = 'Аккаунт' }: ProfileLinkProps) {
  return (
    <>
      <UserIcon className={styles.icon} type="link" />
      {viewerName}
    </>
  );
}
