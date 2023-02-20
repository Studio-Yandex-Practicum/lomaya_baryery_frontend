import { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { useEvent } from 'effector-react';
import { appUserModel } from '../..';
import { useFormAndValidation } from '../../../../shared/hook';
import { InputText } from '../../../../shared/ui-kit/inputText';
import { AuthContainer } from '../../../../shared/ui/auth-container';
import { Form } from '../../../../shared/ui/auth-form';
import styles from './styles.module.css';

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
  const setAuth = useEvent(appUserModel.setAuth);

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
      setAuth(true);
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
            'link text text_type_main-default text_color_secondary'
          )}
        >
          Не помню пароль
        </Link>
      </Form>
    </AuthContainer>
  );
}
