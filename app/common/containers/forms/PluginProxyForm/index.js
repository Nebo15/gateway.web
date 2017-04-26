import React from 'react';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import { reduxForm, Field, FormSection } from 'redux-form';

import FieldInput from 'components/reduxForm/FieldInput';
import FieldCheckbox from 'components/reduxForm/FieldCheckbox';
import FiledSelect from 'components/reduxForm/FieldSelect';

import Line from 'components/Line';

import { reduxFormValidate } from 'react-nebo15-validate';

import styles from './styles.scss';

@reduxForm({
  form: 'plugin-settings-form',
  initialValues: {
    settings: {
      scheme: 'http',
    },
  },
  validate: reduxFormValidate({
    'settings.host': {
      required: true,
    },
    'settings.port': {
      required: true,
    },
    'settings.path': {
      required: true,
    },
  }),
})
@withStyles(styles)
export default class PluginProxyForm extends React.Component {
  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit} id="plugin-proxy-form">
        <FormSection name="settings">
          <div className={styles.columns}>
            <div>
              <Field
                labelText="Schema"
                name="scheme"
                component={FiledSelect}
                options={[
                  { name: 'http', title: 'http' },
                  { name: 'https', title: 'https' },
                ]}
              />
            </div>
            <div>
              <Field labelText="Host" name="host" component={FieldInput} />
            </div>
          </div>

          <div className={styles.columns}>
            <div>
              <Field normalize={a => (isNaN(Number(a)) ? a : Number(a))} labelText="Port" type="tel" name="port" component={FieldInput} />
            </div>
            <div>
              <Field labelText="Path" name="path" component={FieldInput} />
            </div>
          </div>

          <Line width="280" />

          <div className={styles.row}>
            <Field labelText="Strip API path" name="strip_api_path" component={FieldCheckbox} />
          </div>
        </FormSection>
      </form>
    );
  }
}
