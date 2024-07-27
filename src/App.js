import React, { useEffect } from "react";
import { hot } from "react-hot-loader/root";
import { ExistingCard } from "./components/ExistingCard.js";
import { Footer } from "./components/Footer.js";
import { AddCards } from "./components/AddCards.js";
import "./App.css";
import { useState } from "react";
import { Grid } from "@material-ui/core";
import axios from "axios";
import { zoneNameToIdMap, names } from "./data/tableData.js";

function App() {
  const [currSysId, setCurrSysId] = useState("");
  const [allZoneSwitchRecords, setAllZoneSwitchRecords] = useState([]);
  const [ipPools, setIpPools] = useState([]);
  const [selectedName, setSelectedName] = useState("Public");
  const [selectedIPPool, setSelectedIPPool] = useState("");
  const [networkSecurityZonesList, setNetworkSecurityZonesList] = useState([]);
  useEffect(() => {
    setCurrSysId(
      document.getElementById("document_tags").getAttribute("data-sys_id")
    );
    axios
      .get(
        "https://dev220672.service-now.com/api/now/table/u_network_security_zone_switch"
      )
      .then((res) => {
        setAllZoneSwitchRecords(res.data.result);
      });
  }, []);

  useEffect(() => {
    console.log(allZoneSwitchRecords);
    const filteredIpPools = [];
    const zonesWithIpPools = [];
    allZoneSwitchRecords.forEach((record) => {
      if (record.u_switch.value === currSysId) {
        // record has matching ip pools with network zone names
        if (record.u_network_security_zone && record.u_ip_pool) {
          const newRecordObj = {
            name: zoneNameToIdMap[record.u_network_security_zone.value],
            id: record.u_network_security_zone.value,
            ipPool: record.u_ip_pool.value,
          };
          zonesWithIpPools.push(newRecordObj);
        } else if (!record.u_network_security_zone) {
          // record has only ip pools
          filteredIpPools.push(record.u_ip_pool.value);
        }
      }
    });
    setNetworkSecurityZonesList(zonesWithIpPools);
    setIpPools(filteredIpPools);
    setSelectedIPPool(filteredIpPools[0]);
  }, [allZoneSwitchRecords]);

  function editNetworkSecurityZoneInfo(id, ipPool) {
    setNetworkSecurityZonesList(
      networkSecurityZonesList.map((zoneObj) => {
        if (zoneObj.id === id) {
          zoneObj.ipPool = ipPool;
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

  function validateIpPool(ipPool) {
    console.log("hi", ipPool);
  }
  function addNewNetworkSecurityZones(name, ipPool) {
    // needs to be a safe guard that ip pool doesn't match with a previously existing one in case user decides to custome type something in
    validateIpPool(ipPool);
    setNetworkSecurityZonesList([
      ...networkSecurityZonesList,
      {
        id: ipPool,
        name,
        ipPool,
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
 */
