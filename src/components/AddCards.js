import React, { useState } from "react";
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
  securityZones,
  availableIpPools,
  addNewNetworkSecurityZones,
}) => {
  const [currSecurityZone, setCurrSecurityZone] = useState(
    securityZones.length
      ? securityZones[0]
      : {
          zoneNameId: "",
          zoneNameLabel: "",
        }
  );
  const [currIpPool, setCurrIpPool] = useState(
    availableIpPools.length
      ? availableIpPools[0]
      : {
          ipPoolId: "",
          ipPoolLabel: "",
        }
  );

  const classes = useStyles();
  function handleNameChange(event) {
    setCurrSecurityZone(event.target.value);
  }
  function handleIPPoolChange(event) {
    console.log("event", event.target.value);
    setCurrIpPool(event.target.value);
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
                value={currSecurityZone.zoneNameLabel}
                onChange={handleNameChange}
              >
                {securityZones.map((securityZone) => (
                  <MenuItem
                    key={securityZone.zoneNameId}
                    value={securityZone.zoneNameLabel}
                  >
                    {securityZone.zoneNameLabel}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="selected-ip-pool">IP Pool</InputLabel>
              <Select
                labelId="selected-ip-pool"
                className="card-text-field"
                value={currIpPool.ipPoolLabel}
                onChange={handleIPPoolChange}
              >
                {availableIpPools.map((ipObj) => (
                  <MenuItem
                    key={ipObj.ipPoolId}
                    value={ipObj.ipPoolLabel}
                    id="ip-pool-drop-down-item"
                  >
                    {ipObj.ipPoolLabel}
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
              addNewNetworkSecurityZones(currSecurityZone, currIpPool)
            }
          >
            + Add New Security Zone
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
