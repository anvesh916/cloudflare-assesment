import { AppActionType } from "./constants";

export const getDefaultState = () => ({
  busy: false,
  toast: {
    message: "",
    type: "",
  },
});

const appReducer = (state = getDefaultState(), action) => {
  switch (action.type) {
    case AppActionType.APP_BUSY:
      return setAppBusy(state, action.payload);
    case AppActionType.SET_TOAST_MESSAGE:
      return setToastMessage(state, action.payload);
    case AppActionType.REMOVE_TOAST_MESSAGE:
      return removeToastMessage(state);
    default:
      return state;
  }
};

const setAppBusy = (state, { busy }) => {
  return {
    ...state,
    busy,
  };
};

const setToastMessage = (state, { message, type }) => {
  return {
    ...state,
    toast: { message, type },
  };
};

const removeToastMessage = (state) => {
  return {
    ...state,
    toast: { message: "", type: "" },
  };
};

export default appReducer;
