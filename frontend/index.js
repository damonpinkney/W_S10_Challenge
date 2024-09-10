import './styles/reset.css';
import './styles/styles.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './state/store'; // Correctly import the default export
import App from './components/App';

const domNode = document.getElementById('root');
const root = createRoot(domNode);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
