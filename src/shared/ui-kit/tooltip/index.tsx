import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './styles.module.css';

interface ITooltip {
  text: string;
  posX: number;
  posY: number;
}

const tooltipRoot = document.getElementById('tooltipRoot') as HTMLElement;

export const Tooltip = React.forwardRef<HTMLParagraphElement, ITooltip>(
  ({ text, posX, posY }, ref) =>
    createPortal(
      <p ref={ref} className={styles.tooltip} style={{ top: posY, left: posX }}>
        {text}
      </p>,
      tooltipRoot
    )
);

export type TTooltipHOC = {
  tooltipText: string;
  tooltipEnabled: boolean;
};

/**
 * WP - wrapped component props.
 * В дженерик WP передать типы пропсов оборачиваемого компонента
 */
export function withTooltip<WP>(
  WrappedComponent: React.ComponentType<Omit<WP, keyof TTooltipHOC>>
) {
  return ({ tooltipText, tooltipEnabled, ...props }: WP & TTooltipHOC) => {
    const [isShow, toggle] = useState(false);

    const [posX, setPosX] = useState(0);
    const [posY, setPosY] = useState(0);

    const [renderX, setRenderX] = useState(0);
    const [renderY, setRenderY] = useState(0);

    const tooltipRef = useRef<HTMLParagraphElement>(null);

    const leaveHandler = () => {
      toggle(() => false);
    };

    const moveHandler = (evt: React.MouseEvent<HTMLElement>) => {
      setPosX(evt.pageX + 10);
      setPosY(evt.pageY + 20);
      toggle(() => true);
    };

    useEffect(() => {
      if (tooltipRef.current) {
        const tooltipWidth = tooltipRef.current.offsetWidth;
        const tooltipHeight = tooltipRef.current.offsetHeight;
        const renderWidthX = window.innerWidth - tooltipWidth;
        const renderHeightY = window.innerHeight - tooltipHeight;
        const offScreenWidthX = posX + tooltipWidth - window.innerWidth;
        const offScreenHeightY = posY + tooltipHeight - window.innerHeight;

        if (posX > renderWidthX) {
          setRenderX(posX - offScreenWidthX);
          setRenderY(posY);
        }
        if (posY > renderHeightY) {
          setRenderY(posY - offScreenHeightY);
          setRenderX(posX);
        } else {
          setRenderX(posX);
          setRenderY(posY);
        }
      }
    }, [posX, posY]);

    return (
      <>
        <WrappedComponent
          {...props}
          onMouseMove={moveHandler}
          onMouseLeave={leaveHandler}
        />
        {tooltipEnabled && isShow ? (
          <Tooltip
            ref={tooltipRef}
            text={tooltipText}
            posX={renderX}
            posY={renderY}
          />
        ) : null}
      </>
    );
  };
}
