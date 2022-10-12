import React from 'react';
import ReactDOM from 'react-dom/client';
import GlobalStyle from './styles/GlobalStyle';
import Router from './Router';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <GlobalStyle />
    <Router />
  </>
);
