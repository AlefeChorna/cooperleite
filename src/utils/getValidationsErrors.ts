import { ValidationError } from 'yup';

interface GetValidationError {
  [key: string]: string;
}

export default function getValidationsErrors(
  err: ValidationError,
): GetValidationError {
  const validationErrors: GetValidationError = {};

  err.inner?.forEach((error) => {
    validationErrors[error.path] = error.message;
  });

  return validationErrors;
}
