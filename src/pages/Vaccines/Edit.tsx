import React, { useRef, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import LayoutEdit from '../../components/Layouts/Edit';
import Form from './Form';

import {
  vaccineListRoute,
  vaccineCreateRoute,
  vaccineShowRoute,
} from '../../routes/config';
import { vaccinesRouteApi } from '../../routes/config/api';
import getValidationsErrors from '../../utils/getValidationsErrors';
import Request from '../../services/request';
import history from '../../services/history';

const Edit: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);
  const { id: vaccineId } = useParams();

  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true);
      formRef.current?.setErrors({});

      const formData: any = formRef.current?.getData();
      const schema = Yup.object().shape({
        name: Yup.string().required('Campo obrigatório'),
      });

      await schema.validate(formData, { abortEarly: false });
      const response = await Request.put(
        `${vaccinesRouteApi.path}/${vaccineId}`,
        formData,
      );

      setLoading(false);

      if (response.data) {
        const { data } = response;
        history.replace(vaccineShowRoute.build({ id: data.id }), null);
        toast.success('Vacina editada com sucesso!');
      }
    } catch (err) {
      const validationErrors = getValidationsErrors(err);
      formRef.current?.setErrors(validationErrors);
      setLoading(false);
    }
  }, [vaccineId]);

  return (
    <LayoutEdit
      breadcrumbs={[
        { path: vaccineListRoute.path, text: 'Vacinas' },
        { text: 'Editar Vacina' },
      ]}
      navMenuProps={{
        newRoute: vaccineCreateRoute.path,
      }}
      footerActionsProps={{
        loading,
        onCancelRoute: vaccineListRoute.path,
        onSubmit: handleSubmit,
      }}
    >
      <Form formRef={formRef} />
    </LayoutEdit>
  );
};

export { Edit };
