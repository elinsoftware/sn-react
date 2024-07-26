import React from "react";
import { Button, Grid } from "@material-ui/core";

export const Footer = ({ submitNetworkSecurityZoneInfo, closeModal }) => {
  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Button
            id="footer-button"
            className="card-button"
            onClick={closeModal}
            size="small"
            variant="contained"
          >
            Cancel
          </Button>
          <Button
            id="footer-button"
            className="card-button"
            onClick={submitNetworkSecurityZoneInfo}
            size="small"
            variant="contained"
            color="primary"
          >
            Ok
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
