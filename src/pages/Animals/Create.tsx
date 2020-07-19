import React, { useRef, useCallback, useState } from 'react';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import LayoutCreate from '../../components/Layouts/Create';
import Form from './Form';

import { animalListRoute, animalShowRoute } from '../../routes/config';
import { animalsRouteApi } from '../../routes/config/api';
import getValidationsErrors from '../../utils/getValidationsErrors';
import formatNumberToAPI from '../../utils/formatNumberToAPI';
import formatDateToISO from '../../utils/formatDateToISO';
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
        earring_number: Yup.number().required('Campo obrigatório'),
        gender: Yup.string().oneOf(['M', 'F'], 'Campo obrigatório'),
      });

      Object.assign(formData, {
        weight: formatNumberToAPI(formData?.weight) || 0,
        date_birth: formatDateToISO(formData?.date_birth),
      });

      await schema.validate(formData, { abortEarly: false });
      const response = await Request.post(animalsRouteApi.path, formData);

      if (response.data) {
        const { data } = response;
        history.replace(animalShowRoute.build({ id: data.id }), null);
        toast.success('Animal criado com sucesso!');
      }

      setLoading(false);
    } catch (err) {
      const validationErrors = getValidationsErrors(err);
      formRef.current?.setErrors(validationErrors);
      setLoading(false);
    }
  }, []);

  return (
    <LayoutCreate
      breadcrumbs={[
        { path: animalListRoute.path, text: 'Animais' },
        { text: 'Cadastrar Animal' },
      ]}
      footerActionsProps={{
        loading,
        onCancelRoute: animalListRoute.path,
        onSubmit: handleSubmit,
      }}
    >
      <Form formRef={formRef} />
    </LayoutCreate>
  );
};

export { Create };
