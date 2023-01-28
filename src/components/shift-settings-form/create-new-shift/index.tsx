import { IShiftFormData, ShiftSettingsForm } from '../form';
import { useShiftForm } from './lib';

interface ICreateNewShiftProps {
  startedFinishDate?: string;
  disabled: boolean;
  loading: boolean;
  onSubmit: (form: IShiftFormData) => void;
}

function CreateNewShiftForm({
  startedFinishDate,
  disabled,
  loading,
  onSubmit,
}: ICreateNewShiftProps) {
  const formProps = useShiftForm(startedFinishDate);

  return (
    <ShiftSettingsForm
      {...formProps}
      disabled={disabled}
      loading={loading}
      onSubmit={onSubmit}
      buttonContent="Создать"
    />
  );
}

export { CreateNewShiftForm };
export type { IShiftFormData };
