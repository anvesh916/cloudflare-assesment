import React, { useEffect, useState } from "react";
import {
  Button,
  Chip,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/system";
import useStyles from "./Styles";
import postActions from "./Posts.actions";
import ReactGiphySearchbox from "react-giphy-searchbox";
import "./Posts.css";

function CreatePost() {
  const { createPost } = postActions();
  const textfields = ["username", "title", "content", "media_link"];

  const [fieldChecked, setFieldChecked] = useState(
    Object.fromEntries(textfields.map((each) => [[each], true]))
  );
  const [isFormValid, setIsFormValid] = useState(true);
  const [gifTitle, setGifTitle] = useState();
  useEffect(() => {
    checkFormValidity();
  });
  const checkFormValidity = () => {
    const checkFields =
      !!payload["title"] &&
      !!payload["username"] &&
      !!payload["content"] &&
      !!payload["media_link"];
    setIsFormValid(checkFields);
  };
  const classes = useStyles();
  const [payload, setPayload] = useState(
    Object.fromEntries(textfields.map((each) => [[each], ""]))
  );
  const UILabels = {
    username: "What's your name",
    content: "What's on your mind",
    title: "Topic",
    media_link: "Add your media here!",
  };
  const handleChange = (data) => {
    setPayload({ ...payload, ...data });
  };
  return (
    <Box
      sx={{
        pt: 4,
        pb: 6,
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="h3" align="center" gutterBottom>
          Create a Post
        </Typography>
        {["username", "title", "content"].map((value) => (
          <Box key={value} m={2}>
            <TextField
              fullWidth
              required
              id={value}
              value={payload[value]}
              variant="outlined"
              placeholder={UILabels[value]}
              InputProps={{
                classes: {
                  input: classes.resize,
                },
              }}
              onClick={() => {
                setFieldChecked({
                  ...fieldChecked,
                  [value]: true,
                });
              }}
              error={!fieldChecked[value]}
              onChange={({ target }) => handleChange({ [value]: target.value })}
            />
          </Box>
        ))}
        <Grid justifyContent="center" container>
          {gifTitle && (
            <Chip label={gifTitle} variant="contained" color="primary" />
          )}

          <div className="searchboxWrapper">
            <ReactGiphySearchbox
              apiKey="9Ixlv3DWC1biJRI57RanyL7RTbfzz0o7"
              onSelect={(item) => {
                setGifTitle(item.title);
                handleChange({ media_link: item.id });
              }}
              masonryConfig={[
                { columns: 2, imageWidth: 150, gutter: 5 },
                { mq: "700px", columns: 3, imageWidth: 150, gutter: 5 },
              ]}
            />
          </div>
        </Grid>
        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          <Button
            disabled={!isFormValid}
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
