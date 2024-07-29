// Base API URL
const BASE_URL = "https://dev220672.service-now.com/api/";
const id = "1473863";

// Endpoints
export const ENDPOINTS = {
  GET_NETWORK_SECURITY_ZONE_RECORDS: `${BASE_URL}/now/table/u_cmdb_ci_network_security_zone`,
  GET_NETWORK_SECURITY_ZONE_SWITCH_RECORDS: `${BASE_URL}/now/table/u_network_security_zone_switch`,
  UPDATE_NETWORK_SECURITY_ZONE_SWITCH_RECORDS: `${BASE_URL}/${id}/network_security_zone_switches_update`,
};
