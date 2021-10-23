import { createActionsHook } from "react-redux-actions-hook";
import { APIHandler } from "../../api/request";
import { setToastMessage } from "../App/App.actions";
import { PostActionType } from "./constants";

const loadPosts = () => {
  console.log("Loading posts");
  return (dispatch) => {
    APIHandler("/posts", { method: "GET" }, dispatch)
      .then((response) => {
        response.sort((a, b) => a.id - b.id);
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
      .then(() => {
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
        dispatch(loadPosts());
      })
      .catch((error) => {
        //Handle Error
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
        dispatch(loadPosts());
      })
      .catch((error) => {
        //Handle Error
      });
  };
};

export default createActionsHook({
  loadPosts,
  deletePost,
  createPost,
  updatePosts,
});
