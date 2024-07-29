import React, { useEffect, useState } from "react";
import { Button, Grid, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

export const AddCards = ({
  availableIpPools,
  addNewNetworkSecurityZones,
  allSecurityZones,
}) => {
  const [selectedSecurityZone, setSelectedSecurityZone] = useState(null);
  const [selectedIpPoolInfo, setSelectedIpPoolInfo] = useState({
    display_value: "",
    link: "",
    value: "",
  });
  const [zoneInputValue, setZoneInputValue] = useState("");
  const [ipInputValue, setIpInputValue] = useState("");

  function handleIpOnChange(e, newVal) {
    setSelectedIpPoolInfo(
      availableIpPools.find((record) => record.value === newVal.value)
    );
  }

  function handleIpInputChange(e, newVal) {
    setIpInputValue(newVal);
  }

  function handleZoneOnChange(e, newVal) {
    setSelectedSecurityZone({
      u_name: {
        display_value: newVal.u_name.display_value,
      },
      sys_id: {
        value: newVal.sys_id.value,
      },
    });
  }

  function handleZoneInputChange(e, newInputVal) {
    setZoneInputValue(newInputVal);
  }

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

  return (
    <>
      <Grid
        className="card-container"
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        {!selectedIpPoolInfo.value ? <p>No ip pools available</p> : null}
        <div className="card-text-container">
          <Grid
            className="card-container"
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Autocomplete
              value={selectedSecurityZone}
              onChange={(event, newValue) => {
                handleZoneOnChange(event, newValue);
              }}
              inputValue={zoneInputValue}
              onInputChange={(event, newInputValue) => {
                handleZoneInputChange(event, newInputValue);
              }}
              id="controllable-states-demo"
              options={allSecurityZones}
              getOptionLabel={(option) => option.u_name.display_value}
              style={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  InputProps={{ ...params.InputProps }}
                  label="Controllable"
                  variant="outlined"
                />
              )}
            />

            <Autocomplete
              value={selectedIpPoolInfo}
              onChange={(event, newValue) => {
                handleIpOnChange(event, newValue);
              }}
              inputValue={ipInputValue}
              onInputChange={(event, newInputValue) => {
                handleIpInputChange(event, newInputValue);
              }}
              id="controllable-states-demo"
              options={availableIpPools}
              getOptionLabel={(record) => record.display_value}
              style={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  InputProps={{ ...params.InputProps }}
                  label="Controllable"
                  variant="outlined"
                />
              )}
            />
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
