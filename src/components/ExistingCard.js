import React, { useState } from "react";
import { Button, Grid, TextField } from "@material-ui/core";

export const ExistingCard = ({
  record,
  editNetworkSecurityZoneInfo,
  deleteNetworkSecurityZoneInfo,
}) => {
  const [formDisabled, setFormDisabled] = useState(true);
  const [textBoxVariant, setTextBoxVariant] = useState("filled");
  const [editButtonText, setEditButtonText] = useState("Edit");
  const [removeButtonText, setRemoveButtonText] = useState("Remove");
  const [currNewIpInfo, setCurrNewIpInfo] = useState(record);

  function handleEditForm(updatedIpRecord) {
    setFormDisabled(!formDisabled);
    if (formDisabled) {
      setEditMode();
    } else {
      editNetworkSecurityZoneInfo(updatedIpRecord);
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
      ...record,
      ipPoolLabel: e.target.value,
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
            id={record.zoneNameId}
            label="Zone Name"
            defaultValue={record.zoneNameLabel}
            variant="filled"
          />

          <TextField
            className="card-text-field"
            onChange={handleIpLabelChange}
            size="small"
            disabled={formDisabled}
            id={record.ipPoolId}
            label="IP Pool"
            defaultValue={record.ipPoolLabel}
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
