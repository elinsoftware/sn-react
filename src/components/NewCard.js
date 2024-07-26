import React, { useState } from "react";
import {
  Button,
  Grid,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@material-ui/core";

export const NewCard = ({
  newZoneObj,
  cancelNewNetworkSecurityInfo,
  addNewNetworkSecurityZones,
}) => {
  const [newZoneName, setNewZoneName] = useState("");
  const [newIPPool, setNewIPPool] = useState("");
  const [names, setNames] = useState([
    "Hye-Jin",
    "Alexandra",
    "Noburu",
    "Paskal",
    "Itzamna",
    "Xhafer",
    "Slobodanka",
    "Fausta",
    "Kariuki",
    "Miriam",
  ]);
  const [ipPools, setIPPools] = useState([
    "e932fa536fa05c1abe3855389eee39c23c72d813b085bf17c2296ba266f72224b7630fccb1a3c057",
    "e88adaf0526da97746aee6fdf70884d685b84c6ae88adaf0526da97746aee6fdf70884d685b84c6a",
    "5a2c74a534f2260efc2229595d09d65f38922d325a2c74a534f2260efc2229595d09d65f38922d32",
    "87b83b3142f0cc46616f748cf9653e473c00ecda87b83b3142f0cc46616f748cf9653e473c00ecda",
    "b2c4ee5de82866db38f79c6d4a91a626486b70e9b2c4ee5de82866db38f79c6d4a91a626486b70e9",
    "8961f68dcbb4af171c24541f30b0d181b7ed77f58961f68dcbb4af171c24541f30b0d181b7ed77f5",
    "26457d44644a142925c19da2df0c433b3341782826457d44644a142925c19da2df0c433b33417828",
    "70c881d4a26984ddce795f6f71817c9cf4480e7970c881d4a26984ddce795f6f71817c9cf4480e79",
    "da23614e02469a0d7c7bd1bdab5c9c474b1904dcda23614e02469a0d7c7bd1bdab5c9c474b1904dc",
    "a9993e364706816aba3e25717850c26c9cd0d89da9993e364706816aba3e25717850c26c9cd0d89d",
  ]);
  const [selectedName, setSelectedName] = useState(names[0]);
  const [selectedIPPool, setSelectedIPPool] = useState(ipPools[0]);
  const handleNameChange = (event) => {
    setSelectedName(event.target.value);
  };
  const handleIPPoolChange = (event) => {
    setSelectedIPPool(event.target.value);
  };
  return (
    <>
      <Grid
        className="card-container"
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {selectedIPPool}
        <div className="card-text-container">
          <InputLabel htmlFor={newZoneObj.id}>Zone Name</InputLabel>
          <Select
            labelId={newZoneObj.id}
            className="card-text-field"
            value={selectedName}
            onChange={handleNameChange}
          >
            {names.map((name) => (
              <MenuItem
                key={name}
                value={name}
                // style={getStyles(name, personName, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>

          <InputLabel htmlFor={`ip-pool-${newZoneObj.id}`}>IP Pool</InputLabel>
          <Select
            labelId={`ip-pool-${newZoneObj.id}`}
            className="card-text-field"
            value={selectedIPPool}
            onChange={handleIPPoolChange}
          >
            {ipPools.map((ipPool) => (
              <MenuItem
                key={ipPool}
                value={ipPool}
                id="ip-pool-drop-down-item"
                // style={getStyles(name, personName, theme)}
              >
                {ipPool}
              </MenuItem>
            ))}
          </Select>

          {/* <TextField
            className="card-text-field"
            onChange={(e) => setNewZoneName(e.target.value)}
            size="small"
            id={newZoneObj.id}
            label="Zone Name"
            defaultValue={newZoneName}
            variant="outlined"
          />

          <TextField
            className="card-text-field"
            onChange={(e) => setNewIPPool(e.target.value)}
            size="small"
            id={`ip-pool-${newZoneObj.id}`}
            label="IP Pool"
            defaultValue={newIPPool}
            variant="outlined"
          /> */}
        </div>

        <Button
          className="card-button"
          onClick={() =>
            addNewNetworkSecurityZones(newZoneObj.id, newZoneName, newIPPool)
          }
          variant="contained"
          size="small"
          color="primary"
        >
          Save
        </Button>
        <Button
          className="card-button"
          onClick={cancelNewNetworkSecurityInfo}
          variant="outlined"
          size="small"
          color="secondary"
        >
          Cancel
        </Button>
      </Grid>
    </>
  );
};
