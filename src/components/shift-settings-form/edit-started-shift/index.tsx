import { IShiftFormData, ShiftSettingsForm } from '../form';
import { useShiftForm } from './lib';

interface IEditStartedShiftFormProps {
  title: string;
  startDate: string;
  finishDate: string;
  preparingStartDate?: string;
  disabled: boolean;
  loading: boolean;
  onSubmit: (form: IShiftFormData) => void;
}

function EditStartedShiftForm({
  title,
  startDate,
  finishDate,
  preparingStartDate,
  disabled,
  loading,
  onSubmit,
}: IEditStartedShiftFormProps) {
  const formProps = useShiftForm(startDate, finishDate, preparingStartDate);

  return (
    <ShiftSettingsForm
      title={title}
      {...formProps}
      disabledStart
      disabled={disabled}
      loading={loading}
      onSubmit={onSubmit}
    />
  );
}

export { EditStartedShiftForm };
export type { IShiftFormData };
