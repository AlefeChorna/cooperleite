import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { toast } from 'react-toastify';

import Form from '../../../components/Form';
import Col from '../../../components/Col';
import Input from '../../../components/MUInput';
import InputSelect from '../../../components/InputSelect';
import Checkbox from '../../../components/Checkbox';

import Request from '../../../services/request';
import createNumberMask from '../../../utils/createNumberMask';
import { animalsRouteApi } from '../../../routes/config/api';
import formatNumberToInput from '../../../utils/formatNumberToInput';

const weightMask = createNumberMask();
const earringNumberMask = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/];

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
            Object.assign(response.data, {
              weight: formatNumberToInput(response.data.weight),
            });

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
      <Col xs={12} sm={12} md={12}>
        <Input
          name="name"
          label="Nome"
          helperText="Campo Obrigatório"
          autoComplete="off"
        />
      </Col>
      <Col xs={12} sm={6} md={6}>
        <Input
          name="earring_number"
          inputMask={earringNumberMask}
          label="Número do Brinco"
          helperText="Campo Obrigatório"
          autoComplete="off"
        />
      </Col>
      <Col xs={12} sm={6} md={6}>
        <InputSelect
          label="Sexo"
          name="gender"
          options={[
            { id: 'M', value: 'Macho' },
            { id: 'F', value: 'Fêmea' },
          ]}
        />
      </Col>
      <Col xs={12} sm={6} md={6}>
        <Input
          name="weight"
          inputMask={weightMask}
          label="Peso"
          autoComplete="off"
          defaultValue="0"
        />
      </Col>
      <Col xs={12} sm={6} md={6}>
        <Input name="breed" label="Raça" />
      </Col>
      <Col xs={12} sm={12} md={12}>
        <Checkbox name="lactating" label="Lactante (Esta produzindo leite)" />
      </Col>
    </Form>
  );
};

export default FormComponent;
