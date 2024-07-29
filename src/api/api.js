import axios from "axios";

export async function getNetworkSecurityRecords(setAllSecurityZones) {
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

export async function getNetworkSecurityZoneSwitchRecords(
  setAllZoneSwitchRecords
) {
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

export async function UpdateNetworkSecurityZoneSwitchRecords(
  getSysIdsForAvailIps,
  closeModal,
  matchedZonesAndIpPools
) {
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
