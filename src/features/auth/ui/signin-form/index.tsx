import { useEffect, useRef } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Form } from 'shared/ui-kit/form';
import { Input } from 'shared/ui-kit/input';
import { AuthContainer } from 'shared/ui-kit/auth-container';
import { useStore } from 'effector-react';
import { authModel } from 'features/auth';
import styles from './styles.module.css';

export function SignInForm() {
  const { sendForm, setValue, clear } = authModel.signin;
  const values = useStore(authModel.signin.$values);
  const isLoading = useStore(authModel.signin.$isLoading);
  const error = useStore(authModel.signin.$error);

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
          spellCheck={false}
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
          autoComplete="off"
          spellCheck={false}
        />
        {/* <Link
          to="/pwd_forgot"
          className={cn(
            styles.form__element,
            styles.form__link,
            'link text text_type_main-default text_color_secondary'
          )}
        >
          Не помню пароль
        </Link> */}
      </Form>
    </AuthContainer>
  );
}
