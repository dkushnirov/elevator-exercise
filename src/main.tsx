import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './components/App/App';

import './index.css';
import Theme from './theme';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Theme>
      <App />
    </Theme>
  </React.StrictMode>
);
