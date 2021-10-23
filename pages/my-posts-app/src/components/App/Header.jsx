import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

const Header = ({ children }) => {
  return (
    <>
      <AppBar position="fixed" color="white" elevation={0}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Anvesh Kumar Voona's Cloudfare App
          </Typography>
        </Toolbar>
        {children}
      </AppBar>
      <Toolbar />
    </>
  );
};

export default Header;
