import React from 'react';
import classnames from 'classnames';
import HttpStatusCode from 'http-status-codes';
import Highlight from 'react-highlight';
import CopyToClipboard from 'react-copy-to-clipboard';

import Button, { ButtonsGroup } from 'components/Button';
import highlight from 'highlight.js/styles/color-brewer.css';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import Url from 'url';

import { PUBLIC_ENDPOINT, TRACER_URL } from 'config';

import styles from './styles.scss';

const formateResponse = (string) => {
  try {
    return JSON.stringify(JSON.parse(string), null, 2);
  } catch (e) {
    return string.length > 255 ? `${string.substring(0, 255)}...` : string;
  }
};
const formatIfJson = (obj, ...args) => {
  try {
    return JSON.stringify(obj, ...args);
  } catch (e) {
    return obj;
  }
};

const headersToArray = headers => Object.entries(headers).map(([type, value]) => ({
  type,
  value,
}));

const responseToHttp = response =>
  `HTTP/1.1 ${response.status_code} ${HttpStatusCode.getStatusText(response.status_code)}\n` +
  `${headersToArray(response.headers).map(({ type, value }) => `${type}: ${value}`).join('\n')}\n\n` +
  `${formateResponse(response.body)}\n`;

const requestToUrl = request => Url.format({
  pathname: request.uri,
  query: request.query,
});

const requestToHttp = request =>
  `${request.method} ${requestToUrl(request)} HTTP/1.1\n` +
  `${headersToArray(request.headers).map(({ type, value }) => `${type}: ${value}`).join('\n')}\n\n` +
  `${formateResponse(request.body)}\n`;

const requestToCurl = request =>
  `curl -X ${request.method} ${PUBLIC_ENDPOINT}${requestToUrl(request)} \\\n` +
  `     ${headersToArray(request.headers).map(({ type, value }) => `-H '${type}: ${value}'`).join(' \\\n     ')} \\\n` +
  `     -d '${formatIfJson(request.body, null, 2)}'`;

@withStyles(highlight)
@withStyles(styles)
export default class RequestDetails extends React.Component {
  constructor(props) {
    super(props);
    this.onCopy = this.onCopy.bind(this);
  }
  state = {
    curlCopied: false,
  };
  onCopy() {
    this.setState({ curlCopied: true }, () => {
      setTimeout(() => {
        this.setState({ curlCopied: false });
      }, 1500);
    });
  }
  render() {
    const { request, response, latencies, onDeleteRequestClick = () => {}, ...rest } = this.props;
    const curl = requestToCurl(request);
    return (<div className={styles.wrap}>
      <div className={styles.row}>
        <div className={styles.column}>
          <div className={styles.column__header}>
            Request
            <div className={styles.column__header__buttons}>
              <ButtonsGroup>
                <CopyToClipboard text={curl} onCopy={this.onCopy}>
                  <Button theme="link">{this.state.curlCopied ? 'Copied' : 'Copy CURL'}</Button>
                </CopyToClipboard>
                { TRACER_URL &&
                  <Button
                    theme="link"
                    to={TRACER_URL.replace('{request_id}', rest.id)}
                    rel="noopener noreferrer"
                    target="__blank"
                  >Trace Request</Button>}
              </ButtonsGroup>
            </div>
          </div>
          <div className={styles.column__body}>
            <Highlight className="language-http">
              { requestToHttp(request) }
            </Highlight>
          </div>
        </div>
        <div className={styles.column}>
          <div className={styles.column__header}>Response</div>
          <div className={styles.column__body}>
            <Highlight className="language-http">
              { responseToHttp(response) }
            </Highlight>
          </div>
        </div>
      </div>
      <div className={styles.row}>
        <div className={classnames(styles.column)}>
          <div className={styles.column__header}>Latencies</div>
          <div className={styles.column__body}>
            <p><b>Gateway</b>: {latencies.gateway}μs</p>
            <p><b>Upstream</b>: {latencies.upstream ? `${latencies.upstream}μs` : '–'}</p>
            <p><b>Client request:</b>: {latencies.client_request}μs</p>
          </div>
        </div>
        <div className={classnames(styles.column)}>
          <div className={styles.column__header}>Info</div>
          <div className={styles.column__body}>
            <p><b>ID</b>: {rest.id}</p>
            <p><b>Idempotency key</b>: {rest.idempotency_key || '–'}</p>
            <p><b>Updated at</b>: {rest.updated_at}</p>
            <p><Button theme="link" color="red" onClick={onDeleteRequestClick}>Delete request</Button></p>
          </div>
        </div>
      </div>
    </div>);
  }
}
