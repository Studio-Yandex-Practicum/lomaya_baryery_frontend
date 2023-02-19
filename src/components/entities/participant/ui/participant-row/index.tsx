import cn from 'classnames';
import { CellDate, CellText } from '../../../../../ui/table';
import styles from './styles.module.css';

interface ParticipantRowProps {
  gridClassName: string;
  userData: {
    name: string;
    surname: string;
    date_of_birth: string;
    city: string;
    phone_number: string;
  };
}

export function ParticipantRow({
  gridClassName,
  userData,
}: ParticipantRowProps) {
  return (
    <div className={cn(styles.row, gridClassName, 'tableContentRow')}>
      <CellText type="accent" text={`${userData.name} ${userData.surname}`} />
      <CellText text={userData.city} />
      <CellText text={userData.phone_number} />
      <CellDate date={userData.date_of_birth} />
    </div>
  );
}
