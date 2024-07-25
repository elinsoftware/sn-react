import React from "react";
import { Button, Grid, Checkbox, TextField } from "@material-ui/core";

export const NewCard = ({
  newZoneObj,
  cancelNewNetworkSecurityInfo,
  addNewNetworkSecurityZones,
  newZoneName,
  newIPPool,
  setNewZoneName,
  setNewIPPool,
}) => {
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Checkbox color="primary" id={newZoneObj.id} />
        <TextField
          onChange={(e) => setNewZoneName(e.target.value)}
          size="small"
          disabled
          id={newZoneObj.id}
          label="Zone Name"
          defaultValue={newZoneName}
          variant="filled"
        />

        <TextField
          size="small"
          disabled
          id={`ip-pool-${newZoneObj.id}`}
          label="IP Pool"
          defaultValue={newIPPool}
          variant="filled"
        />

        <Button
          onClick={() => addNewNetworkSecurityZones(newZoneObj.id)}
          variant="contained"
          size="small"
          color="primary"
        >
          Save
        </Button>
        <Button
          onClick={cancelNewNetworkSecurityInfo}
          variant="outlined"
          size="small"
          color="secondary"
        >
          Cancel
        </Button>
      </Grid>
    </>
  );
};
