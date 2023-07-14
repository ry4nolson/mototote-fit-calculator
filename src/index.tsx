import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
const css = (await import("./index.css?raw")).default;

/* eslint-disable import/no-webpack-loader-syntax */
const root = ReactDOM.createRoot(document.getElementById("fit-calculator")!);
root.render(
  <React.StrictMode>
    <style dangerouslySetInnerHTML={{ __html: css }} />
    <App />
  </React.StrictMode>
);
