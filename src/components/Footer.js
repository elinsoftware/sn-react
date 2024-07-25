import React from "react";

export const Footer = ({
  createNetworkSecurityZones,
  closeModal,
  submitNetworkSecurityZoneInfo,
}) => {
  return (
    <>
      <button onClick={createNetworkSecurityZones}>
        + Add New Security Zone
      </button>
      <button onClick={submitNetworkSecurityZoneInfo}>Ok</button>
      <button onClick={closeModal}>Cancel</button>
    </>
  );
};
