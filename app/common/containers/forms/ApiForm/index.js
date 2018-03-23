import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';

import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import { reduxForm, Field, FormSection, getFormValues } from 'redux-form';
import uniq from 'lodash/uniq';

import FieldInput from 'components/reduxForm/FieldInput';
import { CheckboxGroup } from 'components/reduxForm/FieldCheckboxGroup';
import FiledSelect from 'components/reduxForm/FieldSelect';
import FieldCheckbox from 'components/reduxForm/FieldCheckbox';

import Button from 'components/Button';
import Line from 'components/Line';
import { H3 } from 'components/Title';

import ConfirmFormChanges from 'containers/blocks/ConfirmFormChanges';

import { reduxFormValidate } from 'react-nebo15-validate';

import styles from './styles.scss';

@withStyles(styles)
@reduxForm({
  form: 'api-form',
  initialValues: {
    request: {
      scheme: 'http',
    },
    matching_priority: '1',
  },
  validate: reduxFormValidate({
    name: {
      required: true,
    },
    'request.methods': {
      required: true,
    },
    'request.host': {
      required: true,
    },
    'request.path': {
      required: true,
    },
  }),
})
@connect(state => ({
  values: getFormValues('api-form')(state),
}))
export default class ApiForm extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      saved: props.initialValues,
      isConfirmed: false,
      showConfirm: false,
      location: null,
    };
  }
  onSubmit() {
    return this.props.onSubmit(this.props.values).then((action) => {
      if (action.error) return action;
      this.setState({
        saved: this.props.values,
      });
      return action;
    });
  }

  get isChanged() {
    const { values = {} } = this.props;
    return JSON.stringify(values) !== JSON.stringify(this.state.saved);
  }

  render() {
    const { handleSubmit, onDelete, isEdit, children, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Line width="280" />

        <div className={classnames(styles.row, styles['row--name'])}>
          <div className={styles.row__field}><Field name="name" labelText="Name *" component={FieldInput} /></div>
          <div className={styles.row__field}><Field name="matching_priority" labelText="Matching priority" component={FieldInput} /></div>
        </div>

        <Line width="280" />

        <div className={classnames(styles.row, styles['row--name'])}>
          <div className={styles.row__field}><Field name="docs_url" labelText="Documentation URL" placeholder="eg. https://docs.annon.apiary.io" component={FieldInput} /></div>
          <div className={styles.row__field}><Field name="description" labelText="Description" component={FieldInput} /></div>
        </div>

        <div className={classnames(styles.row, styles['row--small'])}>
          <Field
            name="health"
            labelText="API Health Status"
            component={FiledSelect}
            placeholder="Select health status"
            options={[
              { name: 'operational', title: 'Operational' },
              { name: 'degradated_perfomance', title: 'Degradated perfomance' },
              { name: 'partial_outage', title: 'Partial outage' },
              { name: 'major_outage', title: 'Major outage' },
            ]}
          />
        </div>

        <div className={classnames(styles.row, styles['row--small'])}>
          <Field
            name="disclose_status"
            labelText="Disclose API status"
            component={FieldCheckbox}
          />
        </div>

        <H3>Request</H3>

        <Line width="280" />

        <div style={{ marginBottom: 10 }}>
          Methods *
        </div>

        <FormSection name="request">
          <div className={styles.row}>
            <CheckboxGroup
              name="methods"
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

          <div className={styles.columns}>
            <div>
              <Field
                labelText="Scheme *"
                name="scheme"
                component={FiledSelect}
                options={[
                  { name: 'http', title: 'http' },
                  { name: 'https', title: 'https' },
                ]}
              />
            </div>
            <div>
              <Field labelText="Host *" name="host" placeholder="% - all hosts" component={FieldInput} />
            </div>
          </div>

          <div className={styles.columns}>
            <div>
              <Field labelText="Port *" name="port" component={FieldInput} />
            </div>
            <div>
              <Field labelText="Path *" name="path" component={FieldInput} />
            </div>
          </div>
        </FormSection>

        {
          children && <div className={styles.row}>
            {children}
          </div>
        }

        {isEdit && <Button type="submit" disabled={!this.isChanged}>
          {submitting ? 'Saving...' : (this.isChanged ? 'Save API' : 'Saved')}
        </Button>}
        {!isEdit && <Button type="submit" disabled={!this.isChanged}>Create API</Button>}
        {isEdit && <div style={{ float: 'right' }}>
          <Button id="delete-api-button" type="button" onClick={onDelete} color="red">Delete API</Button>
        </div>}

        <ConfirmFormChanges submitting={submitting} isChanged={this.isChanged} />
      </form>
    );
  }
}
