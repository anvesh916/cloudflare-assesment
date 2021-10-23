import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { Switch, Route } from "react-router";
import App from "../components/App";
import Posts from "../components/Posts";

const AppRouter = ({ history }) => {
  return (
    <ConnectedRouter history={history}>
      <App>
        <Switch>
          <Route component={Posts} />
        </Switch>
      </App>
    </ConnectedRouter>
  );
};

export default AppRouter;
