import React, { PropTypes } from 'react';
import classnames from 'classnames';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import { ErrorMessages } from 'modules/validate';

import styles from './styles.scss';

const Prefix = ({ prefix }) =>
  <span className={styles['prefix-wrapper']}>
    {prefix}
  </span>;

const Postfix = ({ postfix }) =>
  <span className={styles['postfix-wrapper']}>
    {postfix}
  </span>;

export const Component = ({
  children,
  type,
  labelText,
  postfix,
  prefix,
  disabled,
  required, // eslint-disable-line
  active,
  value,
  error,
  placeholder,
  name,
  onChange,
  onBlur,
  onFocus,
  inputComponent = 'input',
  component = inputComponent,
  useRef = el => el,
  theme = 'gray',
  className, // eslint-disable-line
  ...rest // eslint-disable-line
}) => {
  const decorInputProps = {
    errored: !!error,
    focused: active,
    prefix,
    postfix,
  };

  const prefixComp = prefix && <Prefix {...decorInputProps} />;
  const postfixComp = postfix && <Postfix {...decorInputProps} />;

  const inputProps = {
    className: styles.input,
    type,
    disabled,
    placeholder,
    value,
    name,
    onChange,
    onBlur,
    onFocus,
    ref: useRef,
  };

  return (<span>
    <label className={styles['label-wrapper']}>
      <div className={styles['label-text']}>
        { labelText }
      </div>
      <span
        className={classnames(
          styles['group-input'],
          styles[`theme-${theme}`],
          error && styles.error,
          active && styles.active,
          disabled && styles.disabled
        )}
      >
        { prefixComp }
        {
          React.createElement(component, {
            ...rest,
            ...inputProps,
          })
        }
        { postfixComp }
        { error &&
          <div className={styles['error-label']}>
            { typeof error === 'string' ? error : <ErrorMessages error={error}>{children}</ErrorMessages> }
          </div>
        }
      </span>
    </label>
  </span>);
};

Component.propTypes = {
  theme: PropTypes.oneOf(['light']),
};

export default withStyles(styles)(Component);
