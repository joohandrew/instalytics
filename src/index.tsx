import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './components/app/app'; 
import { SessionContextProvider } from './contexts/sessionContext';

const createApp = () => {
  return (
    <BrowserRouter>
      <SessionContextProvider>
        <App />
      </SessionContextProvider>
    </BrowserRouter>
  )
}

ReactDOM.render(createApp(), document.getElementById('root'));