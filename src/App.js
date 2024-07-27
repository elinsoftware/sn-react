import React, { useEffect } from "react";
import { hot } from "react-hot-loader/root";
import { ExistingCard } from "./components/ExistingCard.js";
import { Footer } from "./components/Footer.js";
import { AddCards } from "./components/AddCards.js";
import "./App.css";
import { useState } from "react";
import { Grid } from "@material-ui/core";
import axios from "axios";

const names = ["Public", "Private", "Management"];

function App() {
  const [currSysId, setCurrSysId] = useState("");
  const [allZoneSwitchTable, setAllZoneSwitchTable] = useState([]);
  const [ipPools, setIpPools] = useState([]);

  const [selectedName, setSelectedName] = useState(names[0]);
  const [selectedIPPool, setSelectedIPPool] = useState("");
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
  useEffect(() => {
    setCurrSysId(
      document.getElementById("document_tags").getAttribute("data-sys_id")
    );
    axios
      .get(
        "https://dev220672.service-now.com/api/now/table/u_network_security_zone_switch"
      )
      .then((res) => {
        setAllZoneSwitchTable(res.data.result);
      });
  }, []);

  useEffect(() => {
    const filteredIpPools = [];
    for (let i = 0; i < allZoneSwitchTable.length; i++) {
      const tableObj = allZoneSwitchTable[i];
      if (
        tableObj.u_switch.value === currSysId &&
        !tableObj.u_network_security_zone
      ) {
        filteredIpPools.push(tableObj.u_ip_pool.value);
      }
    }
    setIpPools(filteredIpPools);
    setSelectedIPPool(filteredIpPools[0]);
  }, [allZoneSwitchTable]);

  function editNetworkSecurityZoneInfo(id, ipPool) {
    setNetworkSecurityZonesList(
      networkSecurityZonesList.map((zoneObj) => {
        if (zoneObj.id === id) {
          zoneObj.ip_pool = ipPool;
        }
        return zoneObj;
      })
    );
  }

  function deleteNetworkSecurityZoneInfo(id) {
    setNetworkSecurityZonesList(
      networkSecurityZonesList.filter((zoneObj) => zoneObj.id !== id)
    );
  }

  function addNewNetworkSecurityZones(name, ip_pool) {
    setNetworkSecurityZonesList([
      ...networkSecurityZonesList,
      {
        id: crypto.randomUUID(),
        name,
        ip_pool,
      },
    ]);
  }

  function submitNetworkSecurityZoneInfo() {
    console.log("submit and close modal");
    const closeModalButton = document.getElementById("react-test_closemodal");
    closeModalButton.click();
  }

  function closeModal() {
    const closeModalButton = document.getElementById("react-test_closemodal");
    closeModalButton.click();
  }

  return (
    <>
      <div className="app-container">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
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
          <AddCards
            names={names}
            ipPools={ipPools}
            selectedName={selectedName}
            selectedIPPool={selectedIPPool}
            setSelectedIPPool={setSelectedIPPool}
            setSelectedName={setSelectedName}
            addNewNetworkSecurityZones={addNewNetworkSecurityZones}
          />
          <Footer
            submitNetworkSecurityZoneInfo={submitNetworkSecurityZoneInfo}
            closeModal={closeModal}
          />
        </Grid>
      </div>
    </>
  );
}

export default hot(App);

/**
  - every time a user chooses an ip pool to add, it has to be taken out of the "choose from" list
  - whenever they change or delete an established ip pool, it has to go back to the filtered list

  - need to find a way to query the names of the zones and not just their ids
 */
