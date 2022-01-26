/*
 * Topbar Messages
 *
 * This contains all the text for the Topbar component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Topbar';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Topbar component!',
  },
});
