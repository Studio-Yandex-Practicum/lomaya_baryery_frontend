import React from 'react';
import { BrowserRouter } from 'react-router-dom';

export const withRouter =
  (WrappedComponent: React.ComponentType): React.FunctionComponent =>
  () =>
    (
      <BrowserRouter>
        <WrappedComponent />
      </BrowserRouter>
    );
