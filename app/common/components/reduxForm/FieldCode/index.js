import React from 'react';

import CodeMirror from 'react-codemirror';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import codeMirrorStyles from 'codemirror/lib/codemirror.css';
import styles from './styles.scss';

import FieldInput from '../FieldInput';

@withStyles(codeMirrorStyles)
@withStyles(styles)
export default class FieldCode extends React.Component {
  render() {
    const { input: { value } } = this.props;

    return (
      <FieldInput
        component={CodeMirror}
        value={(value instanceof Object) ? JSON.stringify(value, null, 2) : value}
        options={{
          mode: 'javascript',
          readOnly: false,
          lineNumbers: true,
          tabSize: 2,
        }}
        {...this.props}
      />
    );
  }
}
