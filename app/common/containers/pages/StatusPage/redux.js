import { combineReducers } from 'redux';
import { handleAction, createAction } from 'redux-actions';
import * as fromStatuses from 'redux/statuses';

export const setClusterStatus = createAction('statusPage/SET_CLUSTER_STATUS');
export const setRequestMetrics = createAction('statusPage/SET_REQUEST_METRICS');

export const fetchClusterStatus = () => dispatch =>
  dispatch(fromStatuses.fetchClasterStatus({
    interval: '5 minute',
  }))
  .then((action) => {
    if (action.error) throw action;
    return dispatch(setClusterStatus(action.payload.data));
  });

export const fetchRequestMetrics = () => dispatch =>
  dispatch(fromStatuses.fetchRequestMetrics())
  .then((action) => {
    if (action.error) throw action;
    return dispatch(setRequestMetrics(action.payload.data));
  });

const clusterStatus = handleAction(setClusterStatus, (state, action) => action.payload, []);
const requestMetrics = handleAction(setRequestMetrics, (state, action) => action.payload, []);

export default combineReducers({
  clusterStatus,
  requestMetrics,
});
