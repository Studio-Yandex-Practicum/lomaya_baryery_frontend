import cn from 'classnames';
import { CloseIcon } from '../icons';
import { OverlayingPopup } from '../overlaying-popup';
import { useMount } from '../hook';
import styles from './styles.module.css';

type MainPopupProps = React.PropsWithChildren & {
  title: string;
  opened: boolean;
  onClose: () => void;
  extClassName?: string;
};

export function MainPopup({
  title,
  opened,
  onClose,
  extClassName,
  children,
}: MainPopupProps) {
  const { mounted } = useMount(opened);

  if (!mounted) return null;

  return (
    <OverlayingPopup onClose={onClose} opened={opened}>
      <div className={cn(styles.container, extClassName)}>
        <div className={styles.heading}>
          <p
            className={[
              'text',
              'text_type_main-large',
              'm-0',
              styles.heading__title,
            ].join(' ')}
          >
            {title}
          </p>
          {!(title === "Отклонить заявку") && <CloseIcon
            className={styles.heading__closeIcon}
            color="gray"
            onClick={onClose}
          />}
        </div>
        {children}
      </div>
    </OverlayingPopup>
  );
}
