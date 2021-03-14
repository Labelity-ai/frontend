import React from 'react';
import Form from '@rjsf/core';

const GenericForm = ({ schema, ...rest }) => (
  <Form schema={schema} {...rest} />
);

export default GenericForm;
