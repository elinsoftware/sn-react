import React, { useState } from "react";
import { Button, Grid, Checkbox, TextField } from "@material-ui/core";

export const NewCard = ({
  newZoneObj,
  cancelNewNetworkSecurityInfo,
  addNewNetworkSecurityZones,
}) => {
  const [newZoneName, setNewZoneName] = useState("");
  const [newIPPool, setNewIPPool] = useState("");
  return (
    <>
      <Grid
        className="existing-card-container"
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Checkbox color="primary" id={newZoneObj.id} />
        <div className="existing-card-text-container">
          <TextField
            className="existing-card-text-field"
            onChange={(e) => setNewZoneName(e.target.value)}
            size="small"
            id={newZoneObj.id}
            label="Zone Name"
            defaultValue={newZoneName}
            variant="outlined"
          />

          <TextField
            className="existing-card-text-field"
            onChange={(e) => setNewIPPool(e.target.value)}
            size="small"
            id={`ip-pool-${newZoneObj.id}`}
            label="IP Pool"
            defaultValue={newIPPool}
            variant="outlined"
          />
        </div>

        <Button
          onClick={() =>
            addNewNetworkSecurityZones(newZoneObj.id, newZoneName, newIPPool)
          }
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
