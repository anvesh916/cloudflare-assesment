import React from "react";
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  styled,
  Typography,
} from "@material-ui/core";
import FavoriteIcon from "@mui/icons-material/Favorite";
import useStyles from "./Styles";
import postActions from "./Posts.actions";
import { Box } from "@mui/system";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));
function PostsTemplate({ post }) {
  const classes = useStyles();
  const { deletePost, updatePosts } = postActions();
  const setLike = (post) => {
    updatePosts(post.id, { likes: (post.likes || 0) + 1 });
  };
  let classNameHolder = ["avatar", "orangeAvatar", "purpleAvatar"];
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardHeader
        avatar={
          <Avatar className={classes[classNameHolder[post.id % 3]]}>
            {post.username
              ? post.username[0]
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
              : ""}
          </Avatar>
        }
        action={
          <Box pr={1}>
            <IconButton onClick={() => setLike(post)} aria-label="cart">
              <StyledBadge badgeContent={post.likes || 0} color="secondary">
                <FavoriteIcon color="action" />
              </StyledBadge>
            </IconButton>
          </Box>
        }
        title={post.title}
        subheader={post.username}
      />
      <CardMedia
        style={{ objectFit: "contain" }}
        component="img"
        height="300px"
        image={`https://media.giphy.com/media/${
          post.media_link ? post.media_link : "sJWNLTclcvVmw"
        }/giphy.gif`}
        alt="giphy"
      />
      <CardContent>
        <Typography variant="body1">{post.content}</Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button color="primary" size="small" onClick={() => {}}>
          Comment
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => deletePost(post.id)}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

export default PostsTemplate;
