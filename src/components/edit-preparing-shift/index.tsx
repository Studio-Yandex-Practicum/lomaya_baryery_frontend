import { IShiftFormData, ShiftSettingsForm } from '../shift-settings-form';
import { useShiftForm } from './lib';

interface IEditPreparingShiftFormProps {
  title: string;
  startDate: string;
  finishDate: string;
  startedFinishDate?: string;
  disabled: boolean;
  loading: boolean;
  onSubmit: (form: IShiftFormData) => void;
}

function EditPreparingShiftForm({
  title,
  startDate,
  finishDate,
  startedFinishDate,
  disabled,
  loading,
  onSubmit,
}: IEditPreparingShiftFormProps) {
  const formProps = useShiftForm(startDate, finishDate, startedFinishDate);

  return (
    <ShiftSettingsForm
      title={title}
      {...formProps}
      disabled={disabled}
      loading={loading}
      onSubmit={onSubmit}
    />
  );
}

export { EditPreparingShiftForm };
export type { IShiftFormData };
