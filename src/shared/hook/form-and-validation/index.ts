import { useState } from 'react';

export function useFormAndValidation<T extends string>(
  initValues: Record<T, string>
) {
  const [values, setValues] = useState(initValues);

  const [errors, setErrors] = useState(function lazyInit() {
    const entries = Object.entries(initValues);
    entries.forEach(function clearValues(entrie) {
      entrie[1] = '';
    });
    const initErrors = Object.fromEntries(entries);
    return initErrors as Record<T, string>;
  });

  const [isValid, setIsValid] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.currentTarget;
    const { form } = input;

    const { value, name, validity, type } = input;
    let { validationMessage } = input;

    switch (type) {
      case 'email':
        if (validity.typeMismatch || validity.valueMissing) {
          validationMessage =
            'E-mail не соответствует формату: address@domain.ru';
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
