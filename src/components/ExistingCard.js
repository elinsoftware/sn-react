import React, { useState } from "react";
import { Button, Grid, TextField } from "@material-ui/core";

export const ExistingCard = ({
  zoneObj,
  editNetworkSecurityZoneInfo,
  deleteNetworkSecurityZoneInfo,
}) => {
  const [formDisabled, setFormDisabled] = useState(true);
  const [textBoxVariant, setTextBoxVariant] = useState("filled");
  const [editButtonText, setEditButtonText] = useState("Edit");
  const [removeButtonText, setRemoveButtonText] = useState("Remove");
  const [newIPPool, setNewIPPool] = useState(zoneObj.ipPool);

  function handleEditForm(ipPool) {
    setFormDisabled(!formDisabled);
    if (formDisabled) {
      setEditMode();
    } else {
      editNetworkSecurityZoneInfo(zoneObj.id, ipPool);
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
            id={zoneObj.zoneNameId}
            label="Zone Name"
            defaultValue={zoneObj.zoneNameLabel}
            variant="filled"
          />

          <TextField
            className="card-text-field"
            onChange={(e) => setNewIPPool(e.target.value)}
            size="small"
            disabled={formDisabled}
            id={`ip-pool-${zoneObj.ipPoolId}`}
            label="IP Pool"
            defaultValue={zoneObj.ipPoolLabel}
            variant={textBoxVariant}
          />
        </div>

        <Button
          className="card-button"
          onClick={() => handleEditForm(newIPPool)}
          variant="contained"
          size="small"
        >
          {editButtonText}
        </Button>
        <Button
          className="card-button"
          onClick={() => {
            if (formDisabled) {
              deleteNetworkSecurityZoneInfo(zoneObj.id);
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
