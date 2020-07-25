import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { toast } from 'react-toastify';

import Form from '../../../components/Form';
import InputText from '../../../components/Input/Text';

import Request from '../../../services/request';
import { vaccinesRouteApi } from '../../../routes/config/api';

interface FormProps {
  isShowPage?: boolean;
  formRef: React.RefObject<FormHandles>;
}

const FormComponent: React.FC<FormProps> = ({
  formRef,
  isShowPage = false,
}) => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    async function findVaccine(): Promise<void> {
      if (id) {
        try {
          setLoading(true);
          const response = await Request.get(`${vaccinesRouteApi.path}/${id}`);

          if (response.data) {
            formRef.current?.setData(response.data);
          }

          setLoading(false);
        } catch (err) {
          setLoading(false);
          toast.error(
            'Não foi possível carregar as informações. Tente novamente mais tarde!',
          );
        }
      }
    }

    findVaccine();
  }, [formRef, id]);

  return (
    <Form formRef={formRef} loading={loading} disabledForm={isShowPage}>
      <InputText
        name="name"
        label="Nome"
        helperText="Campo Obrigatório"
        autoComplete="off"
      />
    </Form>
  );
};

export default FormComponent;
