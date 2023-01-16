import { compose } from '@reduxjs/toolkit';
import { withRouter } from './with-router';
import { withStore } from './with-store';

export const withProviders = compose(withRouter, withStore);
