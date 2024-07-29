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
  const [allSecurityZones, setAllSecurityZones] = useState([]);
  const [availableIpPools, setAvailableIpPools] = useState([]);
  const [inEditMode, setInEditMode] = useState(0);

  useEffect(() => {
    getNetworkSecurityRecords();
    getNetworkSecurityZoneSwitchRecords();
    getSelfSwitchId();
  }, []);

  useEffect(() => {
    if (allZoneSwitchRecords.length) setDropDownLists();
  }, [allZoneSwitchRecords]);

  async function getNetworkSecurityRecords() {
    try {
      const res = await axios.get(
        "https://dev220672.service-now.com/api/now/table/u_cmdb_ci_network_security_zone",
        {
          params: {
            sysparm_display_value: "all",
          },
        }
      );

      console.log("network security zone records", res.data.result);
      setAllSecurityZones(res.data.result);
    } catch (e) {
      console.error("e", e);
    }
  }

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
      console.error("err", err);
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

    allZoneSwitchRecords.forEach((record) => {
      if (record.u_switch.value === mySwitchSysId) {
        // record has matching ip pools with network zone names
        if (record.u_network_security_zone.value && record.u_ip_pool.value) {
          zonesWithIpPools.push(record);
        } else if (!record.u_network_security_zone.value) {
          // ip pool info only
          filteredIpPools.push(record.u_ip_pool);
        }
      }
    });

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

  function addsSelectedZoneAndIpRecordToMatchedPairs(zoneInfo, ipPoolInfo) {
    const foundRecord = allZoneSwitchRecords.find(
      (record) => record.u_ip_pool.value === ipPoolInfo.value
    );

    foundRecord.u_network_security_zone = {
      display_value: zoneInfo.u_name.display_value,
      value: zoneInfo.sys_id.value,
    };
    setMatchedZonesAndIpPools([...matchedZonesAndIpPools, foundRecord]);
  }

  function addNewNetworkSecurityZones(zoneInfo, ipPool) {
    if (ipPool.value) {
      removesSelectedIpPoolInfoFromAvailableSet(ipPool);
      addsSelectedZoneAndIpRecordToMatchedPairs(zoneInfo, ipPool);
    }
  }

  function getSysIdsForAvailIps() {
    const newAvailIps = [];
    for (let i = 0; i < allZoneSwitchRecords.length; i++) {
      for (let j = 0; j < availableIpPools.length; j++) {
        if (
          availableIpPools[j].value === allZoneSwitchRecords[i].u_ip_pool.value
        ) {
          newAvailIps.push({
            u_ip_pool: availableIpPools[j],
            sys_id: allZoneSwitchRecords[i].sys_id.value,
          });
        }
      }
    }
    return newAvailIps;
  }

  async function submitNetworkSecurityZoneInfo() {
    try {
      const availIpWithSysIds = getSysIdsForAvailIps();

      await axios.post(
        "https://dev220672.service-now.com/api/1473863/network_security_zone_switches_update",
        {
          matched_records: matchedZonesAndIpPools,
          available_ips: availIpWithSysIds,
        }
      );
      closeModal();
    } catch (e) {
      console.error("e", e);
      // add spinner and/warning that there was an error
    }
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
                  inEditMode={inEditMode}
                  setInEditMode={setInEditMode}
                  updateIpPoolDisplayValue={updateIpPoolDisplayValue}
                  deleteNetworkSecurityZoneInfo={deleteNetworkSecurityZoneInfo}
                />
              );
            })}
          </ul>
          <AddCards
            allSecurityZones={allSecurityZones}
            availableIpPools={availableIpPools}
            addNewNetworkSecurityZones={addNewNetworkSecurityZones}
          />
          <Footer
            inEditMode={inEditMode}
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

  - 

  - double check if it was the right decision to independently query the security zone table

  - ask if the same should be done with the ip pool table

  - spinner for query load

  - spinner for query on submit

 do you want it to persist on cancel or to refresh?
 */
