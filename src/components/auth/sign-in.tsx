import { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { useFormAndValidation } from '../../hook';
import { AuthContainer, Form } from './elements';
import { InputText } from '../../ui/inputText';
import styles from './sign-in-styles.module.css';
import { useAuthStore } from '../../services/store';
import { authEvent } from '../../services/store/auth-store/auth';

export function SignInForm() {
  const {
    values: inputValues,
    errors: inputErrors,
    isValid,
    handleChange,
  } = useFormAndValidation({
    email: '',
    pwd: '',
  });

  const [submitError, setSubmitError] = useState<null | string>(null);

  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setSubmitError(null);
  }, [inputValues]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isValid) {
      authEvent(true);
    } else {
      if (Object.values(inputValues).some((value) => !Boolean(value))) {
        setSubmitError('Все поля обязательные');
        return;
      }
      if (inputErrors.email) {
        setSubmitError(inputErrors.email);
      }
    }
  };

  return (
    <AuthContainer title="Вход">
      <Form
        onSubmit={handleSubmit}
        submitError={submitError}
        buttonText="Войти"
      >
        <InputText
          extClassName={styles.form__input}
          ref={emailRef}
          onChange={handleChange}
          name="email"
          placeholder="E-mail"
          value={inputValues.email}
          type="email"
          autoComplete="off"
          required
        />
        <InputText
          extClassName={styles.form__input}
          onChange={handleChange}
          name="pwd"
          placeholder="Пароль"
          value={inputValues.pwd}
          type="password"
          minLength={1}
          autoComplete="off"
          required
        />
        <Link
          to="/pwd_forgot"
          className={cn(
            styles.form__element,
            styles.form__link,
            'link text text_type_main-default text_color_secondary',
          )}
        >
          Не помню пароль
        </Link>
      </Form>
    </AuthContainer>
  );
}
