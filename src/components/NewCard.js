import React from "react";

export const NewCard = ({
  newZoneObj,
  cancelNewNetworkSecurityInfo,
  addNewNetworkSecurityZones,
}) => {
  return (
    <>
      <div>
        <label htmlFor={newZoneObj.id}>Zone Name</label>
        <input type="checkbox" id={newZoneObj.id} />
        <input type="text" id={newZoneObj.id} value={newZoneObj.name} />
      </div>

      <div>
        <label htmlFor={`ip-pool-${newZoneObj.id}`}>IP Pool</label>
        <input
          type="text"
          id={`ip-pool-${newZoneObj.id}`}
          value={newZoneObj.ip_pool}
        />
      </div>

      <button onClick={addNewNetworkSecurityZones}>Save</button>
      <button onClick={cancelNewNetworkSecurityInfo}>Cancel</button>
    </>
  );
};
