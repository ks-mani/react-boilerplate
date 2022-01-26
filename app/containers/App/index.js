/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Topbar from '../../components/Topbar/Loadable';
import FilterComponent from '../FilterComponent/Loadable';
import LabelContainer from '../LabelContainer/Loadable';

export default function App() {
  return (
    <div>
      <Topbar />
      <Switch>
        <Route exact path="/filters" component={FilterComponent} />
        <Route exact path="/labels" component={LabelContainer} />
        <Redirect from="/" to="/filters" />
      </Switch>
    </div>
  );
}
