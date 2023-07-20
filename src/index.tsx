import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
const index = (await import("./css/index.css?raw")).default;
const modal = (await import("./css/modal.css?raw")).default;
const results = (await import("./css/results.css?raw")).default;
const form = (await import("./css/form.css?raw")).default;

/* eslint-disable import/no-webpack-loader-syntax */
const root = ReactDOM.createRoot(document.getElementById("fit-calculator")!);
root.render(
  <React.StrictMode>
    <style dangerouslySetInnerHTML={{ __html: index }} />
    <style dangerouslySetInnerHTML={{ __html: form }} />
    <style dangerouslySetInnerHTML={{ __html: modal }} />
    <style dangerouslySetInnerHTML={{ __html: results }} />
    <App />
  </React.StrictMode>
);
