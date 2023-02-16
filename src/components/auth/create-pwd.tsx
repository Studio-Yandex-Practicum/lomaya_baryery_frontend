import { useEffect, useRef, useState } from 'react';
import { useFormAndValidation } from '../../hook';
import { InputText } from '../../ui/inputText';
import { AuthContainer, Form } from './elements';
import styles from './create-pwd-styles.module.css';
import { useAuthStore } from '../../services/store';

interface IPwdCreateFormProps {
  token: string;
}

export function PwdCreateForm({ token }: IPwdCreateFormProps) {
  const {
    values: inputValues,
    isValid,
    handleChange,
  } = useFormAndValidation({
    create: '',
    confirm: '',
  });

  const [submitError, setSubmitError] = useState<null | string>(null);

  const { setAuth } = useAuthStore();

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
