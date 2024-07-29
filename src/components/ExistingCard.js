import React, { useState } from "react";
import { Button, Grid, TextField } from "@material-ui/core";

export const ExistingCard = ({
  record,
  updateIpPoolDisplayValue,
  deleteNetworkSecurityZoneInfo,
}) => {
  const [formDisabled, setFormDisabled] = useState(true);
  const [textBoxVariant, setTextBoxVariant] = useState("filled");
  const [editButtonText, setEditButtonText] = useState("Edit");
  const [removeButtonText, setRemoveButtonText] = useState("Remove");
  const [currNewIpInfo, setCurrNewIpInfo] = useState(record.u_ip_pool);

  /*
    {
      u_network_security_zone: {
        display_value: "",
        value: ""
      },
      u_ip_pool: {
        display_value: "",
        value: ""
      }
    }
  */
  function handleEditForm(updatedIpRecord) {
    setFormDisabled(!formDisabled);
    if (formDisabled) {
      setEditMode();
    } else {
      // on save
      updateIpPoolDisplayValue(updatedIpRecord);
      setDisabledMode();
    }
  }
  function setEditMode() {
    setTextBoxVariant("outlined");
    setEditButtonText("Save");
    setRemoveButtonText("Cancel");
  }

  function setDisabledMode() {
    setTextBoxVariant("filled");
    setEditButtonText("Edit");
    setRemoveButtonText("Remove");
  }

  function handleIpLabelChange(e) {
    setCurrNewIpInfo({
      ...record.u_ip_pool,
      display_value: e.target.value,
    });
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
        <div className="card-text-container">
          <TextField
            className="card-text-field"
            size="small"
            disabled
            id={record.u_network_security_zone.value}
            label="Zone Name"
            defaultValue={record.u_network_security_zone.display_value}
            variant="filled"
          />

          <TextField
            className="card-text-field"
            onChange={handleIpLabelChange}
            size="small"
            disabled={formDisabled}
            id={record.u_ip_pool.value}
            label="IP Pool"
            defaultValue={record.u_ip_pool.display_value}
            variant={textBoxVariant}
          />
        </div>

        <Button
          className="card-button"
          onClick={() => handleEditForm(currNewIpInfo)}
          variant="contained"
          size="small"
        >
          {editButtonText}
        </Button>
        <Button
          className="card-button"
          onClick={() => {
            if (formDisabled) {
              deleteNetworkSecurityZoneInfo(currNewIpInfo);
            } else {
              setFormDisabled(!formDisabled);
              setDisabledMode();
            }
          }}
          variant="outlined"
          size="small"
          color="secondary"
        >
          {removeButtonText}
        </Button>
      </Grid>
    </>
  );
};
