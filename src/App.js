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

    setSecurityZones(Array.from(securityZoneSet));
    setMatchedZonesAndIpPools(zonesWithIpPools);
    setAvailableIpPools(filteredIpPools);
  }

  function editNetworkSecurityZoneInfo(updatedIpRecord) {
    setMatchedZonesAndIpPools(
      matchedZonesAndIpPools.map((record) => {
        if (record.ipPoolId === updatedIpRecord.ipPoolId) {
          record.ipPoolLabel = updatedIpRecord.ipPoolLabel;
        }
        return record;
      })
    );
  }

  function deleteNetworkSecurityZoneInfo(newIpPoolRecord) {
    let newAvailableIPPool;
    setMatchedZonesAndIpPools(
      matchedZonesAndIpPools.filter((record) => {
        if (record.ipPoolId === newIpPoolRecord.ipPoolId)
          newAvailableIPPool = newIpPoolRecord;
        return record.ipPoolId !== newIpPoolRecord.ipPoolId;
      })
    );
    setAvailableIpPools([...availableIpPools, newAvailableIPPool]);
  }

  function removesSelectedIpPoolInfoFromAvailableSet(ipPoolInfo) {
    setAvailableIpPools(
      availableIpPools.filter(
        (ipPoolRecord) => ipPoolRecord.ipPoolId !== ipPoolInfo.ipPoolId
      )
    );
  }

  function addsSelectedZoneAndIpRecordToMatchedPairs(
    securityZoneInfo,
    ipPoolInfo
  ) {
    setMatchedZonesAndIpPools([
      ...matchedZonesAndIpPools,
      {
        ipPoolLabel: ipPoolInfo.ipPoolLabel,
        ipPoolId: ipPoolInfo.ipPoolId,
        zoneNameLabel: securityZoneInfo.zoneNameLabel,
        zoneNameId: securityZoneInfo.zoneNameId,
      },
    ]);
  }

  function addNewNetworkSecurityZones(securityZoneInfo, ipPoolInfo) {
    if (securityZoneInfo.zoneNameId && ipPoolInfo.ipPoolId) {
      removesSelectedIpPoolInfoFromAvailableSet(ipPoolInfo);
      addsSelectedZoneAndIpRecordToMatchedPairs(securityZoneInfo, ipPoolInfo);
    }
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
            {matchedZonesAndIpPools.map((record) => {
              return (
                <ExistingCard
                  key={record.ipPoolId}
                  record={record}
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
 put normally for updating all fields
 patch, only the info sent

 do you want it to persist on cancel or to refresh?

 fix add func - keeps adding

 want a warning that there are no more ip pools to add

 */
