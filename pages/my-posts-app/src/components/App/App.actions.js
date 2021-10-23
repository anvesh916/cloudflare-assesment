import { createActionsHook } from "react-redux-actions-hook";
import { AppActionType } from "./constants";

export const removeToastMessage = () => (dispatch) => {
  dispatch({
    type: AppActionType.REMOVE_TOAST_MESSAGE,
    payload: { message: "", type: "" },
  });
};

export const setToastMessage =
  ({ message, type }) =>
  (dispatch) => {
    dispatch({
      type: AppActionType.SET_TOAST_MESSAGE,
      payload: { message, type },
    });
  };

export const setBusy =
  ({ busy }) =>
  (dispatch) => {
    dispatch({
      type: AppActionType.APP_BUSY,
      payload: { busy },
    });
  };

export default createActionsHook({
  removeToastMessage,
  setToastMessage,
});
