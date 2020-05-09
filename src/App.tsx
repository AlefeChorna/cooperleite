import React from 'react';
import { Router } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Routes from './routes';
import { ThemeProvider } from './hooks/ThemeContext';
import history from './services/history';
import GlobalStyle from './styles/global';
import { store, persistor } from './store';

const App: React.FC = () => {
  const notify = () => toast('Wow so easy !');

  return (
    // <Provider store={store}>
    //   <PersistGate persistor={persistor}>
    //     <Router history={history}>
    //       <ThemeProvider>
    //         <GlobalStyle />
    //         <Routes />
    //         <ToastContainer autoClose={5000} />
    //       </ThemeProvider>
    //     </Router>
    //   </PersistGate>
    // </Provider>
    <>
      <button onClick={() => notify()}>Notify !</button>
      <ToastContainer />
    </>
  );
};

export default App;
