import React from 'react';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import { H1, H3 } from 'components/Title';
import Table from 'components/Table';
import distanceInWords from 'date-fns/distance_in_words';

import { fetchClusterStatus, fetchRequestMetrics } from './redux';
import styles from './styles.scss';

@withStyles(styles)
@provideHooks({
  fetch: ({ dispatch }) => dispatch(fetchClusterStatus()),
  defer: ({ dispatch }) => dispatch(fetchRequestMetrics()),
})
@connect(state => state.pages.StatusPage)
export default class StatusPage extends React.Component {
  render() {
    const { clusterStatus = {} } = this.props;
    return (
      <div id="status-page" className={styles.page}>
        <H1>Status</H1>
        <div className={styles.page__numbers}>
          <div className={styles.numbers}>
            {[
              { title: 'Cluser size', value: clusterStatus.cluster_size },
              { title: 'Cluser strategy', value: clusterStatus.cluster_strategy },
              { title: 'Open ports', value: clusterStatus.open_ports.join(', ') },
            ].map((i, idx) => (
              <div className={styles.numbers__item} key={idx}>
                <div className={styles.numbers__title}>
                  {i.title}
                </div>
                <div className={styles.numbers__value}>
                  {i.value || '-'}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.page__nodes}>
          <H3>Nodes</H3>
          <Table
            columns={[
              { key: 'name', title: 'Name', width: '200px' },
              { key: 'otp_release', title: 'OTP Release' },
              { key: 'process_count', title: 'Process count' },
              { key: 'process_limit', title: 'Process limit' },
              { key: 'run_queue', title: 'Run queue' },
              { key: 'uptime', title: 'Uptime' },
            ]}
            data={(clusterStatus.nodes || []).map(node => ({
              ...node,
              uptime: <span>{node.uptime}s<br />({distanceInWords(node.uptime * 1000, 0)})</span>,
            }))}
          />
        </div>
      </div>
    );
  }
}
