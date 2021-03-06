import React from 'react';
import ReactDOM from 'react-dom';

import Landing from 'pages/Landing';
import reportWebVitals from './reportWebVitals';
import 'styles/normalize.scss';

ReactDOM.render(
  <React.StrictMode>
    <Landing />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
