import { Link, To } from 'react-router-dom';
import { ZoomIcon } from 'shared/ui-kit/icons';
import styles from './styles.module.css';

interface CellThumbnailProps {
  routeTo: To;
  img: string;
}

export function CellThumbnail({ img, routeTo }: CellThumbnailProps) {
  return (
    <Link to={routeTo} className={styles.container}>
      <img src={img} className={styles.thumbnail} alt="user task" />
      <ZoomIcon type="white" className={styles.cellPreview__icon} />
    </Link>
  );
}
