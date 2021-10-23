import { PostActionType } from "./constants";

export const getDefaultState = () => ({
  posts: [],
  newpost: {},
});

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = getDefaultState(), action) => {
  switch (action.type) {
    case PostActionType.LOAD_ALL_POSTS:
      return load_posts(state, action);
    case PostActionType.CREATE_POST:
      return create_post(state, action);
    default:
      return state;
  }
};

function create_post(state, { newpost }) {
  return {
    ...state,
    newpost,
  };
}

function load_posts(state, { posts }) {
  return {
    ...state,
    posts,
  };
}
