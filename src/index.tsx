import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css?inline';

/* eslint-disable import/no-webpack-loader-syntax */
const root = ReactDOM.createRoot(document.getElementById('fit-calculator')!);
root.render(
  <React.StrictMode>
    <style dangerouslySetInnerHTML={{ __html: `
* {
  box-sizing: border-box;
}
.formField {
  padding:0.5rem 0;
}
.formLabel {
  font-weight:600;
  margin-bottom:0.25rem;
}
.formField input:not([type="checkbox"]) {

}
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  opacity: 1;
  height:40px;
  -webkit-appearance: auto;
}
    `}} />
    <App />
  </React.StrictMode>
);