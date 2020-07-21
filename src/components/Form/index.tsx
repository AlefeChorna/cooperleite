import React from 'react';
import {
  FormHandles,
  FormProps as UNFormProps,
  SubmitHandler,
} from '@unform/core';
import { Form } from '@unform/web';

import InputGroup from '../InputGroup';
import Spinner from '../Spinner';

interface FormProps extends Omit<UNFormProps, 'onSubmit'> {
  onSubmit?: SubmitHandler;
  loading?: boolean;
  disabledForm?: boolean;
  formRef: React.RefObject<FormHandles>;
}

const FormComponent: React.FC<FormProps> = ({
  formRef,
  loading,
  onSubmit,
  disabledForm = false,
  children,
  ...restProps
}) => {
  return (
    <Form
      style={{ pointerEvents: disabledForm ? 'none' : 'auto' }}
      onSubmit={onSubmit || ((): void => {})}
      {...restProps}
      ref={formRef}
    >
      {loading && <Spinner loadingText="" />}
      <InputGroup style={{ opacity: loading ? 0 : 1 }}>{children}</InputGroup>
    </Form>
  );
};

export default FormComponent;
