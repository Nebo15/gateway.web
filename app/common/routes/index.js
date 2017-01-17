import React from 'react';
import { Route, IndexRedirect, IndexRoute } from 'react-router';

import App from 'containers/layouts/App';
import MainLayout from 'containers/layouts/Main';

import ExamplePage from 'containers/pages/ExamplePage';

import ApiListPage from 'containers/pages/ApiListPage';
import ApiCreatePage from 'containers/pages/ApiCreatePage';

export const configureRoutes = ({ store }) => { // eslint-disable-line
  return (
    <Route path="/" component={App}>
      <Route component={MainLayout}>
        <IndexRedirect to="apis" />
        <Route path="/apis">
          <IndexRoute component={ApiListPage} />
          <Route path="create" component={ApiCreatePage} />
        </Route>
        <Route path="example" component={ExamplePage} />
      </Route>
    </Route>
  );
};
