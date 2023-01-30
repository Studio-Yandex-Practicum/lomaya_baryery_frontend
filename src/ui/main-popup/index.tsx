import { CloseIcon } from '../icons';
import { OverlayingPopup } from '../overlaying-popup';
import { useMount } from '../hook';
import styles from './styles.module.css';

type TMainPopupProps = React.PropsWithChildren & {
  title: string;
  opened: boolean;
  onClose: () => void;
};

export function MainPopup({ title, opened, onClose, children }: TMainPopupProps) {
  const { mounted } = useMount(opened);

  if (!mounted) return null;

  return (
    <OverlayingPopup onClose={onClose} opened={opened}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <p className={['text', 'text_type_main-large', 'm-0', styles.heading__title].join(' ')}>
            {title}
          </p>
          <CloseIcon
            className={styles.heading__closeIcon}
            type="interface-secondary"
            onClick={onClose}
          />
        </div>
        {children}
      </div>
    </OverlayingPopup>
  );
}
