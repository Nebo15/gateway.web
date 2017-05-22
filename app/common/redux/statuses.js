import { MANAGEMENT_API_URL } from 'config';
import { invoke } from 'helpers/api';
import { createUrl } from 'helpers/url';

export const fetchClasterStatus = options => invoke({
  endpoint: createUrl(`${MANAGEMENT_API_URL}/cluster_status`, options),
  method: 'GET',
  headers: {
    'content-type': 'application/json',
  },
  types: [
    'statuses/FETCH_CLUSTER_STATUS_REQUEST',
    'statuses/FETCH_CLUSTER_STATUS_SUCCESS',
    'statuses/FETCH_CLUSTER_STATUS_FAILURE',
  ],
});

export const fetchRequestMetrics = (apiId, options) => invoke({
  endpoint: createUrl(`${MANAGEMENT_API_URL}/requests_metrics`, options),
  method: 'GET',
  headers: {
    'content-type': 'application/json',
  },
  types: [
    'statuses/FETCH_REQUEST_METRICS_REQUEST',
    'statuses/FETCH_REQUEST_METRICS_SUCCESS',
    'statuses/FETCH_REQUEST_METRICS_FAILURE',
  ],
});
