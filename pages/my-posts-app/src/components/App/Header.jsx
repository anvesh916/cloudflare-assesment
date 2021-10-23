import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

const Header = ({ children }) => {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Anvesh Kumar Voona's Cloudfare Application
          </Typography>
        </Toolbar>
        {children}
      </AppBar>
      <Toolbar />
    </>
  );
};

export default Header;
