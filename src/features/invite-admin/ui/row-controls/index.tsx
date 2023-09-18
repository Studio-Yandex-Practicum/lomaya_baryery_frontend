import cn from 'classnames';
import { useStore } from 'effector-react';
import { Button } from 'shared/ui-kit/button';
import { adminModel } from 'entities/admin';
import { reactivate, deactivate } from './model';
import styles from './styles.module.css';

interface RowControlsProps {
  data: {
    id: string;
    name: string;
    surname: string;
    email: string;
    expired_datetime: string;
  };
}

export function RowControls({ data }: RowControlsProps) {
  const admins = useStore(adminModel.$adminsState);
  const adminsEmails = admins.data.map((person) => person.email);
  const isPersonRegistered = adminsEmails.includes(data.email);
  const currentDate = new Date();
  const expirationDate = Date.parse(data.expired_datetime);
  const isInvitationExpired = Boolean(
    currentDate.getTime() - expirationDate > 0
  );

  const handleClick = () => {
    if (isInvitationExpired) {
      reactivate(data.id);
    } else {
      deactivate(data.id);
    }
  };

  return (
    <>
      {!isPersonRegistered && (
        <div className={styles.buttons_container}>
          <Button
            size="micro"
            type="secondary"
            htmlType="button"
            onClick={handleClick}
            extClassName={cn(styles.button, styles.button_type_approve)}
          >
            Отправить повторно
          </Button>
          <Button
            disabled={isInvitationExpired}
            size="micro"
            type="secondary"
            htmlType="button"
            onClick={handleClick}
            extClassName={cn(styles.button, styles.button_type_approve)}
          >
            Отозвать
          </Button>
        </div>
      )}
    </>
  );
}
