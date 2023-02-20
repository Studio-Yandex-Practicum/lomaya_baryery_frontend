import { Link } from 'react-router-dom';
import { ZoomIcon } from 'shared/ui-kit/icons';
import styles from './styles.module.css';

interface CellThumbnailProps {
  id: string;
  img: string;
}

export function CellThumbnail({ id, img }: CellThumbnailProps) {
  return (
    <Link to={`${id}`} className={styles.container}>
      <img src={img} className={styles.thumbnail} alt="user task" />
      <ZoomIcon type="interface-white" className={styles.cellPreview__icon} />
    </Link>
  );
}
