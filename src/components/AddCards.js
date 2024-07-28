import React, { useEffect, useState } from "react";
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
  const [selectedSecurityZoneInfo, setSelectedSecurityZoneInfo] = useState({
    zoneNameLabel: "",
    zoneNameId: "",
  });
  const [selectedIpPoolInfo, setSelectedIpPoolInfo] = useState({
    ipPoolLabel: "",
    ipPoolId: "",
  });

  useEffect(() => {
    if (securityZones.length) {
      setSelectedSecurityZoneInfo(securityZones[0]);
    }
    if (availableIpPools.length) {
      setSelectedIpPoolInfo(availableIpPools[0]);
    }
  }, [securityZones, availableIpPools]);
  const classes = useStyles();

  function handleSecurityZoneInfoChange(e) {
    setSelectedSecurityZoneInfo(e.target.value);
  }
  function handleIpPoolInfoChange(e) {
    setSelectedIpPoolInfo(e.target.value);
  }
  return (
    <>
      <p>
        zone label: {selectedSecurityZoneInfo.zoneNameLabel}
        ip label: {selectedIpPoolInfo.ipPoolLabel}
      </p>
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
                value={selectedSecurityZoneInfo.zoneNameLabel}
                onChange={handleSecurityZoneInfoChange}
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
                value={selectedIpPoolInfo.ipPoolLabel}
                onChange={handleIpPoolInfoChange}
              >
                {availableIpPools.map((ipObj) => (
                  <MenuItem
                    key={ipObj.ipPoolId}
                    value={ipObj.ipPoolLabel}
                    id={ipObj.ipPoolId}
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
              addNewNetworkSecurityZones(
                selectedSecurityZoneInfo,
                selectedIpPoolInfo
              )
            }
          >
            + Add New Security Zone
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
