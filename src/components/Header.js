import React from "react";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

export const Header = () => {
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h5" gutterBottom>
          Update Supported Network Security Zone
        </Typography>
      </Grid>
    </>
  );
};

/**
 new inputs are both drop downs
 
 */
