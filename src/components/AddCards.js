import React, { useState } from "react";
import { Button, Grid, Select, MenuItem, InputLabel } from "@material-ui/core";

export const AddCards = ({
  names,
  ipPools,
  selectedName,
  selectedIPPool,
  setSelectedIPPool,
  setSelectedName,
  addNewNetworkSecurityZones,
}) => {
  function handleNameChange(event) {
    setSelectedName(event.target.value);
  }
  function handleIPPoolChange(event) {
    setSelectedIPPool(event.target.value);
  }
  return (
    <>
      <Grid
        className="card-container"
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <div id="display-selected-ip-pool">{selectedIPPool}</div>
        <div className="card-text-container">
          <InputLabel htmlFor="selected-name">Zone Name</InputLabel>
          <Select
            labelId="selected-name"
            className="card-text-field"
            value={selectedName}
            onChange={handleNameChange}
          >
            {names.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>

          <InputLabel htmlFor="selected-ip-pool">IP Pool</InputLabel>
          <Select
            labelId="selected-ip-pool"
            className="card-text-field"
            value={selectedIPPool}
            onChange={handleIPPoolChange}
          >
            {ipPools.map((ipPool) => (
              <MenuItem key={ipPool} value={ipPool} id="ip-pool-drop-down-item">
                {ipPool}
              </MenuItem>
            ))}
          </Select>
        </div>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Button
            id="add-new-security-zone-button"
            size="small"
            variant="contained"
            onClick={() =>
              addNewNetworkSecurityZones(selectedName, selectedIPPool)
            }
          >
            + Add New Security Zone
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
