import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import AppRouter from "./router";

export const Root = ({ history, store }) => (
  <ReduxProvider store={store}>
    <AppRouter history={history} />
  </ReduxProvider>
);
Root.displayName = "Root";

export default Root;
