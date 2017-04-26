import React from 'react';
import uniq from 'lodash/uniq';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import { reduxForm, Field, FieldArray } from 'redux-form';

import FieldInput from 'components/reduxForm/FieldInput';
import { CheckboxGroup } from 'components/reduxForm/FieldCheckboxGroup';

import Button from 'components/Button';
import Line from 'components/Line';
import { H4 } from 'components/Title';

import { reduxFormValidate, collectionOf } from 'react-nebo15-validate';

import FieldsList from 'containers/blocks/FieldsList';

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
    <div id={`acl-plugin-chechboxes${index}`} className={styles.row}>
      <CheckboxGroup
        name={`${rule}.methods`}
        options={[
          { label: 'POST', value: 'POST' },
          { label: 'PUT', value: 'PUT' },
          { label: 'GET', value: 'GET' },
          { label: 'DELETE', value: 'DELETE' },
        ]}
        format={value => uniq((value || []).map(i => i.toUpperCase()))}
        normalize={value => uniq(value.map(i => i.toUpperCase()))}
      />
    </div>
    <div style={{ maxWidth: '280px' }} className={styles.row}>
      <Field labelText="Path" name={`${rule}.path`} component={FieldInput} />
    </div>
    <div style={{ marginBottom: 10 }}>
      Scopes
    </div>
    <div id={`acl-plugin-scopes${index}`} className={styles.row}>
      <CheckboxGroup
        name={`${rule}.scopes`}
        options={[
          { label: 'Request api', value: 'request_api' },
          { label: 'Read profile', value: 'read_profile' },
        ]}
      />
    </div>
    <Line width="280" />
  </div>
);

@reduxForm({
  form: 'plugin-settings-form',
  validate: reduxFormValidate({
    'settings.rules': collectionOf({
      methods: {
        required: true,
      },
      path: {
        required: true,
      },
      scopes: {
        required: true,
      },
    }),
  }),
})
@withStyles(styles)
export default class PluginACLForm extends React.Component {
  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit} id="plugin-acl-form">
        <FieldArray name="settings.rules" ruleComponent={RuleField} component={FieldsList} />
      </form>
    );
  }
}
