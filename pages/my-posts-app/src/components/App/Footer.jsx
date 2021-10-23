import React from "react";
import { Box } from "@mui/system";
import { Grid, Typography } from "@material-ui/core";
import { Copyright } from "@material-ui/icons";

const Footer = () => {
  return (
    <Box
      style={{ color: "white" }}
      sx={{ bgcolor: "background.paper", p: 6 }}
      component="footer"
    >
      <Typography variant="h6" align="center" gutterBottom>
        Anvesh Kumar Voona
      </Typography>
      <Typography variant="subtitle1" align="center" component="p">
        This is a Cloudfare assesment page!
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
            <Typography>2020</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
