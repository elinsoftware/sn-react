import React, { useEffect, useState } from "react";
import { Button, Grid, Checkbox, TextField } from "@material-ui/core";

export const ExistingCard = ({
  zoneObj,
  editNetworkSecurityZoneInfo,
  deleteNetworkSecurityZoneInfo,
}) => {
  const [formDisabled, setFormDisabled] = useState(true);
  const [textBoxVariant, setTextBoxVariant] = useState("filled");

  function handleEditForm() {
    setFormDisabled(!formDisabled);
    editNetworkSecurityZoneInfo(zoneObj.id);
    if (textBoxVariant === "filled") {
      setTextBoxVariant("outlined");
    } else {
      setTextBoxVariant("filled");
    }
  }
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Checkbox color="primary" id={zoneObj.id} />
        <TextField
          size="small"
          disabled={formDisabled}
          id={zoneObj.id}
          label="Zone Name"
          defaultValue={zoneObj.name}
          variant={textBoxVariant}
        />

        <TextField
          size="small"
          disabled={formDisabled}
          id={`ip-pool-${zoneObj.id}`}
          label="IP Pool"
          defaultValue={zoneObj.ip_pool}
          variant={textBoxVariant}
        />

        <Button
          onClick={() => handleEditForm()}
          variant="contained"
          size="small"
        >
          Edit
        </Button>
        <Button
          onClick={() => deleteNetworkSecurityZoneInfo(zoneObj.id)}
          variant="outlined"
          size="small"
          color="secondary"
        >
          Remove
        </Button>
      </Grid>
    </>
  );
};
