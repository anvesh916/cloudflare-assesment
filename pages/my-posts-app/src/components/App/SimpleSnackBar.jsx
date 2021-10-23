import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const SimpleSnackbar = (props) => {
  const { message, clearMessage, type } = props;
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    clearMessage();
  };

  return (
    <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
      <MuiAlert
        onClose={handleClose}
        severity={type}
        elevation={6}
        variant="filled"
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default SimpleSnackbar;
