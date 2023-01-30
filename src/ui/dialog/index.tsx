import { useMount } from '../hook';
import { OverlayingPopup } from '../overlaying-popup';
import styles from './styles.module.css';

interface IDialogProps {
  opened: boolean;
  text: string;
  title?: string;
  onClose: () => void;
  primaryButton: React.ReactNode;
  secondaryButton?: React.ReactNode;
}

export function Dialog({
  opened,
  title,
  text,
  primaryButton,
  secondaryButton,
  onClose,
}: IDialogProps) {
  const { mounted } = useMount(opened);

  if (!mounted) return null;

  return (
    <OverlayingPopup onClose={onClose} opened={opened} extClassName={styles.overlay}>
      <div className={styles.container}>
        {title && (
          <h2 className={['text', 'text_type_main-large', styles.title].join(' ')}>{title}</h2>
        )}
        <p className={['text', 'text_type_main-default', styles.text].join(' ')}>{text}</p>
        <div className={styles.handles}>
          {primaryButton}
          {secondaryButton}
        </div>
      </div>
    </OverlayingPopup>
  );
}
