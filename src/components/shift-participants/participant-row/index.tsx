import cn from 'classnames';
import { CellText } from '../../../ui/table';
import { CellDate } from '../../../ui/table';
import styles from './styles.module.css';

interface IParticipantRowProps {
  extClassName?: string;
  userData: IUser;
}

export function ParticipantRow({
  extClassName,
  userData,
}: IParticipantRowProps) {
  return (
    <div className={cn(styles.row, extClassName, 'tableContentRow')}>
      <CellText type="accent" text={`${userData.name} ${userData.surname}`} />
      <CellText text={userData.city} />
      <CellText text={userData.phone_number} />
      <CellDate date={userData.date_of_birth} />
    </div>
  );
}
