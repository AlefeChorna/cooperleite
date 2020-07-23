import React, { useCallback, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiUser, FiMail, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

import InputText from '../../components/Input/Text';
import Button from '../../components/Button';

import getValidationsErrors from '../../utils/getValidationsErrors';
import { signInRoute } from '../../routes/config';
import { signUpRequest } from '../../store/modules/user/actions';
import { StoreStateTypes } from '../../store/types';

import {
  Container,
  Content,
  AnimationContainer,
  Form,
  Background,
} from './styles';

const SignUp: React.FC = () => {
  const dispatch = useDispatch();
  const { loading, errors } = useSelector<StoreStateTypes, any>(
    (state) => state.user,
  );
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string()
            .required('Senha deve ter no mínimo 8 digítos')
            .min(8, 'No mínimo 8 digitos'),
        });

        await schema.validate(data, { abortEarly: false });
        dispatch(signUpRequest(data));
      } catch (err) {
        const validationErrors = getValidationsErrors(err);
        formRef.current?.setErrors(validationErrors);
      }
    },
    [dispatch],
  );

  useEffect(() => {
    formRef.current?.setErrors(errors);
  }, [errors]);

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <Form formRef={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu cadastro</h1>

            <InputText
              startAdornment={<FiUser size={19} />}
              name="name"
              type="name"
              placeholder="Nome"
            />
            <InputText
              startAdornment={<FiMail size={19} />}
              name="email"
              type="email"
              placeholder="E-mail"
            />
            <InputText
              startAdornment={<FiLock size={19} />}
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
            Voltar para login
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
