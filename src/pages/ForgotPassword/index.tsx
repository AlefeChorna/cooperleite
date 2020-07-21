import React, { useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn, FiMail } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import InputText from '../../components/Input/Text';
import Button from '../../components/Button';

import getValidationsErrors from '../../utils/getValidationsErrors';
import { signInRoute } from '../../routes/config';
import Request from '../../services/request';
import history from '../../services/history';

import { Container, Content, AnimationContainer, Background } from './styles';

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
      });

      await schema.validate(data, { abortEarly: false });

      setLoading(true);

      await Request.post('/password/forgot', {
        email: data.email,
      });

      toast.success(
        'Em instantes você receberá um e-mail com instruções para alterar sua senha',
      );

      history.replace(signInRoute.path, {});
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const validationErrors = getValidationsErrors(err);
        formRef.current?.setErrors(validationErrors);
        return;
      }

      toast.error(
        'Ocorreu um erro ao tentar realizar a recuperação de senha, tente novamente',
      );
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Recuperar senha</h1>

            <InputText
              startAdornment={<FiMail size={19} />}
              name="email"
              type="email"
              placeholder="Digite seu e-mail"
            />

            <Button loading={loading} type="submit">
              Enviar
            </Button>
          </Form>

          <Link to={signInRoute.path}>
            <FiLogIn />
            Voltar ao login
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ForgotPassword;
