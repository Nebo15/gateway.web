import React from 'react';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import { reduxForm, Field, FormSection } from 'redux-form';

import FieldInput from 'components/reduxForm/FieldInput';

import { reduxFormValidate } from 'react-nebo15-validate';

import styles from './styles.scss';

@reduxForm({
  form: 'plugin-settings-form',
  validate: reduxFormValidate({
    'settings.signature': {
      required: true,
    },
  }),
})
@withStyles(styles)
export default class PluginJWTForm extends React.Component {
  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit} id="plugin-jwt-form">
        <FormSection name="settings">
          <div style={{ maxWidth: '280px' }} className={styles.row}>
            <Field labelText="Signature" name="signature" component={FieldInput} />
          </div>
        </FormSection>
      </form>
    );
  }
}
