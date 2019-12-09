/**
 * MobX store classes instantiation.
 * This is where all MobX stores are instantiated
 * and exported for use within the Provider.
 */

import { configure } from 'mobx';
import AppStore from './AppStore';

/**
 * Configuration to ensure all state changes occur via MobX actions
 */
configure({ enforceActions: 'observed' });

/**
 * AppStore - For app wide configurations.
 * @class
 */
const appStore = new AppStore();

export default {
  appStore,
};
