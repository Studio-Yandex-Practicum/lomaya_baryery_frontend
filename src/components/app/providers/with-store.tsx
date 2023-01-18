import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../../redux-store';

export function withStore(WrappedComponent: React.ComponentType): React.FunctionComponent {
  return function wrappedComponenet() {
    return (
      <Provider store={store}>
        <WrappedComponent />
      </Provider>
    );
  };
}
