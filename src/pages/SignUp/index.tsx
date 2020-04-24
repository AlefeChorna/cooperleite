import React from 'react';
import { FiLogIn } from 'react-icons/fi';

import { Container, Content, Background } from './styles';

const SignUp: React.FC = () => {
  return (
    <Container>
      <Background />
      <Content>
        <form>
          <h1>Criar conta</h1>

          <input type="name" placeholder="Nome" />
          <input type="email" placeholder="E-mail" />
          <input type="password" placeholder="Senha" />
          <button type="submit">Cadastrar</button>
        </form>

        <a href="ca">
          <FiLogIn />
          Fazer logon
        </a>
      </Content>
    </Container>
  );
};

export default SignUp;
