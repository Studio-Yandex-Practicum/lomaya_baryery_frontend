import React, { useState } from 'react';
import cn from 'classnames';
import { Button } from '../../ui/button';
import styles from './styles.module.css';

interface IMessageFormProps {
  btnText: string;
  onSubmit: (inputValue: string) => void;
  initValue?: string;
  placeholder?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
}

export const MessageForm: React.FC<IMessageFormProps> = ({
  btnText = 'Сохранить',
  onSubmit,
  initValue,
  placeholder = 'Введите сообщение',
  isLoading,
  isDisabled,
}) => {
  const [inputValue, changeInputValue] = useState(initValue ?? '');

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    onSubmit(inputValue);
  };

  return (
    <form className={styles.messageForm} onSubmit={handleSubmit}>
      <textarea
        value={inputValue}
        name="message"
        placeholder={placeholder}
        className={cn(styles.messageForm__input, 'text border')}
        onChange={(evt) => changeInputValue(evt.currentTarget.value)}
        spellCheck="false"
      />
      <Button
        size="small"
        htmlType="submit"
        extClassName={cn(styles.messageForm__button)}
        loading={isLoading}
        disabled={inputValue === '' || isDisabled || isLoading}
      >
        {btnText}
      </Button>
    </form>
  );
};
