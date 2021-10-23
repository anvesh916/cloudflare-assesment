import { createActionsHook } from "react-redux-actions-hook";
import { APIHandler } from "../../api/request";
import { setToastMessage } from "../App/App.actions";
import { PostActionType } from "./constants";

const loadPosts = () => {
  return (dispatch) => {
    APIHandler("/posts", { method: "GET" }, dispatch)
      .then((response) => {
        response.sort((b, a) => a.id - b.id);
        dispatch({ type: PostActionType.LOAD_ALL_POSTS, posts: response });
      })
      .catch((error) => {
        //Handle Error
      });
  };
};

const updatePosts = (id, payload) => {
  return (dispatch) => {
    APIHandler(
      `/posts/${id}/`,
      { method: "PUT", body: JSON.stringify(payload) },
      dispatch
    )
      .finally(() => {
        dispatch(loadPosts());
      })
      .catch((error) => {
        //Handle Error
      });
  };
};

const deletePost = (id) => {
  return (dispatch) => {
    APIHandler(`/posts/${id}/`, { method: "DELETE" }, dispatch)
      .then(() => {
        dispatch(
          setToastMessage({
            message: "Post deleted!",
            type: "success",
          })
        );
      })
      .catch((error) => {
        //Handle Error
      })
      .finally(() => {
        dispatch(loadPosts());
      });
  };
};

const createPost = (payload) => {
  return (dispatch) => {
    APIHandler(
      "/posts",
      { method: "POST", body: JSON.stringify(payload) },
      dispatch
    )
      .then(() => {
        dispatch(
          setToastMessage({
            message: "Your post is now live!",
            type: "success",
          })
        );
      })
      .catch((error) => {
        //Handle Error
      })
      .finally(() => {
        dispatch(loadPosts());
      });
  };
};

export default createActionsHook({
  loadPosts,
  deletePost,
  createPost,
  updatePosts,
});
