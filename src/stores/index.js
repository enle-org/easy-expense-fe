/**
 * MobX store classes instantiation.
 * This is where all MobX stores are instantiated
 * and exported for use within the Provider.
 */

import { configure } from 'mobx';
import AppStore from './AppStore';
import AuthStore from './AuthStore';
import DashboardStore from './DashboardStore';

/**
 * Configuration to ensure all state changes occur via MobX actions
 */
configure({ enforceActions: 'observed' });

/**
 * AppStore - For app wide configurations.
 * @class
 */
const appStore = new AppStore();
const authStore = new AuthStore();
const dashboardStore = new DashboardStore();

export default {
  appStore,
  authStore,
  dashboardStore,
};
