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
  const [zoneLabels, setZoneLabels] = useState([]);
  const [currSysId, setCurrSysId] = useState("");
  const [allZoneSwitchRecords, setAllZoneSwitchRecords] = useState([]);
  const [availableIpPools, setAvailableIpPools] = useState([]);
  const [selectedZoneLabel, setSelectedZoneLabel] = useState("");
  const [selectedIPPool, setSelectedIPPool] = useState("");
  const [networkSecurityZonesList, setNetworkSecurityZonesList] = useState([]);

  useEffect(() => {
    const urlSearchVal = window.location.search;
    const regex = /sys_id=([a-f0-9]{32})/;
    setCurrSysId(urlSearchVal.match(regex)[1]);
    axios
      .get(
        "https://dev220672.service-now.com/api/now/table/u_network_security_zone_switch",
        {
          params: {
            sysparm_display_value: "all",
          },
        }
      )
      .then((res) => {
        setAllZoneSwitchRecords(res.data.result);
      });
  }, []);

  useEffect(() => {
    const filteredIpPools = [];
    const zonesWithIpPools = [];
    const zoneLabelsList = new Set([]);

    allZoneSwitchRecords.forEach((record) => {
      if (record.u_switch.value === currSysId) {
        if (record.u_network_security_zone.display_value)
          zoneLabelsList.add(record.u_network_security_zone.display_value);
        // record has matching ip pools with network zone names
        if (record.u_network_security_zone && record.u_ip_pool) {
          const newRecordObj = {
            name: record.u_network_security_zone.display_value,
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
    setZoneLabels(Array.from(zoneLabelsList));
    setNetworkSecurityZonesList(zonesWithIpPools);
    setAvailableIpPools(filteredIpPools);
    setSelectedIPPool(filteredIpPools[0]);
  }, [allZoneSwitchRecords]);

  // updates selected
  useEffect(() => {
    setSelectedIPPool(availableIpPools[0]);
    setSelectedZoneLabel(zoneLabels[0]);
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

  function addNewNetworkSecurityZones(name, ipPool) {
    // removes from available ip pools
    setAvailableIpPools(
      availableIpPools.filter((ip_pool) => ip_pool !== ipPool)
    );

    // adds to matching zones/ip pools list
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
            zoneLabels={zoneLabels}
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
 - i guess they're editing the label, not the id right??!?!?!

  questions to ask Jon:
    - does editing an ip pool name create a new one or override
    the existing one?

  do you want the edit to be a drop down of available free ones?
  no that's stupid, you can't just "create a new ip pool"
 */
