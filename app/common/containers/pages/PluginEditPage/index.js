import React from 'react';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';

import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import { Confirm } from 'components/Popup';

import FormPageWrapper from 'containers/blocks/FormPageWrapper';
import PluginForm from 'containers/forms/PluginForm';

import { getPluginByName, getPlugins } from 'reducers';

import { onSubmitEdit, pluginsFetch, onUnbind } from './redux';

import styles from './styles.scss';

@withStyles(styles)
@provideHooks({
  fetch: ({ dispatch, params }) => dispatch(pluginsFetch(params.apiId, params.pluginName)),
})
@connect((state, { params }) => ({
  ...state.pages.PluginEditPage,
  plugins: getPlugins(state, state.pages.PluginEditPage.plugins).map(i => i.name),
  plugin: getPluginByName(state, params.apiId, params.pluginName) || {},
}), { onSubmitEdit, onUnbind })
export default class ApiCreatePage extends React.Component {
  state = {
    showConfirm: false,
  };

  onDelete() {
    const { name, api_id } = this.props.plugin;

    this.setState({ showConfirm: false });
    this.props.onUnbind(api_id, name);
  }

  render() {
    const { name, api_id } = this.props.plugin;
    const { plugins } = this.props;

    return (
      <FormPageWrapper id="plugin-edit-page" title={`Edit ${name} plugin`} back={`/apis/${api_id}`}>
        <PluginForm
          isEdit
          existingPlugins={plugins}
          onDelete={() => this.setState({ showConfirm: true })}
          onSubmit={values => this.props.onSubmitEdit(api_id, name, values)}
        />

        <Confirm
          title={`Delete ${name} plugin?`}
          active={this.state.showConfirm}
          theme="error"
          id="confirm-delete-plugin"
          onCancel={() => this.setState({ showConfirm: false })}
          onConfirm={() => this.onDelete()}
        />
      </FormPageWrapper>
    );
  }
}
