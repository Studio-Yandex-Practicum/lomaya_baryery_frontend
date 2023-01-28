import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import cn from 'classnames';
import { CSSTransition } from 'react-transition-group';
import { CloseIcon } from '../icons';
import styles from './styles.module.css';
import animationStyles from './animation-styles.module.css';

interface IModalProps extends PropsWithChildren {
  title: string;
  close: () => void;
}

const modalRoot = document.getElementById('modalRoot') as HTMLElement;

export const Modal: React.FC<IModalProps> = ({ title, children, close }) => {
  const modalRef = useRef(null);
  const [mount, setMount] = useState(false);

  const handleCloseModal = () => {
    setMount(false);
  };

  useEffect(() => {
    setMount(true);
  }, []);

  useEffect(() => {
    const handleCloseOnEsc = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        handleCloseModal();
      }
    };
    document.addEventListener('keyup', handleCloseOnEsc);

    return () => {
      document.removeEventListener('keyup', handleCloseOnEsc);
    };
  }, []);

  return createPortal(
    <CSSTransition
      nodeRef={modalRef}
      in={mount}
      classNames={{ ...animationStyles }}
      timeout={80}
      mountOnEnter
      unmountOnExit
      onExited={() => close()}
    >
      <div className={styles.modal} ref={modalRef}>
        <div className={styles.modal__heading}>
          <p className={cn('text', 'text_type_main-large', 'm-0', styles.modal__title)}>{title}</p>
          <CloseIcon
            className={styles.modal__closeIcon}
            type="interface-secondary"
            onClick={handleCloseModal}
          />
        </div>
        {children}
      </div>
    </CSSTransition>,
    modalRoot
  );
};
