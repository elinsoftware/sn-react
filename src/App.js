import React from "react";
import { hot } from "react-hot-loader/root";
import { Header } from "./components/Header.js";
import { Cards } from "./components/Cards.js";
import { Footer } from "./components/Footer.js";
import "./App.css";
import { useState } from "react";
import _ from "lodash";

function App() {
  const [newNetworkSecurityList, setNewNetworkSecurityList] = useState([]);
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

  function createNetworkSecurityZones() {
    setNewNetworkSecurityList([
      ...newNetworkSecurityList,
      {
        id: crypto.randomUUID(),
        name: "",
        ip_pool: "",
      },
    ]);
  }

  function addNewNetworkSecurityZones(id) {
    console.log("adding new zones to existing list", id);
    let networkSecurityMatch;
    setNewNetworkSecurityList(
      newNetworkSecurityList.filter((networkZoneObj) => {
        if (networkZoneObj.id === id) networkSecurityMatch = networkZoneObj;
        return networkZoneObj.id !== id;
      })
    );
    // Additional logic about if this obj can be submitted if ip pool
    // and name are empty
    setNetworkSecurityZonesList([
      ...networkSecurityZonesList,
      networkSecurityMatch,
    ]);
  }

  function cancelNewNetworkSecurityInfo() {
    console.log("cancelled adding new info");
    const listCopy = _.cloneDeep(newNetworkSecurityList);
    listCopy.pop();
    setNewNetworkSecurityList(listCopy);
  }

  function submitNetworkSecurityZoneInfo() {
    if (newNetworkSecurityList.length) {
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
          newNetworkSecurityList={newNetworkSecurityList}
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
