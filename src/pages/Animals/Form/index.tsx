import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { toast } from 'react-toastify';

import Form from '../../../components/Form';
import Col from '../../../components/Col';
import InputText from '../../../components/Input/Text';
import InputSelect from '../../../components/Input/Select';
import Checkbox from '../../../components/Input/Checkbox';

import Request from '../../../services/request';
import createNumberMask from '../../../utils/createNumberMask';
import { animalsRouteApi } from '../../../routes/config/api';
import formatNumberToInput from '../../../utils/formatNumberToInput';
import formatDateToInput from '../../../utils/formatDateToInput';

const weightMask = createNumberMask();
const earringNumberMask = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
const dateBirthMask = [
  /\d/,
  /\d/,
  '/',
  /\d/,
  /\d/,
  '/',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

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
              date_birth: formatDateToInput(response.data.date_birth),
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
      <InputText
        name="name"
        label="Nome"
        helperText="Campo Obrigatório"
        autoComplete="off"
        sm={6}
        md={6}
      />
      <InputText
        name="earring_number"
        inputMask={earringNumberMask}
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
      <InputText
        name="weight"
        inputMask={weightMask}
        label="Peso"
        autoComplete="off"
        sm={6}
        md={6}
      />
      <InputText name="breed" label="Raça" sm={6} md={6} />
      <InputText
        name="date_birth"
        label="Data de Nascimento"
        inputMask={dateBirthMask}
        sm={6}
        md={6}
      />
      <Checkbox name="lactating" label="Lactante (Esta produzindo leite)" />
    </Form>
  );
};

export default FormComponent;
