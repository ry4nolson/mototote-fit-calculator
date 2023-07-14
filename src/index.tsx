import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css?inline';

/* eslint-disable import/no-webpack-loader-syntax */
const root = ReactDOM.createRoot(document.getElementById('fit-calculator')!);
root.render(
  <React.StrictMode>
    <style dangerouslySetInnerHTML={{ __html: `
.fit-calculator * {
  box-sizing: border-box;
}
.fit-calculator {
  max-width: 600px;
  margin: 0 auto;
}
.fit-calculator .formField {
  padding:0.5rem 0;
}
.fit-calculator .formLabel {
  font-weight:600;
  margin-bottom:0.25rem;
}
.fit-calculator .formField input:not([type="checkbox"]) {
  width:100%;
}
.fit-calculator input[type=number]::-webkit-inner-spin-button,
.fit-calculator input[type=number]::-webkit-outer-spin-button {
  opacity: 1;
  height:40px;
  -webkit-appearance: auto;
}
.fit-calculator .recommendations {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.fit-calculator .product {
  width:200px;
}
    `}} />
    <App />
  </React.StrictMode>
);