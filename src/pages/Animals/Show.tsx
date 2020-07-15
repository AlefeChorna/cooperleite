import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import LayoutShow from '../../components/Layouts/Show';
import InputGroup from '../../components/InputGroup';
import Col from '../../components/Col';
import Input from '../../components/MUInput';
import InputSelect from '../../components/InputSelect';
import Checkbox from '../../components/Checkbox';

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
        onSubmit={(data) => {
          console.log('submit data ==> ', data);
          formRef.current?.setErrors({
            name: 'Campo Obrigatório',
            gender: 'Campo Obrigatório',
            earring_number: 'Campo Obrigatório',
            weight: 'Campo Obrigatório',
          });
          formRef.current?.setData({
            name: 'Mimosa',
            lactating: true,
          });
        }}
      >
        <InputGroup>
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
          <Col xs={12} sm={6} md={6}>
            <Checkbox
              name="lactating"
              label="Lactante (Esta produzindo leite)"
            />
          </Col>
        </InputGroup>

        <button type="submit">sasd</button>
      </Form>
    </LayoutShow>
  );
};

export { Show };
