import React from "react";
import { Box } from "@mui/system";
import { Grid, Typography } from "@material-ui/core";
import { Copyright } from "@material-ui/icons";

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
      <Typography variant="h6" align="center" gutterBottom>
        Anvesh Kumar Voona
      </Typography>
      <Typography align="center" gutterBottom>
        anvesh.voona@gmail.com
      </Typography>
      <Typography variant="subtitle1" align="center" component="p">
        Cloudflare General Assignment
      </Typography>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <Box mr={1}>
            <Copyright />
          </Box>
        </Grid>
        <Grid item>
          <Box height={30}>
            <Typography>{new Date().toUTCString()}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
