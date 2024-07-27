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
  const [mySwitchSysId, setMySwitchSysId] = useState("");
  const [allZoneSwitchRecords, setAllZoneSwitchRecords] = useState([]);
  const [networkSecurityZonesList, setNetworkSecurityZonesList] = useState([]);
  const [securityZones, setSecurityZones] = useState([]);
  const [availableIpPools, setAvailableIpPools] = useState([]);

  useEffect(() => {
    getNetworkSecurityZoneSwitchRecords();
    getSelfSwitchId();
  }, []);

  useEffect(() => {
    if (allZoneSwitchRecords.length) setDropDownLists();
  }, [allZoneSwitchRecords]);

  async function getNetworkSecurityZoneSwitchRecords() {
    try {
      const resp = await axios.get(
        "https://dev220672.service-now.com/api/now/table/u_network_security_zone_switch",
        {
          params: {
            sysparm_display_value: "all",
          },
        }
      );
      console.log("results", resp.data.result);
      setAllZoneSwitchRecords(resp.data.result);
    } catch (err) {
      console.log("err", err);
    }
  }

  function getSelfSwitchId() {
    const urlSearchVal = window.location.search;
    const regex = /sys_id=([a-f0-9]{32})/;
    setMySwitchSysId(urlSearchVal.match(regex)[1]);
  }

  function setDropDownLists() {
    const filteredIpPools = [];
    const zonesWithIpPools = [];
    const securityZoneSet = new Set([]);

    allZoneSwitchRecords.forEach((record) => {
      if (record.u_switch.value === mySwitchSysId) {
        if (record.u_network_security_zone.display_value) {
          securityZoneSet.add({
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

    console.log("zone names", Array.from(securityZoneSet));
    console.log("full list", zonesWithIpPools);
    console.log("avail ip pools", filteredIpPools);
    setSecurityZones(Array.from(securityZoneSet));
    setNetworkSecurityZonesList(zonesWithIpPools);
    setAvailableIpPools(filteredIpPools);
  }

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
  function addNewNetworkSecurityZones(securityZone, ipPool) {
    // removes from available ip pools
    setAvailableIpPools(
      availableIpPools.filter(
        (ip_pool_label) => ip_pool_label !== ipPool.ipPoolLabel
      )
    );

    // adds to matching zones/ip pools list
    setNetworkSecurityZonesList([
      ...networkSecurityZonesList,
      {
        ipPoolLabel: ipPool.ipPoolLabel,
        ipPoolId: ipPool.ipPoolId,
        zoneNameLabel: securityZone.zoneNameLabel,
        zoneNameId: securityZone.zoneNameId,
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
            securityZones={securityZones}
            availableIpPools={availableIpPools}
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

 - have to do these per record, cannot update the entire table

 put normally for updating all fields
 patch, only the info sent


 */
