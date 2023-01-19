import { useState } from 'react';

export function useFormAndValidation<T extends Record<string, string>>(initValues: T) {
  const [values, setValues] = useState<T>(initValues);
  const [errors, setErrors] = useState<T>(initValues);
  const [isValid, setIsValid] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.currentTarget;
    const { form } = input;

    const { value, name, validity, type } = input;
    let { validationMessage } = input;

    switch (type) {
      case 'email':
        if (validity.typeMismatch || validity.valueMissing) {
          validationMessage = 'Укажите верный формат email, например address@domain.ru';
        }
        break;
      default:
        break;
    }

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: validationMessage });

    if (form) {
      setIsValid(form.checkValidity());
    }
  }

  const publicAPI = { values, errors, isValid, handleChange };

  return publicAPI;
}
