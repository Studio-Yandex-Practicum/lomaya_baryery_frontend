import cn from 'classnames';
import { Button } from 'shared/ui-kit/button';
import { ArrowLeftIcon, ArrowRightIcon } from 'shared/ui-kit/icons';
import styles from './styles.module.css';

interface SliderControlsProps {
  currentSlide: number;
  totalSlides: number;
  extClassName?: string;
  onPrev: () => void;
  onNext: () => void;
  disablePrev?: boolean;
  disableNext?: boolean;
}

export function SliderControls({
  onPrev,
  onNext,
  disableNext,
  disablePrev,
  currentSlide,
  totalSlides,
  extClassName,
}: SliderControlsProps) {
  return (
    <nav className={cn(styles.container, extClassName)}>
      <Button
        extClassName={styles.button}
        htmlType="button"
        type="secondary"
        onClick={onPrev}
        disabled={disablePrev}
      >
        <ArrowLeftIcon type="link-active" />
        Предыдущий отчёт
      </Button>
      <p className="text text_type_main-default text_color_secondary m-0">{`${currentSlide} из ${totalSlides}`}</p>
      <Button
        extClassName={styles.button}
        htmlType="button"
        type="secondary"
        onClick={onNext}
        disabled={disableNext}
      >
        Следующий отчёт
        <ArrowRightIcon type="link-active" />
      </Button>
    </nav>
  );
}
