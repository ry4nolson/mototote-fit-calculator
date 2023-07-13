import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

/* eslint-disable import/no-webpack-loader-syntax */
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <style
      dangerouslySetInnerHTML={{
        __html: require('!raw-loader!./index.css').default
      }}
    />
    <App />
  </React.StrictMode>
);