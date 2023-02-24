import React, { useEffect } from 'react';
import { viewerModel } from 'entities/viewer';

export function withAuth(
  WrappedComponent: React.ComponentType
): React.FunctionComponent {
  return function WrappedComponenet() {
    useEffect(() => {
      viewerModel.verifyViewer();
    }, []);

    return <WrappedComponent />;
  };
}
