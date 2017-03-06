
let config = {};

if (global.__CLIENT__ && window && window.__CONFIG__) {
  try {
    config = JSON.parse(unescape(window.__CONFIG__));
  } catch (e) {} // eslint-disable-line
}

export const PORT = config.PORT || process.env.PORT || 8080;
export const HOSTNAME = typeof window !== 'undefined' ? window.location.origin : (config.HOSTNAME || 'http://localhost:8080');
export const ADMIN_API_HOST = process.env.ADMIN_API_HOST || 'http://192.168.99.100:4001';
export const PUBLIC_API_HOST = process.env.PUBLIC_API_HOST || 'http://192.168.99.100:4000';

export const ADMIN_API_PROXY_PATH = '/admin/api';
export const PUBLIC_API_PROXY_PATH = '/api';

// for internal app usage. for example for XHR requests or server side rendering
export const ADMIN_API_URL = typeof window !== 'undefined' ? ADMIN_API_PROXY_PATH : ADMIN_API_HOST;
export const PUBLIC_API_URL = typeof window !== 'undefined' ? PUBLIC_API_PROXY_PATH : PUBLIC_API_HOST;
