import React, { useRef, useCallback, useState } from 'react';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import LayoutCreate from '../../components/Layouts/Create';
import Form from './Form';

import { vaccineListRoute, vaccineShowRoute } from '../../routes/config';
import { vaccinesRouteApi } from '../../routes/config/api';
import getValidationsErrors from '../../utils/getValidationsErrors';
import Request from '../../services/request';
import history from '../../services/history';

const Create: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true);
      formRef.current?.setErrors({});

      const formData: any = formRef.current?.getData();
      const schema = Yup.object().shape({
        name: Yup.string().required('Campo obrigatório'),
      });

      await schema.validate(formData, { abortEarly: false });
      const response = await Request.post(vaccinesRouteApi.path, formData);

      setLoading(false);

      if (response.data) {
        const { data } = response;
        history.replace(vaccineShowRoute.build({ id: data.id }), null);
        toast.success('Vacina criada com sucesso!');
      }
    } catch (err) {
      const validationErrors = getValidationsErrors(err);
      formRef.current?.setErrors(validationErrors);
      setLoading(false);
    }
  }, []);

  return (
    <LayoutCreate
      breadcrumbs={[
        { path: vaccineListRoute.path, text: 'Vacinas' },
        { text: 'Cadastrar Vacina' },
      ]}
      footerActionsProps={{
        loading,
        onCancelRoute: vaccineListRoute.path,
        onSubmit: handleSubmit,
      }}
    >
      <Form formRef={formRef} />
    </LayoutCreate>
  );
};

export { Create };
