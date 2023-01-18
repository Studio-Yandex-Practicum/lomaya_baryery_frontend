import { useState } from 'react';

export function useFormAndValidation<T>(initValues: T) {
  const [values, setValues] = useState<T>(initValues);
  const [errors, setErrors] = useState<T>(initValues);
  const [isValid, setIsValid] = useState(true);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, name, validationMessage } = e.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: validationMessage });

    const form = e.target.closest('form') as HTMLFormElement;
    if (form) {
      setIsValid(form.checkValidity());
    }
  }

  return { values, errors, isValid, handleChange };
}
