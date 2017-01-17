import React from 'react';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import styles from './styles.scss';

export default withStyles(styles)(({ width }) => (
  <hr className={styles.line} style={{ width: `${width}px` }} />
));
