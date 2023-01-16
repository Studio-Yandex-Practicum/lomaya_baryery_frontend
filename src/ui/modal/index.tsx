import React, { PropsWithChildren, useEffect } from 'react';
import { createPortal } from 'react-dom';
import cn from 'classnames';
import styles from './styles.module.css';
import { CloseIcon } from '../icons';

interface IModalProps extends PropsWithChildren {
  title: string;
  close: () => void;
}

const modalRoot = document.getElementById('modalRoot') as HTMLElement;

export const Modal: React.FC<IModalProps> = ({ title, children, close }) => {
  useEffect(() => {
    const handleCloseOnEsc = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        close();
      }
    };
    document.addEventListener('keyup', handleCloseOnEsc);

    return () => {
      document.removeEventListener('keyup', handleCloseOnEsc);
    };
  });

  return createPortal(
    <div className={styles.modal}>
      <div className={styles.modal__heading}>
        <p className={cn('text', 'text_type_main-large', 'm-0', styles.modal__title)}>{title}</p>
        <CloseIcon className={styles.modal__closeIcon} type="interface-secondary" onClick={close} />
      </div>
      {children}
    </div>,
    modalRoot
  );
};
