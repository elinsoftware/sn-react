import React from "react";
import { Button, Grid, Checkbox, TextField } from "@material-ui/core";

export const ExistingCard = ({ zoneObj, deleteNetworkSecurityZoneInfo }) => {
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Checkbox color="primary" id={zoneObj.id} />
        <TextField
          size="small"
          disabled
          id={zoneObj.id}
          label="Zone Name"
          defaultValue={zoneObj.name}
          variant="filled"
        />

        <TextField
          size="small"
          disabled
          id={`ip-pool-${zoneObj.id}`}
          label="IP Pool"
          defaultValue={zoneObj.ip_pool}
          variant="filled"
        />

        <Button variant="contained" size="small">
          Edit
        </Button>
        <Button
          onClick={() => deleteNetworkSecurityZoneInfo(zoneObj.id)}
          variant="outlined"
          size="small"
          color="secondary"
        >
          Remove
        </Button>
      </Grid>
    </>
  );
};
