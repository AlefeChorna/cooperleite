import React, { useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

import Col from '../../components/Col';
import InputText from '../../components/Input/Text';
import Button from '../../components/Button';

import getValidationsErrors from '../../utils/getValidationsErrors';
import { signUpRoute, forgotPasswordRoute } from '../../routes/config';
import { signInRequest } from '../../store/modules/auth/actions';
import { StoreStateTypes } from '../../store/types';

import {
  Container,
  Form,
  Content,
  AnimationContainer,
  Background,
} from './styles';

const SignIn: React.FC = () => {
  const dispatch = useDispatch();
  const loading = useSelector<StoreStateTypes, boolean>(
    (state) => state.auth.loading,
  );

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, { abortEarly: false });
        dispatch(signInRequest(data));
      } catch (err) {
        const validationErrors = getValidationsErrors(err);
        formRef.current?.setErrors(validationErrors);
      }
    },
    [dispatch],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <Form formRef={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu login</h1>

            <InputText
              startAdornment={<FiMail size={19} />}
              name="email"
              type="email"
              placeholder="E-mail"
            />
            <InputText
              startAdornment={<FiLock size={20} />}
              name="password"
              type="password"
              placeholder="Senha"
              autoComplete="on"
            />

            <Button loading={loading} type="submit">
              Entrar
            </Button>

            <Link to={forgotPasswordRoute.path}>Esqueci minha senha</Link>
          </Form>

          <Link to={signUpRoute.path}>
            <FiLogIn />
            Criar conta
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
