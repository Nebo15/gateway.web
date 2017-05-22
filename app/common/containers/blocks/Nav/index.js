import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import NavItem from 'components/NavItem';
import Icon from 'components/Icon';

import styles from './styles.scss';

@withStyles(styles)
@connect(state => ({
  location: state.routing,
}))
export default class Nav extends React.Component {
  componentWillReceiveProps(props) {
    if (props.isOpen) {
      document.documentElement.classList.add(styles.navIsOpen);
    } else {
      document.documentElement.classList.remove(styles.navIsOpen);
    }
  }
  render() {
    const { isOpen } = this.props;

    return (
      <nav className={classnames(styles.nav, isOpen && styles.open)}>
        <ul>
          <NavItem to="apis" activeClassName={styles.active}>
            <Link id="apis-nav" to="/apis">API’s</Link>
          </NavItem>
          <NavItem to="requests" activeClassName={styles.active}>
            <Link to="/requests">Requests</Link>
          </NavItem>
          <NavItem to="status" activeClassName={styles.active}>
            <Link to="/status">Status</Link>
          </NavItem>
        </ul>
        <ul className={styles.down}>
          <li>
            <a href="http://docs.annon.apiary.io/" rel="noopener noreferrer" target="__blank">
              <Icon name="doc" />
              Documentation
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}
