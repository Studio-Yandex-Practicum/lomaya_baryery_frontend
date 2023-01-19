import { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { signIn } from '../../../redux-store/auth';
import { useFormAndValidation } from '../../../hook';
import { useAppDispatch } from '../../../redux-store/hooks';
import { Button } from '../../../ui/button';
import { InputText } from '../../../ui/inputText';
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

  const [submitError, setSubmitError] = useState<null | string>(null);

  const dispatch = useAppDispatch();

  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setSubmitError(null);
  }, [inputValues]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isValid) {
      dispatch(signIn(inputValues.email));
    } else {
      if (Object.values(inputValues).every((value) => !Boolean(value))) {
        setSubmitError('Все поля обязательные');
        return;
      }
      if (inputErrors.email) {
        setSubmitError(inputErrors.email);
      }
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit} className={styles.form}>
      <InputText
        extClassName={styles.form__input}
        ref={emailRef}
        onChange={handleChange}
        name="email"
        placeholder="Ваш e-mail"
        value={inputValues.email}
        type="email"
        autoComplete="off"
        required
      />
      <InputText
        extClassName={styles.form__input}
        onChange={handleChange}
        name="pwd"
        placeholder="Введите пароль"
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
      <div className={styles.form__submitWrapper}>
        {submitError && <span className={cn('text', styles.form__submitError)}>{submitError}</span>}
        <Button extClassName={styles.form__element} htmlType="submit">
          Войти
        </Button>
      </div>
    </form>
  );
}
