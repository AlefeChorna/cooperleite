import React, { useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import LayoutEdit from '../../components/Layouts/Edit';
import Form from './Form';

import {
  animalListRoute,
  animalCreateRoute,
  animalShowRoute,
} from '../../routes/config';
import { animalsRouteApi } from '../../routes/config/api';
import getValidationsErrors from '../../utils/getValidationsErrors';
import Request from '../../services/request';
import history from '../../services/history';

const Edit: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { id: animalId } = useParams();

  const handleSubmit = useCallback(async () => {
    try {
      formRef.current?.setErrors({});

      const formData: any = formRef.current?.getData();
      const schema = Yup.object().shape({
        name: Yup.string().required('Campo obrigatório'),
        earring_number: Yup.number().required('Campo obrigatório'),
        gender: Yup.string().oneOf(['M', 'F'], 'Campo obrigatório'),
      });

      Object.assign(formData, {
        weight: formData?.weight || 0,
        breed: formData?.breed ?? '',
      });

      await schema.validate(formData, { abortEarly: false });
      const response = await Request.put(
        `${animalsRouteApi.path}/${animalId}`,
        formData,
      );

      if (response.data) {
        const { data } = response;
        history.replace(animalShowRoute.build({ id: data.id }), null);
        toast.success('Animal editado com sucesso!');
      }
    } catch (err) {
      const validationErrors = getValidationsErrors(err);
      formRef.current?.setErrors(validationErrors);
    }
  }, [animalId]);

  return (
    <LayoutEdit
      breadcrumbs={[
        { path: animalListRoute.path, text: 'Animais' },
        { text: 'Editar Animal' },
      ]}
      navMenuProps={{
        newRoute: animalCreateRoute.path,
      }}
      footerActionsProps={{
        onCancelRoute: animalListRoute.path,
        onSubmit: handleSubmit,
      }}
    >
      <Form formRef={formRef} />
    </LayoutEdit>
  );
};

export { Edit };
