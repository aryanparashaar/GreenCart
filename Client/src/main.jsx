import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AppContextProvider } from './Context/AppContext.jsx';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </React.StrictMode>
  </BrowserRouter>
);

/*


*/

