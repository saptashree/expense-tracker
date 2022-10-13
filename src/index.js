import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { SpeechProvider } from '@speechly/react-client'
import { Provider } from './context/context'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SpeechProvider appId='5dd6a034-8041-4bbf-89bc-1f02d4459888' language='en-US'>
      <Provider>
        <App />
      </Provider>
    </SpeechProvider>
  </React.StrictMode>
);