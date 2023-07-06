import React, { useState } from 'react';
import cn from 'classnames';
import { Input } from 'shared/ui-kit/input';
import { Button } from 'shared/ui-kit/button';
import { ImageLoader } from 'widgets/image-loader';
import styles from './styles.module.css';

interface ITaskFormData {
  title: string;
  file: File;
}

export interface ITaskCreateFormProps {
  onSubmit: (form: ITaskFormData) => void;
  submitError?: string | null;
  loading: boolean;
  extClassName?: string;
}

export function TaskCreateForm({
  onSubmit,
  submitError,
  loading,
  extClassName,
}: ITaskCreateFormProps) {
  const [titleValue, setTitleValue] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [descriptionImage, setDescriptionImage] = useState('Выберите файл');
  const [urlImage, setUrlImage] = useState('');
  const [titleError, setTitleError] = useState('');
  const [imageError, setImageError] = useState('');

  const handleChangeTitle = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(evt.target.value);
  };

  const handleValidateTitle = (
    evt: React.FocusEvent<HTMLInputElement, Element>
  ) => {
    setTitleError(evt.target.validationMessage);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      setSelectedImage(file);

      const img = new Image();

      img.onload = () => {
        const format = file.type.split('/').pop() || '';
        const { width, height } = img;
        setDescriptionImage(`формат: ${format}, ${width}x${height}`);
      };
      const url = URL.createObjectURL(file);
      img.src = url;
      setUrlImage(url);
    }
  };

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (titleError) return;

    if (selectedImage === null) {
      setImageError('Изображение не выбранно');
      return;
    }
    const form = {
      title: titleValue.trim(),
      file: selectedImage,
    };

    onSubmit(form);
  };

  return (
    <form
      noValidate
      className={cn(styles.form, extClassName)}
      onSubmit={handleSubmit}
    >
      <div className={cn(styles.field, styles.title)}>
        <label
          className={cn(
            styles.label,
            'text',
            'text_type_main-default',
            'text_color_secondary'
          )}
        >
          Название с глаголом совершенного вида (напр. Сегодня твоим заданием
          будет
          <i> помыть посуду</i>)
        </label>
        <Input
          id="title-id"
          name="title"
          value={titleValue}
          placeholder="Текст задания"
          onBlur={handleValidateTitle}
          onChange={handleChangeTitle}
          error={Boolean(titleError)}
          errorText={titleError}
          required
          minLength={3}
          maxLength={150}
          spellCheck={false}
          extClassName={styles.inputText}
        />
      </div>
      <div className={cn(styles.field, styles.image_field)}>
        <p
          className={cn(
            styles.label,
            'text',
            'text_type_main-default',
            'text_color_secondary'
          )}
        >
          Карточка (<span>{descriptionImage}</span>)
        </p>
        <ImageLoader
          onChange={handleImageChange}
          size="small"
          bgURL={urlImage}
          extClassName={styles.image_loader}
          error={imageError}
          name=""
        />
      </div>

      <div>
        <Button
          htmlType="submit"
          size="small"
          disabled={
            Boolean(titleError) ||
            selectedImage === null ||
            Boolean(titleValue === '') ||
            loading
          }
          loading={loading}
          extClassName={styles.button}
        >
          Сохранить изменения
        </Button>
        {submitError ? (
          <div className={cn(styles.submitError, 'text')}>{submitError}</div>
        ) : null}
        <p
          className={cn(
            styles.label,
            'text',
            'text_type_main-default',
            'text_color_secondary'
          )}
        >
          При сохранении созданной карточки задания она будет отправляться
          участникам при запуске следующей смены
        </p>
      </div>
    </form>
  );
}
