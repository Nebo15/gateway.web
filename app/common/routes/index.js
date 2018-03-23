import React from 'react';
import { Route, IndexRedirect, IndexRoute } from 'react-router';

import ApiListPage from 'containers/pages/ApiListPage';
import ApiCreatePage from 'containers/pages/ApiCreatePage';
import ApiEditPage from 'containers/pages/ApiEditPage';

import PluginCreatePage from 'containers/pages/PluginCreatePage';
import PluginEditPage from 'containers/pages/PluginEditPage';

import RequestListPage from 'containers/pages/RequestListPage';
import StatusPage from 'containers/pages/StatusPage';

import NotFoundPage from 'containers/pages/NotFoundPage';

import App from 'containers/layouts/App';
import MainLayout from 'containers/layouts/Main';

export const configureRoutes = ({ store }) => { // eslint-disable-line
  return (
    <Route path="/" component={App}>
      <Route component={MainLayout}>
        <IndexRedirect to="apis" />
        <Route path="/apis">
          <IndexRoute component={ApiListPage} />
          <Route path="create" component={ApiCreatePage} />
          <Route path=":apiId" component={ApiEditPage} />
          <Route path=":apiId/plugins">
            <Route path="add" component={PluginCreatePage} />
            <Route path=":pluginName" component={PluginEditPage} />
          </Route>
        </Route>
        <Route path="requests" component={RequestListPage} />
        <Route path="status" component={StatusPage} />
        <Route path="*" component={NotFoundPage} />
      </Route>
    </Route>
  );
};
