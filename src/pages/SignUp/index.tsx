import React, { useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiUser, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

import Input from '../../components/Input';
import Button from '../../components/Button';

import getValidationsErrors from '../../utils/getValidationsErrors';
import { signInRoute } from '../../routes/config';
import { signUpRequest } from '../../store/modules/auth/actions';
import { RootTypes } from '../../store/types';

import { Container, Content, AnimationContainer, Background } from './styles';

const SignUp: React.FC = () => {
  const dispatch = useDispatch();
  const loading = useSelector<RootTypes, boolean>(
    (state) => state.auth.loading,
  );
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().min(6, 'No mínimo 6 digitos'),
      });

      await schema.validate(data, { abortEarly: false });
      dispatch(signUpRequest(data));
    } catch (err) {
      const validationErrors = getValidationsErrors(err);
      formRef.current?.setErrors(validationErrors);
    }
  }, []);

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu cadastro</h1>

            <Input icon={FiUser} name="name" type="name" placeholder="Nome" />
            <Input
              icon={FiMail}
              name="email"
              type="email"
              placeholder="E-mail"
            />
            <Input
              icon={FiLock}
              name="password"
              type="password"
              placeholder="Senha"
              autoComplete="on"
            />

            <Button loading={loading} type="submit">
              Cadastrar
            </Button>
          </Form>

          <Link to={signInRoute.path}>
            <FiArrowLeft />
            Voltar para logon
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
