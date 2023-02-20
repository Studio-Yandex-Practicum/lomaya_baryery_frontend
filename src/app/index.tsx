import { AppRoutes } from '../pages';
import { withProviders } from './providers';
import './assets/styles/index.css';

const App = () => <AppRoutes />;
export default withProviders(App);
