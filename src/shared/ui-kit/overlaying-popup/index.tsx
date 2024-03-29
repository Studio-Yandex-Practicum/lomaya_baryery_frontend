import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { CSSTransition } from 'react-transition-group';
import { ANIMATION_POPUP_TIME } from '../const';
import { Portal } from '../portal';
import { IAnimationStyles } from '../types';
import styles from './styles.module.css';

const overlayAnimationStyles: IAnimationStyles = {
  enter: styles.overlayEnter,
  enterActive: styles.overlayEnterActive,
  exit: styles.overlayExit,
  exitActive: styles.overlayExitActive,
};

const mainPopupAnimationStyles: IAnimationStyles = {
  enter: styles.mainPopupEnter,
  enterActive: styles.mainPopupEnterActive,
  exit: styles.mainPopupExit,
  exitActive: styles.mainPopupExitActive,
};

type TOverlayingPopupProps = React.PropsWithChildren & {
  opened: boolean;
  onClose: () => void;
  extClassName?: string;
};

export function OverlayingPopup({
  opened,
  children,
  onClose,
  extClassName,
}: TOverlayingPopupProps) {
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  const [animationIn, setAnimationIn] = useState(false);

  useEffect(() => {
    setAnimationIn(opened);
  }, [opened]);

  useEffect(() => {
    const handleCloseOnEsc = (evt: KeyboardEvent) => {
      if (evt.code === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keyup', handleCloseOnEsc);

    return () => {
      document.removeEventListener('keyup', handleCloseOnEsc);
    };
  }, []); // eslint-disable-line

  return (
    <Portal>
      <div className={styles.container} role="dialog">
        <CSSTransition
          nodeRef={overlayRef}
          in={animationIn}
          classNames={overlayAnimationStyles}
          timeout={ANIMATION_POPUP_TIME}
          mountOnEnter
          unmountOnExit
        >
          <div // eslint-disable-line
            ref={overlayRef}
            className={cn(styles.overlay, extClassName)}
            onClick={onClose}
            role="button"
          />
        </CSSTransition>
        <CSSTransition
          nodeRef={contentRef}
          in={animationIn}
          classNames={mainPopupAnimationStyles}
          timeout={ANIMATION_POPUP_TIME}
          mountOnEnter
          unmountOnExit
        >
          <div ref={contentRef}>{children}</div>
        </CSSTransition>
      </div>
    </Portal>
  );
}
