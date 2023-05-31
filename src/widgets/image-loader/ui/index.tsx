import cn from 'classnames';
import { InputFile } from 'shared/ui-kit/input-file';
import { FileUploadIcon } from 'shared/ui-kit/icons';
import styles from './styles.module.css';

interface ImageLoaderProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  size?: 'small' | 'large';
  bgURL?: string;
  extClassName?: string;
  error?: string;
  name: string;
}

export const ImageLoader = ({
  onChange,
  size = 'small',
  bgURL,
  extClassName,
  error,
  name,
}: ImageLoaderProps) => {
  const inputId = 'file-upload';
  const sizeStyle = styles[`image_size_${size}`];

  return (
    <div className={cn(extClassName, styles.container)}>
      <label htmlFor={inputId}>
        <div className={cn(styles.image_container, sizeStyle)}>
          {bgURL ? <img className={styles.image} src={bgURL} /> : undefined}
          <FileUploadIcon color="blue-dark" />
        </div>
      </label>
      <InputFile
        name={name}
        onChange={onChange}
        accept="image/*"
        id={inputId}
        error={Boolean(error)}
        errorText={error}
      />
    </div>
  );
};
