import React, { useEffect } from "react";
import { hot } from "react-hot-loader/root";
import { ExistingCard } from "./components/ExistingCard.js";
import { Footer } from "./components/Footer.js";
import { AddCards } from "./components/AddCards.js";
import "./App.css";
import { useState } from "react";
import { Grid } from "@material-ui/core";
import axios from "axios";

function App() {
  const [currSysId, setCurrSysId] = useState("");
  const [zoneNames, setZoneNames] = useState([]);
  const [availableIpPools, setAvailableIpPools] = useState([]);
  const [allZoneSwitchRecords, setAllZoneSwitchRecords] = useState([]);
  const [selectedZoneLabel, setSelectedZoneLabel] = useState("");
  const [selectedIPPool, setSelectedIPPool] = useState("");
  const [networkSecurityZonesList, setNetworkSecurityZonesList] = useState([]);

  useEffect(() => {
    getNetworkSecurityZoneSwitcheRecords();
    getSelfSwitchId();
  }, []);

  useEffect(() => {
    if (allZoneSwitchRecords.length) setDropDownLists();
  }, [allZoneSwitchRecords]);

  async function getNetworkSecurityZoneSwitcheRecords() {
    try {
      const resp = await axios.get(
        "https://dev220672.service-now.com/api/now/table/u_network_security_zone_switch",
        {
          params: {
            sysparm_display_value: "all",
          },
        }
      );
      setAllZoneSwitchRecords(resp.data.result);
    } catch (err) {
      console.log("err", err);
    }
  }

  function getSelfSwitchId() {
    const urlSearchVal = window.location.search;
    const regex = /sys_id=([a-f0-9]{32})/;
    setCurrSysId(urlSearchVal.match(regex)[1]);
  }

  function setDropDownLists() {
    const filteredIpPools = [];
    const zonesWithIpPools = [];
    const zoneLabelsList = new Set([]);

    allZoneSwitchRecords.forEach((record) => {
      if (record.u_switch.value === currSysId) {
        if (record.u_network_security_zone.display_value) {
          zoneLabelsList.add({
            zoneNameLabel: record.u_network_security_zone.display_value,
            zoneNameId: record.u_network_security_zone.value,
          });
        }
        // record has matching ip pools with network zone names
        if (record.u_network_security_zone.value && record.u_ip_pool.value) {
          const newRecordObj = {
            zoneNameLabel: record.u_network_security_zone.display_value,
            zoneNameId: record.u_network_security_zone.value,
            ipPoolId: record.u_ip_pool.value,
            ipPoolLabel: record.u_ip_pool.display_value,
          };
          zonesWithIpPools.push(newRecordObj);
        } else if (!record.u_network_security_zone.value) {
          // record has only ip pools
          filteredIpPools.push({
            ipPoolId: record.u_ip_pool.value,
            ipPoolLabel: record.u_ip_pool.display_value,
          });
        }
      }
    });

    console.log("zone names", Array.from(zoneLabelsList));
    console.log("full list", zonesWithIpPools);
    console.log("avail ip pools", filteredIpPools);
    setZoneNames(Array.from(zoneLabelsList));
    setNetworkSecurityZonesList(zonesWithIpPools);
    setAvailableIpPools(filteredIpPools);
  }

  // updates selected
  useEffect(() => {
    if (availableIpPools.length)
      setSelectedIPPool(availableIpPools[0].ipPoolLabel);
    if (zoneNames.length) setSelectedZoneLabel(zoneNames[0].zoneNameLabel);
  }, [availableIpPools]);

  function editNetworkSecurityZoneInfo(id, ipPool) {
    // check there are no duplicate ipPool(s)
    // what happens when someone is editing the ip pool? does it become a new one or does it override the existing one?
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
    let newAvailableIPPool;
    setNetworkSecurityZonesList(
      networkSecurityZonesList.filter((zoneObj) => {
        if (zoneObj.id === id) newAvailableIPPool = zoneObj.ipPool;
        return zoneObj.id !== id;
      })
    );
    setAvailableIpPools([...availableIpPools, newAvailableIPPool]);
  }

  // THIS NEEDS TO BE FIXED, NEED TO MATCH BY ID NOT LABEL
  // THE WHOLE CHANGE HANDLER NEEDS TO ACCOUNT FOR BOTH LABEL AND IDS OF NAMES AND IP POOLS
  function addNewNetworkSecurityZones(zoneNameLabel, ipPoolLabel) {
    // removes from available ip pools
    setAvailableIpPools(
      availableIpPools.filter((ip_pool_label) => ip_pool_label !== ipPoolLabel)
    );

    // adds to matching zones/ip pools list
    setNetworkSecurityZonesList([
      ...networkSecurityZonesList,
      {
        ipPoolLabel,
        ipPoolId: "1",
        zoneNameLabel,
        zoneNameId: "1",
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
            zoneNames={zoneNames}
            availableIpPools={availableIpPools}
            selectedZoneLabel={selectedZoneLabel}
            selectedIPPool={selectedIPPool}
            setSelectedIPPool={setSelectedIPPool}
            setSelectedZoneLabel={setSelectedZoneLabel}
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
 - fix the delete, add, edit functionalities

 - selected zone and pool labels needs to be removed
 */
