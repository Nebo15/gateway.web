import { handleAction, combineActions } from 'redux-actions';
import { MANAGEMENT_API_URL } from 'config';
import { normalize, arrayOf } from 'normalizr';
import { invoke } from 'helpers/api';
import { createUrl } from 'helpers/url';
import { apiSchema } from 'schema';
import uuidV4 from 'uuid/v4';

export const fetchApis = options => invoke({
  endpoint: createUrl(`${MANAGEMENT_API_URL}/apis`, options),
  method: 'GET',
  headers: {
    'content-type': 'application/json',
  },
  types: ['apis/FETCH_LIST_REQUEST', {
    type: 'apis/FETCH_LIST_SUCCESS',
    payload: (action, state, res) => res.json().then(
      json => normalize(json.data, arrayOf(apiSchema))
    ),
  }, 'apis/FETCH_LIST_FAILURE'],
});

export const fetchApi = (apiId, options) => invoke({
  endpoint: createUrl(`${MANAGEMENT_API_URL}/apis/${apiId}`, options),
  method: 'GET',
  headers: {
    'content-type': 'application/json',
  },
  types: ['apis/FETCH_DETAILS_REQUEST', {
    type: 'apis/FETCH_DETAILS_SUCCESS',
    payload: (action, state, res) => res.json().then(
      json => normalize(json.data, apiSchema)
    ),
  }, 'apis/FETCH_DETAILS_FAILURE'],
});

export const createApi = (body, options) => invoke({
  endpoint: createUrl(`${MANAGEMENT_API_URL}/apis/${uuidV4()}`, options),
  method: 'PUT',
  headers: {
    'content-type': 'application/json',
  },
  body: {
    api: body,
  },
  types: ['apis/CREATE_REQUEST', {
    type: 'apis/CREATE_SUCCESS',
    payload: (action, state, res) => res.json().then(
      json => normalize(json.data, apiSchema)
    ),
  }, 'apis/CREATE_FAILURE'],
});

export const updateApi = (apiId, body, options) => invoke({
  endpoint: createUrl(`${MANAGEMENT_API_URL}/apis/${apiId}`, options),
  method: 'PUT',
  headers: {
    'content-type': 'application/json',
  },
  body: {
    api: body,
  },
  types: ['apis/UPDATE_REQUEST', {
    type: 'apis/UPDATE_SUCCESS',
    payload: (action, state, res) => res.json().then(
      json => normalize(json.data, apiSchema)
    ),
  }, 'apis/UPDATE_FAILURE'],
});

export const deleteApi = (apiId, options) => invoke({
  endpoint: createUrl(`${MANAGEMENT_API_URL}/apis/${apiId}`, options),
  method: 'DELETE',
  headers: {
    'content-type': 'application/json',
  },
  types: ['apis/DELETE_REQUEST', 'apis/DELETE_SUCCESS', 'apis/DELETE_FAILURE'],
});

export default handleAction(
  combineActions(
    'apis/FETCH_LIST_SUCCESS',
    'apis/FETCH_DETAILS_SUCCESS',
    'apis/CREATE_SUCCESS',
    'apis/UPDATE_SUCCESS'
  ),
  (state, action) => ({
    ...state,
    ...action.payload.entities.apis,
  }),
  {}
);
