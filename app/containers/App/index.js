/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from 'containers/Home/Loadable';

import Topbar from '../../components/Topbar/Loadable';

export default function App() {
  return (
    <div>
      <Topbar />
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </div>
  );
}
