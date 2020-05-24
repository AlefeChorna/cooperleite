import React, { useCallback, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import Input from '../../components/Input';
import Button from '../../components/Button';

import getValidationsErrors from '../../utils/getValidationsErrors';
import { signInRoute } from '../../routes/config';
import Request from '../../services/request';
import Route from '../../services/route';

import { Container, Content, AnimationContainer, Background } from './styles';

const ResetPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string().min(8, 'Senha deve ter no mínimo 8 digítos'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'Senha de confirmação incorreta',
          ),
        });

        await schema.validate(data, { abortEarly: false });

        setLoading(true);

        const { token } = Route.getCurrentUrlParams();
        await Request.post('/password/reset', {
          ...data,
          token,
        });

        toast.success(
          'Sua senha foi alterada com sucesso. Faça seu login para continuar navegando!',
        );

        history.replace(signInRoute.path, {});
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const validationErrors = getValidationsErrors(err);
          formRef.current?.setErrors(validationErrors);
          return;
        }

        toast.error('Ocorreu um erro ao alterar sua senha, tente novamente');
      } finally {
        setLoading(false);
      }
    },
    [history],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Alterar senha</h1>

            <Input
              icon={FiLock}
              name="password"
              type="password"
              placeholder="Digite sua nova senha"
              autoComplete="on"
            />

            <Input
              icon={FiLock}
              name="password_confirmation"
              type="password"
              placeholder="Confirme sua nova senha"
              autoComplete="on"
            />

            <Button loading={loading} type="submit">
              Salvar
            </Button>
          </Form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ResetPassword;
