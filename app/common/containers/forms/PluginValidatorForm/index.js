import React from 'react';
import uniq from 'lodash/uniq';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import { reduxForm, Field, FieldArray } from 'redux-form';

import FieldInput from 'components/reduxForm/FieldInput';
import FieldCode from 'components/reduxForm/FieldCode';
import { CheckboxGroup } from 'components/reduxForm/FieldCheckboxGroup';

import Button from 'components/Button';
import Line from 'components/Line';
import { H4 } from 'components/Title';

import FieldsList from 'containers/blocks/FieldsList';

import { reduxFormValidate, collectionOf } from 'react-nebo15-validate';

import styles from './styles.scss';

const RuleField = ({ rule, index, fields }) => (
  <div>
    <div className={styles.rule}>
      <H4>
        Rule {index + 1}
        {index > 0 && <span>
          <Button color="red" theme="link" onClick={() => fields.remove(index)}>
              Delete
          </Button>
        </span>}
      </H4>
    </div>
    <div style={{ marginBottom: 10 }}>
      Methods
    </div>
    <div id={`validation-methods-${index}`} className={styles.row}>
      <CheckboxGroup
        name={`${rule}.methods`}
        options={[
          { label: 'POST', value: 'POST' },
          { label: 'PUT', value: 'PUT' },
        ]}
        format={value => uniq((value || []).map(i => i.toUpperCase()))}
        normalize={value => uniq(value.map(i => i.toUpperCase()))}
      />
    </div>
    <div style={{ maxWidth: '280px' }} className={styles.row}>
      <Field labelText="Path" placeholder="^path_pattern$" name={`${rule}.path`} component={FieldInput} />
    </div>
    <div className={styles.row}>
      <Field
        labelText="Schema"
        name={`${rule}.schema`}
        placeholder="Your JSON schema"
        component={FieldCode}
      />
    </div>
    <Line width="280" />
  </div>
);

@reduxForm({
  form: 'plugin-settings-form',
  validate: reduxFormValidate({
    'settings.rules': collectionOf({
      path: {
        required: true,
      },
      schema: {
        required: true,
        json: true,
      },
      methods: {
        required: true,
      },
    }),
  }),
})
@withStyles(styles)
export default class PluginValidatorForm extends React.Component {
  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit} id="plugin-validator-form">
        <FieldArray name="settings.rules" ruleComponent={RuleField} component={FieldsList} />
      </form>
    );
  }
}
