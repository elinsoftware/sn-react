import React from "react";
import { useState } from "react";

export const Footer = () => {
  const [newIPPool, setNewIPPool] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    console.log("submitted", newIPPool);
    setNewIPPool("");
  }

  function closeModal() {
    console.log("close modal");
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setNewIPPool(e.target.value)}
          value={newIPPool}
          type="text"
          placeholder="+ Add New Security Zone"
        />
        <button>Ok</button>
      </form>
      <button onClick={closeModal}>Cancel</button>
    </>
  );
};
