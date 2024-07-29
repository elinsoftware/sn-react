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
  availableIpPools,
  addNewNetworkSecurityZones,
  allSecurityZones,
}) => {
  const [selectedSecurityZone, setSelectedSecurityZone] = useState({
    u_name: {
      display_value: "",
    },
    sys_id: {
      value: "",
    },
  });
  const [selectedIpPoolInfo, setSelectedIpPoolInfo] = useState({
    display_value: "",
    link: "",
    value: "",
  });

  useEffect(() => {
    if (allSecurityZones.length) {
      setSelectedSecurityZone(allSecurityZones[0]);
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
  }, [availableIpPools, allSecurityZones]);
  const classes = useStyles();

  function handleSecurityZoneInfoChange(e) {
    setSelectedSecurityZone(
      allSecurityZones.find((record) => record.sys_id.value === e.target.value)
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
        {!selectedIpPoolInfo.value ? <p>No more Ip Pools</p> : null}
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
                value={selectedSecurityZone.u_name.display_value}
                onChange={handleSecurityZoneInfoChange}
                inputProps={{
                  name: selectedSecurityZone.u_name.display_value,
                  value: selectedSecurityZone.sys_id.value,
                }}
                disabled={!selectedIpPoolInfo.value}
              >
                {allSecurityZones.map((securityZone) => (
                  <MenuItem
                    key={securityZone.sys_id.value}
                    value={securityZone.sys_id.value}
                    name={securityZone.u_name.display_value}
                  >
                    {securityZone.u_name.display_value}
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
                selectedSecurityZone,
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
