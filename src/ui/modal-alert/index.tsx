import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './styles.module.css';
import { Alert } from '../alert';
import { Button } from '../button';

const modalRoot = document.getElementById('modalRoot') as HTMLElement;

interface IModalAlertProps {
  titleText: string;
  cancelText: string;
  acceptText: string;
  closeModal: () => void;
  closeShift: () => void;
}

export function ModalAlert({
  titleText,
  cancelText,
  acceptText,
  closeModal,
  closeShift,
}: IModalAlertProps) {
  const handleFinish = () => {
    closeShift();
    closeModal();
  };

  const clickOnOverlay = (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (evt.currentTarget === evt.target) {
      closeModal();
    }
  };

  useEffect(() => {
    const handleEscPress = (evt: KeyboardEvent) => {
      if (evt.code === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keyup', handleEscPress);

    return () => {
      document.removeEventListener('keyup', handleEscPress);
    };
  }, []);

  return createPortal(
    <div className={styles.overlay} onMouseDown={clickOnOverlay}>
      <div className={styles.modalAlert}>
        <Alert title={titleText} extClassName={styles.modalAlert__alert} />
        <div className={styles.modalAlert__controls}>
          <Button
            htmlType="button"
            size="small"
            type="primary"
            onClick={closeModal}
            extClassName={styles.modalAlert__button}
          >
            {cancelText}
          </Button>
          <Button
            htmlType="button"
            size="small"
            type="negative"
            onClick={handleFinish}
            extClassName={styles.modalAlert__button}
          >
            {acceptText}
          </Button>
        </div>
      </div>
    </div>,
    modalRoot
  );
}
