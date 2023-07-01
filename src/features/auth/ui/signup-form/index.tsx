import { useEffect, useRef } from 'react';
import { Form } from 'shared/ui-kit/form';
import { InputPassword } from 'shared/ui-kit/input-password';
import { AuthContainer } from 'shared/ui-kit/auth-container';
import { authModel } from 'features/auth';
import { useStore } from 'effector-react';
import styles from './styles.module.css';

export function SignUpForm() {
  const { setValue, submit, clear } = authModel.signup;
  const values = useStore(authModel.signup.$values);
  const isLoading = useStore(authModel.signup.$isSubmiting);
  const error = useStore(authModel.signup.$submitError);

  const createRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (createRef.current) {
      createRef.current.focus();
    }
    return () => {
      clear();
    };
  }, [clear]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit();
  };

  return (
    <AuthContainer title="Создание пароля">
      <Form
        onSubmit={handleSubmit}
        submitError={error}
        buttonText="Сохранить"
        loading={isLoading}
      >
        <InputPassword
          extClassName={styles.form__input}
          ref={createRef}
          onChange={(e) => {
            setValue({ pwd: e.target.value });
          }}
          name="pwd"
          placeholder="Придумайте пароль"
          value={values.pwd}
          autoComplete="off"
        />
        <InputPassword
          extClassName={styles.form__input}
          onChange={(e) => {
            setValue({ repeatPwd: e.target.value });
          }}
          name="repeatPwd"
          placeholder="Повторите пароль"
          value={values.repeatPwd}
          autoComplete="off"
        />
      </Form>
    </AuthContainer>
  );
}
