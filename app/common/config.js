
let config = {};

if (__CLIENT__ && window && window.__CONFIG__) {
  try {
    config = JSON.parse(unescape(window.__CONFIG__));
  } catch (e) {} // eslint-disable-line
}

export const PORT = config.PORT || process.env.PORT || 8080;
export const HOSTNAME = typeof window !== 'undefined' ? window.location.origin : (config.HOSTNAME || 'http://localhost:8080');
export const MANAGEMENT_ENDPOINT = config.MANAGEMENT_ENDPOINT || process.env.MANAGEMENT_ENDPOINT || 'http://localhost:4001';
export const PUBLIC_ENDPOINT = config.PUBLIC_ENDPOINT || process.env.PUBLIC_ENDPOINT || 'http://localhost:4000';

export const TRACER_URL = config.TRACER_URL || process.env.TRACER_URL;

export const MANAGEMENT_API_PROXY_PATH = '/admin/api';
export const PUBLIC_API_PROXY_PATH = '/api';

// for internal app usage. for example for XHR requests or server side rendering
export const MANAGEMENT_API_URL = typeof window !== 'undefined' ? MANAGEMENT_API_PROXY_PATH : MANAGEMENT_ENDPOINT;
export const PUBLIC_API_URL = typeof window !== 'undefined' ? PUBLIC_API_PROXY_PATH : PUBLIC_ENDPOINT;
