import { useEffect, useState, ChangeEvent, SyntheticEvent } from 'react';
import { useParams } from 'react-router-dom';
import { Alert } from 'shared/ui-kit/alert';
import { ContentContainer } from 'shared/ui-kit/content-container';
import { ContentHeading } from 'shared/ui-kit/content-heading';
import { Loader } from 'shared/ui-kit/loader';
import { Button } from 'shared/ui-kit/button';
import { Form } from 'shared/ui-kit/form';
import { Input } from 'shared/ui-kit/input';
import { useStore } from 'effector-react';
import { adminModel } from 'entities/admin';
import { $viewer } from 'entities/viewer/model';
import {
  mount,
  unmount,
  edit,
  changeRole,
  block,
  resetPassword,
} from './model';
import styles from './styles.module.css';

interface IForm {
  name: string;
  email: string;
  surname: string;
  role: string;
  status: string;
}

export function PageAdminInfo() {
  const { data, isLoading, error } = useStore(adminModel.$adminState);
  const viewer = useStore($viewer);
  const { adminId } = useParams();
  const [form, setForm] = useState<IForm>({
    name: '',
    surname: '',
    email: '',
    role: '',
    status: '',
  });

  useEffect(() => {
    if (adminId) {
      mount(adminId);
    }
    return () => {
      unmount();
    };
  }, [adminId]);

  useEffect(() => {
    if (data) {
      setForm({
        name: data.name,
        email: data.email,
        surname: data.surname,
        role: data.role,
        status: data.status,
      });
    }
  }, [data]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (adminId) {
      edit({ adminId, name: form.name, surname: form.surname });
    }
  };

  const handleChangeRole = () => {
    const role = data?.role === 'administrator' ? 'expert' : 'administrator';
    if (adminId) {
      changeRole({ adminId, role });
    }
  };

  const handleBlockAdmin = () => {
    const status = data?.status === 'active' ? 'blocked' : 'active';
    if (adminId) {
      block({ adminId, status });
    }
  };

  const handleResetPassword = () => {
    if (form.email) {
      resetPassword(form.email);
    }
  };

  const isCurrentUser = Boolean(adminId === viewer?.id);

  if (isLoading || !data) {
    return <Loader extClassName={styles.admin__notice} />;
  }

  if (error) {
    return <Alert extClassName={styles.alert} title={error} />;
  }

  return (
    <ContentContainer extClassName={styles.container}>
      <ContentHeading
        title={`${data.name} ${data.surname}`}
        crumbs={[
          {
            title: 'Администраторы',
            url: '/admins/members',
          },
        ]}
        extClassName={styles.crumbs}
      />
      <div className={styles.header}>
        <p className={styles.header__role}>
          {data.role === 'administrator' ? 'Администратор' : 'Эксперт'}
        </p>
        {!isCurrentUser && (
          <>
            <Button
              extClassName={styles.header__button}
              htmlType="button"
              type="primary"
              size="small"
              onClick={handleChangeRole}
            >
              Сделать{' '}
              {data.role === 'administrator' ? 'экспертом' : 'администратором'}
            </Button>
            <Button
              htmlType="button"
              type="primary"
              size="small"
              onClick={handleBlockAdmin}
            >
              {data.status === 'active' ? 'Заблокировать' : 'Разблокировать'}
            </Button>
          </>
        )}
      </div>
      <div className={styles.main}>
        <p className={styles.main__title}>Данные пользователя</p>
        <Form
          onSubmit={handleSubmit}
          buttonText="Сохранить изменения"
          extClassName={styles.form}
        >
          <Input
            extClassName={styles.form__input}
            onChange={handleChange}
            name="name"
            placeholder="Имя"
            value={form.name}
            type="text"
            autoComplete="off"
            spellCheck={false}
          />
          <Input
            extClassName={styles.form__input}
            onChange={handleChange}
            name="surname"
            placeholder="Фамилия"
            value={form.surname}
            type="text"
            autoComplete="off"
            spellCheck={false}
          />
          <Input
            extClassName={styles.form__input}
            onChange={handleChange}
            name="email"
            placeholder="Email"
            value={form.email}
            type="email"
            autoComplete="off"
            spellCheck={false}
            disabled
          />
          <Button
            extClassName={styles.form__change}
            htmlType="button"
            type="secondary"
            size="small"
            onClick={handleResetPassword}
          >
            Сменить пароль
          </Button>
        </Form>
      </div>
    </ContentContainer>
  );
}
