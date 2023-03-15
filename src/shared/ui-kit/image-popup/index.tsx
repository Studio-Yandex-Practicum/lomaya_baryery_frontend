import { useEffect, useState } from 'react';
import { CloseIcon } from '../icons';
import { OverlayingPopup } from '../overlaying-popup';
import { useMount } from '../hook';
import styles from './styles.module.css';

type TImagePopupProps = {
  opened: boolean;
  imgSrc?: string;
  onClose: () => void;
};

export function ImagePopup({ opened, onClose, imgSrc }: TImagePopupProps) {
  const { mounted } = useMount(opened);
  const [image, setImage] = useState(imgSrc);

  useEffect(() => {
    setImage(imgSrc);
  }, [mounted]); // eslint-disable-line

  if (!mounted) return null;

  return (
    <OverlayingPopup onClose={onClose} opened={opened}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <CloseIcon
            className={styles.heading__closeIcon}
            color="gray"
            onClick={onClose}
          />
        </div>
        <img src={image} className={styles.image} alt="user task" />
      </div>
    </OverlayingPopup>
  );
}
