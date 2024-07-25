import React from "react";
import { ExistingCard } from "./ExistingCard";
import { NewCard } from "./NewCard";

export const Cards = ({
  deleteNetworkSecurityZoneInfo,
  networkSecurityZonesList,
  newNetworkSecurityInfo,
  addNewNetworkSecurityZones,
  cancelNewNetworkSecurityInfo,
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
        {newNetworkSecurityInfo.length
          ? newNetworkSecurityInfo.map((newZoneObj) => {
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
    </>
  );
};

/**
  - can only have 1 newly added at a time
  - the rest are locked unless hitting the edit button

  - new ones say save/cancel 
  - existing ones say edit/remove

  - not sure what the checkbox functionality should be doing

  - on submit, make sure there aren't unsaved changes
 */
