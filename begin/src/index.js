import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Text from './text'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // Fragment 
  <> 
  <React.StrictMode>
    <App />
  </React.StrictMode>

  <Text />
  </>
);
