import { handleAction, combineActions } from 'redux-actions';
import { MANAGEMENT_API_URL } from 'config';
import { normalize, arrayOf } from 'normalizr';
import { invoke } from 'helpers/api';
import { createUrl } from 'helpers/url';
import { pluginsSchema } from 'schema';

export const fetchPlugins = (apiId, options) => invoke({
  endpoint: createUrl(`${MANAGEMENT_API_URL}/apis/${apiId}/plugins`, options),
  method: 'GET',
  headers: {
    'content-type': 'application/json',
  },
  types: ['plugins/FETCH_LIST_REQUEST', {
    type: 'plugins/FETCH_LIST_SUCCESS',
    payload: (action, state, res) => res.json().then(
      json => normalize(json.data, arrayOf(pluginsSchema))
    ),
  }, 'plugins/FETCH_LIST_FAILURE'],
});

export const bindPlugin = (apiId, body, options) => invoke({
  endpoint: createUrl(`${MANAGEMENT_API_URL}/apis/${apiId}/plugins/${body.name}`, options),
  method: 'PUT',
  headers: {
    'content-type': 'application/json',
  },
  body: {
    plugin: body,
  },
  types: ['plugins/BIND_REQUEST', {
    type: 'plugins/BIND_SUCCESS',
    payload: (action, state, res) => res.json().then(
      json => normalize(json.data, arrayOf(pluginsSchema))
    ),
  }, 'plugins/BIND_FAILURE'],
});

export const updatePlugin = (apiId, name, body, options) => invoke({
  endpoint: createUrl(`${MANAGEMENT_API_URL}/apis/${apiId}/plugins/${name}`, options),
  method: 'PUT',
  headers: {
    'content-type': 'application/json',
  },
  body: {
    plugin: body,
  },
  types: ['plugins/UPDATE_REQUEST', {
    type: 'plugins/UPDATE_SUCCESS',
    payload: (action, state, res) => res.json().then(
      json => normalize(json.data, pluginsSchema)
    ),
  }, 'plugins/UPDATE_FAILURE'],
});

export const unbindPlugin = (apiId, name, options) => invoke({
  endpoint: createUrl(`${MANAGEMENT_API_URL}/apis/${apiId}/plugins/${name}`, options),
  method: 'DELETE',
  headers: {
    'content-type': 'application/json',
  },
  types: [
    'plugins/DELETE_REQUEST',
    'plugins/DELETE_SUCCESS',
    'plugins/DELETE_FAILURE',
  ],
});

export default handleAction(
  combineActions(
    'plugins/FETCH_LIST_SUCCESS',
    'plugins/BIND_SUCCESS',
    'plugins/UPDATE_SUCCESS'
  ),
  (state, action) => ({
    ...state,
    ...action.payload.entities.plugins,
  }),
  {}
);
