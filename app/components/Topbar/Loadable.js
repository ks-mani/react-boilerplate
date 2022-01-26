/**
 *
 * Asynchronously loads the component for Topbar
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
