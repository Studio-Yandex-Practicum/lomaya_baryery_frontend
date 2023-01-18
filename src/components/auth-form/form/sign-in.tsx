import { useEffect, useRef } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { signIn } from '../../../redux-store/auth';
import { useFormAndValidation } from '../../hooks';
import { useAppDispatch } from '../../../redux-store/hooks';
import { Button } from '../../../ui/button';
import { InputText } from '../../../ui/inputText';
import styles from './styles.module.css';

export function SignInForm() {
  const { values, errors, isValid, handleChange } = useFormAndValidation({ email: '', pwd: '' });
  const dispatch = useAppDispatch();

  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(signIn(values.email));
  }

  return (
    <form noValidate onSubmit={handleSubmit} className={styles.form}>
      <InputText
        extClassName={styles.form__input}
        ref={emailRef}
        onChange={handleChange}
        name="email"
        placeholder="Ваш e-mail"
        value={values.email}
        type="email"
        autoComplete="off"
        required
        error={Boolean(errors.email)}
        errorText={errors.email}
      />
      <InputText
        extClassName={styles.form__input}
        onChange={handleChange}
        name="pwd"
        placeholder="Введите пароль"
        value={values.pwd}
        type="password"
        autoComplete="off"
        required
        minLength={6}
        error={Boolean(errors.pwd)}
        errorText={errors.pwd}
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
      <Button extClassName={styles.form__element} htmlType="submit">
        Войти
      </Button>
    </form>
  );
}
