import cn from 'classnames';
import { Input } from 'shared/ui-kit/input';
import styles from './styles.module.css';

interface ViewerProfileProps {
  extClassName?: string;
  viewerData: {
    name: string;
    surname: string;
    email: string;
  };
}

export function ViewerProfile({
  viewerData,
  extClassName,
}: ViewerProfileProps) {
  return (
    <div className={cn(styles.container, extClassName)}>
      <Input
        name="name"
        extClassName={styles.input}
        disabled
        value={viewerData.name}
      />
      <Input
        name="surname"
        extClassName={styles.input}
        disabled
        value={viewerData.surname}
      />
      <Input
        name="email"
        extClassName={styles.input}
        disabled
        value={viewerData.email}
      />
    </div>
  );
}
