import compose from 'compose-function';
import { withRouter } from './with-router';
import { withStore } from './with-store';
import { withServerState } from './with-server-state';

export const withProviders = compose(withRouter, withStore, withServerState);
