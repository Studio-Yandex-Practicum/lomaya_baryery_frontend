import { CellLink, CellText, RowLow } from 'shared/ui-kit/table';
import styles from './styles.module.css';

interface MemberRowProps {
  routePath: string;
  gridClassName: string;
  memberParams?: {
    name: string;
    surname: string;
    city: string;
    shifts_count: number;
    phone_number: string;
    is_in_active_shift: boolean;
    status: string;
  } | null;
}

export function MemberRow({
  routePath,
  memberParams,
  gridClassName,
}: MemberRowProps) {
  if (memberParams === null || !memberParams) {
    return null;
  }
  return (
    <RowLow extClassName={styles.row} gridClassName={gridClassName}>
      <CellLink
        text={`${memberParams.name} ${memberParams.surname}`}
        routeTo={routePath}
      />
      <CellText text={memberParams.city} />
      <CellText text={memberParams.phone_number} />
      <div className={styles.shiftsNumber}>
        <CellText text={memberParams.shifts_count} />
        {memberParams.is_in_active_shift && (
          <p className={styles.shiftCurrent}>В текущей</p>
        )}
      </div>
    </RowLow>
  );
}
