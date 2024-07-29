import axios from "axios";
import { ENDPOINTS } from "./endpoints";

export async function getNetworkSecurityZoneRecords(setAllSecurityZones) {
  try {
    const res = await axios.get(ENDPOINTS.GET_NETWORK_SECURITY_ZONE_RECORDS, {
      params: {
        sysparm_display_value: "all",
      },
    });

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
      ENDPOINTS.GET_NETWORK_SECURITY_ZONE_SWITCH_RECORDS,
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
    console.log("yo?", availIpWithSysIds);
    console.log("matched stuff", matchedZonesAndIpPools);

    await axios.post(ENDPOINTS.UPDATE_NETWORK_SECURITY_ZONE_SWITCH_RECORDS, {
      matched_records: matchedZonesAndIpPools,
      available_ips: availIpWithSysIds,
    });
    closeModal();
  } catch (e) {
    console.error("e", e);
    // add spinner and/warning that there was an error
  }
}
