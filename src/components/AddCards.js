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
    display_value: "",
    link: "",
    value: "",
  });
  const [selectedIpPoolInfo, setSelectedIpPoolInfo] = useState({
    display_value: "",
    link: "",
    value: "",
  });

  useEffect(() => {
    if (securityZones.length) {
      setSelectedSecurityZoneInfo(securityZones[0]);
    }
    if (availableIpPools.length) {
      setSelectedIpPoolInfo(availableIpPools[0]);
    } else {
      setSelectedIpPoolInfo({
        display_value: "",
        link: "",
        value: "",
      });
    }
  }, [securityZones, availableIpPools]);
  const classes = useStyles();

  function handleSecurityZoneInfoChange(e) {
    setSelectedSecurityZoneInfo(
      securityZones.find((record) => record.value === e.target.value)
    );
  }

  function handleIpPoolInfoChange(e) {
    setSelectedIpPoolInfo(
      availableIpPools.find((record) => record.value === e.target.value)
    );
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
                value={selectedSecurityZoneInfo.display_value}
                onChange={handleSecurityZoneInfoChange}
                inputProps={{
                  name: selectedSecurityZoneInfo.display_value,
                  value: selectedSecurityZoneInfo.value,
                }}
                disabled={!selectedIpPoolInfo.value}
              >
                {securityZones.map((securityZone) => (
                  <MenuItem
                    key={securityZone.value}
                    value={securityZone.value}
                    name={securityZone.display_value}
                  >
                    {securityZone.display_value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="selected-ip-pool">IP Pool</InputLabel>
              <Select
                value={selectedIpPoolInfo.display_value}
                onChange={handleIpPoolInfoChange}
                inputProps={{
                  name: selectedIpPoolInfo.display_value,
                  value: selectedIpPoolInfo.value,
                }}
                disabled={!selectedIpPoolInfo.value}
              >
                {availableIpPools.map((ipObj) => (
                  <MenuItem
                    key={ipObj.value}
                    value={ipObj.value}
                    name={ipObj.display_value}
                  >
                    {ipObj.display_value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <div>
            {!selectedIpPoolInfo.value ? (
              <p>There are no more available ip pool records</p>
            ) : null}
          </div>
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
