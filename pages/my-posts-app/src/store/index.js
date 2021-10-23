import { applyMiddleware, compose } from "redux";
import ReduxThunk from "redux-thunk";
import { routerMiddleware } from "connected-react-router";
import rootReducer from "./root.reducer";
import { createStore } from "redux";

const assembleMiddleware = (history) => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return composeEnhancers(
    applyMiddleware(ReduxThunk, routerMiddleware(history))
  );
};

const createAppStore = (history) =>
  createStore(rootReducer(history), {}, assembleMiddleware(history));

export default createAppStore;
