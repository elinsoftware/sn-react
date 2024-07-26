import React, { useState } from "react";
import { Button, Grid, TextField } from "@material-ui/core";

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
        className="card-container"
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <div className="card-text-container">
          <TextField
            className="card-text-field"
            onChange={(e) => setNewZoneName(e.target.value)}
            size="small"
            id={newZoneObj.id}
            label="Zone Name"
            defaultValue={newZoneName}
            variant="outlined"
          />

          <TextField
            className="card-text-field"
            onChange={(e) => setNewIPPool(e.target.value)}
            size="small"
            id={`ip-pool-${newZoneObj.id}`}
            label="IP Pool"
            defaultValue={newIPPool}
            variant="outlined"
          />
        </div>

        <Button
          className="card-button"
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
          className="card-button"
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
