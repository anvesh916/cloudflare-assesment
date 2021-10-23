import React, { useEffect } from "react";
import { Container, Grid } from "@material-ui/core";
import PostsTemplate from "./PostTemplate";
import { Box } from "@mui/system";
import postActions from "./Posts.actions";
import { useSelector } from "react-redux";

function AllPosts() {
  const { loadPosts } = postActions();
  const { posts } = useSelector((s) => s.posts);

  useEffect(() => {
    loadPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Box pt={4}>
        <Grid container spacing={2}>
          {posts.map((post) => (
            <Grid item key={post.id} xs={12} sm={6} md={6}>
              <PostsTemplate post={post} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default AllPosts;
