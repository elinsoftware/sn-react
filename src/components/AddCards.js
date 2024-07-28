import React, { useEffect, useState } from "react";
import {
  FormControl,
  Button,
  Grid,
  MenuItem,
  InputLabel,
  Select,
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
    let matchedZoneInfo;
    for (let i = 0; i < securityZones.length; i++) {
      if (securityZones[i].zoneNameId === e.target.value) {
        matchedZoneInfo = securityZones[i];
      }
    }
    setSelectedSecurityZoneInfo(matchedZoneInfo);
  }
  function handleIpPoolInfoChange(e) {
    let matchedIpPoolInfo;
    for (let i = 0; i < availableIpPools.length; i++) {
      if (availableIpPools[i].ipPoolId === e.target.value) {
        matchedIpPoolInfo = availableIpPools[i];
      }
    }
    setSelectedIpPoolInfo(matchedIpPoolInfo);
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
                value={selectedSecurityZoneInfo.zoneNameLabel}
                onChange={handleSecurityZoneInfoChange}
                inputProps={{
                  name: selectedSecurityZoneInfo.zoneNameLabel,
                  value: selectedSecurityZoneInfo.zoneNameId,
                }}
              >
                {securityZones.map((securityZone) => (
                  <MenuItem
                    key={securityZone.zoneNameId}
                    value={securityZone.zoneNameId}
                    name={securityZone.zoneNameLabel}
                  >
                    {securityZone.zoneNameLabel}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="selected-ip-pool">IP Pool</InputLabel>
              <Select
                value={selectedIpPoolInfo.ipPoolLabel}
                onChange={handleIpPoolInfoChange}
                inputProps={{
                  name: selectedIpPoolInfo.ipPoolLabel,
                  value: selectedIpPoolInfo.ipPoolId,
                }}
              >
                {availableIpPools.map((ipObj) => (
                  <MenuItem
                    key={ipObj.ipPoolId}
                    value={ipObj.ipPoolId}
                    name={ipObj.ipPoolLabel}
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
