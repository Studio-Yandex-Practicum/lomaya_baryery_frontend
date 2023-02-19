import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './styles.module.css';
import { Alert } from '../alert';

const modalRoot = document.getElementById('modalRoot') as HTMLElement;

interface IModalAlertProps {
  titleText: string;
  onCloseModal: () => void;
  children: React.ReactNode;
}

export function ModalAlert({
  titleText,
  onCloseModal,
  children,
}: IModalAlertProps) {
  const clickOnOverlay = (
    evt: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (evt.currentTarget === evt.target) {
      onCloseModal();
    }
  };

  useEffect(() => {
    const handleEscPress = (evt: KeyboardEvent) => {
      if (evt.code === 'Escape') {
        onCloseModal();
      }
    };

    document.addEventListener('keyup', handleEscPress);

    return () => {
      document.removeEventListener('keyup', handleEscPress);
    };
  }, []); //eslint-disable-line

  return createPortal(
    <div className={styles.overlay} onMouseDown={clickOnOverlay}>
      <div className={styles.modalAlert}>
        <Alert title={titleText} extClassName={styles.modalAlert__alert} />
        {children}
      </div>
    </div>,
    modalRoot,
  );
}
