import React, { PropTypes } from 'react';
import classnames from 'classnames';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import Icon from 'components/Icon';
import OuterClick from 'components/OuterClick';

import styles from './styles.scss';

const LIST_HEIGHT_PADDING = 32;

class Select extends React.Component {
  static propTypes = {
    active: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    labelText: PropTypes.string,
    open: PropTypes.bool,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
        name: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
      })
    ).isRequired,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    open: false,
  };

  state = {
    open: this.props.open,
    active: (() => this.props.options.filter(item => item.name === this.props.active)[0])(),
  };

  onSelect(item) {
    this.setState({ active: item, open: false });
    this.props.onChange && this.props.onChange(item);
  }

  /**
   * Calculate open drop down popup position
   * @returns {String<'top'|'bottom'>}
   */
  get position() {
    if (!this.selectNode) {
      return 'bottom';
    }

    const selectSize = this.selectNode.getBoundingClientRect();
    const screenHeight = document.documentElement.clientHeight;
    const selectHeight = this.listNode.clientHeight;

    if (screenHeight - selectSize.bottom > selectHeight + LIST_HEIGHT_PADDING) {
      return 'bottom';
    }

    return 'top';
  }

  get value() {
    return this.state.active;
  }

  /* eslint-disable jsx-a11y/no-static-element-interactions */
  render() {
    const {
      options = [],
      placeholder,
      disabled,
      labelText,
    } = this.props;

    const activeItem = this.state.active;
    const classNames = classnames(
      styles.select,
      this.state.open && styles[this.position],
      this.state.open && styles.open,
      disabled && styles.disabled,
    );

    return (
      <OuterClick onClick={() => this.setState({ open: false })}>
        <section ref={ref => (this.selectNode = ref)} className={classNames}>
          <div className={styles.label}>{labelText}</div>
          <div onClick={() => this.setState({ open: !this.state.open })} className={styles.control}>
            <span hidden={activeItem} className={styles.placeholder}>{placeholder}</span>
            <span hidden={!activeItem}>
              {activeItem && activeItem.title}
            </span>
            <span className={styles.arrow} />
          </div>
          <ul ref={ref => (this.listNode = ref)} className={styles.list}>
            {
              options.map(item => (
                <li onClick={() => this.onSelect(item)} className={item.name === activeItem.name ? styles.active : ''} key={item.name}>
                  {item.title}
                  {item.name === activeItem.name && <span className={styles.icon}><Icon name="check-right" /></span>}
                </li>
              ))
            }
          </ul>
        </section>
      </OuterClick>
    );
  }
}

export default withStyles(styles)(Select);
