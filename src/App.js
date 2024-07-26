import React, { useEffect } from "react";
import { hot } from "react-hot-loader/root";
import { ExistingCard } from "./components/ExistingCard.js";
import { Footer } from "./components/Footer.js";
import { AddCards } from "./components/AddCards.js";
import "./App.css";
import { useState } from "react";
import _ from "lodash";
import { Grid } from "@material-ui/core";
import axios from "axios";

const names = [
  "Hye-Jin",
  "Alexandra",
  "Noburu",
  "Paskal",
  "Itzamna",
  "Xhafer",
  "Slobodanka",
  "Fausta",
  "Kariuki",
  "Miriam",
];
const ipPools = [
  "e932fa536fa05c1abe3855389eee39c23c72d813b085bf17c2296ba266f72224b7630fccb1a3c057",
  "e88adaf0526da97746aee6fdf70884d685b84c6ae88adaf0526da97746aee6fdf70884d685b84c6a",
  "5a2c74a534f2260efc2229595d09d65f38922d325a2c74a534f2260efc2229595d09d65f38922d32",
  "87b83b3142f0cc46616f748cf9653e473c00ecda87b83b3142f0cc46616f748cf9653e473c00ecda",
  "b2c4ee5de82866db38f79c6d4a91a626486b70e9b2c4ee5de82866db38f79c6d4a91a626486b70e9",
  "8961f68dcbb4af171c24541f30b0d181b7ed77f58961f68dcbb4af171c24541f30b0d181b7ed77f5",
  "26457d44644a142925c19da2df0c433b3341782826457d44644a142925c19da2df0c433b33417828",
  "70c881d4a26984ddce795f6f71817c9cf4480e7970c881d4a26984ddce795f6f71817c9cf4480e79",
  "da23614e02469a0d7c7bd1bdab5c9c474b1904dcda23614e02469a0d7c7bd1bdab5c9c474b1904dc",
  "a9993e364706816aba3e25717850c26c9cd0d89da9993e364706816aba3e25717850c26c9cd0d89d",
];

function App() {
  const [selectedName, setSelectedName] = useState(names[0]);
  const [selectedIPPool, setSelectedIPPool] = useState(ipPools[0]);
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

  useEffect(() => {
    axios
      .get(
        "https://dev220672.service-now.com/api/now/table/u_cmdb_ci_network_security_zone"
      )
      .then((res) => {
        console.log("RESS", res.data);
      });
  }, []);

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
