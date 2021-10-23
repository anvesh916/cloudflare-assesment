import { Box } from "@material-ui/core";
import AllPosts from "./AllPosts";
import CreatePost from "./CreatePost";

function Posts() {
  return (
    <Box>
      <CreatePost />
      <AllPosts />
    </Box>
  );
}

export default Posts;
