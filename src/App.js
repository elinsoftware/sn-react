import React from "react";
import { hot } from "react-hot-loader/root";
import { Header } from "./components/Header.js";
import { Cards } from "./components/Cards.js";
import { Footer } from "./components/Footer.js";
import "./App.css";
import { useState } from "react";
import _ from "lodash";

function App() {
  const [newNetworkSecurityInfo, setNewNetworkSecurityInfo] = useState([]);
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
    setNetworkSecurityZonesList(
      networkSecurityZonesList.filter((zoneObj) => zoneObj.id !== id)
    );
  }

  function createNetworkSecurityZones(e) {
    setNewNetworkSecurityInfo([
      ...newNetworkSecurityInfo,
      {
        id: "",
        name: "",
        ip_pool: "",
      },
    ]);
  }

  function addNewNetworkSecurityZones() {
    console.log("adding new zones to existing list");
  }

  function cancelNewNetworkSecurityInfo() {
    console.log("cancelled adding new info");
    const listCopy = _.cloneDeep(newNetworkSecurityInfo);
    listCopy.pop();
    setNewNetworkSecurityInfo(listCopy);
  }

  function submitNetworkSecurityZoneInfo() {
    if (newNetworkSecurityInfo.length) {
      console.log("there are unsaved security zones");
      return;
    }
    console.log("submitted/updated zones");
  }
  function closeModal() {
    console.log("close modal");
  }
  return (
    <>
      <div className="app-container">
        <Header />
        <Cards
          deleteNetworkSecurityZoneInfo={deleteNetworkSecurityZoneInfo}
          networkSecurityZonesList={networkSecurityZonesList}
          newNetworkSecurityInfo={newNetworkSecurityInfo}
          setNewNetworkSecurityInfo={setNewNetworkSecurityInfo}
          cancelNewNetworkSecurityInfo={cancelNewNetworkSecurityInfo}
          addNewNetworkSecurityZones={addNewNetworkSecurityZones}
        />
        <Footer
          createNetworkSecurityZones={createNetworkSecurityZones}
          submitNetworkSecurityZoneInfo={submitNetworkSecurityZoneInfo}
          closeModal={closeModal}
        />
      </div>
    </>
  );
}

export default hot(App);
