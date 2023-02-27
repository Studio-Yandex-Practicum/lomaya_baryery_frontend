import { useEffect, useRef } from 'react';
import { useStore } from 'effector-react';
import { inviteModel } from 'features/invite-admin';
import { Form } from 'shared/ui-kit/form';
import { Input } from 'shared/ui-kit/input';
import { MainPopup } from 'shared/ui-kit/main-popup';
import { Alert } from 'shared/ui-kit/alert';
import { ANIMATION_POPUP_TIME } from 'shared/ui-kit/const';
import styles from './styles.module.css';

export function InviteForm() {
  const { closePopup, clear, setValue, submit } = inviteModel;

  const opened = useStore(inviteModel.$opened);

  const values = useStore(inviteModel.$values);

  const isLoading = useStore(inviteModel.$isLoading);
  const isSuccess = useStore(inviteModel.$isSuccess);
  const error = useStore(inviteModel.$error);

  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (opened) {
      setTimeout(() => nameRef.current?.focus(), ANIMATION_POPUP_TIME);
    }
    return () => {
      setTimeout(() => clear(), ANIMATION_POPUP_TIME);
    };
  }, [opened, clear]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit();
  };

  return (
    <MainPopup
      extClassName={styles.popupContainer}
      title={isSuccess ? '' : 'Пригласить администратора'}
      opened={opened}
      onClose={closePopup}
    >
      {isSuccess ? (
        <Alert
          title="Приглашение успешно отправлено"
          icon="CircleCheckIcon"
          extClassName={styles.alert}
        />
      ) : (
        <>
          <p
            className={[
              'text text_type_main-default text_color_secondary',
              styles.text,
            ].join(' ')}
          >
            Укажите имя и&nbsp;фамилию пользователя, которого хотите пригласить.
            А&nbsp;так&nbsp;же почту, на&nbsp;которую придёт приглашение.
          </p>
          <Form
            buttonText="Отправить приглашение"
            loading={isLoading}
            onSubmit={handleSubmit}
            submitError={error}
          >
            <Input
              ref={nameRef}
              name="name"
              placeholder="Имя"
              value={values.name}
              onChange={(e) => {
                setValue({ name: e.target.value });
              }}
              autoComplete="off"
              spellCheck={false}
              extClassName={styles.input}
            />
            <Input
              name="surname"
              placeholder="Фамилия"
              value={values.surname}
              onChange={(e) => {
                setValue({ surname: e.target.value });
              }}
              autoComplete="off"
              spellCheck={false}
              extClassName={styles.input}
            />
            <Input
              name="email"
              placeholder="E-mail"
              value={values.email}
              onChange={(e) => {
                setValue({ email: e.target.value });
              }}
              autoComplete="off"
              spellCheck={false}
              extClassName={styles.input}
            />
          </Form>
        </>
      )}
    </MainPopup>
  );
}
