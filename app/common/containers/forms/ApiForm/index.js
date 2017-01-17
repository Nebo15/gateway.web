import React from 'react';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import { reduxForm, Field } from 'redux-form';

import FieldInput from 'components/reduxForm/FieldInput';
import FieldCheckbox from 'components/reduxForm/FieldCheckbox';
import FiledSelect from 'components/reduxForm/FieldSelect';

import Button from 'components/Button';
import Line from 'components/Line';
import { H3 } from 'components/Title';

import validate from 'modules/validate';

import styles from './styles.scss';

export const Component = ({ handleSubmit = () => {}, onSubmit = () => {} }) => (
  <form onSubmit={handleSubmit(onSubmit)}>
    <Line width="280" />

    <div style={{ maxWidth: '280px' }} className={styles.row}>
      <Field name="name" labelText="Name" component={FieldInput} />
    </div>

    <H3>Request</H3>

    <Line width="280" />

    <div style={{ marginBottom: 10 }}>
      Methods
    </div>

    <div className={styles.row}>
      <Field labelText="Put" name="put" component={FieldCheckbox} />
      <Field labelText="Post" name="post" component={FieldCheckbox} />
      <Field labelText="Get" name="get" component={FieldCheckbox} />
    </div>

    <div className={styles.columns}>
      <div>
        <Field
          labelText="Scheme"
          name="scheme"
          component={FiledSelect}
          value="http"
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
        <Field labelText="Port" name="port" component={FieldInput} />
      </div>
      <div>
        <Field labelText="Path" name="path" component={FieldInput} />
      </div>
    </div>

    <Button type="submit">
      Create API
    </Button>
  </form>
);

export default withStyles(styles)(
  reduxForm({
    form: 'api-create',
    initialValues: {
      scheme: 'http',
    },
    validate: validate({
      name: {
        required: true,
      },
    }),
  })(Component)
);
