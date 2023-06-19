import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from 'effector-react';
import cn from 'classnames';
import { tasksModel } from 'entities/task';
import { $isLoadingArchiveTask } from 'entities/task/model';
import { $errorEditTaskById } from 'entities/task/model';
import { ContentHeading } from 'shared/ui-kit/content-heading';
import { ContentContainer } from 'shared/ui-kit/content-container';
import { ImageLoader } from 'widgets/image-loader';
import { Input } from 'shared/ui-kit/input';
import { Loader } from 'shared/ui-kit/loader';
import { Alert } from 'shared/ui-kit/alert';
import { Button } from 'shared/ui-kit/button';
import { PencilEditIcon } from 'shared/ui-kit/icons';
import { ITask } from 'shared/api';
import { mount, unmount, edit, archive } from './model';
import styles from './styles.module.css';

interface GuardProps {
  data: ITask | null;
  isLoading: boolean;
  error: string | null;
}

interface IForm {
  id: string;
  title: string;
  file: File | null;
}

function Guard({ data, isLoading, error }: GuardProps) {
  if (isLoading && data === null) {
    return <Loader extClassName={styles.loader} />;
  }

  if (error) {
    return <Alert extClassName={styles.alert} title={error} />;
  }

  if (data === null) {
    return <Alert extClassName={styles.alert} title="Задачи нет" />;
  }

  return null;
}

export function PageTaskInfo() {
  const { taskId } = useParams();

  const [form, setForm] = useState<IForm>({
    id: '',
    title: '',
    file: null,
  });

  const [descriptionImage, setDescriptionImage] = useState('');
  const [urlImage, setUrlImage] = useState('');
  const [titleError, setTitleError] = useState('');
  const [imageError, setImageError] = useState('');

  const handleImageChange = (file: File) => {
    const img = new Image();

    img.onload = () => {
      const format = file.type.split('/').pop() || '';
      const { width, height } = img;
      setDescriptionImage(`Формат: ${format}, ${width}x${height}`);
    };

    img.src = URL.createObjectURL(file);
    setUrlImage(img.src);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    let value;
    if (e.target.files && e.target.files[0]) {
      handleImageChange(e.target.files[0]);
      [value] = e.target.files;
    } else {
      value = e.target.value;
    }

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleValidateTitle = (
    evt: React.FocusEvent<HTMLInputElement, Element>
  ) => {
    setTitleError(evt.target.validationMessage);
  };

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (titleError) return;

    if (form.file === null) {
      setImageError('Изображение не выбранно');
      return;
    }

    edit({
      id: form.id,
      title: form.title.trim(),
      file: form.file,
    });
  };

  const { data, isLoading, error } = useStore(tasksModel.$taskByIdState);
  const isLoadingArchiveTask = useStore($isLoadingArchiveTask);
  const errorEditTask = useStore($errorEditTaskById);

  useEffect(() => {
    if (taskId) {
      mount(taskId);
    }
    return () => {
      unmount();
    };
  }, [taskId]);

  useEffect(() => {
    if (data) {
      const { id, title, file } = data;
      setForm({
        id,
        title,
        file,
      });

      handleImageChange(data.file);
    }
  }, [data]);
  return (
    <>
      <Guard data={data} isLoading={isLoading} error={error} />
      {data === null ? undefined : (
        <ContentContainer extClassName={styles.content}>
          <ContentHeading title={`${data?.title}`} extClassName={styles.title}>
            <Button
              htmlType="button"
              loading={isLoadingArchiveTask}
              disabled={isLoadingArchiveTask}
              type="secondary"
              onClick={() => archive({ id: data.id })}
            >
              {data.is_archived
                ? 'Aктивировать задание'
                : 'Деактивировать задание'}
            </Button>
          </ContentHeading>
          <form noValidate className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label
                htmlFor="title-id"
                className={cn(
                  styles.inputTitle__label,
                  'text',
                  'text_type_main-default',
                  'text_color_secondary'
                )}
              >
                Название с глаголом совершенного вида (напр. Сегодня твоим
                заданием будет помыть посуду)
              </label>
              <div className={styles.title_field}>
                <Input
                  id="title-id"
                  name="title"
                  value={form.title}
                  placeholder="Текст задания"
                  onBlur={handleValidateTitle}
                  onChange={handleChange}
                  error={Boolean(titleError)}
                  errorText={titleError}
                  required
                  minLength={3}
                  maxLength={150}
                  spellCheck={false}
                  extClassName={styles.title_text}
                />
                <PencilEditIcon color="gray" />
              </div>
            </div>
            <div className={styles.field}>
              <p
                className={cn(
                  styles.image_label,
                  'text',
                  'text_type_main-default',
                  'text_color_secondary'
                )}
              >
                Карточка
              </p>
              <ImageLoader
                name="file"
                size="large"
                onChange={handleChange}
                bgURL={urlImage}
                extClassName={styles.image_loader}
                error={imageError}
              />
              <p
                className={cn(
                  styles.image_desc,
                  'text',
                  'text_type_main-default',
                  'text_color_secondary'
                )}
              >
                {descriptionImage}
              </p>
            </div>

            <div>
              <Button
                htmlType="submit"
                size="small"
                disabled={Boolean(titleError) || Boolean(form.title === '')}
                extClassName={styles.submit_button}
              >
                Сохранить изменения
              </Button>
              {errorEditTask ? (
                <div className={cn(styles.error, 'text')}>{errorEditTask}</div>
              ) : null}
            </div>
          </form>
        </ContentContainer>
      )}
    </>
  );
}
