import React from "react";
import { Button, Grid } from "@material-ui/core";

export const Footer = ({
  createNetworkSecurityZones,
  closeModal,
  submitNetworkSecurityZoneInfo,
}) => {
  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid>
          <Button
            size="small"
            variant="contained"
            onClick={createNetworkSecurityZones}
          >
            + Add New Security Zone
          </Button>
        </Grid>
        <Grid>
          <Button onClick={closeModal} size="small" variant="contained">
            Cancel
          </Button>
          <Button
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
