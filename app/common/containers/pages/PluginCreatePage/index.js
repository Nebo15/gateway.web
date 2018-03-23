import React from 'react';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';

import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import FormPageWrapper from 'containers/blocks/FormPageWrapper';
import PluginForm from 'containers/forms/PluginForm';

import { getPlugins } from 'reducers';

import { onSubmitCreate, pluginsFetch } from './redux';
import styles from './styles.scss';

@withStyles(styles)
@provideHooks({
  fetch: ({ dispatch, params }) => dispatch(pluginsFetch(params.apiId)),
})
@connect(state => ({
  plugins: getPlugins(state, state.pages.PluginCreatePage.plugins).map(i => i.name),
}), { onSubmitCreate })
export default class ApiCreatePage extends React.Component {
  render() {
    const { plugins, params: { apiId } } = this.props;
    return (
      <FormPageWrapper id="plugin-create-page" title="Add new plugin to API" back={`/apis/${apiId}`}>
        <PluginForm
          existingPlugins={plugins}
          onSubmit={values => this.props.onSubmitCreate(apiId, values)}
        />
      </FormPageWrapper>
    );
  }
}
