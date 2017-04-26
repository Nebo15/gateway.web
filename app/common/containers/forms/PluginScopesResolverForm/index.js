import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import { reduxForm, Field, FormSection, getFormValues } from 'redux-form';

import getFn from 'lodash/get';

import FieldInput from 'components/reduxForm/FieldInput';
import FieldSelect from 'components/reduxForm/FieldSelect';

import { reduxFormValidate } from 'react-nebo15-validate';

import styles from './styles.scss';

const getValues = getFormValues('plugin-settings-form');

@reduxForm({
  form: 'plugin-settings-form',
  validate: reduxFormValidate({
    'settings.strategy': {
      required: true,
    },
    'settings.url_template': {
      required: (formProps, value, values) => getFn(values, 'settings.strategy', false),
    },
  }),
})
@withStyles(styles)
@connect(state => ({
  values: getValues(state),
}))
export default class PluginScopesResolverForm extends React.Component {
  render() {
    const { handleSubmit, values } = this.props;

    return (
      <form onSubmit={handleSubmit} id="plugin-jwt-form">
        <FormSection name="settings">
          <div style={{ maxWidth: '280px' }} className={styles.row}>
            <Field
              labelText="Strategy"
              name="strategy"
              component={FieldSelect}
              options={[
                { name: 'jwt', title: 'JWT' },
                { name: 'pcm', title: 'PCM. External system' },
              ]}
            />
          </div>
          {
            getFn(values, 'settings.strategy') === 'pcm' && (
              <div>
                <div style={{ maxWidth: '280px' }} className={styles.row}>
                  <Field
                    labelText="Url"
                    name="url_template"
                    component={FieldInput}
                  />
                </div>
                <div>
                  {'Note: You can use {party_id} variable in URL. eg. http://example.com:8081/0/api/party/{party_id}/scopes'}
                </div>
              </div>
            )
          }
        </FormSection>
      </form>
    );
  }
}
