import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../../redux-store';

export const withStore =
  (WrappedComponent: React.ComponentType): React.FunctionComponent =>
  () =>
    (
      <Provider store={store}>
        <WrappedComponent />
      </Provider>
    );
