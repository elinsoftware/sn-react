import React, { useEffect, useState } from "react";
import {
  FormControl,
  Button,
  Grid,
  MenuItem,
  InputLabel,
  Select,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";

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
  // const [selectedSecurityZone, setSelectedSecurityZone] = useState({
  //   u_name: {
  //     display_value: "",
  //   },
  //   sys_id: {
  //     value: "",
  //   },
  // });
  const [selectedSecurityZone, setSelectedSecurityZone] = useState(null);
  const [selectedIpPoolInfo, setSelectedIpPoolInfo] = useState({
    display_value: "",
    link: "",
    value: "",
  });
  const [inputValue, setInputValue] = React.useState("");

  function handleOnChange(e, newVal) {
    setSelectedSecurityZone({
      u_name: {
        display_value: newVal.u_name.display_value,
      },
      sys_id: {
        value: newVal.sys_id.value,
      },
    });
  }

  function handleInputChange(e, newInputVal) {
    setInputValue(newInputVal);
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
  const classes = useStyles();

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
                handleOnChange(event, newValue);
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                handleInputChange(event, newInputValue);
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
