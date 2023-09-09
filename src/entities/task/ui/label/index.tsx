import { IStatusLabelProps, StatusLabel } from 'shared/ui-kit/status-label';

interface TaskLabelProps {
  taskStatus: boolean;
}

export function TaskLabel({ taskStatus }: TaskLabelProps) {
  const labelProps = (() => {
    // eslint-disable-next-line default-case
    switch (taskStatus) {
      case false:
        return {
          icon: 'CircleCheckIcon',
          statusText: 'активное',
          type: 'approved',
        } satisfies IStatusLabelProps;
      case true:
        return {
          icon: 'CircleStopIcon',
          statusText: 'архивное',
          type: 'rejected',
        } satisfies IStatusLabelProps;
    }
  })();

  return <StatusLabel {...labelProps} />;
}
