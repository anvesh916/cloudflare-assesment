import { setBusy, setToastMessage } from "../components/App/App.actions";
const API_URL = "https://worker-router.anvesh-voona.workers.dev";
export const APIHandler = (path, options, dispatch) => {
  dispatch(setBusy({ busy: true }));
  return fetch(API_URL + path, {
    ...options,
    method: options.method,
    credentials: "same-origin",
    headers: new Headers({
      "Content-Type": "application/json",
      ...options.headers,
    }),
  })
    .then(async (resp) => {
      dispatch(setBusy({ busy: false }));
      const res = await resp.json();
      if (resp.ok) {
        return res;
      } else if (res && res?.message) {
        dispatch(
          setToastMessage({
            message: res.message,
            type: "error",
          })
        );
      }
      throw res;
    })
    .finally(() => dispatch(setBusy({ busy: false })));
};
