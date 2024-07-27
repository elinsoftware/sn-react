import React from "react";
import {
  FormControl,
  Button,
  Grid,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export const AddCards = ({
  names,
  availableIpPools,
  selectedName,
  selectedIPPool,
  setSelectedIPPool,
  setSelectedName,
  addNewNetworkSecurityZones,
}) => {
  const classes = useStyles();
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
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <div className="card-text-container">
          <Grid
            className="card-container"
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <FormControl variant="outlined" className={classes.formControl}>
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
            </FormControl>

            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="selected-ip-pool">IP Pool</InputLabel>
              <Select
                labelId="selected-ip-pool"
                className="card-text-field"
                value={selectedIPPool}
                onChange={handleIPPoolChange}
              >
                {availableIpPools.map((ipPool) => (
                  <MenuItem
                    key={ipPool}
                    value={ipPool}
                    id="ip-pool-drop-down-item"
                  >
                    {ipPool}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
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
