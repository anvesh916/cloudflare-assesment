import React, { useState } from "react";
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  styled,
  TextField,
  Typography,
} from "@material-ui/core";
import FavoriteIcon from "@mui/icons-material/Favorite";
import useStyles from "./Styles";
import postActions from "./Posts.actions";
import { Box } from "@mui/system";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MessageIcon from "@mui/icons-material/Message";
import DeleteIcon from "@mui/icons-material/Delete";
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function PostsTemplate({ post }) {
  const [expanded, setExpanded] = React.useState(false);
  const [commentText, setCommentText] = useState("");
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const classes = useStyles();
  const { deletePost, updatePosts } = postActions();
  const setLike = (post) => {
    updatePosts(post.id, { likes: (post.likes || 0) + 1 });
  };
  const setComments = (post, comment) => {
    let allComments = [];
    if (post.comments) {
      allComments = [...post.comments];
    }
    allComments.push(comment);
    updatePosts(post.id, { comments: allComments });
  };

  let classNameHolder = ["avatar", "orangeAvatar", "purpleAvatar"];
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardHeader
        avatar={
          <Avatar className={classes[classNameHolder[0]]}>
            {post.username
              ? post.username
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
      {post.media_link && (
        <CardMedia
          style={{ objectFit: "contain" }}
          component="img"
          height="300px"
          image={`https://media.giphy.com/media/${post.media_link}/giphy.gif`}
          alt="giphy"
        />
      )}
      <CardContent>
        <Typography variant="body1">{post.content}</Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button
          style={{ textTransform: "none" }}
          color="primary"
          variant="outlined"
          startIcon={<MessageIcon />}
          onClick={handleExpandClick}
          disableElevation
        >
          <Typography>
            Comment{post.comments ? `s (${post.comments.length})` : ""}
          </Typography>
        </Button>
        <Box ml={2}>
          <Button
            style={{ textTransform: "none" }}
            color="secondary"
            variant="outlined"
            startIcon={<DeleteIcon />}
            onClick={() => deletePost(post.id)}
            disableElevation
          >
            <Typography>Delete</Typography>
          </Button>
        </Box>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {/* {comments.map((c) => (
            <Typography>{c}</Typography>
          ))} */}
          {post.comments && (
            <List dense={false}>
              {post.comments.map((c) => (
                <ListItem>
                  <ListItemIcon>
                    <MessageIcon />
                  </ListItemIcon>
                  <ListItemText primary={c} />
                </ListItem>
              ))}
            </List>
          )}
          <TextField
            onKeyPress={(ev) => {
              if (ev.key === "Enter") {
                setComments(post, ev.target.value);
                setCommentText("");
                ev.preventDefault();
              }
            }}
            onChange={({ target }) => setCommentText(target.value)}
            size="small"
            fullWidth
            value={commentText}
            variant="outlined"
            placeholder="Write a comment..."
          />
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default PostsTemplate;
