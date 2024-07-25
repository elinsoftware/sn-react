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
        <div>
          <label htmlFor={newZoneObj.id}>Zone Name</label>
          <input type="checkbox" id={newZoneObj.id} />
          <input
            type="text"
            id={newZoneObj.id}
            onChange={(e) => setNewZoneName(e.target.value)}
            value={newZoneName}
          />
        </div>

        <div>
          <label htmlFor={`ip-pool-${newZoneObj.id}`}>IP Pool</label>
          <input
            type="text"
            onChange={(e) => setNewIPPool(e.target.value)}
            id={`ip-pool-${newZoneObj.id}`}
            value={newIPPool}
          />
        </div>

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
