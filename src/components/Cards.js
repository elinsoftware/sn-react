import React from "react";
import { ExistingCard } from "./ExistingCard";
import { NewCard } from "./NewCard";

export const Cards = ({
  deleteNetworkSecurityZoneInfo,
  networkSecurityZonesList,
  newNetworkSecurityList,
  addNewNetworkSecurityZones,
  cancelNewNetworkSecurityInfo,
  newZoneName,
  newIPPool,
  setNewZoneName,
  setNewIPPool,
}) => {
  return (
    <>
      <ul>
        {networkSecurityZonesList.map((zoneObj) => {
          return (
            <ExistingCard
              key={zoneObj.id}
              zoneObj={zoneObj}
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
                  newZoneName={newZoneName}
                  newIPPool={newIPPool}
                  setNewZoneName={setNewZoneName}
                  setNewIPPool={setNewIPPool}
                />
              );
            })
          : null}
      </ul>
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
