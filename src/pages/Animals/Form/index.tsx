import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { toast } from 'react-toastify';

import Form from '../../../components/Form';
import InputText from '../../../components/Input/Text';
import InputInteger from '../../../components/Input/Integer';
import InputNumeric from '../../../components/Input/Numeric';
import InputDate from '../../../components/Input/Date';
import InputSelect from '../../../components/Input/Select';
import Checkbox from '../../../components/Input/Checkbox';

import Request from '../../../services/request';
import { animalsRouteApi } from '../../../routes/config/api';

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
    async function findAnimal(): Promise<void> {
      if (id) {
        try {
          setLoading(true);
          const response = await Request.get(`${animalsRouteApi.path}/${id}`);

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

    findAnimal();
  }, [formRef, id]);

  return (
    <Form formRef={formRef} loading={loading} disabledForm={isShowPage}>
      <InputText
        name="name"
        label="Nome"
        helperText="Campo Obrigatório"
        autoComplete="off"
        sm={6}
        md={6}
      />
      <InputInteger
        name="earring_number"
        label="Número do Brinco"
        helperText="Campo Obrigatório"
        autoComplete="off"
        sm={6}
        md={6}
      />
      <InputSelect
        label="Sexo"
        name="gender"
        options={[
          { id: 'M', value: 'Macho' },
          { id: 'F', value: 'Fêmea' },
        ]}
        sm={6}
        md={6}
      />
      <InputNumeric
        name="weight"
        label="Peso"
        autoComplete="off"
        sm={6}
        md={6}
      />
      <InputText name="breed" label="Raça" sm={6} md={6} />
      <InputDate name="date_birth" label="Data de Nascimento" sm={6} md={6} />
      <Checkbox name="lactating" label="Lactante (Esta produzindo leite)" />
    </Form>
  );
};

export default FormComponent;
