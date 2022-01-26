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
import { Layout } from 'antd';

import Topbar from '../../components/Topbar/Loadable';
import FilterComponent from '../FilterComponent/Loadable';
import LabelContainer from '../LabelContainer/Loadable';
import './index.css';

export default function App() {
  return (
    <div>
      <Topbar />
      <Layout>
        <Layout.Content style={{ padding: '0 50px', height: '90vh' }}>
          <div className="site-layout-content">
            <Switch>
              <Route exact path="/filters" component={FilterComponent} />
              <Route exact path="/labels" component={LabelContainer} />
              <Redirect from="*" to="/filters" />
            </Switch>
          </div>
        </Layout.Content>
      </Layout>
    </div>
  );
}
