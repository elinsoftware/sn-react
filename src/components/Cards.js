import React from "react";
import { ExistingCard } from "./ExistingCard";
import { NewCard } from "./NewCard";
import { Container } from "@material-ui/core";

export const Cards = ({
  editNetworkSecurityZoneInfo,
  deleteNetworkSecurityZoneInfo,
  networkSecurityZonesList,
  newNetworkSecurityList,
  addNewNetworkSecurityZones,
  cancelNewNetworkSecurityInfo,
}) => {
  return (
    <>
      <Container maxWidth="md">
        <ul>
          {networkSecurityZonesList.map((zoneObj) => {
            return (
              <ExistingCard
                key={zoneObj.id}
                zoneObj={zoneObj}
                editNetworkSecurityZoneInfo={editNetworkSecurityZoneInfo}
                deleteNetworkSecurityZoneInfo={deleteNetworkSecurityZoneInfo}
              />
            );
          })}
        </ul>
        <ul>
          {newNetworkSecurityList.length
            ? newNetworkSecurityList.map((newZoneObj) => {
                return (
                  <NewCard
                    key={newZoneObj.id}
                    newZoneObj={newZoneObj}
                    cancelNewNetworkSecurityInfo={cancelNewNetworkSecurityInfo}
                    addNewNetworkSecurityZones={addNewNetworkSecurityZones}
                  />
                );
              })
            : null}
        </ul>
      </Container>
    </>
  );
};

/**
  - the rest are locked unless hitting the edit button

  - not sure what the checkbox functionality should be doing

  - on submit, make sure there aren't unsaved changes

  - idk what logic he wants for the input and output data

  - zone name/ip pool for new zone id 
 */
