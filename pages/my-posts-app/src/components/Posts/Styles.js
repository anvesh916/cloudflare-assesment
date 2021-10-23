import { deepOrange, deepPurple, red } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  avatar: {
    color: "#fff",
    backgroundColor: red[500],
  },
  orangeAvatar: {
    color: "#fff",
    backgroundColor: deepOrange[500],
  },
  purpleAvatar: {
    color: "#fff",
    backgroundColor: deepPurple[500],
  },
  resize: {
    fontSize: 20,
  },
}));

export default useStyles;
