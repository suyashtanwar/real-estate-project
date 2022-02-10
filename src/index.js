import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
// For GET requests
axios.interceptors.request.use(
  (req) => {

    // Add configurations here
    return req;
  },
  (err) => {
    if (err.response.status == 401) {
      localStorage.clear();
      window.location.reload();
    }
    //console.log(err.response.status,'error get auhonticate 401');
    return Promise.reject(err);
  }
);

axios.interceptors.response.use(
  (res) => {

    return res;
  },
  (err) => {
    if (err.response.status == 401) {
      localStorage.clear();
      window.location.reload();
    }
    //console.log(err.response.status,'error post auhonticate 401');
    return Promise.reject(err);
  }
);
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
