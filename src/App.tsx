import React from 'react';
import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Routes from './routes';
import history from './services/history';
import GlobalStyle from './styles/global';

const App: React.FC = () => {
  return (
    <Router history={history}>
      <GlobalStyle />
      <Routes />
      <ToastContainer autoClose={5000} />
    </Router>
  );
};

export default App;
