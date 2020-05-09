import React from 'react';
import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import 'react-toastify/dist/ReactToastify.css';

import Routes from './routes';
import { ThemeProvider } from './hooks/ThemeContext';
import history from './services/history';
import GlobalStyle from './styles/global';
import { store, persistor } from './store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <ThemeProvider>
            <GlobalStyle />
            <Routes />
            <ToastContainer />
          </ThemeProvider>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
