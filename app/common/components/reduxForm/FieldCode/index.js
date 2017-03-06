import React from 'react';

import CodeMirror from 'react-codemirror';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import * as jsonlint from 'json-lint';
import Ajv from 'ajv';

import codeMirrorStyles from 'codemirror/lib/codemirror.css';
import lintStyles from 'codemirror/addon/lint/lint.css';
import styles from './styles.scss';

import jsonSchemaDraft from './schemaDraft4.json';

import FieldInput from '../FieldInput';

const ajv = new Ajv({
  verbose: true,
});

const schemaValidator = ajv.compile(jsonSchemaDraft);

// schemaValidator.addSchema(jsonSchemaDraft, '/jsonDraft');

@withStyles(codeMirrorStyles)
@withStyles(lintStyles)
@withStyles(styles)
export default class FieldCode extends React.Component {

  constructor(props) {
    super(props);

    this.widgetErr = null;
  }

  componentDidMount() {
    const cm = this.cm.getCodeMirror();

    cm.on('change', () => {
      if (this.validateJSON()) {
        this.validateSchema();
      }
    });
  }

  validateJSON() {
    const cm = this.cm.getCodeMirror();
    const lint = jsonlint.default(cm.doc.getValue());

    if (!this.props.JSONLint || !lint.error) {
      return true;
    }

    this.appendErrorMessage(lint);

    return false;
  }

  validateSchema() {
    const cm = this.cm.getCodeMirror();
    const jsonVal = cm.getValue();
    const isValid = schemaValidator(JSON.parse(jsonVal));

    const lines = jsonVal.replace(/[\{\},]/g, '').split(/\n/g).map(s => s.trim());

    if (!lines.length) {
      return true;
    }

    // NOTE: actual length of lines
    // const lineLength = lines.length + 1;

    if (!isValid) {
      // NOTE: could be multiple errors
      // const err = schemaValidator.errors[0];
      // const pathes = err.dataPath.match(/([a-zA-Z\-_]{1,})/g);
      // let cursor;
      //
      // NOTE: expected edge case
      // const lineIndexes = pathes.map((p) => {
      //   return {
      //     path: p,
      //     index: lines.find((l) => {
      //       const k = l.match(/^"?([0-9a-zA-Z\-_]{0,})"?:/g);
      //
      //       return true;
      //     }),
      //   };
      // });

      // ajv.getProperty(0)
      // console.log(schemaValidator.errors);
    }

    return true;
  }

  appendErrorMessage({ error, line }) {
    const cm = this.cm.getCodeMirror();
    this.widgetErr && cm.removeLineWidget(this.widgetErr);

    const msg = document.createElement('div');
    const icon = msg.appendChild(document.createElement('span'));
    icon.innerHTML = '!';
    icon.className = 'lint-error-icon';

    msg.appendChild(document.createTextNode(error));
    msg.className = 'lint-error';

    this.widgetErr = cm.addLineWidget(line - 1, msg);
  }

  render() {
    const { input, ...rest } = this.props;

    return (
      <FieldInput
        {...rest}
        inputComponent={CodeMirror}
        useRef={cm => (this.cm = cm)}
        input={{
          ...input,
          value: typeof input.value === 'object' ? JSON.stringify(input.value, null, 2) : input.value,
          onChange: value => value !== input.value && input.onChange(value),
        }}
        options={{
          mode: {
            name: 'application/json',
            json: true,
          },
          placeholder: this.props.placeholder,
          readOnly: false,
          lineNumbers: true,
          indentUnit: 2,
          tabSize: 2,
          smartIndent: false,
          gutters: ['CodeMirror-lint-markers'],
          lint: true,
        }}
      />
    );
  }
}
