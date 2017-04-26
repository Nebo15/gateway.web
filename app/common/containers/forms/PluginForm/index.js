import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import { reduxForm, Field, formValueSelector, getFormValues } from 'redux-form';

import FieldCheckbox from 'components/reduxForm/FieldCheckbox';
import FiledSelect from 'components/reduxForm/FieldSelect';

import Button from 'components/Button';
import Line from 'components/Line';
import { H3 } from 'components/Title';

import { reduxFormValidate } from 'react-nebo15-validate';

import PluginProxyForm from 'containers/forms/PluginProxyForm';
import PluginJWTForm from 'containers/forms/PluginJWTForm';
import PluginACLForm from 'containers/forms/PluginACLForm';
import PluginIPRestrictionForm from 'containers/forms/PluginIPRestrictionForm';
import PluginValidatorForm from 'containers/forms/PluginValidatorForm';
import PluginScopesResolverForm from 'containers/forms/PluginScopesResolverForm';

import ConfirmFormChanges from 'containers/blocks/ConfirmFormChanges';

import styles from './styles.scss';

const selector = formValueSelector('plugin-form');

const pluginsComponentMap = {
  proxy: PluginProxyForm,
  jwt: PluginJWTForm,
  acl: PluginACLForm,
  ip_restriction: PluginIPRestrictionForm,
  validator: PluginValidatorForm,
  scopes: PluginScopesResolverForm,
  idempotency: null,
};

const availablePlugins = Object.keys(pluginsComponentMap);

@withStyles(styles)
@reduxForm({
  form: 'plugin-form',
  initialValues: {
    is_enabled: true,
  },
  validate: reduxFormValidate({
    name: {
      required: true,
    },
  }),
})
@connect(state => ({
  name: selector(state, 'name'),
  values: getFormValues('plugin-form')(state),
  pluginValues: getFormValues('plugin-settings-form')(state),
}))
export default class PluginForm extends React.Component {
  state = {
    submitting: false,
  };

  componentWillReceiveProps({ values, pluginValues }) {
    if (!this.pluginInitialValues && pluginValues) {
      this.pluginInitialValues = values;
    }
  }

  onSubmit() {
    if (!this.pluginForm) {
      this.setState({ submitting: true });

      this.props.onSubmit({
        settings: { },
        ...this.props.values,
      });

      return;
    }

    this.pluginForm.submit();

    if (!this.pluginForm.valid) {
      return;
    }

    this.setState({ submitting: true });

    const { is_enabled } = this.props.values;

    let pluginValues = this.pluginForm.values || {};

    if (this.props.values.name === 'validator') {
      pluginValues = JSON.parse(JSON.stringify(pluginValues));
      pluginValues.settings.rules = pluginValues.settings.rules.map(i => i || {}).map(i => ({
        ...i,
        schema: typeof i.schema === 'string' ? JSON.parse(i.schema) : i.schema,
      }));
    }

    this.props.onSubmit({
      ...this.props.values,
      ...pluginValues,
      ...{ is_enabled },
    });
  }

  pluginInitialValues = null;

  get isChanged() {
    if (!this.pluginForm) {
      return false;
    }

    let pluginValues = this.pluginForm.values;

    if (!this.pluginInitialValues) {
      return false;
    }

    const { values = {} } = this.props;
    const { is_enabled } = values;

    if (this.props.values.name === 'validator' && pluginValues.settings) {
      pluginValues = JSON.parse(JSON.stringify(pluginValues));
      try {
        pluginValues.settings.rules = pluginValues.settings.rules.map((item) => {
          if (!item) {
            return {};
          }

          if (item.schema instanceof Object) {
            return item;
          }

          return {
            ...item,
            schema: JSON.parse(item.schema),
          };
        });
      } catch (e) {
        return true;
      }
    }

    const currentValues = JSON.stringify({ ...values, ...pluginValues, is_enabled });

    return currentValues !== JSON.stringify(this.pluginInitialValues);
  }

  render() {
    const { isEdit, name, existingPlugins = [] } = this.props;
    const pluginsSelectOptions = [
      { name: 'proxy', title: 'Proxy' },
      { name: 'jwt', title: 'JWT Authorization' },
      { name: 'acl', title: 'ACL' },
      { name: 'validator', title: 'Validator' },
      { name: 'idempotency', title: 'Idempotency' },
      { name: 'ip_restriction', title: 'IP Restriction' },
      { name: 'scopes', title: 'Scopes Resolver' },
    ].filter(i => availablePlugins.indexOf(i.name) > -1)
    .map(item => ({
      ...item,
      disabled: existingPlugins.indexOf(item.name) > -1,
    }));

    return (
      <div>
        <form>
          <Line width="280" />

          <div id="add-plugin-dropdown" style={{ maxWidth: '280px' }} className={styles.row}>
            <Field
              labelText="Plugin type"
              name="name"
              component={FiledSelect}
              placeholder="Select type..."
              disabled={isEdit}
              options={pluginsSelectOptions}
            />
          </div>

          <div className={styles.row}>
            <Field labelText="Enabled" name="is_enabled" component={FieldCheckbox} />
          </div>
        </form>

        {
          (pluginsComponentMap[name]) && (<div>
            <H3>Plugin settings</H3>
            <Line width="280" />

            <div className={styles.row}>
              { !name && <span style={{ color: '#999' }}>Select plugin type...</span> }
              { name && pluginsComponentMap[name] &&
                React.createElement(pluginsComponentMap[name], {
                  ref: ref => (this.pluginForm = ref),
                  onSubmit: () => {},
                })
              }
            </div>
          </div>)
        }
        <Button id="plugins-button-add" onClick={() => this.onSubmit()} disabled={!this.isChanged && !!this.pluginForm}>
          {isEdit ? 'Save plugin' : 'Add plugin'}
        </Button>

        {
          isEdit && <div style={{ float: 'right' }}>
            <Button id="plugins-button-delete" color="red" onClick={() => this.props.onDelete()}>
              Delete plugin
            </Button>
          </div>
        }

        <ConfirmFormChanges submitting={this.state.submitting} isChanged={this.isChanged} />
      </div>
    );
  }
}
