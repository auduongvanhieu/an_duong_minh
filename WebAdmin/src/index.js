import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// let str = window.location.href;
// if (str.indexOf('token=') != -1) {
//   let token = str.slice(str.indexOf("token=")+6);
//   console.log(str.indexOf('token='))
//   console.log(token)
//   localStorage.setItem('token',token)
//   window.location.href=(window.location.origin)
// }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
