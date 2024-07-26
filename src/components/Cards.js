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
  - idk what logic he wants for the input and output data

  - list of names, list of ip pools
  drop down with search functionality
  make ip pools long (make sure drop down can adjust for that)

  hover over effect

  roughly 81 characters
    needs to be able to see the full ip pool
  */
