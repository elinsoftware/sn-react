import React from "react";
import { useState } from "react";
import { Card } from "./Card";

export const Cards = () => {
  const [networkSecurityZonesList, setNetworkSecurityZonesList] = useState([
    {
      id: "d529034247270210b27f57f1d16d43b0",
      name: "Management",
      ip_pool: "192.168.1.0/24",
    },
    {
      id: "9b09034247270210b27f57f1d16d43aa",
      name: "Production DNS",
      ip_pool: "10.0.0.0/16",
    },
    {
      id: "1f19034247270210b27f57f1d16d43ad",
      name: "Public",
      ip_pool: "192.168.2.0/12",
    },
  ]);

  function deleteNetworkSecurityZoneInfo(id) {
    setNetworkSecurityZonesList.filter((zoneObj) => zoneObj.id !== id);
  }
  return (
    <>
      <ul>
        {networkSecurityZonesList.map((zoneObj) => {
          return (
            <Card
              key={zoneObj.id}
              zoneObj={zoneObj}
              deleteZoneInfo={deleteNetworkSecurityZoneInfo}
            />
          );
        })}
      </ul>
    </>
  );
};
