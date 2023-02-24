import { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Form } from 'shared/ui-kit/auth-form';
import { useFormAndValidation } from 'shared/hook';
import { AuthContainer } from 'shared/ui-kit/auth-container';
import { InputText } from 'shared/ui-kit/input-text';
import styles from './styles.module.css';

export function ForgotPwdForm() {
  const {
    values: inputValues,
    errors: inputErrors,
    isValid,
    handleChange,
  } = useFormAndValidation({
    email: '',
  });

  const [submitError, setSubmitError] = useState<null | string>(null);

  const [formSuccess, setFromSuccess] = useState(false);

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
      setFromSuccess(true);
    }

    setSubmitError(inputErrors.email);
  };

  const title = formSuccess ? 'Ссылка отправлена' : 'Восстановление пароля';

  const expanation = formSuccess
    ? 'Письмо придёт в\u00A0течение 5\u00A0минут.\nЕсли письма нет, проверьте в\u00A0папке спам.'
    : 'Укажите почту, которую вы\u00A0использовали при регистрации. Мы\u00A0вышлем ссылку для смены пароля.';

  return (
    <AuthContainer title={title}>
      <p
        className={cn(
          'text text_type_main-default',
          {
            text_color_secondary: !formSuccess,
            text_color_primary: formSuccess,
          },
          styles.explanation
        )}
      >
        {expanation}
      </p>
      {formSuccess && (
        <Link
          to="/login"
          className={cn(
            styles.form__element,
            styles.form__link,
            styles.form__link_align_center,
            'link text text_type_main-default text_color_secondary'
          )}
        >
          На страницу авторизации
        </Link>
      )}
      {formSuccess === false && (
        <Form
          onSubmit={handleSubmit}
          submitError={submitError}
          buttonText="Восстановить"
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
          <Link
            to="/login"
            className={cn(
              styles.form__element,
              styles.form__link,
              styles.form__link_align_end,
              'link text text_type_main-default text_color_secondary'
            )}
          >
            Вспомнил пароль
          </Link>
        </Form>
      )}
    </AuthContainer>
  );
}
