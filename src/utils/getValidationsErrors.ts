import { ValidationError } from 'yup';

import { HTTP_STATUS } from '../services/request';

interface GetValidationError {
  [key: string]: string;
}

function formatYupErrors(err: ValidationError): GetValidationError {
  const validationErrors: GetValidationError = {};

  err.inner?.forEach((error) => {
    validationErrors[error.path] = error.message;
  });

  return validationErrors;
}

export default function getValidationsErrors(err: any): GetValidationError {
  if (err.status === HTTP_STATUS.UNPROCESSABLE_ENTITY && err.type === 'error') {
    return err.messages;
  }

  return formatYupErrors(err);
}
