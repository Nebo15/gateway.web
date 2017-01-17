import React from 'react';
import { Link } from 'react-router';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import Icon from 'components/Icon';

import Nav from 'containers/blocks/Nav';
import Gamburger from 'containers/blocks/Gamburger';

import styles from './styles.scss';

@withStyles(styles)
export default class Aside extends React.Component {
  state = {
    isMenuOpen: false,
  };

  onShowMenu() {
    this.setState({ isMenuOpen: !this.state.isMenuOpen });
  }

  render() {
    return (
      <aside className={styles.aside}>
        { /* eslint-disable jsx-a11y/anchor-has-content */ }
        <Link className={styles.logo} to="/" />
        <hr className={styles.line} />

        <Link to="/apis/create" className={styles.add}>
          <Icon name="add" />
          Create API
        </Link>

        <hr className={styles.line} />

        <Nav isOpen={this.state.isMenuOpen} />

        <div className={styles['menu-control']}>
          <Gamburger isOpen={this.state.isMenuOpen} onToggle={() => this.onShowMenu()} />
        </div>
      </aside>
    );
  }
}
