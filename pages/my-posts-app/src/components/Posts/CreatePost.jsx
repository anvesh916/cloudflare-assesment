import React, { useState } from "react";
import { Button, Container, TextField, Typography } from "@material-ui/core";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/system";
import useStyles from "./Styles";
import postActions from "./Posts.actions";

function CreatePost() {
  const { createPost } = postActions();

  const classes = useStyles();
  const [payload, setPayload] = useState({
    username: "",
    content: "",
    title: "",
  });
  const handleChange = (data) => {
    setPayload({ ...payload, ...data });
  };
  return (
    <Box
      style={{ backgroundColor: "white" }}
      sx={{
        pt: 4,
        pb: 6,
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="h3" align="center" gutterBottom>
          Create a Post
        </Typography>
        <Box m={2}>
          <TextField
            fullWidth
            value={payload.username}
            variant="outlined"
            placeholder="Name"
            InputProps={{
              classes: {
                input: classes.resize,
              },
            }}
            onChange={({ target }) => handleChange({ username: target.value })}
          />
        </Box>
        <Box m={2}>
          <TextField
            fullWidth
            value={payload.title}
            variant="outlined"
            placeholder="Title"
            InputProps={{
              classes: {
                input: classes.resize,
              },
            }}
            onChange={({ target }) => handleChange({ title: target.value })}
          />
        </Box>
        <Box m={2}>
          <TextField
            InputProps={{
              classes: {
                input: classes.resize,
              },
            }}
            value={payload.content}
            variant="outlined"
            fullWidth
            placeholder="What's on your mind?"
            onChange={({ target }) => handleChange({ content: target.value })}
          />
        </Box>
        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => createPost(payload)}
          >
            Create
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}

export default CreatePost;
