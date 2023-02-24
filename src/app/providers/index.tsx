import compose from 'compose-function';
import { withRouter } from './with-router';
import { withAuth } from './with-auth';

export const withProviders = compose(withRouter, withAuth);
