import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import LayoutShow from '../../components/Layouts/Show';
import InputGroup from '../../components/InputGroup';
import Col from '../../components/Col';
import Input from '../../components/MUInput';
import InputSelect from '../../components/InputSelect';

import {
  animalListRoute,
  animalCreateRoute,
  animalEditRoute,
} from '../../routes/config';
import createNumberMask from '../../utils/createNumberMask';

const weightMask = createNumberMask();
const earringNumberMask = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/];

const Show: React.FC = () => {
  const { id } = useParams();
  const formRef = useRef<FormHandles>(null);

  return (
    <LayoutShow
      breadcrumbs={[
        { path: animalListRoute.path, text: 'Animais' },
        { text: 'Visualizar Animal' },
      ]}
      navMenuProps={{
        newRoute: animalCreateRoute.path,
        editRoute: animalEditRoute.build({ id }),
      }}
    >
      <Form
        ref={formRef}
        onSubmit={(as) => {
          console.log('submit data ==> ', as);
          formRef.current?.setErrors({
            name: 'Campo Obrigatório - Nome',
            gender: 'Campo Obrigatório - Sexo',
            earring_number: 'Campo Obrigatório - Brinco',
            weight: 'Campo Obrigatório - Peso',
          });
          formRef.current?.setData({
            name: 'Theo',
            gender: 'M',
            earring_number: '12',
            weight: '3,5',
          });
        }}
      >
        <InputGroup>
          <Col xs={12} sm={12} md={6}>
            <Input
              name="name"
              label="Nome"
              helperText="Campo Obrigatório"
              autoComplete="off"
            />
          </Col>
          <Col xs={12} sm={12} md={6}>
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
        </InputGroup>
        <button type="submit">dfsd</button>
      </Form>
    </LayoutShow>
  );
};

export { Show };
