import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import app from "../components/App/App.reducer";
import posts from "../components/Posts/Posts.reducer";

const rootReducer = (history) => {
  const rootReducer = combineReducers({
    app,
    posts,
    router: connectRouter(history),
  });
  return (state = {}, action) => {
    if (!action) return state;
    return rootReducer(state, action);
  };
};

export default rootReducer;
