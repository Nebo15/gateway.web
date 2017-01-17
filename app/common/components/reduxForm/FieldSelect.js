import React from 'react';
import Select from 'components/Select';

import FieldInput from './FieldInput';

export default props => <FieldInput component={Select} {...props} active={props.input.value} />;
