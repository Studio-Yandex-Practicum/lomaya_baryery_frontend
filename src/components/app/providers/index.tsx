import compose from 'compose-function';
import { withRouter } from './with-router';
import { withServerState } from './with-server-state';

export const withProviders = compose(withRouter, withServerState);
