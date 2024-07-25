import React from "react";

export const NewCard = ({
  newZoneObj,
  cancelNewNetworkSecurityInfo,
  addNewNetworkSecurityZones,
  newZoneName,
  newIPPool,
  setNewZoneName,
  setNewIPPool,
}) => {
  return (
    <>
      <div>
        <label htmlFor={newZoneObj.id}>Zone Name</label>
        <input type="checkbox" id={newZoneObj.id} />
        <input
          type="text"
          id={newZoneObj.id}
          onChange={(e) => setNewZoneName(e.target.value)}
          value={newZoneName}
        />
      </div>

      <div>
        <label htmlFor={`ip-pool-${newZoneObj.id}`}>IP Pool</label>
        <input
          type="text"
          onChange={(e) => setNewIPPool(e.target.value)}
          id={`ip-pool-${newZoneObj.id}`}
          value={newIPPool}
        />
      </div>

      <button onClick={() => addNewNetworkSecurityZones(newZoneObj.id)}>
        Save
      </button>
      <button onClick={cancelNewNetworkSecurityInfo}>Cancel</button>
    </>
  );
};
