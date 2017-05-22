import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';

import ApiListPage from 'containers/pages/ApiListPage/redux';
import ApiCreatePage from 'containers/pages/ApiCreatePage/redux';
import ApiEditPage from 'containers/pages/ApiEditPage/redux';
import PluginEditPage from 'containers/pages/PluginEditPage/redux';
import PluginCreatePage from 'containers/pages/PluginCreatePage/redux';
import RequestListPage from 'containers/pages/RequestListPage/redux';
import StatusPage from 'containers/pages/StatusPage/redux';

import Aside from 'containers/blocks/Aside/redux';

import apis from 'redux/apis';
import requests from 'redux/requests';
import plugins from 'redux/plugins';

const data = combineReducers({
  apis,
  requests,
  plugins,
});

const pages = combineReducers({
  ApiListPage,
  ApiCreatePage,
  ApiEditPage,
  PluginEditPage,
  PluginCreatePage,
  RequestListPage,
  StatusPage,
});

const blocks = combineReducers({
  Aside,
});

export default combineReducers({
  form: formReducer,
  routing: routerReducer,
  data,
  pages,
  blocks,
});

export const getForm = (state, formName) => state.form[formName];

export const getApi = (state, apiId) => state.data.apis[apiId];
export const getApis = (state, apis) => apis.map(id => getApi(state, id));

export const getRequest = (state, requestId) => state.data.requests[requestId];
export const getRequests = (state, requests) => requests.map(id => getRequest(state, id));

export const getPlugin = (state, pluginId) => state.data.plugins[pluginId];
export const getPlugins = (state, plugins) => plugins.map(id => getPlugin(state, id));
