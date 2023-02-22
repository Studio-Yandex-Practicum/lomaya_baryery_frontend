import { useEffect, useRef, useState } from 'react';
import { useEvent } from 'effector-react';
import { Form } from 'shared/ui-kit/auth-form';
import { useFormAndValidation } from 'shared/hook';
import { InputText } from 'shared/ui-kit/inputText';
import { AuthContainer } from 'shared/ui-kit/auth-container';
import { authModel } from '../..';
import styles from './styles.module.css';

export function PwdCreateForm() {
  const {
    values: inputValues,
    isValid,
    handleChange,
  } = useFormAndValidation({
    create: '',
    confirm: '',
  });

  const [submitError, setSubmitError] = useState<null | string>(null);

  const setAuth = useEvent(authModel.setAuth);

  const createRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (createRef.current) {
      createRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setSubmitError(null);
  }, [inputValues]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isValid && inputValues.create === inputValues.confirm) {
      setAuth(true);
      return;
    }

    if (!isValid) {
      setSubmitError('Все поля обязательные');
      return;
    }

    if (inputValues.create !== inputValues.confirm) {
      setSubmitError('Пароль не совпадает');
    }
  };

  return (
    <AuthContainer title="Создание пароля">
      <Form
        onSubmit={handleSubmit}
        submitError={submitError}
        buttonText="Сохранить"
      >
        <InputText
          extClassName={styles.form__input}
          ref={createRef}
          onChange={handleChange}
          name="create"
          placeholder="Придумайте пароль"
          value={inputValues.create}
          type="password"
          minLength={1}
          autoComplete="off"
          required
        />
        <InputText
          extClassName={styles.form__input}
          onChange={handleChange}
          name="confirm"
          placeholder="Повторите пароль"
          value={inputValues.confirm}
          type="password"
          minLength={1}
          autoComplete="off"
          required
        />
      </Form>
    </AuthContainer>
  );
}
