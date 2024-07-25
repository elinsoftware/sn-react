import React from "react";

export const ExistingCard = ({ zoneObj, deleteNetworkSecurityZoneInfo }) => {
  return (
    <>
      <div>
        <label htmlFor={zoneObj.id}>Zone Name</label>
        <input type="checkbox" id={zoneObj.id} />
        <input type="text" id={zoneObj.id} value={zoneObj.name} />
      </div>

      <div>
        <label htmlFor={`ip-pool-${zoneObj.id}`}>IP Pool</label>
        <input
          type="text"
          id={`ip-pool-${zoneObj.id}`}
          value={zoneObj.ip_pool}
        />
      </div>

      <button>Edit</button>
      <button onClick={() => deleteNetworkSecurityZoneInfo(zoneObj.id)}>
        Remove
      </button>
    </>
  );
};
