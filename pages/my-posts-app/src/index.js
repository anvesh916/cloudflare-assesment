import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserHistory } from "history";
import Root from "./Root";
import createAppStore from "./store";

function main() {
  const history = createBrowserHistory();
  const store = createAppStore(history);
  const root = document.getElementById("root");
  ReactDOM.render(React.createElement(Root, { history, store }, null), root);
}

document.addEventListener("DOMContentLoaded", () => main());

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
