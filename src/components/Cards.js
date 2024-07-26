import React from "react";
import { ExistingCard } from "./ExistingCard";
import { Container } from "@material-ui/core";

export const Cards = ({
  editNetworkSecurityZoneInfo,
  deleteNetworkSecurityZoneInfo,
  networkSecurityZonesList,
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
      </Container>
    </>
  );
};

/**
  - list of names, list of ip pools
  drop down with search functionality
  make ip pools long (make sure drop down can adjust for that)

  hover over effect

  roughly 81 characters
    needs to be able to see the full ip pool
  */
