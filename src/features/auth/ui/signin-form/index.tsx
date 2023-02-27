import { useEffect, useRef } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Form } from 'shared/ui-kit/auth-form';
import { Input } from 'shared/ui-kit/input';
import { AuthContainer } from 'shared/ui-kit/auth-container';
import { useStore } from 'effector-react';
import { authModel } from 'features/auth';
import styles from './styles.module.css';

export function SignInForm() {
  const { sendForm, setValue, clear } = authModel;
  const values = useStore(authModel.$values);
  const isLoading = useStore(authModel.$isLoading);
  const error = useStore(authModel.$error);

  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
    return () => {
      clear();
    };
  }, [clear]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    sendForm();
  };

  return (
    <AuthContainer title="Вход">
      <Form
        loading={isLoading}
        onSubmit={handleSubmit}
        submitError={error}
        buttonText="Войти"
      >
        <Input
          extClassName={styles.form__input}
          ref={emailRef}
          onChange={(e) => {
            setValue({ email: e.target.value });
          }}
          name="email"
          placeholder="E-mail"
          value={values.email}
          type="email"
          autoComplete="off"
          required
        />
        <Input
          extClassName={styles.form__input}
          onChange={(e) => {
            setValue({ password: e.target.value });
          }}
          name="pwd"
          placeholder="Пароль"
          value={values.password}
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
