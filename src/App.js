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
  const [matchedZonesAndIpPools, setMatchedZonesAndIpPools] = useState([]);
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
        console.log("RECORD", record);
        // security zone info only
        if (record.u_network_security_zone.display_value) {
          securityZoneSet.add(record.u_network_security_zone);
        }
        // record has matching ip pools with network zone names
        if (record.u_network_security_zone.value && record.u_ip_pool.value) {
          zonesWithIpPools.push(record);
        } else if (!record.u_network_security_zone.value) {
          // ip pool info only
          filteredIpPools.push(record.u_ip_pool);
        }
      }
    });

    setSecurityZones(Array.from(securityZoneSet));
    setMatchedZonesAndIpPools(zonesWithIpPools);
    setAvailableIpPools(filteredIpPools);
  }

  function updateIpPoolDisplayValue(updatedIpRecord) {
    setMatchedZonesAndIpPools(
      matchedZonesAndIpPools.map((record) => {
        if (record.u_ip_pool.value === updatedIpRecord.value) {
          record.u_ip_pool.display_value = updatedIpRecord.display_value;
        }
        return record;
      })
    );
  }

  function deleteNetworkSecurityZoneInfo(newIpPoolRecord) {
    // filter ip obj from matched pool
    setMatchedZonesAndIpPools(
      matchedZonesAndIpPools.filter((record) => {
        return record.u_ip_pool.value !== newIpPoolRecord.value;
      })
    );
    // add to available pool
    setAvailableIpPools([...availableIpPools, newIpPoolRecord]);
  }

  function removesSelectedIpPoolInfoFromAvailableSet(ipPool) {
    setAvailableIpPools(
      availableIpPools.filter(
        (ipPoolRecord) => ipPoolRecord.value !== ipPool.value
      )
    );
  }

  function addsSelectedZoneAndIpRecordToMatchedPairs(ipPoolInfo) {
    console.log("incoming info", ipPoolInfo);
    const match = allZoneSwitchRecords.find(
      (record) => record.u_ip_pool.value === ipPoolInfo.value
    );
    console.log("found match", match);
    setMatchedZonesAndIpPools([...matchedZonesAndIpPools, match]);
  }

  function addNewNetworkSecurityZones(ipPool) {
    if (ipPool.value) {
      console.log("yo");
      removesSelectedIpPoolInfoFromAvailableSet(ipPool);
      addsSelectedZoneAndIpRecordToMatchedPairs(ipPool);
    }
  }

  // async function UpdateNetworkSecuritySwitchRecord() {
  //   try {
  //     /*
  //     FILTERED LIST NEEDS TO BE REINTEGRATED INTO ALL LIST
  //     OR ACTUALLY THE FILTERING HAS TO INCLUDE THE ENTIRE RECORD INFO

  //       guessing you don't want to update the whole table but patch
  //       all existing records with changes

  //       AS OF NOW changes would include:
  //       - ip pool label changes
  //         - this is a patch
  //       - un matched pool being connected to a zone
  //       - matched pool being disconnected to a zone
  //       - matched pool being reassigned to a new zone

  //       wait isn't everything updated as is?
  //     */

  //     // const tableName = "u_network_security_zone_switch";
  //     // const sysId = ""
  //     // const resp = await axios.put(
  //     //   `https://dev220672.service-now.com/api/now/table/{tableName}/{sys_id}`,
  //     //   {
  //     //     params: {
  //     //       sysparm_display_value: "all",
  //     //     },
  //     //   }
  //     // );
  //     closeModal();
  //   } catch (e) {
  //     console.log("e", e);
  //   }
  // }

  function submitNetworkSecurityZoneInfo() {
    console.log("submit and close modal");

    // UpdateNetworkSecuritySwitchRecord();
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
            {matchedZonesAndIpPools.map((record) => {
              return (
                <ExistingCard
                  key={record.u_ip_pool.value}
                  record={record}
                  updateIpPoolDisplayValue={updateIpPoolDisplayValue}
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
 put normally for updating all fields
 patch, only the info sent

 do you want it to persist on cancel or to refresh?
 */
