import React, { useRef, useCallback } from 'react';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import LayoutCreate from '../../components/Layouts/Create';
import Form from './Form';

import { animalListRoute, animalShowRoute } from '../../routes/config';
import { animalsRouteApi } from '../../routes/config/api';
import getValidationsErrors from '../../utils/getValidationsErrors';
import formatNumberToAPI from '../../utils/formatNumberToAPI';
import Request from '../../services/request';
import history from '../../services/history';

const Create: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

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
        weight: formatNumberToAPI(formData?.weight) || 0,
      });

      await schema.validate(formData, { abortEarly: false });
      const response = await Request.post(animalsRouteApi.path, formData);

      if (response.data) {
        const { data } = response;
        history.replace(animalShowRoute.build({ id: data.id }), null);
        toast.success('Animal criado com sucesso!');
      }
    } catch (err) {
      const validationErrors = getValidationsErrors(err);
      formRef.current?.setErrors(validationErrors);
    }
  }, []);

  return (
    <LayoutCreate
      breadcrumbs={[
        { path: animalListRoute.path, text: 'Animais' },
        { text: 'Cadastrar Animal' },
      ]}
      footerActionsProps={{
        onCancelRoute: animalListRoute.path,
        onSubmit: handleSubmit,
      }}
    >
      <Form formRef={formRef} />
    </LayoutCreate>
  );
};

export { Create };
