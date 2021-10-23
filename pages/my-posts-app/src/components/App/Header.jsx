import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

const Header = () => {
  return (
    <AppBar position="relative">
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap>
          My Social Media
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
