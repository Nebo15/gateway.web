import React from 'react';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';

import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import { H3 } from 'components/Title';
import Button from 'components/Button';
import Line from 'components/Line';
import Icon from 'components/Icon';
import { Confirm } from 'components/Popup';
import Checkbox from 'components/Checkbox';
import Table from 'components/Table';

import FormPageWrapper from 'containers/blocks/FormPageWrapper';
import ApiForm from 'containers/forms/ApiForm';

import { getApi, getPlugins } from 'reducers';

import { onSubmitEdit, fetch, pluginsFetch, onDelete, onEnable, cleanPlugins } from './redux';

import styles from './styles.scss';

@withStyles(styles)
@provideHooks({
  fetch: ({ dispatch, params }) => Promise.all([
    dispatch(fetch(params.apiId)),
    dispatch(pluginsFetch(params.apiId)),
  ]),
})
@connect((state, { params: { apiId } }) => ({
  ...state.pages.ApiEditPage,
  api: getApi(state, apiId) || {},
  plugins: getPlugins(state, state.pages.ApiEditPage.plugins) || [],
}), { onSubmitEdit, onDelete, onEnable, cleanPlugins })
export default class ApiCreatePage extends React.Component {
  state = {
    showConfirm: false,
  };

  componentWillUnmount() {
    this.props.cleanPlugins();
  }

  onDelete() {
    this.setState({ showConfirm: false });
    this.props.onDelete(this.props.params.apiId);
  }

  render() {
    const { name, id } = this.props.api;

    return (
      <FormPageWrapper id="api-edit-page" title={`Edit ${name} API`} back="/apis">
        <ApiForm
          isEdit
          onSubmit={values => this.props.onSubmitEdit(id, values)}
          onDelete={() => this.setState({ showConfirm: true })}
          initialValues={this.props.api}
        >
          <H3>
            Plugins

            <div className={styles['add-plugin']}>
              <Button id="add-plugin-button" to={`/apis/${id}/plugins/add`} theme="link">
                <span><Icon name="add" /></span>
                Add new plugin
              </Button>
            </div>
          </H3>

          <Line width="280" />
          <div id="api-plugins-table">
            <Table
              columns={[
              { key: 'name', title: 'Name' },
              { key: 'active', title: 'Active', width: '100px' },
              { key: 'actions', title: 'Actions', width: '150px' },
              ]}
              data={this.props.plugins.map(item => ({
                name: item.name,
                active: (
                  <Checkbox
                    onChange={checked => this.props.onEnable(
                    item.api_id,
                    item.name,
                    { is_enabled: checked },
                  )}
                    checked={item.is_enabled}
                  />
              ),
                actions: (
                  <Button id={`edit-plugin-button-${item.name}`} theme="link" to={`/apis/${item.api_id}/plugins/${item.name}`}>
                  Edit&nbsp;plugin
                  </Button>
              ),
              }))}
            />
          </div>
        </ApiForm>

        <Confirm
          title={`Delete ${name} API?`}
          active={this.state.showConfirm}
          theme="error"
          id="confirm-delete-api"
          onCancel={() => this.setState({ showConfirm: false })}
          onConfirm={() => this.onDelete()}
        />
      </FormPageWrapper>
    );
  }
}
